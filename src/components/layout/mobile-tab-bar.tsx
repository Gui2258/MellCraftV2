'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, SearchIcon, HeartIcon, BagIcon, UserIcon } from '@/components/ui/icons'
import { useCart } from '@/components/cart/cart-context'
import styles from './mobile-tab-bar.module.css'

const TABS = [
  { id: 'home', href: '/', label: 'Inicio', Icon: HomeIcon },
  { id: 'catalog', href: '/catalogo', label: 'Tienda', Icon: SearchIcon },
  { id: 'favs', href: '/favoritos', label: 'Favoritos', Icon: HeartIcon },
  { id: 'cart', href: '/carrito', label: 'Carrito', Icon: BagIcon },
  { id: 'profile', href: '/perfil', label: 'Yo', Icon: UserIcon },
]

export default function MobileTabBar() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  return (
    <nav className={styles.root}>
      {TABS.map(({ id, href, label, Icon }) => {
        const active =
          id === 'home' ? pathname === '/' : pathname.startsWith(href)
        const isCart = id === 'cart'

        return (
          <Link
            key={id}
            href={href}
            className={`${styles.tab} ${active ? styles.active : ''}`}
          >
            <span className={styles.iconWrap}>
              <Icon size={20} />
              {isCart && totalItems > 0 && (
                <span className={styles.badge}>{totalItems > 9 ? '9+' : totalItems}</span>
              )}
            </span>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
