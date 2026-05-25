'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface CartItem {
  productId: string
  variantId?: string
  title: string
  variantLabel?: string
  priceCup: number
  priceUsd?: number
  imageUrl?: string
  tone?: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalCup: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, variantId: string | undefined, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'mellcraft_cart'

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(loadCart())
  }, [])

  const persist = useCallback((updated: CartItem[]) => {
    setItems(updated)
    saveCart(updated)
  }, [])

  const addItem = useCallback(
    (newItem: Omit<CartItem, 'quantity'>) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === newItem.productId && i.variantId === newItem.variantId,
        )
        let updated: CartItem[]
        if (idx >= 0) {
          updated = prev.map((i, index) =>
            index === idx ? { ...i, quantity: i.quantity + 1 } : i,
          )
        } else {
          updated = [...prev, { ...newItem, quantity: 1 }]
        }
        saveCart(updated)
        return updated
      })
    },
    [],
  )

  const removeItem = useCallback(
    (productId: string, variantId?: string) => {
      const updated = items.filter(
        (i) => !(i.productId === productId && i.variantId === variantId),
      )
      persist(updated)
    },
    [items, persist],
  )

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, qty: number) => {
      if (qty <= 0) {
        removeItem(productId, variantId)
        return
      }
      const updated = items.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity: qty } : i,
      )
      persist(updated)
    },
    [items, persist, removeItem],
  )

  const clearCart = useCallback(() => persist([]), [persist])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalCup = items.reduce((sum, i) => sum + i.priceCup * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalCup, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
