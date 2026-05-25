import { SignIn } from '@clerk/nextjs'
import styles from './page.module.css'

export default function SignInPage() {
  return (
    <div className={styles.root}>
      <div className={styles.art}>
        <div className={styles.artInner}>
          <div className={styles.artTitle}>Bienvenida de vuelta</div>
          <p className={styles.artText}>
            Inicia sesión para ver tus favoritos, historial de pedidos y más.
          </p>
        </div>
      </div>
      <div className={styles.form}>
        <SignIn fallbackRedirectUrl="/" signUpUrl="/sign-up" />
      </div>
    </div>
  )
}
