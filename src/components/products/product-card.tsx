'use client'

import Link from 'next/link'
import { useState } from 'react'
import { HeartIcon, PlusIcon, StarIcon } from '@/components/ui/icons'
import ProductImage from '@/components/ui/product-image'
import { useCart } from '@/components/cart/cart-context'
import styles from './product-card.module.css'

type Tone = 'terracotta' | 'blush' | 'mustard' | 'sage' | 'cream' | 'coffee' | 'paper' | 'clay' | 'putty' | 'rose' | 'olive'

interface ProductCardProps {
  id: string
  title: string
  typeName?: string
  priceCup: number
  priceUsd?: number
  rating?: number
  reviewCount?: number
  imageUrl?: string | null
  tone?: Tone
  isNew?: boolean
  isAvailable?: boolean
  liked?: boolean
  onLikeToggle?: (id: string) => void
}

export default function ProductCard({
  id,
  title,
  typeName,
  priceCup,
  priceUsd,
  rating = 0,
  reviewCount = 0,
  imageUrl,
  tone = 'terracotta',
  isNew = false,
  isAvailable = true,
  liked = false,
  onLikeToggle,
}: ProductCardProps) {
  const { addItem } = useCart()
  const [localLiked, setLocalLiked] = useState(liked)

  function handleLike(e: React.MouseEvent) {
    e.preventDefault()
    setLocalLiked((prev) => !prev)
    onLikeToggle?.(id)
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    addItem({
      productId: id,
      title,
      priceCup,
      priceUsd,
      imageUrl: imageUrl ?? undefined,
      tone,
    })
  }

  return (
    <Link href={`/catalogo/${id}`} className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <ProductImage
          tone={tone}
          src={imageUrl}
          alt={title}
          style={{ width: '100%', height: '100%' }}
        />
        {isNew && <span className={styles.newBadge}>Nuevo</span>}
        {!isAvailable && <span className={styles.unavailableBadge}>Agotado</span>}
        <button
          className={`${styles.likeBtn} ${localLiked ? styles.liked : ''}`}
          onClick={handleLike}
          aria-label={localLiked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <HeartIcon size={15} filled={localLiked} color={localLiked ? 'var(--va-terracotta)' : 'var(--va-coffee)'} />
        </button>
      </div>

      {/* Info */}
      <div className={styles.info}>
        {typeName && <div className={styles.type}>{typeName}</div>}
        <div className={styles.title}>{title}</div>
        {reviewCount > 0 && (
          <div className={styles.rating}>
            <StarIcon size={12} color="var(--va-mustard)" filled />
            <span>{Number(rating).toFixed(1)}</span>
            <span>·</span>
            <span>{reviewCount} reseñas</span>
          </div>
        )}
        <div className={styles.bottom}>
          <div className={styles.price}>
            <span className={styles.priceCup}>{Number(priceCup).toLocaleString('es-CU')} CUP</span>
            {priceUsd && (
              <span className={styles.priceUsd}>· ${Number(priceUsd).toFixed(2)}</span>
            )}
          </div>
          {isAvailable && (
            <button
              className={styles.addBtn}
              onClick={handleAddToCart}
              aria-label="Añadir al carrito"
            >
              <PlusIcon size={16} color="var(--va-cream)" />
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
