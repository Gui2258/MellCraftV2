import { db } from '@/lib/db'
import { products, productTypes, productImages, productVariants, likes, users } from '@/lib/db/schema'
import { and, eq, ilike, inArray, lte, gte, asc, desc, sql } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { getRole } from '@/lib/auth'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const tipo = url.searchParams.get('tipo')
  const search = url.searchParams.get('q')
  const disponible = url.searchParams.get('disponible')
  const minPrice = url.searchParams.get('minPrice')
  const maxPrice = url.searchParams.get('maxPrice')
  const sort = url.searchParams.get('sort') ?? 'recientes'
  const page = parseInt(url.searchParams.get('page') ?? '1', 10)
  const limit = parseInt(url.searchParams.get('limit') ?? '12', 10)
  const offset = (page - 1) * limit

  const onlyLiked = url.searchParams.get('liked') === '1'
  const conditions = [eq(products.isArchived, false)]

  if (tipo) {
    const [type] = await db.select().from(productTypes).where(eq(productTypes.slug, tipo)).limit(1)
    if (type) conditions.push(eq(products.typeId, type.id))
  }

  if (search) conditions.push(ilike(products.title, `%${search}%`))
  if (disponible === '1') conditions.push(eq(products.isAvailable, true))
  if (minPrice) conditions.push(gte(products.priceCup, minPrice))
  if (maxPrice) conditions.push(lte(products.priceCup, maxPrice))

  const orderBy =
    sort === 'precio_asc' ? asc(products.priceCup)
    : sort === 'precio_desc' ? desc(products.priceCup)
    : sort === 'populares' ? desc(products.likesCount)
    : desc(products.createdAt)

  // If onlyLiked, resolve the user's liked product IDs first
  let likedProductIds: string[] | null = null
  if (onlyLiked) {
    const { userId: clerkUid } = await auth()
    if (clerkUid) {
      const [dbU] = await db.select().from(users).where(eq(users.clerkId, clerkUid)).limit(1)
      if (dbU) {
        const rows2 = await db.select({ productId: likes.productId }).from(likes).where(eq(likes.userId, dbU.id))
        likedProductIds = rows2.map((r) => r.productId)
      }
    }
    if (!likedProductIds?.length) {
      return Response.json({ data: [], total: 0, page, limit, pages: 0 })
    }
    conditions.push(inArray(products.id, likedProductIds))
  }

  const [rows, countRows] = await Promise.all([
    db
      .select({
        id: products.id,
        title: products.title,
        description: products.description,
        priceCup: products.priceCup,
        priceUsd: products.priceUsd,
        isAvailable: products.isAvailable,
        isNew: products.isNew,
        rating: products.rating,
        reviewCount: products.reviewCount,
        likesCount: products.likesCount,
        typeId: products.typeId,
        typeName: productTypes.name,
        typeSlug: productTypes.slug,
        createdAt: products.createdAt,
      })
      .from(products)
      .leftJoin(productTypes, eq(products.typeId, productTypes.id))
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(products)
      .leftJoin(productTypes, eq(products.typeId, productTypes.id))
      .where(and(...conditions)),
  ])

  const productIds = rows.map((p) => p.id)
  const images = productIds.length
    ? await db
        .select()
        .from(productImages)
        .where(inArray(productImages.productId, productIds))
        .orderBy(asc(productImages.position))
    : []

  // Check which are liked by current user
  let likedIds: string[] = []
  const { userId } = await auth()
  if (userId) {
    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    if (dbUser) {
      const userLikes = productIds.length
        ? await db
            .select({ productId: likes.productId })
            .from(likes)
            .where(and(eq(likes.userId, dbUser.id), inArray(likes.productId, productIds)))
        : []
      likedIds = userLikes.map((l) => l.productId)
    }
  }

  const imagesByProduct = images.reduce<Record<string, typeof images>>((acc, img) => {
    if (!acc[img.productId]) acc[img.productId] = []
    acc[img.productId].push(img)
    return acc
  }, {})

  const data = rows.map((p) => ({
    ...p,
    images: imagesByProduct[p.id] ?? [],
    firstImage: imagesByProduct[p.id]?.[0]?.url ?? null,
    liked: likedIds.includes(p.id),
  }))

  return Response.json({
    data,
    total: countRows[0]?.count ?? 0,
    page,
    limit,
    pages: Math.ceil((countRows[0]?.count ?? 0) / limit),
  })
}

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().optional(),
  typeId: z.string().uuid().optional(),
  priceCup: z.string().or(z.number()).transform(String),
  priceUsd: z.string().or(z.number()).transform(String).optional(),
  isAvailable: z.boolean().default(true),
  isNew: z.boolean().default(false),
})

export async function POST(req: Request) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const [product] = await db.insert(products).values(parsed.data).returning()
    return Response.json({ data: product }, { status: 201 })
  } catch (err) {
    // Surface the real cause in Vercel logs (and in the response while stabilizing
    // the deploy) instead of an opaque empty 500.
    console.error('[POST /api/products] insert failed:', err)
    return Response.json(
      { error: 'Database error', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
