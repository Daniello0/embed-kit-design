import { describe, expect, it } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import {
  MOCK_ANALYTICS_DAILY,
  MOCK_ANALYTICS_STATS,
  MOCK_TOP_QUESTIONS,
} from '@/common/constants/mock-analytics.constants'
import {
  buildAnalyticsExportCsv,
  formatDailyLabel,
  getChangeTone,
  getDailyBarHeightPercent,
  getMaxDailyConversations,
  isAnalyticsExportAvailable,
  isAnalyticsLocked,
} from './analytics.utils'

describe('analytics.utils', () => {
  it('locks analytics on the Free plan only', () => {
    expect(isAnalyticsLocked(PlanTier.FREE)).toBe(true)
    expect(isAnalyticsLocked(PlanTier.PRO)).toBe(false)
    expect(isAnalyticsLocked(PlanTier.BUSINESS)).toBe(false)
  })

  it('enables export on the Business plan only', () => {
    expect(isAnalyticsExportAvailable(PlanTier.FREE)).toBe(false)
    expect(isAnalyticsExportAvailable(PlanTier.PRO)).toBe(false)
    expect(isAnalyticsExportAvailable(PlanTier.BUSINESS)).toBe(true)
  })

  it('returns the highest daily conversation count', () => {
    expect(getMaxDailyConversations(MOCK_ANALYTICS_DAILY)).toBe(72)
  })

  it('formats daily chart labels', () => {
    expect(formatDailyLabel('2026-03-10')).toBe('Mar 10')
  })

  it('calculates bar height percentages with a minimum floor', () => {
    expect(getDailyBarHeightPercent(72, 72)).toBe(100)
    expect(getDailyBarHeightPercent(42, 72)).toBeCloseTo(58.33, 1)
    expect(getDailyBarHeightPercent(0, 72)).toBe(8)
  })

  it('classifies stat change tone', () => {
    expect(getChangeTone('Avg. response time', '-5%')).toBe('positive')
    expect(getChangeTone('Total conversations', '+12%')).toBe('positive')
    expect(getChangeTone('Resolution rate', '-3%')).toBe('negative')
  })

  it('builds a CSV export with stats, daily counts, and top questions', () => {
    const csv = buildAnalyticsExportCsv({
      stats: MOCK_ANALYTICS_STATS,
      daily: MOCK_ANALYTICS_DAILY,
      topQuestions: [...MOCK_TOP_QUESTIONS],
    })

    expect(csv).toContain('Metric,Value,Change')
    expect(csv).toContain('Total conversations,1284,+12%')
    expect(csv).toContain('Date,Conversations')
    expect(csv).toContain('2026-03-10,68')
    expect(csv).toContain('Question,Count')
    expect(csv).toContain('"What are your pricing plans?",186')
  })
})
