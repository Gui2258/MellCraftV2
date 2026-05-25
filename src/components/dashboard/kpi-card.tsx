import styles from './kpi-card.module.css'

interface KpiCardProps {
  label: string
  value: string | number
  sub?: string
  icon?: React.ReactNode
  accent?: boolean
}

export default function KpiCard({ label, value, sub, icon, accent = false }: KpiCardProps) {
  return (
    <div className={`${styles.card} ${accent ? styles.accent : ''}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.body}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
        {sub && <div className={styles.sub}>{sub}</div>}
      </div>
    </div>
  )
}
