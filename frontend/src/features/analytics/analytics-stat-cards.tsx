import { MOCK_ANALYTICS_STATS } from '@/common/constants/mock-analytics.constants'
import { getChangeTone } from './analytics.utils'
import styles from './analytics.module.css'

/**
 * Overview cards for mocked analytics stats.
 */
export function AnalyticsStatCards() {
  return (
    <div className={styles.statGrid}>
      {MOCK_ANALYTICS_STATS.map((stat) => {
        const tone = getChangeTone(stat.label, stat.change)

        return (
          <article key={stat.label} className={styles.statCard}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={`${styles.statChange} ${styles[`change${tone}`]}`}>
              {stat.change}
            </p>
          </article>
        )
      })}
    </div>
  )
}
