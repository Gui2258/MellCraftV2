import Link from 'next/link'
import styles from './logo.module.css'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  dark?: boolean
}

export default function Logo({ size = 'md', dark = false }: LogoProps) {
  const fs = size === 'lg' ? 34 : size === 'sm' ? 18 : 24

  return (
    <Link href="/" className={styles.root} style={{ '--fs': `${fs}px` } as React.CSSProperties}>
      <div
        className={styles.badge}
        style={{ width: fs * 1.3, height: fs * 1.3, fontSize: fs * 0.7 }}
      >
        m
      </div>
      <div className={styles.text} style={{ color: dark ? 'var(--va-cream)' : 'var(--va-coffee)' }}>
        <div className={styles.name} style={{ fontSize: fs }}>
          Mell <em>Craft</em>
        </div>
        <div className={styles.tagline} style={{ fontSize: fs * 0.36 }}>
          hecho con cariño
        </div>
      </div>
    </Link>
  )
}
