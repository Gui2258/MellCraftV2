'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart/cart-context'
import ProductImage from '@/components/ui/product-image'
import { TrashIcon, PlusIcon, MinusIcon, ArrowIcon, TruckIcon } from '@/components/ui/icons'
import styles from './carrito.module.css'

type DeliveryType = 'pickup' | 'delivery'

export default function CarritoPage() {
  const { items, totalCup, totalItems, updateQuantity, removeItem, clearCart } = useCart()
  const router = useRouter()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('pickup')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const shippingCup = deliveryType === 'delivery' ? 500 : 0
  const grandTotal = totalCup + shippingCup

  async function handleOrder() {
    if (!name.trim()) {
      alert('Por favor ingresa tu nombre.')
      return
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      alert('Por favor ingresa tu dirección de entrega.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          deliveryType,
          deliveryAddress: address || undefined,
          notes: notes || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            productTitle: i.title,
            variantLabel: i.variantLabel,
            quantity: i.quantity,
            priceCup: i.priceCup,
          })),
        }),
      })

      if (!res.ok) throw new Error('Error al crear pedido')
      const json = await res.json()
      clearCart()
      window.open(json.data.whatsappUrl, '_blank')
      router.push('/?pedido=enviado')
    } catch (err) {
      alert('Ocurrió un error. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (totalItems === 0) {
    return (
      <div className={styles.empty}>
        <h1>Tu carrito está vacío</h1>
        <p>Todavía no has añadido ningún producto.</p>
        <a href="/catalogo" className={styles.btnPrimary}>Ver productos</a>
      </div>
    )
  }

  return (
    <section className={styles.root}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Tu <em>carrito</em></h1>
        <p className={styles.subtitle}>{totalItems} pieza{totalItems !== 1 ? 's' : ''} listas para envolverse</p>
      </div>

      <div className={styles.grid}>
        {/* Items */}
        <div className={styles.items}>
          <div className={styles.tableHead}>
            <span />
            <span>Producto</span>
            <span>Cantidad</span>
            <span style={{ textAlign: 'right' }}>Total</span>
            <span />
          </div>

          {items.map((item) => (
            <div key={`${item.productId}-${item.variantId}`} className={styles.row}>
              <div className={styles.rowImage}>
                <ProductImage
                  tone={(item.tone as 'terracotta') ?? 'terracotta'}
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className={styles.rowInfo}>
                <div className={styles.rowTitle}>{item.title}</div>
                {item.variantLabel && (
                  <div className={styles.rowVariant}>{item.variantLabel}</div>
                )}
                <div className={styles.rowPrice}>
                  {item.priceCup.toLocaleString('es-CU')} CUP
                  {item.priceUsd && <span> · ${item.priceUsd.toFixed(2)}</span>}
                </div>
              </div>
              <div className={styles.qtyControl}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                >
                  <MinusIcon size={12} />
                </button>
                <span className={styles.qtyNum}>{item.quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                >
                  <PlusIcon size={12} />
                </button>
              </div>
              <div className={styles.rowTotal}>
                <div>{(item.priceCup * item.quantity).toLocaleString('es-CU')} CUP</div>
                {item.priceUsd && (
                  <div className={styles.rowTotalUsd}>
                    ${(item.priceUsd * item.quantity).toFixed(2)}
                  </div>
                )}
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeItem(item.productId, item.variantId)}
                aria-label="Eliminar"
              >
                <TrashIcon size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary + Form */}
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Datos del pedido</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tu nombre *</label>
            <input
              className={styles.input}
              placeholder="María García"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Teléfono (opcional)</label>
            <input
              className={styles.input}
              placeholder="+53 5XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de entrega</label>
            <div className={styles.deliveryOptions}>
              {([['pickup', 'Recogida en tienda'], ['delivery', 'Entrega a domicilio (+500 CUP)']] as [DeliveryType, string][]).map(
                ([val, lbl]) => (
                  <label key={val} className={`${styles.deliveryOpt} ${deliveryType === val ? styles.deliveryActive : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      value={val}
                      checked={deliveryType === val}
                      onChange={() => setDeliveryType(val)}
                    />
                    <TruckIcon size={14} />
                    {lbl}
                  </label>
                ),
              )}
            </div>
          </div>

          {deliveryType === 'delivery' && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Dirección *</label>
              <input
                className={styles.input}
                placeholder="Calle, número, municipio…"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Nota (opcional)</label>
            <textarea
              className={styles.textarea}
              placeholder="Algún detalle especial…"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Totals */}
          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>{totalCup.toLocaleString('es-CU')} CUP</span>
            </div>
            {deliveryType === 'delivery' && (
              <div className={styles.totalRow}>
                <span>Envío</span>
                <span>500 CUP</span>
              </div>
            )}
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total</span>
              <span>{grandTotal.toLocaleString('es-CU')} CUP</span>
            </div>
          </div>

          <button
            className={styles.orderBtn}
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? 'Procesando…' : 'Enviar pedido por WhatsApp'}
            <ArrowIcon size={14} />
          </button>

          <p className={styles.waNote}>
            Se abrirá WhatsApp con tu pedido listo para enviar. Confirmaremos disponibilidad y pago por chat.
          </p>
        </aside>
      </div>
    </section>
  )
}
