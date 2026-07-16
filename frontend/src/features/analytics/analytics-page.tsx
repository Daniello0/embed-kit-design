import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { useAppStore } from '@/common/stores/app.store'
import { AnalyticsDashboard } from './analytics-dashboard'
import { AnalyticsGate } from './analytics-gate'
import { ANALYTICS_COPY } from './analytics.constants'
import { isAnalyticsLocked } from './analytics.utils'
import styles from './analytics.module.css'

interface AnalyticsPageProps {
  botId: string
}

/**
 * Analytics page with plan gate and mocked conversation insights.
 */
export function AnalyticsPage({ botId }: AnalyticsPageProps) {
  const plan = useAppStore((state) => state.user.plan)
  const openPaywall = useAppStore((state) => state.openPaywall)
  const locked = isAnalyticsLocked(plan)

  return (
    <section className={styles.analyticsPage} data-bot-id={botId}>
      <header className={styles.header}>
        <h1 className={styles.title}>{ANALYTICS_COPY.PAGE_TITLE}</h1>
        <p className={styles.description}>{ANALYTICS_COPY.PAGE_DESCRIPTION}</p>
      </header>

      <AnalyticsGate
        locked={locked}
        onUpgradeClick={() => openPaywall(PaywallTrigger.ANALYTICS)}
      >
        <AnalyticsDashboard />
      </AnalyticsGate>
    </section>
  )
}
