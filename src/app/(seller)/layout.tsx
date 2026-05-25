import Link from 'next/link'
import styles from './seller.module.css'

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>M</span>
          <span className={styles.logoText}>Panel</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Resumen
          </Link>
          <Link href="/dashboard/productos" className={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            Productos
          </Link>
          <Link href="/dashboard/pedidos" className={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
            Pedidos
          </Link>
        </nav>
        <div className={styles.sidebarBottom}>
          <Link href="/" className={styles.backLink}>
            ← Volver a la tienda
          </Link>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  )
}
