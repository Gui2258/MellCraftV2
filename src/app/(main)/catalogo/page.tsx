import { Suspense } from 'react'
import { db } from '@/lib/db'
import { productTypes } from '@/lib/db/schema'
import CatalogoClient from './catalogo-client'

// Storefront reads live data — render on request, never prerender at build.
export const dynamic = 'force-dynamic'

async function getTypes() {
  try {
    return await db.select().from(productTypes)
  } catch {
    return []
  }
}

export default async function CatalogoPage() {
  const types = await getTypes()
  return (
    <Suspense>
      <CatalogoClient types={types} />
    </Suspense>
  )
}
