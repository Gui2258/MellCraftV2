const WA_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

interface OrderItem {
  title: string
  variant: string
  qty: number
  price: number
}

interface OrderData {
  customerName: string
  customerPhone?: string
  items: OrderItem[]
  totalCup: number
  deliveryType: 'pickup' | 'delivery'
  address?: string
  notes?: string
}

export function buildWhatsAppLink(order: OrderData): string {
  const itemLines = order.items.map(
    (i) => `• ${i.title}${i.variant ? ` (${i.variant})` : ''} x${i.qty} — ${i.price.toLocaleString('es-CU')} CUP`,
  )

  const delivery =
    order.deliveryType === 'delivery'
      ? `Domicilio — ${order.address ?? 'pendiente de confirmar'}`
      : 'Recogida en tienda'

  const lines = [
    `¡Hola Mell! Quiero hacer un pedido 🌸`,
    ``,
    `*Nombre:* ${order.customerName}`,
    order.customerPhone ? `*Teléfono:* ${order.customerPhone}` : null,
    `*Entrega:* ${delivery}`,
    ``,
    `*Productos:*`,
    ...itemLines,
    ``,
    `*Total:* ${order.totalCup.toLocaleString('es-CU')} CUP`,
    order.notes ? `\n*Nota:* ${order.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
}
