import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client, { schema })

async function seed() {
  console.log('🌱 Seeding database...')

  // Product types
  const types = await db
    .insert(schema.productTypes)
    .values([
      { name: 'San Valentín', slug: 'san-valentin', emoji: '❤️' },
      { name: 'Día de las Madres', slug: 'dia-madres', emoji: '🌷' },
      { name: 'Cumpleaños', slug: 'cumpleanos', emoji: '🎂' },
      { name: 'Peluches', slug: 'peluches', emoji: '🧸' },
      { name: 'Cartulina & Papel', slug: 'cartulina-papel', emoji: '📄' },
    ])
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${types.length} product types created`)

  const typeMap = Object.fromEntries(types.map((t) => [t.slug, t.id]))

  // Products
  const products = await db
    .insert(schema.products)
    .values([
      {
        title: 'Ramo de Chuches "Te Amo"',
        description: 'Un ramo artesanal de chucherías arregladas con amor, perfecto para sorprender.',
        content: 'Elaborado a mano con las mejores chuches cubanas. Presentado en papel kraft decorado con cintas de satén.',
        typeId: typeMap['san-valentin'],
        priceCup: '2500',
        priceUsd: '8.50',
        isAvailable: true,
        isNew: true,
        rating: '4.9',
        reviewCount: 87,
        likesCount: 142,
      },
      {
        title: 'Muñeca de Tela Personalizada',
        description: 'Muñeca artesanal de tela con el nombre de tu ser querido bordado.',
        content: 'Confeccionada con tela de algodón suave, rellena con fibra antialérgica. Cada muñeca es única.',
        typeId: typeMap['peluches'],
        priceCup: '3500',
        priceUsd: '12.00',
        isAvailable: true,
        isNew: false,
        rating: '5.0',
        reviewCount: 43,
        likesCount: 98,
      },
      {
        title: 'Tarjeta Pop-Up "Feliz Cumpleaños"',
        description: 'Tarjeta tridimensional pop-up con diseño de tarta de cumpleaños.',
        content: 'Hecha a mano en cartulina de alta calidad. Incluye sobre decorado. Personalizable con nombre y mensaje.',
        typeId: typeMap['cumpleanos'],
        priceCup: '800',
        priceUsd: '2.75',
        isAvailable: true,
        isNew: false,
        rating: '4.7',
        reviewCount: 156,
        likesCount: 67,
      },
      {
        title: 'Caja de Regalo "Para Mamá"',
        description: 'Caja decorada a mano con flores secas y lazo de tela, ideal para el Día de las Madres.',
        content: 'Caja de madera pintada y decorada artesanalmente. Interior forrado en tela. Incluye tarjeta personalizada.',
        typeId: typeMap['dia-madres'],
        priceCup: '4200',
        priceUsd: '14.50',
        isAvailable: true,
        isNew: true,
        rating: '4.8',
        reviewCount: 29,
        likesCount: 211,
      },
      {
        title: 'Oso de Peluche con Corazón',
        description: 'Tierno oso de peluche que sostiene un corazón con tu mensaje especial.',
        content: 'Peluche suave de 30cm. El corazón de fieltro puede llevar un mensaje bordado. Lavable a mano.',
        typeId: typeMap['peluches'],
        priceCup: '2800',
        priceUsd: '9.50',
        isAvailable: true,
        isNew: false,
        rating: '4.9',
        reviewCount: 72,
        likesCount: 189,
      },
      {
        title: 'Álbum de Fotos Artesanal',
        description: 'Álbum de fotos hecho a mano con portada de tela y páginas decoradas.',
        content: 'Álbum de 20 páginas en kraft. Portada en tela bordada. Incluye stickers y elementos decorativos para personalizar.',
        typeId: typeMap['cartulina-papel'],
        priceCup: '3200',
        priceUsd: '11.00',
        isAvailable: true,
        isNew: false,
        rating: '4.6',
        reviewCount: 38,
        likesCount: 54,
      },
      {
        title: 'Bouquet de Flores de Papel',
        description: 'Ramo de flores elaboradas en papel de seda que duran para siempre.',
        content: 'Bouquet de 12 flores de papel de seda en colores a elegir. No se marchita. Empacado en papel kraft con cinta.',
        typeId: typeMap['san-valentin'],
        priceCup: '1800',
        priceUsd: '6.25',
        isAvailable: true,
        isNew: true,
        rating: '4.8',
        reviewCount: 91,
        likesCount: 176,
      },
      {
        title: 'Manualidad Sorpresa "Explosión de Amor"',
        description: 'Caja explosiva llena de fotos, mensajes y detalles especiales para quien más quieres.',
        content: 'Caja explosiva de 4 pisos con espacio para 20 fotos y múltiples mensajes. Decoración artesanal en tonos rosados.',
        typeId: typeMap['cumpleanos'],
        priceCup: '5500',
        priceUsd: '19.00',
        isAvailable: false,
        isNew: false,
        rating: '5.0',
        reviewCount: 15,
        likesCount: 304,
      },
    ])
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${products.length} products created`)

  // Variants for first product (Ramo de Chuches)
  if (products[0]) {
    await db
      .insert(schema.productVariants)
      .values([
        { productId: products[0].id, color: 'Rojo', colorHex: '#C8553D', stock: 5 },
        { productId: products[0].id, color: 'Rosa', colorHex: '#D88A7A', stock: 3 },
        { productId: products[0].id, color: 'Multicolor', colorHex: '#EBC683', stock: 7 },
      ])
      .onConflictDoNothing()
  }

  // Variants for Bouquet de Flores de Papel
  if (products[6]) {
    await db
      .insert(schema.productVariants)
      .values([
        { productId: products[6].id, color: 'Rojo', colorHex: '#C8553D', stock: 8 },
        { productId: products[6].id, color: 'Rosa', colorHex: '#F2D5C9', stock: 6 },
        { productId: products[6].id, color: 'Blanco', colorHex: '#FBF6EE', stock: 4 },
        { productId: products[6].id, color: 'Amarillo', colorHex: '#EBC683', stock: 10 },
      ])
      .onConflictDoNothing()
  }

  // Variants for Muñeca (sizes)
  if (products[1]) {
    await db
      .insert(schema.productVariants)
      .values([
        { productId: products[1].id, size: 'Pequeña (20cm)', stock: 4 },
        { productId: products[1].id, size: 'Mediana (30cm)', stock: 2 },
        { productId: products[1].id, size: 'Grande (40cm)', stock: 1 },
      ])
      .onConflictDoNothing()
  }

  console.log('✅ Variants created')
  console.log('🎉 Seed complete!')
  await client.end()
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
