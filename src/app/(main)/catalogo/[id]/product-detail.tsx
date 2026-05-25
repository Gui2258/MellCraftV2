'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import ProductImage from '@/components/ui/product-image'
import {
  HeartIcon, BagIcon, MinusIcon, PlusIcon, StarIcon,
  TruckIcon, BoxIcon, CheckIcon,
} from '@/components/ui/icons'
import { useCart } from '@/components/cart/cart-context'
import styles from './product-detail.module.css'

type Tone = 'terracotta' | 'blush' | 'mustard' | 'sage' | 'cream' | 'coffee' | 'paper' | 'clay' | 'putty' | 'rose' | 'olive'

interface Variant {
  id: string
  color: string | null
  colorHex: string | null
  size: string | null
  stock: number
}

interface ProductImage_ {
  id: string
  url: string
  position: number
}

interface Product {
  id: string
  title: string
  description: string
  content: string | null
  typeName: string | null
  typeSlug: string | null
  priceCup: string
  priceUsd: string | null
  rating: string
  reviewCount: number
  likesCount: number
  isAvailable: boolean
  isNew: boolean
  liked: boolean
  images: ProductImage_[]
  variants: Variant[]
}

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] ?? null,
  )
  const [activeImage, setActiveImage] = useState(0)
  const [liked, setLiked] = useState(product.liked)
  const [note, setNote] = useState('')
  const { addItem } = useCart()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const tone: Tone = 'terracotta'
  const priceCup = parseFloat(product.priceCup)
  const priceUsd = product.priceUsd ? parseFloat(product.priceUsd) : null

  async function handleLike() {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    const res = await fetch(`/api/products/${product.id}/like`, { method: 'POST' })
    if (res.ok) {
      const json = await res.json()
      setLiked(json.liked)
    }
  }

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      title: product.title,
      variantLabel: [selectedVariant?.color, selectedVariant?.size].filter(Boolean).join(' · ') || undefined,
      priceCup,
      priceUsd: priceUsd ?? undefined,
      tone,
    })
  }

  const hasVariants = product.variants.length > 0
  const hasColors = product.variants.some((v) => v.color)
  const hasSizes = product.variants.some((v) => v.size)

  return (
    <div>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/">Inicio</Link> · <Link href="/catalogo">Tienda</Link>
        {product.typeName && <> · <Link href={`/catalogo?tipo=${product.typeSlug}`}>{product.typeName}</Link></>}
        {' '} · <span>{product.title}</span>
      </div>

      <section className={styles.main}>
        {/* Gallery */}
        <div className={styles.gallery}>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className={styles.thumbs}>
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <ProductImage
                    src={img.url}
                    tone={tone}
                    alt={product.title}
                    style={{ width: '100%', height: '100%' }}
                  />
                </button>
              ))}
              {/* Placeholder thumbs if < 4 images */}
              {product.images.length < 4 &&
                (['rose', 'mustard', 'paper'].slice(0, 4 - product.images.length) as Tone[]).map(
                  (t, i) => (
                    <div key={`ph-${i}`} className={styles.thumb}>
                      <ProductImage tone={t} style={{ width: '100%', height: '100%' }} />
                    </div>
                  ),
                )}
            </div>
          )}

          {/* Main image */}
          <div className={styles.mainImage}>
            <ProductImage
              src={product.images[activeImage]?.url ?? null}
              tone={tone}
              alt={product.title}
              style={{ width: '100%', height: '100%' }}
            />
            {product.isNew && <span className={styles.badgeNew}>Nuevo</span>}
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          {product.typeName && (
            <div className={styles.type}>{product.typeName}</div>
          )}
          <h1 className={styles.title}>{product.title}</h1>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <span className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={14} color="var(--va-mustard)" filled={i < Math.round(parseFloat(product.rating))} />
              ))}
              <span className={styles.ratingNum}>{parseFloat(product.rating).toFixed(1)}</span>
            </span>
            <span className={styles.divider} />
            <span className={styles.reviewCount}>{product.reviewCount} reseñas</span>
            <span className={styles.divider} />
            <span className={`${styles.stock} ${product.isAvailable ? styles.inStock : styles.outStock}`}>
              {product.isAvailable ? '● Disponible' : '● Agotado'}
            </span>
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            <span className={styles.priceCup}>{priceCup.toLocaleString('es-CU')} CUP</span>
            {priceUsd && <span className={styles.priceUsd}>· ${priceUsd.toFixed(2)}</span>}
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Variants: colors */}
          {hasColors && (
            <div className={styles.variantGroup}>
              <div className={styles.variantLabel}>Color del envoltorio</div>
              <div className={styles.colorOptions}>
                {product.variants
                  .filter((v) => v.color)
                  .map((v) => (
                    <button
                      key={v.id}
                      className={`${styles.colorOption} ${selectedVariant?.id === v.id ? styles.colorActive : ''}`}
                      onClick={() => setSelectedVariant(v)}
                      disabled={v.stock === 0}
                    >
                      {v.colorHex && (
                        <span className={styles.colorDot} style={{ background: v.colorHex }} />
                      )}
                      {v.color}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Variants: sizes */}
          {hasSizes && (
            <div className={styles.variantGroup}>
              <div className={styles.variantLabel}>Tamaño</div>
              <div className={styles.sizeOptions}>
                {product.variants
                  .filter((v) => v.size)
                  .map((v) => (
                    <button
                      key={v.id}
                      className={`${styles.sizeOption} ${selectedVariant?.id === v.id ? styles.sizeActive : ''}`}
                      onClick={() => setSelectedVariant(v)}
                      disabled={v.stock === 0}
                    >
                      {v.size}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Note */}
          <div className={styles.noteGroup}>
            <div className={styles.variantLabel}>Mensaje en la tarjeta (opcional)</div>
            <textarea
              className={styles.noteInput}
              placeholder="Para ti, mi amor…"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Quantity + actions */}
          <div className={styles.actions}>
            <div className={styles.qtyControl}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className={styles.qtyBtn}>
                <MinusIcon size={14} />
              </button>
              <span className={styles.qtyNum}>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className={styles.qtyBtn}>
                <PlusIcon size={14} />
              </button>
            </div>
            <button
              className={styles.addCartBtn}
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
            >
              <BagIcon size={16} color="var(--va-cream)" />
              Añadir al carrito
            </button>
            <button
              className={`${styles.likeBtn} ${liked ? styles.likeBtnActive : ''}`}
              onClick={handleLike}
              aria-label="Favorito"
            >
              <HeartIcon size={18} filled={liked} color={liked ? 'var(--va-terracotta)' : 'var(--va-coffee)'} />
            </button>
          </div>

          {/* Trust badges */}
          <div className={styles.trust}>
            <span><TruckIcon size={15} /> Entrega 48h en La Habana</span>
            <span><BoxIcon size={15} /> Empaque incluido</span>
            <span><HeartIcon size={15} /> Hecho a mano</span>
            <span><CheckIcon size={15} /> Garantía de cariño</span>
          </div>
        </div>
      </section>

      {/* Content / description */}
      {product.content && (
        <section className={styles.contentSection}>
          <h2 className={styles.contentTitle}>Detalles del producto</h2>
          <p className={styles.contentText}>{product.content}</p>
        </section>
      )}
    </div>
  )
}
