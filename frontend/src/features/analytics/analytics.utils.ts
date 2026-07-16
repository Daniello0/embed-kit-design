import { PlanTier } from '@/common/enums/plan-tier.enum'
import type {
  MockAnalyticsDailyCount,
  MockAnalyticsStat,
} from '@/common/constants/mock-analytics.constants'
import { ANALYTICS_CHART_BAR_MIN_HEIGHT_PERCENT } from './analytics.constants'

export type AnalyticsChangeTone = 'positive' | 'negative' | 'neutral'

interface BuildAnalyticsExportCsvParams {
  stats: MockAnalyticsStat[]
  daily: MockAnalyticsDailyCount[]
  topQuestions: Array<{ question: string; count: number }>
}

/**
 * Returns whether analytics are locked for the current plan.
 */
export function isAnalyticsLocked(plan: PlanTier): boolean {
  return plan === PlanTier.FREE
}

/**
 * Returns whether analytics export is available for the current plan.
 */
export function isAnalyticsExportAvailable(plan: PlanTier): boolean {
  return plan === PlanTier.BUSINESS
}

/**
 * Returns the highest daily conversation count for chart scaling.
 */
export function getMaxDailyConversations(
  daily: MockAnalyticsDailyCount[],
): number {
  return daily.reduce((max, entry) => Math.max(max, entry.conversations), 0)
}

/**
 * Formats an ISO date for daily chart labels.
 */
export function formatDailyLabel(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoDate))
}

/**
 * Calculates a bar height percentage for the daily chart.
 */
export function getDailyBarHeightPercent(
  conversations: number,
  maxConversations: number,
): number {
  if (maxConversations === 0) {
    return ANALYTICS_CHART_BAR_MIN_HEIGHT_PERCENT
  }

  if (conversations === 0) {
    return ANALYTICS_CHART_BAR_MIN_HEIGHT_PERCENT
  }

  return Math.max(
    ANALYTICS_CHART_BAR_MIN_HEIGHT_PERCENT,
    (conversations / maxConversations) * 100,
  )
}

/**
 * Resolves whether a stat change should render as positive or negative.
 */
export function getChangeTone(
  label: string,
  change: string,
): AnalyticsChangeTone {
  if (!change.startsWith('+') && !change.startsWith('-')) {
    return 'neutral'
  }

  const isIncrease = change.startsWith('+')
  const lowerIsBetter = label.toLowerCase().includes('response time')

  if (lowerIsBetter) {
    return isIncrease ? 'negative' : 'positive'
  }

  return isIncrease ? 'positive' : 'negative'
}

/**
 * Builds a CSV export for analytics data.
 */
export function buildAnalyticsExportCsv({
  stats,
  daily,
  topQuestions,
}: BuildAnalyticsExportCsvParams): string {
  const statRows = stats.map(
    (stat) => `${stat.label},${stat.value.replaceAll(',', '')},${stat.change}`,
  )
  const dailyRows = daily.map((entry) => `${entry.date},${entry.conversations}`)
  const questionRows = topQuestions.map(
    (entry) => `"${entry.question}",${entry.count}`,
  )

  return [
    'Metric,Value,Change',
    ...statRows,
    '',
    'Date,Conversations',
    ...dailyRows,
    '',
    'Question,Count',
    ...questionRows,
  ].join('\n')
}

/**
 * Triggers a CSV download in the browser.
 */
export function downloadAnalyticsExport(
  csvContent: string,
  filename: string,
): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
