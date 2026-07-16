import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { AnalyticsPage } from './analytics-page'
import { ANALYTICS_COPY } from './analytics.constants'
import * as analyticsUtils from './analytics.utils'

describe('AnalyticsPage', () => {
  beforeEach(() => {
    resetAppStore()
    vi.restoreAllMocks()
  })

  it('renders analytics overview for Pro users', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.PRO },
    }))

    render(<AnalyticsPage botId={MOCK_IDS.BOT} />)

    expect(
      screen.getByRole('heading', { name: ANALYTICS_COPY.PAGE_TITLE }),
    ).toBeInTheDocument()
    expect(screen.getByText('Total conversations')).toBeInTheDocument()
    expect(screen.getByText('1,284')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: ANALYTICS_COPY.TOP_QUESTIONS_TITLE }),
    ).toBeInTheDocument()
    expect(screen.getByText('What are your pricing plans?')).toBeInTheDocument()
  })

  it('shows a blurred gate on the Free plan', () => {
    render(<AnalyticsPage botId={MOCK_IDS.BOT} />)

    expect(screen.getByText(ANALYTICS_COPY.GATE_TITLE)).toBeInTheDocument()
    expect(
      screen.getByText(ANALYTICS_COPY.GATE_DESCRIPTION),
    ).toBeInTheDocument()
    expect(screen.getByText('1,284')).toBeInTheDocument()
  })

  it('opens the analytics paywall from the gate', () => {
    useAppStore.setState((state) => ({
      ui: { ...state.ui, hasReachedAhaMoment: true },
    }))

    render(<AnalyticsPage botId={MOCK_IDS.BOT} />)

    fireEvent.click(
      screen.getByRole('button', { name: ANALYTICS_COPY.GATE_CTA }),
    )

    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe(
      PaywallTrigger.ANALYTICS,
    )
  })

  it('shows export for Business users and downloads CSV', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.BUSINESS },
    }))

    const downloadSpy = vi
      .spyOn(analyticsUtils, 'downloadAnalyticsExport')
      .mockImplementation(() => undefined)

    render(<AnalyticsPage botId={MOCK_IDS.BOT} />)

    fireEvent.click(
      screen.getByRole('button', { name: ANALYTICS_COPY.EXPORT_BUTTON }),
    )

    expect(
      screen.getByRole('button', { name: ANALYTICS_COPY.EXPORT_BUTTON }),
    ).toBeInTheDocument()
    expect(downloadSpy).toHaveBeenCalledWith(
      expect.stringContaining('Metric,Value,Change'),
      'embedkit-analytics.csv',
    )
    expect(screen.getByText(ANALYTICS_COPY.EXPORT_SUCCESS)).toBeInTheDocument()
  })
})
