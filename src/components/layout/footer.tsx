import Link from 'next/link'
import Logo from './logo'
import styles from './footer.module.css'

const LINKS = [
  {
    title: 'Tienda',
    items: [
      { label: 'San Valentín', href: '/catalogo?tipo=san-valentin' },
      { label: 'Día de las Madres', href: '/catalogo?tipo=dia-madres' },
      { label: 'Peluches & Chuches', href: '/catalogo?tipo=peluches' },
      { label: 'Todos los productos', href: '/catalogo' },
    ],
  },
  {
    title: 'Ayuda',
    items: [
      { label: 'Cómo encargar', href: '/#como-encargar' },
      { label: 'Preguntas frecuentes', href: '/#faq' },
      { label: 'Contáctanos', href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')}` },
    ],
  },
  {
    title: 'Cuenta',
    items: [
      { label: 'Mi perfil', href: '/perfil' },
      { label: 'Favoritos', href: '/favoritos' },
      { label: 'Política de privacidad', href: '/privacidad' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.grid}>
        {/* Brand */}
        <div className={styles.brand}>
          <Logo dark />
          <p className={styles.about}>
            Pequeño taller artesanal en La Habana. Cada pieza es hecha a mano
            con materiales sostenibles y mucho cariño.
          </p>
          <div className={styles.socials}>
            {['IG', 'FB', 'WA', 'TT'].map((s) => (
              <div key={s} className={styles.socialBtn}>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        {LINKS.map(({ title, items }) => (
          <div key={title} className={styles.col}>
            <div className={styles.colTitle}>{title}</div>
            {items.map(({ label, href }) => (
              <Link key={label} href={href} className={styles.colLink}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Mell Craft. Hecho a mano en Cuba.</span>
        <span>Aceptamos: Efectivo · Transferencia · Zelle</span>
      </div>
    </footer>
  )
}
