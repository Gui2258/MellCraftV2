import Link from 'next/link'
import ProductCard from '@/components/products/product-card'
import ProductImage from '@/components/ui/product-image'
import { ArrowIcon } from '@/components/ui/icons'
import { db } from '@/lib/db'
import { products, productTypes, productImages } from '@/lib/db/schema'
import { eq, desc, asc, inArray } from 'drizzle-orm'
import styles from './page.module.css'

// Featured products come from the DB — render on request so they stay fresh
// and the build never depends on DB connectivity.
export const dynamic = 'force-dynamic'

interface ProductRow {
  id: string
  title: string
  typeName: string | null
  typeSlug: string | null
  priceCup: string
  priceUsd: string | null
  rating: string
  reviewCount: number
  firstImage: string | null
  liked: boolean
  isNew: boolean
  isAvailable: boolean
}

async function getFeaturedProducts(): Promise<ProductRow[]> {
  try {
    const rows = await db
      .select({
        id: products.id,
        title: products.title,
        typeName: productTypes.name,
        typeSlug: productTypes.slug,
        priceCup: products.priceCup,
        priceUsd: products.priceUsd,
        rating: products.rating,
        reviewCount: products.reviewCount,
        isNew: products.isNew,
        isAvailable: products.isAvailable,
      })
      .from(products)
      .leftJoin(productTypes, eq(products.typeId, productTypes.id))
      .where(eq(products.isArchived, false))
      .orderBy(desc(products.likesCount))
      .limit(4)

    const ids = rows.map((r) => r.id)
    const images = ids.length
      ? await db
          .select()
          .from(productImages)
          .where(inArray(productImages.productId, ids))
          .orderBy(asc(productImages.position))
      : []

    const firstByProduct: Record<string, string> = {}
    for (const img of images) {
      if (!firstByProduct[img.productId]) firstByProduct[img.productId] = img.url
    }

    return rows.map((r) => ({ ...r, firstImage: firstByProduct[r.id] ?? null, liked: false }))
  } catch {
    return []
  }
}

