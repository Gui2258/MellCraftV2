import { db } from '@/lib/db'
import { orders, orderItems } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { getRole } from '@/lib/auth'

const updateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'completed', 'cancelled']),
})

export async function GET(_req: Request, ctx: RouteContext<'/api/orders/[id]'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1)
  if (!order) return Response.json({ error: 'Not found' }, { status: 404 })

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id))
  return Response.json({ data: { ...order, items } })
}

export async function PUT(req: Request, ctx: RouteContext<'/api/orders/[id]'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  const [updated] = await db
    .update(orders)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(orders.id, id))
    .returning()

  if (!updated) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ data: updated })
}
