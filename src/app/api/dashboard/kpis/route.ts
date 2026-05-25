import { db } from '@/lib/db'
import { products, orders, likes, users } from '@/lib/db/schema'
import { eq, sql, gte, count } from 'drizzle-orm'
import { getRole } from '@/lib/auth'

export async function GET() {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [
    [totalProducts],
    [availableProducts],
    [totalOrders],
    [monthOrders],
    [totalRevenue],
    [monthRevenue],
    [totalLikes],
    [totalUsers],
  ] = await Promise.all([
    db.select({ count: count() }).from(products).where(eq(products.isArchived, false)),
    db.select({ count: count() }).from(products).where(eq(products.isAvailable, true)),
    db.select({ count: count() }).from(orders),
    db.select({ count: count() }).from(orders).where(gte(orders.createdAt, startOfMonth)),
    db.select({ sum: sql<string>`coalesce(sum(total_cup::numeric),0)` }).from(orders),
    db
      .select({ sum: sql<string>`coalesce(sum(total_cup::numeric),0)` })
      .from(orders)
      .where(gte(orders.createdAt, startOfMonth)),
    db.select({ count: count() }).from(likes),
    db.select({ count: count() }).from(users),
  ])

  return Response.json({
    data: {
      totalProducts: totalProducts.count,
      availableProducts: availableProducts.count,
      totalOrders: totalOrders.count,
      monthOrders: monthOrders.count,
      totalRevenue: parseFloat(totalRevenue.sum),
      monthRevenue: parseFloat(monthRevenue.sum),
      totalLikes: totalLikes.count,
      totalUsers: totalUsers.count,
    },
  })
}
