'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth, UserButton } from '@clerk/nextjs'
import { SearchIcon, HeartIcon, BagIcon, UserIcon } from '@/components/ui/icons'
import Logo from './logo'
import { useCart } from '@/components/cart/cart-context'
import styles from './header.module.css'

const NAV_LINKS = [
  { href: '/catalogo', label: 'Tienda' },
  { href: '/catalogo?tipo=san-valentin', label: 'San Valentín' },
  { href: '/catalogo?tipo=dia-madres', label: 'Día de las Madres' },
  { href: '/catalogo?tipo=peluches', label: 'Peluches & Chuches' },
]

export default function Header() {
  const router = useRouter()
  const { isSignedIn, sessionClaims } = useAuth()
  const { totalItems } = useCart()
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role
  const isDashboardUser = role === 'seller' || role === 'admin'

  return (
    <header className={styles.root}>
      {/* Top strip */}
      <div className={styles.topStrip}>
        <span>Envío gratis en pedidos &gt; 5 000 CUP · La Habana y Holguín</span>
        <span className={styles.topRight}>
          <span>+53 58091060</span>
          <span>·</span>
          <span>Lun–Sáb 9:00–18:00</span>
        </span>
      </div>

      {/* Main nav */}
      <div className={styles.main}>
        <Logo />

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.navLink}>
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.spacer} />

        <div className={styles.actions}>
          {/* Search */}
          <button className={styles.searchBar} onClick={() => router.push('/catalogo')}>
            <SearchIcon size={15} color="var(--va-coffee)" />
            <span className={styles.searchPlaceholder}>Buscar manualidades…</span>
          </button>

          {/* Dashboard link for seller/admin */}
          {isDashboardUser && (
            <Link href="/dashboard" className={styles.dashboardLink}>
              Panel
            </Link>
          )}

          {/* User */}
          {isSignedIn ? (
            <div className={styles.clerkUser}>
              <UserButton />
            </div>
          ) : (
            <Link href="/sign-in" className={styles.iconBtn} aria-label="Iniciar sesión">
              <UserIcon size={16} />
            </Link>
          )}

          {/* Likes */}
          <Link href="/favoritos" className={styles.iconBtn} aria-label="Favoritos">
            <HeartIcon size={16} />
          </Link>

          {/* Cart */}
          <Link href="/carrito" className={styles.iconBtn} aria-label="Carrito">
            <BagIcon size={16} />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems > 9 ? '9+' : totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
