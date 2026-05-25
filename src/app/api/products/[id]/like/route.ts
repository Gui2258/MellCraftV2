import { db } from '@/lib/db'
import { likes, users, products } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'

export async function POST(_req: Request, ctx: RouteContext<'/api/products/[id]/like'>) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: productId } = await ctx.params

  const [dbUser] = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
  if (!dbUser) return Response.json({ error: 'User not found' }, { status: 404 })

  // Check if like exists
  const [existing] = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, dbUser.id), eq(likes.productId, productId)))
    .limit(1)

  if (existing) {
    // Unlike
    await db.delete(likes).where(and(eq(likes.userId, dbUser.id), eq(likes.productId, productId)))
    await db.update(products).set({ likesCount: sql`likes_count - 1` }).where(eq(products.id, productId))
    return Response.json({ liked: false })
  } else {
    // Like
    await db.insert(likes).values({ userId: dbUser.id, productId })
    await db.update(products).set({ likesCount: sql`likes_count + 1` }).where(eq(products.id, productId))
    return Response.json({ liked: true })
  }
}
