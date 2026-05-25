'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/components/ui/image-uploader'
import styles from './product-form.module.css'

interface ProductType {
  id: string
  name: string
  slug: string
}

interface Variant {
  id?: string
  color: string
  colorHex: string
  size: string
  stock: number
  sku: string
}

interface ProductImage {
  id: string
  url: string
  position: number
}

interface ProductFormProps {
  productId?: string
  initialData?: {
    title: string
    description: string
    content: string
    typeId: string
    priceCup: string
    priceUsd: string
    isAvailable: boolean
    isNew: boolean
    images: ProductImage[]
    variants: Variant[]
  }
}

const emptyVariant = (): Variant => ({ color: '', colorHex: '', size: '', stock: 0, sku: '' })

export default function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!productId

  const [types, setTypes] = useState<ProductType[]>([])
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [content, setContent] = useState(initialData?.content ?? '')
  const [typeId, setTypeId] = useState(initialData?.typeId ?? '')
  const [priceCup, setPriceCup] = useState(initialData?.priceCup ?? '')
  const [priceUsd, setPriceUsd] = useState(initialData?.priceUsd ?? '')
  const [isAvailable, setIsAvailable] = useState(initialData?.isAvailable ?? true)
  const [isNew, setIsNew] = useState(initialData?.isNew ?? false)
  const [images, setImages] = useState<ProductImage[]>(initialData?.images ?? [])
  const [variants, setVariants] = useState<Variant[]>(initialData?.variants ?? [])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/product-types').then((r) => r.json()).then((j) => setTypes(j.data ?? []))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const body = {
        title, description, content: content || undefined,
        typeId: typeId || undefined,
        priceCup: parseFloat(priceCup),
        priceUsd: priceUsd ? parseFloat(priceUsd) : undefined,
        isAvailable, isNew,
      }

      let pid = productId
      if (isEdit) {
        const res = await fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Error al guardar')
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Error al crear')
        const json = await res.json()
        pid = json.data.id
      }

      // Save variants that have been added (new ones without id)
      if (pid) {
        for (const v of variants) {
          if (!v.id) {
            await fetch(`/api/products/${pid}/variants`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                color: v.color || undefined,
                colorHex: v.colorHex || undefined,
                size: v.size || undefined,
                stock: v.stock,
                sku: v.sku || undefined,
              }),
            })
          }
        }
      }

      router.push('/dashboard/productos')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setSaving(false)
    }
  }

  async function addImage() {
    if (!newImageUrl.trim() || !productId) return
    const res = await fetch(`/api/products/${productId}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newImageUrl.trim(), position: images.length }),
    })
    if (res.ok) {
      const json = await res.json()
      setImages((prev) => [...prev, json.data])
      setNewImageUrl('')
    }
  }

  async function removeImage(imageId: string) {
    if (!productId) return
    await fetch(`/api/products/${productId}/images`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageId }),
    })
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  async function removeVariant(variantId: string, index: number) {
    if (variantId && productId) {
      await fetch(`/api/products/${productId}/variants`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId }),
      })
    }
    setVariants((prev) => prev.filter((_, i) => i !== index))
  }

  function updateVariant(index: number, field: keyof Variant, value: string | number) {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Información básica</h3>

            <div className={styles.field}>
              <label className={styles.label}>Título *</label>
              <input
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre del producto"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Descripción corta *</label>
              <textarea
                className={styles.textarea}
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción breve visible en la tarjeta del producto"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Contenido detallado</label>
              <textarea
                className={styles.textarea}
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Descripción larga, materiales, instrucciones de cuidado…"
              />
            </div>
          </div>

          {/* Variants */}
          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionTitle}>Variantes</h3>
              <button type="button" className={styles.addBtn} onClick={() => setVariants((p) => [...p, emptyVariant()])}>
                + Añadir variante
              </button>
            </div>

            {variants.length === 0 && (
              <p className={styles.emptyNote}>Sin variantes — el producto tiene un solo stock.</p>
            )}

            {variants.map((v, i) => (
              <div key={i} className={styles.variantRow}>
                <input className={styles.input} placeholder="Color" value={v.color} onChange={(e) => updateVariant(i, 'color', e.target.value)} />
                <input className={styles.inputSm} type="color" title="Color hex" value={v.colorHex || '#ffffff'} onChange={(e) => updateVariant(i, 'colorHex', e.target.value)} />
                <input className={styles.input} placeholder="Talla" value={v.size} onChange={(e) => updateVariant(i, 'size', e.target.value)} />
                <input className={styles.inputSm} type="number" min={0} placeholder="Stock" value={v.stock} onChange={(e) => updateVariant(i, 'stock', parseInt(e.target.value) || 0)} />
                <input className={styles.input} placeholder="SKU" value={v.sku} onChange={(e) => updateVariant(i, 'sku', e.target.value)} />
                <button type="button" className={styles.removeBtn} onClick={() => removeVariant(v.id ?? '', i)}>✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Precio y tipo</h3>

            <div className={styles.field}>
              <label className={styles.label}>Tipo de producto</label>
              <select className={styles.select} value={typeId} onChange={(e) => setTypeId(e.target.value)}>
                <option value="">Sin tipo</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Precio CUP *</label>
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  step="0.01"
                  value={priceCup}
                  onChange={(e) => setPriceCup(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Precio USD</label>
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  step="0.01"
                  value={priceUsd}
                  onChange={(e) => setPriceUsd(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className={styles.checks}>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                Disponible para venta
              </label>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
                Marcar como Nuevo
              </label>
            </div>
          </div>

          {/* Images (only available when editing) */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Imágenes</h3>
            {!isEdit && (
              <p className={styles.emptyNote}>Guarda el producto primero para añadir imágenes.</p>
            )}
            {isEdit && (
              <>
                <div className={styles.imageGrid}>
                  {images.map((img) => (
                    <div key={img.id} className={styles.imageTile}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="" className={styles.imgPreview} />
                      <button type="button" className={styles.imgRemove} onClick={() => removeImage(img.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className={styles.imageAdd}>
                  <ImageUploader
                    onUpload={async (url) => {
                      const res = await fetch(`/api/products/${productId}/images`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url, position: images.length }),
                      })
                      if (res.ok) {
                        const json = await res.json()
                        setImages((prev) => [...prev, json.data])
                      }
                    }}
                  />
                  <span className={styles.orSep}>o</span>
                  <input
                    className={styles.input}
                    placeholder="Pega una URL directamente"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button type="button" className={styles.addBtn} onClick={addImage}>Añadir</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>Cancelar</button>
        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  )
}
