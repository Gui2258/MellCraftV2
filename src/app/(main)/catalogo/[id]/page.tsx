import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { products, productImages, productVariants, productTypes } from '@/lib/db/schema'
import { eq, asc } from 'drizzle-orm'
import ProductDetail from './product-detail'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params

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
      rating: products.rating,
      reviewCount: products.reviewCount,
      likesCount: products.likesCount,
      typeId: products.typeId,
      typeName: productTypes.name,
      typeSlug: productTypes.slug,
    })
    .from(products)
    .leftJoin(productTypes, eq(products.typeId, productTypes.id))
    .where(eq(products.id, id))
    .limit(1)

  if (!product) notFound()

  const [images, variants] = await Promise.all([
    db.select().from(productImages).where(eq(productImages.productId, id)).orderBy(asc(productImages.position)),
    db.select().from(productVariants).where(eq(productVariants.productId, id)),
  ])

  return (
    <ProductDetail
      product={{ ...product, images, variants, liked: false }}
    />
  )
}
