'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import KpiCard from '@/components/dashboard/kpi-card'
import styles from './dashboard.module.css'

interface Kpis {
  totalProducts: number
  availableProducts: number
  totalOrders: number
  monthOrders: number
  totalRevenue: number
  monthRevenue: number
  totalLikes: number
  totalUsers: number
}

interface Order {
  id: string
  customerName: string
  deliveryType: string
  totalCup: string
  status: string
  createdAt: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#EBC683',
  confirmed: '#8FA67B',
  shipped: '#C8553D',
  completed: '#4CAF50',
  cancelled: 'rgba(42,31,24,0.35)',
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  shipped: 'Enviado',
  completed: 'Completado',
  cancelled: 'Cancelado',
}

export default function DashboardPage() {
  const [kpis, setKpis] = useState<Kpis | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard/kpis').then((r) => r.json()),
      fetch('/api/orders?limit=8').then((r) => r.json()),
    ]).then(([kpiJson, ordersJson]) => {
      setKpis(kpiJson.data)
      setRecentOrders(ordersJson.data ?? [])
    })
  }, [])

  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Resumen</h1>
        <Link href="/dashboard/productos/nuevo" className={styles.newBtn}>
          + Nuevo producto
        </Link>
      </div>

      {kpis && (
        <div className={styles.kpiGrid}>
          <KpiCard
            label="Ingresos este mes"
            value={`${kpis.monthRevenue.toLocaleString('es-CU')} CUP`}
            sub={`Total: ${kpis.totalRevenue.toLocaleString('es-CU')} CUP`}
            accent
          />
          <KpiCard
            label="Pedidos este mes"
            value={kpis.monthOrders}
            sub={`Total: ${kpis.totalOrders}`}
          />
          <KpiCard
            label="Productos activos"
            value={kpis.availableProducts}
            sub={`De ${kpis.totalProducts} en total`}
          />
          <KpiCard
            label="Favoritos"
            value={kpis.totalLikes}
            sub={`${kpis.totalUsers} usuarios registrados`}
          />
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Pedidos recientes</h2>
          <Link href="/dashboard/pedidos" className={styles.seeAll}>Ver todos →</Link>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Entrega</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.idCell}>#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td>{order.customerName}</td>
                  <td>{order.deliveryType === 'delivery' ? 'Domicilio' : 'Recogida'}</td>
                  <td>{parseFloat(order.totalCup).toLocaleString('es-CU')} CUP</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{
                        background: (STATUS_COLORS[order.status] ?? '#ccc') + '22',
                        color: STATUS_COLORS[order.status] ?? '#888',
                      }}
                    >
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    {new Date(order.createdAt).toLocaleDateString('es-CU', {
                      day: 'numeric', month: 'short',
                    })}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.emptyRow}>Sin pedidos aún</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
