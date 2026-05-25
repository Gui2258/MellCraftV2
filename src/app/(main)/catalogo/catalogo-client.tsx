'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import ProductCard from '@/components/products/product-card'
import { FilterIcon, SearchIcon, ArrowIcon } from '@/components/ui/icons'
import styles from './catalogo.module.css'

interface ProductType {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  title: string
  typeName: string | null
  typeSlug: string | null
  priceCup: string
  priceUsd: string | null
  rating: string
  reviewCount: number
  firstImage: string | null
  liked: boolean
  isNew: boolean
  isAvailable: boolean
}

interface Props {
  types: ProductType[]
}

export default function CatalogoClient({ types }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const tipo = searchParams.get('tipo') ?? ''
  const q = searchParams.get('q') ?? ''
  const sort = searchParams.get('sort') ?? 'recientes'
  const disponible = searchParams.get('disponible') ?? ''

  const fetchProducts = useCallback(async (pg = 1) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (tipo) params.set('tipo', tipo)
    if (q) params.set('q', q)
    if (sort) params.set('sort', sort)
    if (disponible) params.set('disponible', disponible)
    params.set('page', String(pg))
    params.set('limit', '12')

    const res = await fetch(`/api/products?${params}`)
    const json = await res.json()
    if (pg === 1) {
      setProducts(json.data ?? [])
    } else {
      setProducts((prev) => [...prev, ...(json.data ?? [])])
    }
    setTotal(json.total ?? 0)
    setLoading(false)
  }, [tipo, q, sort, disponible])

  useEffect(() => {
    setPage(1)
    fetchProducts(1)
  }, [fetchProducts])

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params}`)
  }

  function loadMore() {
    const next = page + 1
    setPage(next)
    fetchProducts(next)
  }

  return (
    <div className={styles.root}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Filtros</h2>
          <button className={styles.closeFilters} onClick={() => setShowFilters(false)}>✕</button>
        </div>

        {/* Category */}
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Ocasión</div>
          <button
            className={`${styles.filterOption} ${!tipo ? styles.filterActive : ''}`}
            onClick={() => setParam('tipo', '')}
          >
            Todas
          </button>
          {types.map((t) => (
            <button
              key={t.slug}
              className={`${styles.filterOption} ${tipo === t.slug ? styles.filterActive : ''}`}
              onClick={() => setParam('tipo', t.slug)}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Availability */}
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Disponibilidad</div>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={disponible === '1'}
              onChange={(e) => setParam('disponible', e.target.checked ? '1' : '')}
            />
            Solo disponibles
          </label>
        </div>

        {/* Sort */}
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Ordenar por</div>
          {[
            { value: 'recientes', label: 'Más recientes' },
            { value: 'populares', label: 'Más populares' },
            { value: 'precio_asc', label: 'Precio: menor a mayor' },
            { value: 'precio_desc', label: 'Precio: mayor a menor' },
          ].map((opt) => (
            <button
              key={opt.value}
              className={`${styles.filterOption} ${sort === opt.value ? styles.filterActive : ''}`}
              onClick={() => setParam('sort', opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.searchWrap}>
            <SearchIcon size={16} color="rgba(61,44,31,.5)" />
            <input
              className={styles.searchInput}
              placeholder="Buscar manualidades…"
              defaultValue={q}
              onChange={(e) => setParam('q', e.target.value)}
            />
          </div>
          <button className={styles.filterToggle} onClick={() => setShowFilters(true)}>
            <FilterIcon size={15} />
            Filtros
          </button>
          <span className={styles.resultCount}>
            {loading ? '...' : `${total} producto${total !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* Active filter chips */}
        {(tipo || disponible) && (
          <div className={styles.chips}>
            {tipo && (
              <button className={styles.chip} onClick={() => setParam('tipo', '')}>
                {types.find((t) => t.slug === tipo)?.name ?? tipo} ✕
              </button>
            )}
            {disponible && (
              <button className={styles.chip} onClick={() => setParam('disponible', '')}>
                Solo disponibles ✕
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {loading && products.length === 0 ? (
          <div className={styles.loading}>Cargando productos…</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>
            <p>No encontramos productos con esos filtros.</p>
          </div>
        ) : (
          <>
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
                  liked={p.liked}
                />
              ))}
            </div>
            {products.length < total && (
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <button className={styles.loadMoreBtn} onClick={loadMore} disabled={loading}>
                  {loading ? 'Cargando…' : 'Cargar más'} <ArrowIcon size={14} dir="down" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
