import { useAppStore } from '@/common/stores/app.store'
import { BotCard } from './bot-card'
import { DASHBOARD_COPY } from './dashboard.constants'
import styles from './dashboard.module.css'

interface BotGridProps {
  onCreateClick: () => void
  onEditClick: (botId: string) => void
}

/**
 * Responsive grid of bot cards.
 */
export function BotGrid({ onCreateClick, onEditClick }: BotGridProps) {
  const bots = useAppStore((state) => state.bots)

  return (
    <div className={styles.botGrid}>
      {bots.map((bot) => (
        <BotCard
          key={bot.id}
          bot={bot}
          onEdit={(selectedBot) => onEditClick(selectedBot.id)}
        />
      ))}

      {bots.length > 0 ? (
        <button
          type="button"
          className={styles.createCard}
          onClick={onCreateClick}
        >
          <span className={styles.createIcon} aria-hidden="true">
            +
          </span>
          <span className={styles.createLabel}>
            {DASHBOARD_COPY.CREATE_CARD_LABEL}
          </span>
        </button>
      ) : null}
    </div>
  )
}
