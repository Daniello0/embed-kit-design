import { useEffect } from 'react'
import { DEPLOY_COPY_TOAST_DURATION_MS } from './deploy.constants'
import styles from './deploy.module.css'

interface CopyConfirmToastProps {
  message: string
  visible: boolean
  onDismiss: () => void
}

/**
 * Success feedback after copying embed code.
 */
export function CopyConfirmToast({
  message,
  visible,
  onDismiss,
}: CopyConfirmToastProps) {
  useEffect(() => {
    if (!visible) {
      return undefined
    }

    const timeoutId = window.setTimeout(
      onDismiss,
      DEPLOY_COPY_TOAST_DURATION_MS,
    )
    return () => window.clearTimeout(timeoutId)
  }, [visible, onDismiss])

  if (!visible) {
    return null
  }

  return (
    <p className={styles.toast} role="status" aria-live="polite">
      {message}
    </p>
  )
}
