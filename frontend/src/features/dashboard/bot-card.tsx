import { Link } from 'react-router-dom'
import { BotStatus } from '@/common/enums/bot-status.enum'
import { botRoutes } from '@/common/constants/routes.constants'
import type { Bot } from '@/common/types/bot.types'
import { DASHBOARD_COPY } from './dashboard.constants'
import {
  formatDocumentCountLabel,
  formatLastUpdated,
  getBotStatusLabel,
} from './dashboard.utils'
import styles from './dashboard.module.css'

interface BotCardProps {
  bot: Bot
  onEdit: (bot: Bot) => void
}

/**
 * Returns the status dot class for a bot state.
 */
function getStatusDotClass(status: BotStatus): string {
  switch (status) {
    case BotStatus.READY:
      return styles.statusReady
    case BotStatus.PROCESSING:
      return styles.statusProcessing
    case BotStatus.DRAFT:
      return styles.statusDraft
    default:
      return styles.statusDraft
  }
}

/**
 * Rectangular bot card with view, knowledge, and edit actions.
 */
export function BotCard({ bot, onEdit }: BotCardProps) {
  const statusLabel = getBotStatusLabel(bot.status)

  return (
    <article className={styles.botCard}>
      <div className={styles.cardActionsTop}>
        <Link
          className={styles.iconButton}
          to={botRoutes.chat(bot.id)}
          aria-label={DASHBOARD_COPY.VIEW_BOT}
        >
          👁
        </Link>
        <Link
          className={styles.iconButton}
          to={botRoutes.knowledge(bot.id)}
          aria-label={DASHBOARD_COPY.KNOWLEDGE_BASE}
        >
          📖
        </Link>
      </div>

      <div className={styles.cardBody}>
        {bot.avatarUrl ? (
          <img
            className={styles.avatar}
            src={bot.avatarUrl}
            alt=""
            width={40}
            height={40}
          />
        ) : null}
        <h3 className={styles.botName}>{bot.name}</h3>
        <p className={styles.documentBadge}>
          {formatDocumentCountLabel(bot.documentCount)}
        </p>
        <p className={styles.lastUpdated}>
          {DASHBOARD_COPY.LAST_UPDATED_PREFIX}{' '}
          {formatLastUpdated(bot.updatedAt)}
        </p>
      </div>

      <div className={styles.cardActionsBottom}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={DASHBOARD_COPY.EDIT_BOT}
          onClick={() => onEdit(bot)}
        >
          ✏️
        </button>
        <span className={styles.statusIndicator}>
          <span
            className={`${styles.statusDot} ${getStatusDotClass(bot.status)}`}
            aria-hidden="true"
          />
          {statusLabel}
        </span>
      </div>
    </article>
  )
}
