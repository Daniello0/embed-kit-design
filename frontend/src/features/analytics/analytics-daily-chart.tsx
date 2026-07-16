import { MOCK_ANALYTICS_DAILY } from '@/common/constants/mock-analytics.constants'
import {
  formatDailyLabel,
  getDailyBarHeightPercent,
  getMaxDailyConversations,
} from './analytics.utils'
import styles from './analytics.module.css'

/**
 * Simple bar chart for daily conversation volume.
 */
export function AnalyticsDailyChart() {
  const maxConversations = getMaxDailyConversations(MOCK_ANALYTICS_DAILY)

  return (
    <div
      className={styles.chart}
      role="img"
      aria-label="Daily conversations for the past week"
    >
      {MOCK_ANALYTICS_DAILY.map((entry) => {
        const heightPercent = getDailyBarHeightPercent(
          entry.conversations,
          maxConversations,
        )

        return (
          <div key={entry.date} className={styles.chartColumn}>
            <span className={styles.chartValue}>{entry.conversations}</span>
            <div className={styles.chartBarTrack}>
              <div
                className={styles.chartBarFill}
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span className={styles.chartLabel}>
              {formatDailyLabel(entry.date)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
