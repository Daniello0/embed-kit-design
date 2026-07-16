import { useAppStore } from '@/common/stores/app.store'
import { AUTH_COPY } from './auth.constants'
import styles from './auth.module.css'

interface GoogleAuthButtonProps {
  onSuccess: () => void
}

/**
 * Mock Google sign-in button.
 */
export function GoogleAuthButton({ onSuccess }: GoogleAuthButtonProps) {
  const loginWithGoogle = useAppStore((state) => state.loginWithGoogle)

  const handleClick = () => {
    loginWithGoogle()
    onSuccess()
  }

  return (
    <button type="button" className={styles.googleButton} onClick={handleClick}>
      <span className={styles.googleIcon} aria-hidden="true">
        G
      </span>
      {AUTH_COPY.GOOGLE_BUTTON}
    </button>
  )
}
