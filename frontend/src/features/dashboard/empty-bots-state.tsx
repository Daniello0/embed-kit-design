import { DASHBOARD_COPY } from './dashboard.constants'
import styles from './dashboard.module.css'

interface EmptyBotsStateProps {
  onCreateClick: () => void
}

/**
 * Empty state prompting the user to create their first bot.
 */
export function EmptyBotsState({ onCreateClick }: EmptyBotsStateProps) {
  return (
    <section className={styles.emptyState}>
      <span className={styles.emptyIcon} aria-hidden="true">
        🤖
      </span>
      <h2 className={styles.emptyTitle}>{DASHBOARD_COPY.CREATE_FIRST_BOT}</h2>
      <p className={styles.emptyDescription}>
        {DASHBOARD_COPY.EMPTY_STATE_DESCRIPTION}
      </p>
      <button
        type="button"
        className={styles.primaryButton}
        onClick={onCreateClick}
      >
        {DASHBOARD_COPY.CREATE_BOT}
      </button>
    </section>
  )
}
