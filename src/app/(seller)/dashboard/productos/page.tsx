'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductImage from '@/components/ui/product-image'
import styles from './productos.module.css'

interface Product {
  id: string
  title: string
  priceCup: string
  isAvailable: boolean
  isNew: boolean
  likesCount: number
  typeName: string | null
  firstImage: string | null
}

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    fetch('/api/products?limit=100')
      .then((r) => r.json())
      .then((j) => setProducts(j.data ?? []))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleToggle(id: string, isAvailable: boolean) {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable: !isAvailable }),
    })
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isAvailable: !isAvailable } : p)))
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Archivar este producto? Dejará de aparecer en la tienda.')) return
    setDeleting(id)
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeleting(null)
  }

  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Productos <span className={styles.count}>{products.length}</span></h1>
        <Link href="/dashboard/productos/nuevo" className={styles.newBtn}>+ Nuevo producto</Link>
      </div>

      {loading ? (
        <div className={styles.skeleton} />
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 56 }} />
                <th>Producto</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Likes</th>
                <th>Estado</th>
                <th style={{ width: 100 }} />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.thumb}>
                      <ProductImage src={p.firstImage} tone="terracotta" alt={p.title} style={{ width: '100%', height: '100%' }} />
                    </div>
                  </td>
                  <td>
                    <div className={styles.productName}>{p.title}</div>
                    {p.isNew && <span className={styles.newTag}>Nuevo</span>}
                  </td>
                  <td className={styles.muted}>{p.typeName ?? '—'}</td>
                  <td>{parseFloat(p.priceCup).toLocaleString('es-CU')} CUP</td>
                  <td className={styles.muted}>♥ {p.likesCount}</td>
                  <td>
                    <button
                      className={`${styles.toggleBtn} ${p.isAvailable ? styles.available : styles.unavailable}`}
                      onClick={() => handleToggle(p.id, p.isAvailable)}
                    >
                      {p.isAvailable ? 'Disponible' : 'Agotado'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <Link href={`/dashboard/productos/${p.id}`} className={styles.editLink}>Editar</Link>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(p.id)}
                        disabled={deleting === p.id}
                      >
                        Archivar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyRow}>No hay productos aún</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
