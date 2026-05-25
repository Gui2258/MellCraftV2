import { db } from '@/lib/db'
import { orders, orderItems, users, productVariants } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { getRole } from '@/lib/auth'

const orderItemSchema = z.object({
  productId: z.string().uuid().optional(),
  variantId: z.string().uuid().optional(),
  productTitle: z.string(),
  variantLabel: z.string().optional(),
  quantity: z.number().min(1),
  priceCup: z.number(),
})

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().optional(),
  deliveryType: z.enum(['pickup', 'delivery']),
  deliveryAddress: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
})

export async function GET(req: Request) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const url = new URL(req.url)
  const status = url.searchParams.get('status')
  const page = parseInt(url.searchParams.get('page') ?? '1', 10)
  const limit = parseInt(url.searchParams.get('limit') ?? '20', 10)
  const offset = (page - 1) * limit

  const query = db
    .select({
      id: orders.id,
      customerName: orders.customerName,
      customerPhone: orders.customerPhone,
      deliveryType: orders.deliveryType,
      deliveryAddress: orders.deliveryAddress,
      totalCup: orders.totalCup,
      status: orders.status,
      notes: orders.notes,
      whatsappUrl: orders.whatsappUrl,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(limit)
    .offset(offset)

  const rows = status
    ? await query.where(eq(orders.status, status as 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'))
    : await query

  return Response.json({ data: rows })
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = createOrderSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  const { userId } = await auth()
  let dbUserId: string | null = null
  if (userId) {
    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    dbUserId = dbUser?.id ?? null
  }

  const data = parsed.data
  const totalCup = data.items.reduce((sum, i) => sum + i.priceCup * i.quantity, 0)

  const waLink = buildWhatsAppLink({
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    items: data.items.map((i) => ({
      title: i.productTitle,
      variant: i.variantLabel ?? '',
      qty: i.quantity,
      price: i.priceCup,
    })),
    totalCup,
    deliveryType: data.deliveryType,
    address: data.deliveryAddress,
    notes: data.notes,
  })

  const [order] = await db
    .insert(orders)
    .values({
      userId: dbUserId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      deliveryType: data.deliveryType,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
      totalCup: String(totalCup),
      whatsappUrl: waLink,
      status: 'pending',
    })
    .returning()

  if (data.items.length > 0) {
    await db.insert(orderItems).values(
      data.items.map((i) => ({
        orderId: order.id,
        productId: i.productId,
        variantId: i.variantId,
        productTitle: i.productTitle,
        variantLabel: i.variantLabel,
        quantity: i.quantity,
        priceCup: String(i.priceCup),
      })),
    )
  }

  return Response.json({ data: { ...order, whatsappUrl: waLink } }, { status: 201 })
}
