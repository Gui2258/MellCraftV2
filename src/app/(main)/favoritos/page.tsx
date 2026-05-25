'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import ProductCard from '@/components/products/product-card'
import { HeartIcon } from '@/components/ui/icons'
import styles from './favoritos.module.css'

interface Product {
  id: string
  title: string
  typeName: string | null
  priceCup: string
  priceUsd: string | null
  rating: string
  reviewCount: number
  isAvailable: boolean
  isNew: boolean
  firstImage: string | null
  liked: boolean
}

export default function FavoritosPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLiked = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products?liked=1&limit=50')
      const json = await res.json()
      setProducts(json.data ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    fetchLiked()
  }, [isLoaded, isSignedIn, router, fetchLiked])

  async function handleLikeToggle(productId: string) {
    await fetch(`/api/products/${productId}/like`, { method: 'POST' })
    setProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  if (!isLoaded || loading) {
    return (
      <div className={styles.root}>
        <div className={styles.skeleton} />
      </div>
    )
  }

  return (
    <section className={styles.root}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Tus <em>favoritos</em></h1>
        <p className={styles.subtitle}>{products.length} pieza{products.length !== 1 ? 's' : ''} guardada{products.length !== 1 ? 's' : ''}</p>
      </div>

      {products.length === 0 ? (
        <div className={styles.empty}>
          <HeartIcon size={48} color="rgba(42,31,24,0.2)" />
          <h2>Aún no tienes favoritos</h2>
          <p>Explora el catálogo y guarda las piezas que más te gusten.</p>
          <a href="/catalogo" className={styles.btnPrimary}>Ver productos</a>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              typeName={p.typeName ?? undefined}
              priceCup={parseFloat(p.priceCup)}
              priceUsd={p.priceUsd ? parseFloat(p.priceUsd) : undefined}
              rating={parseFloat(p.rating)}
              reviewCount={p.reviewCount}
              imageUrl={p.firstImage}
              isNew={p.isNew}
              isAvailable={p.isAvailable}
              liked
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>
      )}
    </section>
  )
}
