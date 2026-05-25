import {
  boolean,
  decimal,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ---------------------------------------------------------------------------
// Users (synced from Clerk via webhook)
// ---------------------------------------------------------------------------
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').notNull(),
  name: text('name'),
  imageUrl: text('image_url'),
  role: text('role', { enum: ['user', 'seller', 'admin'] }).default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Product types / categories
// ---------------------------------------------------------------------------
export const productTypes = pgTable('product_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  emoji: text('emoji'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content'),
  typeId: uuid('type_id').references(() => productTypes.id, { onDelete: 'set null' }),
  priceCup: decimal('price_cup', { precision: 10, scale: 2 }).notNull(),
  priceUsd: decimal('price_usd', { precision: 10, scale: 2 }),
  isAvailable: boolean('is_available').default(true).notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  isNew: boolean('is_new').default(false).notNull(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0').notNull(),
  reviewCount: integer('review_count').default(0).notNull(),
  likesCount: integer('likes_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Product images
// ---------------------------------------------------------------------------
export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  url: text('url').notNull(),
  position: integer('position').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Product variants (color + size, each with its own stock)
// ---------------------------------------------------------------------------
export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  color: text('color'),
  colorHex: text('color_hex'),
  size: text('size'),
  stock: integer('stock').default(0).notNull(),
  sku: text('sku'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Likes (favorites)
// ---------------------------------------------------------------------------
export const likes = pgTable(
  'likes',
  {
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    productId: uuid('product_id')
      .references(() => products.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.productId] })],
)

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone'),
  deliveryType: text('delivery_type', { enum: ['pickup', 'delivery'] })
    .default('pickup')
    .notNull(),
  deliveryAddress: text('delivery_address'),
  whatsappUrl: text('whatsapp_url'),
  totalCup: decimal('total_cup', { precision: 10, scale: 2 }).notNull(),
  status: text('status', {
    enum: ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'],
  })
    .default('pending')
    .notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Order items (snapshot at time of purchase)
// ---------------------------------------------------------------------------
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id, { onDelete: 'cascade' })
    .notNull(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'set null' }),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'set null' }),
  productTitle: text('product_title').notNull(),
  variantLabel: text('variant_label'),
  quantity: integer('quantity').notNull(),
  priceCup: decimal('price_cup', { precision: 10, scale: 2 }).notNull(),
})

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------
export const usersRelations = relations(users, ({ many }) => ({
  likes: many(likes),
  orders: many(orders),
}))

export const productTypesRelations = relations(productTypes, ({ many }) => ({
  products: many(products),
}))

export const productsRelations = relations(products, ({ one, many }) => ({
  type: one(productTypes, { fields: [products.typeId], references: [productTypes.id] }),
  images: many(productImages),
  variants: many(productVariants),
  likes: many(likes),
  orderItems: many(orderItems),
}))

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}))

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
}))

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, { fields: [likes.userId], references: [users.id] }),
  product: one(products, { fields: [likes.productId], references: [products.id] }),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
  variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}))

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type ProductType = typeof productTypes.$inferSelect
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type ProductImage = typeof productImages.$inferSelect
export type ProductVariant = typeof productVariants.$inferSelect
export type Like = typeof likes.$inferSelect
export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
export type OrderItem = typeof orderItems.$inferSelect
