import { Suspense } from 'react'
import { db } from '@/lib/db'
import { productTypes } from '@/lib/db/schema'
import CatalogoClient from './catalogo-client'

export default async function CatalogoPage() {
  const types = await db.select().from(productTypes)
  return (
    <Suspense>
      <CatalogoClient types={types} />
    </Suspense>
  )
}
