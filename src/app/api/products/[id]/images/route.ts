import { db } from '@/lib/db'
import { productImages } from '@/lib/db/schema'
import { eq, asc } from 'drizzle-orm'
import { getRole } from '@/lib/auth'
import { z } from 'zod'

export async function GET(_req: Request, ctx: RouteContext<'/api/products/[id]/images'>) {
  const { id } = await ctx.params
  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, id))
    .orderBy(asc(productImages.position))
  return Response.json({ data: images })
}

export async function POST(req: Request, ctx: RouteContext<'/api/products/[id]/images'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const body = await req.json()
  const parsed = z.object({ url: z.string().url(), position: z.number().int().default(0) }).safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  const [image] = await db
    .insert(productImages)
    .values({ productId: id, url: parsed.data.url, position: parsed.data.position })
    .returning()
  return Response.json({ data: image }, { status: 201 })
}

export async function DELETE(req: Request, ctx: RouteContext<'/api/products/[id]/images'>) {
  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const { imageId } = await req.json()
  await db.delete(productImages).where(eq(productImages.id, imageId))
  return Response.json({ ok: true })
}
