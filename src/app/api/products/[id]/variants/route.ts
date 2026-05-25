import { db } from '@/lib/db'
import { productVariants } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getRole } from '@/lib/auth'
import { z } from 'zod'

const variantSchema = z.object({
  color: z.string().optional(),
  colorHex: z.string().optional(),
  size: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  sku: z.string().optional(),
})

export async function GET(_req: Request, ctx: RouteContext<'/api/products/[id]/variants'>) {
  const { id } = await ctx.params
  const variants = await db.select().from(productVariants).where(eq(productVariants.productId, id))
  return Response.json({ data: variants })
}

export async function POST(req: Request, ctx: RouteContext<'/api/products/[id]/variants'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const body = await req.json()
  const parsed = variantSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  const [variant] = await db.insert(productVariants).values({ productId: id, ...parsed.data }).returning()
  return Response.json({ data: variant }, { status: 201 })
}

export async function PUT(req: Request, ctx: RouteContext<'/api/products/[id]/variants'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { variantId, ...rest } = body
  if (!variantId) return Response.json({ error: 'variantId required' }, { status: 400 })

  const parsed = variantSchema.partial().safeParse(rest)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  const [updated] = await db
    .update(productVariants)
    .set(parsed.data)
    .where(eq(productVariants.id, variantId))
    .returning()
  return Response.json({ data: updated })
}

export async function DELETE(req: Request, ctx: RouteContext<'/api/products/[id]/variants'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { variantId } = await req.json()
  await db.delete(productVariants).where(eq(productVariants.id, variantId))
  return Response.json({ ok: true })
}
