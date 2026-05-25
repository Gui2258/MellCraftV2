import { db } from '@/lib/db'
import { orders, orderItems, users } from '@/lib/db/schema'
import { eq, desc, inArray } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const [dbUser] = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
  if (!dbUser) return Response.json({ data: [] })

  const userOrders = await db
    .select({
      id: orders.id,
      customerName: orders.customerName,
      deliveryType: orders.deliveryType,
      deliveryAddress: orders.deliveryAddress,
      totalCup: orders.totalCup,
      status: orders.status,
      notes: orders.notes,
      whatsappUrl: orders.whatsappUrl,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.userId, dbUser.id))
    .orderBy(desc(orders.createdAt))

  const orderIds = userOrders.map((o) => o.id)
  const allItems = orderIds.length
    ? await db.select().from(orderItems).where(inArray(orderItems.orderId, orderIds))
    : []

  const itemsByOrder = allItems.reduce<Record<string, typeof allItems>>((acc, item) => {
    if (!acc[item.orderId]) acc[item.orderId] = []
    acc[item.orderId].push(item)
    return acc
  }, {})

  return Response.json({
    data: userOrders.map((o) => ({ ...o, items: itemsByOrder[o.id] ?? [] })),
  })
}
