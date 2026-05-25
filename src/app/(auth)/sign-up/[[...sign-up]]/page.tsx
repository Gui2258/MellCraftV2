import { SignUp } from '@clerk/nextjs'
import styles from './page.module.css'

export default function SignUpPage() {
  return (
    <div className={styles.root}>
      <div className={styles.art}>
        <div className={styles.artInner}>
          <div className={styles.artTitle}>Únete a la familia Mell Craft</div>
          <p className={styles.artText}>
            Crea tu cuenta para guardar favoritos, rastrear pedidos y más.
          </p>
        </div>
      </div>
      <div className={styles.form}>
        <SignUp fallbackRedirectUrl="/" signInUrl="/sign-in" />
      </div>
    </div>
  )
}
