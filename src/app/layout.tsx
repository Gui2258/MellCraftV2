import type { Metadata } from 'next'
import { Playfair_Display, Inter, Caveat } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from '@/components/cart/cart-context'
import '@/styles/tokens.css'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mell Craft — Manualidades con Amor',
  description: 'Regalos y manualidades hechos a mano con amor. Ramos, peluches, tarjetas y más.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="es" className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
        <body>
          <CartProvider>{children}</CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
