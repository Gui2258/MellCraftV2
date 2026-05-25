import { db } from '@/lib/db'
import { products, productImages, productVariants, productTypes, likes, users } from '@/lib/db/schema'
import { eq, asc, and } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { getRole } from '@/lib/auth'

export async function GET(_req: Request, ctx: RouteContext<'/api/products/[id]'>) {
  const { id } = await ctx.params

  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      content: products.content,
      priceCup: products.priceCup,
      priceUsd: products.priceUsd,
      isAvailable: products.isAvailable,
      isNew: products.isNew,
      isArchived: products.isArchived,
      rating: products.rating,
      reviewCount: products.reviewCount,
      likesCount: products.likesCount,
      typeId: products.typeId,
      typeName: productTypes.name,
      typeSlug: productTypes.slug,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .leftJoin(productTypes, eq(products.typeId, productTypes.id))
    .where(eq(products.id, id))
    .limit(1)

  if (!product) return Response.json({ error: 'Not found' }, { status: 404 })

  const [images, variants] = await Promise.all([
    db.select().from(productImages).where(eq(productImages.productId, id)).orderBy(asc(productImages.position)),
    db.select().from(productVariants).where(eq(productVariants.productId, id)),
  ])

  // Check like status
  let liked = false
  const { userId } = await auth()
  if (userId) {
    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    if (dbUser) {
      const [like] = await db
        .select()
        .from(likes)
        .where(and(eq(likes.userId, dbUser.id), eq(likes.productId, id)))
        .limit(1)
      liked = !!like
    }
  }

  return Response.json({ data: { ...product, images, variants, liked } })
}

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  typeId: z.string().uuid().nullable().optional(),
  priceCup: z.string().or(z.number()).transform(String).optional(),
  priceUsd: z.string().or(z.number()).transform(String).nullable().optional(),
  isAvailable: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isArchived: z.boolean().optional(),
})

export async function PUT(req: Request, ctx: RouteContext<'/api/products/[id]'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  const [updated] = await db
    .update(products)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning()

  if (!updated) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ data: updated })
}

export async function DELETE(_req: Request, ctx: RouteContext<'/api/products/[id]'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  await db.update(products).set({ isArchived: true, updatedAt: new Date() }).where(eq(products.id, id))
  return Response.json({ ok: true })
}
