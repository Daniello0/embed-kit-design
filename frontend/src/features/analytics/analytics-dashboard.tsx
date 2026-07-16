import { useState } from 'react'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import {
  MOCK_ANALYTICS_DAILY,
  MOCK_ANALYTICS_STATS,
  MOCK_TOP_QUESTIONS,
} from '@/common/constants/mock-analytics.constants'
import { useAppStore } from '@/common/stores/app.store'
import { AnalyticsDailyChart } from './analytics-daily-chart'
import { AnalyticsStatCards } from './analytics-stat-cards'
import { AnalyticsTopQuestions } from './analytics-top-questions'
import {
  ANALYTICS_COPY,
  ANALYTICS_EXPORT_FILENAME,
} from './analytics.constants'
import {
  buildAnalyticsExportCsv,
  downloadAnalyticsExport,
  isAnalyticsExportAvailable,
} from './analytics.utils'
import styles from './analytics.module.css'

/**
 * Conversation stats dashboard with mocked data.
 */
export function AnalyticsDashboard() {
  const plan = useAppStore((state) => state.user.plan)
  const [exportMessage, setExportMessage] = useState<string | null>(null)
  const canExport = isAnalyticsExportAvailable(plan)

  const handleExport = () => {
    const csv = buildAnalyticsExportCsv({
      stats: MOCK_ANALYTICS_STATS,
      daily: MOCK_ANALYTICS_DAILY,
      topQuestions: [...MOCK_TOP_QUESTIONS],
    })

    downloadAnalyticsExport(csv, ANALYTICS_EXPORT_FILENAME)
    setExportMessage(ANALYTICS_COPY.EXPORT_SUCCESS)
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <div>
          <h2 className={styles.panelTitle}>{ANALYTICS_COPY.STATS_TITLE}</h2>
          <p className={styles.panelHint}>{ANALYTICS_COPY.STATS_HINT}</p>
        </div>
        {canExport ? (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleExport}
          >
            {ANALYTICS_COPY.EXPORT_BUTTON}
          </button>
        ) : null}
      </div>

      {exportMessage ? (
        <p className={styles.exportMessage} role="status">
          {exportMessage}
        </p>
      ) : null}

      {!canExport && plan === PlanTier.PRO ? (
        <p className={styles.exportHint}>
          {ANALYTICS_COPY.BUSINESS_EXPORT_HINT}
        </p>
      ) : null}

      <AnalyticsStatCards />

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>{ANALYTICS_COPY.CHART_TITLE}</h2>
        <p className={styles.panelHint}>{ANALYTICS_COPY.CHART_HINT}</p>
        <AnalyticsDailyChart />
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>
          {ANALYTICS_COPY.TOP_QUESTIONS_TITLE}
        </h2>
        <p className={styles.panelHint}>{ANALYTICS_COPY.TOP_QUESTIONS_HINT}</p>
        <AnalyticsTopQuestions />
      </div>
    </div>
  )
}
