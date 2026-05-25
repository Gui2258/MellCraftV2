import ProductForm from '@/components/products/product-form'
import styles from '../productos.module.css'

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 28 }}>Nuevo producto</h1>
      <ProductForm />
    </div>
  )
}
