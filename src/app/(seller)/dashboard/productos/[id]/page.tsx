import { db } from '@/lib/db'
import { products, productImages, productVariants, productTypes } from '@/lib/db/schema'
import { eq, asc } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import ProductForm from '@/components/products/product-form'
import styles from '../productos.module.css'

export default async function EditProductoPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      content: products.content,
      typeId: products.typeId,
      priceCup: products.priceCup,
      priceUsd: products.priceUsd,
      isAvailable: products.isAvailable,
      isNew: products.isNew,
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
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 28 }}>Editar producto</h1>
      <ProductForm
        productId={id}
        initialData={{
          title: product.title,
          description: product.description,
          content: product.content ?? '',
          typeId: product.typeId ?? '',
          priceCup: product.priceCup,
          priceUsd: product.priceUsd ?? '',
          isAvailable: product.isAvailable,
          isNew: product.isNew,
          images,
          variants: variants.map((v) => ({
            id: v.id,
            color: v.color ?? '',
            colorHex: v.colorHex ?? '',
            size: v.size ?? '',
            stock: v.stock,
            sku: v.sku ?? '',
          })),
        }}
      />
    </div>
  )
}
