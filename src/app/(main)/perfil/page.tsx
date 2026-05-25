'use client'

import { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import styles from './perfil.module.css'

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'

interface OrderItem {
  id: string
  productTitle: string
  variantLabel: string | null
  quantity: number
  priceCup: string
}

interface Order {
  id: string
  customerName: string
  deliveryType: 'pickup' | 'delivery'
  deliveryAddress: string | null
  totalCup: string
  status: OrderStatus
  notes: string | null
  whatsappUrl: string | null
  createdAt: string
  items: OrderItem[]
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  shipped: 'Enviado',
  completed: 'Completado',
  cancelled: 'Cancelado',
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'var(--va-mustard)',
  confirmed: 'var(--va-sage)',
  shipped: 'var(--va-terracotta)',
  completed: '#4CAF50',
  cancelled: 'rgba(42,31,24,0.35)',
}

export default function PerfilPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    fetch('/api/me/orders')
      .then((r) => r.json())
      .then((json) => setOrders(json.data ?? []))
      .finally(() => setLoading(false))
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || loading) {
    return (
      <div className={styles.root}>
        <div className={styles.skeleton} />
      </div>
    )
  }

  return (
    <section className={styles.root}>
      {/* Header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrap}>
          <UserButton />
        </div>
        <div>
          <h1 className={styles.name}>{user?.firstName} {user?.lastName}</h1>
          <p className={styles.email}>{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>

      {/* Orders */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Historial de pedidos</h2>

        {orders.length === 0 ? (
          <div className={styles.empty}>
            <p>Aún no tienes pedidos.</p>
            <a href="/catalogo" className={styles.btnPrimary}>Explorar productos</a>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div
                  className={styles.orderHead}
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                >
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>#{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('es-CU', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className={styles.orderRight}>
                    <span
                      className={styles.statusBadge}
                      style={{ background: STATUS_COLORS[order.status] + '22', color: STATUS_COLORS[order.status] }}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                    <span className={styles.orderTotal}>{parseFloat(order.totalCup).toLocaleString('es-CU')} CUP</span>
                    <span className={`${styles.chevron} ${expanded === order.id ? styles.chevronOpen : ''}`}>▾</span>
                  </div>
                </div>

                {expanded === order.id && (
                  <div className={styles.orderBody}>
                    <div className={styles.orderInfo}>
                      <span>
                        {order.deliveryType === 'delivery'
                          ? `Entrega: ${order.deliveryAddress}`
                          : 'Recogida en tienda'}
                      </span>
                      {order.notes && <span>Nota: {order.notes}</span>}
                    </div>
                    <div className={styles.itemList}>
                      {order.items.map((item) => (
                        <div key={item.id} className={styles.itemRow}>
                          <span className={styles.itemTitle}>
                            {item.productTitle}
                            {item.variantLabel && <em> · {item.variantLabel}</em>}
                          </span>
                          <span className={styles.itemQty}>×{item.quantity}</span>
                          <span className={styles.itemPrice}>
                            {(parseFloat(item.priceCup) * item.quantity).toLocaleString('es-CU')} CUP
                          </span>
                        </div>
                      ))}
                    </div>
                    {order.whatsappUrl && (
                      <a
                        href={order.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.waBtn}
                      >
                        Reenviar por WhatsApp
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
