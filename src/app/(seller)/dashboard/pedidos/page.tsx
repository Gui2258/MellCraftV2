'use client'

import { useEffect, useState } from 'react'
import styles from './pedidos.module.css'

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'

interface Order {
  id: string
  customerName: string
  customerPhone: string | null
  deliveryType: string
  deliveryAddress: string | null
  totalCup: string
  status: OrderStatus
  notes: string | null
  whatsappUrl: string | null
  createdAt: string
}

const STATUSES: OrderStatus[] = ['pending', 'confirmed', 'shipped', 'completed', 'cancelled']
const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  shipped: 'Enviado',
  completed: 'Completado',
  cancelled: 'Cancelado',
}
const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: '#EBC683',
  confirmed: '#8FA67B',
  shipped: '#C8553D',
  completed: '#4CAF50',
  cancelled: 'rgba(42,31,24,0.35)',
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<OrderStatus | ''>('')
  const [updating, setUpdating] = useState<string | null>(null)

  const load = (status: OrderStatus | '') => {
    setLoading(true)
    const qs = status ? `?status=${status}` : ''
    fetch(`/api/orders${qs}`)
      .then((r) => r.json())
      .then((j) => setOrders(j.data ?? []))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(filter) }, [filter])

  async function updateStatus(orderId: string, status: OrderStatus) {
    setUpdating(orderId)
    await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
    setUpdating(null)
  }

  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Pedidos</h1>
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === '' ? styles.filterActive : ''}`}
            onClick={() => setFilter('')}
          >
            Todos
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`}
              onClick={() => setFilter(s)}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={styles.skeleton} />
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Teléfono</th>
                <th>Entrega</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.idCell}>#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className={styles.nameCell}>
                    <div>{order.customerName}</div>
                    {order.deliveryAddress && (
                      <div className={styles.address}>{order.deliveryAddress}</div>
                    )}
                  </td>
                  <td className={styles.muted}>{order.customerPhone ?? '—'}</td>
                  <td>{order.deliveryType === 'delivery' ? 'Domicilio' : 'Recogida'}</td>
                  <td className={styles.totalCell}>{parseFloat(order.totalCup).toLocaleString('es-CU')} CUP</td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                      style={{
                        background: STATUS_COLORS[order.status] + '22',
                        color: STATUS_COLORS[order.status],
                      }}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.dateCell}>
                    {new Date(order.createdAt).toLocaleDateString('es-CU', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </td>
                  <td>
                    {order.whatsappUrl && (
                      <a
                        href={order.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.waLink}
                      >
                        WA
                      </a>
                    )}
                    {order.notes && (
                      <span className={styles.noteIcon} title={order.notes}>📝</span>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className={styles.emptyRow}>No hay pedidos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
