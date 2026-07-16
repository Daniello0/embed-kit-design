import { CHAT_TYPING_ANIMATION_MS } from './chat.constants'
import styles from './chat.module.css'

/**
 * Animated typing dots during mock response delay.
 */
export function TypingIndicator() {
  return (
    <div
      className={styles.typingIndicator}
      aria-label="Assistant is typing"
      aria-live="polite"
      style={{ animationDuration: `${CHAT_TYPING_ANIMATION_MS}ms` }}
    >
      <span className={styles.typingDot} aria-hidden="true" />
      <span className={styles.typingDot} aria-hidden="true" />
      <span className={styles.typingDot} aria-hidden="true" />
    </div>
  )
}