const CATEGORIES = [
  { name: 'San Valentín', slug: 'san-valentin', tone: 'terracotta' as const, count: 12, image: '/rosa-eterna.jpg' },
  { name: 'Día de las Madres', slug: 'dia-madres', tone: 'mustard' as const, count: 8, image: '/regalos.jpg' },
  { name: 'Peluches & Chuches', slug: 'peluches', tone: 'sage' as const, count: 19, image: '/ramo-chuches.jpg' },
  { name: 'Cartulina & Papel', slug: 'cartulina-papel', tone: 'rose' as const, count: 24, image: '/regalos.jpg' },
]

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid}>
          {/* Copy */}
          <div className={styles.heroCopy}>
            <div className={styles.heroLabel}>
              <span className={styles.script}>Colección Febrero 2026</span>
            </div>
            <h1 className={styles.heroTitle}>
              Regalos hechos <br />
              <em>a mano,</em> para <br />
              quien tú quieres.
            </h1>
            <p className={styles.heroDesc}>
              Ramos de chuches, peluches tejidos, tarjetas pop-up y bouquets eternos.
              Diseños únicos para San Valentín y el Día de las Madres.
            </p>
            <div className={styles.heroCTA}>
              <Link href="/catalogo?tipo=san-valentin" className={styles.btnPrimary}>
                Ver colección San Valentín <ArrowIcon size={14} />
              </Link>
              <Link href="/catalogo" className={styles.btnGhost}>
                Cómo encargamos
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNum}>+500</div>
                <div className={styles.statLabel}>Pedidos felices</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <div className={styles.statNum}>4.9★</div>
                <div className={styles.statLabel}>Valoración media</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <div className={styles.statNum}>48h</div>
                <div className={styles.statLabel}>Entrega típica</div>
              </div>
            </div>
          </div>

          {/* Collage */}
          <div className={styles.heroCollage}>
            <div className={styles.collageMain}>
              <ProductImage tone="terracotta" src="/ramo-chuches.jpg" alt="Ramo de chuches" label="Ramo de Chuches" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className={styles.collageSecond}>
              <ProductImage tone="rose" src="/rosa-eterna.jpg" alt="Bouquet eterno" label="Bouquet Eterno" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className={styles.collageThird}>
              <ProductImage tone="mustard" src="/regalos.jpg" alt="Tarjeta y regalo para mamá" label="Tarjeta Mamá" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className={styles.collageTag}>¡Pieza única!</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className={styles.sectionHeader}>
          <span className={styles.script}>Encuentra tu regalo</span>
          <h2 className={styles.sectionTitle}>Navega por <em>ocasión</em></h2>
        </div>
        <div className={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/catalogo?tipo=${cat.slug}`} className={styles.categoryCard}>
              <ProductImage tone={cat.tone} src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%' }}>
                <div className={styles.categoryOverlay}>
                  <div className={styles.categoryName}>{cat.name}</div>
                  <div className={styles.categoryCount}>{cat.count} piezas</div>
                </div>
              </ProductImage>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <div>
            <span className={styles.script}>Lo más querido</span>
            <h2 className={styles.sectionTitle}>Nuestros <em>favoritos</em> del mes</h2>
          </div>
          <div className={styles.filterTabs}>
            {['Todo', 'San Valentín', 'Madres', 'Peluches'].map((t, i) => (
              <Link
                key={t}
                href={i === 0 ? '/catalogo' : `/catalogo?tipo=${['', 'san-valentin', 'dia-madres', 'peluches'][i]}`}
                className={i === 0 ? styles.tabActive : styles.tab}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.productGrid}>
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              typeName={p.typeName ?? undefined}
              priceCup={parseFloat(p.priceCup)}
              priceUsd={p.priceUsd ? parseFloat(p.priceUsd) : undefined}
              rating={parseFloat(p.rating)}
              reviewCount={p.reviewCount}
              imageUrl={p.firstImage}
              isNew={p.isNew}
              isAvailable={p.isAvailable}
              liked={p.liked}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/catalogo" className={styles.btnGhost}>
            Ver todos los productos <ArrowIcon size={14} />
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className={styles.story}>
        <div className={styles.storyImage}>
          <ProductImage tone="coffee" src="/rosa-eterna.jpg" alt="Detalle hecho a mano en el taller" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className={styles.storyText}>
          <span className={styles.script}>Pequeño taller</span>
          <h2 className={styles.storyTitle}>
            Hechos en casa, <br />
            <em>con tiempo y cariño.</em>
          </h2>
          <p className={styles.storyDesc}>
            Soy Melissa y desde 2019 hago manualidades en mi taller en La Habana.
            Cada ramo, peluche y tarjeta es preparado a pedido, con materiales que
            cuido yo misma. Si tienes una idea especial, conversemos por WhatsApp.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            Conversar por WhatsApp
          </a>
        </div>
      </section>

      {/* Instagram strip */}
      <section className={styles.instagram}>
        <span className={styles.script}>Nos siguen en</span>
        <h2 className={styles.igHandle}>@mellcraft.cu</h2>
        <div className={styles.igGrid}>
          {([
            { tone: 'terracotta', src: '/ramo-chuches.jpg' },
            { tone: 'rose', src: '/rosa-eterna.jpg' },
            { tone: 'mustard', src: '/regalos.jpg' },
            { tone: 'sage', src: '/ramo-chuches.jpg' },
            { tone: 'blush', src: '/rosa-eterna.jpg' },
            { tone: 'paper', src: '/regalos.jpg' },
          ] as const).map((cell, i) => (
            <div key={i} className={styles.igCell}>
              <ProductImage tone={cell.tone} src={cell.src} alt={`Mell Craft en Instagram ${i + 1}`} style={{ width: '100%', height: '100%' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <h2 className={styles.newsletterTitle}>Únete a la lista de <em>cariños</em></h2>
        <p className={styles.newsletterDesc}>
          Avisos de nuevas colecciones, descuentos y abrazos de papel directo a tu correo.
        </p>
        <div className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="tu correo aquí…"
            className={styles.newsletterInput}
          />
          <button className={styles.newsletterBtn}>Suscribirme</button>
        </div>
      </section>
    </div>
  )
}
