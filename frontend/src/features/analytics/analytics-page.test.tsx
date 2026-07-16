import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { PricingPage } from '@/features/pricing/pricing-page'
import { AnalyticsPage } from './analytics-page'
import { ANALYTICS_COPY } from './analytics.constants'
import * as analyticsUtils from './analytics.utils'

describe('AnalyticsPage', () => {
  beforeEach(() => {
    resetAppStore()
    vi.restoreAllMocks()
  })

  function renderAnalyticsPage() {
    return render(
      <MemoryRouter initialEntries={[`/app/bot/${MOCK_IDS.BOT}/analytics`]}>
        <Routes>
          <Route
            path="/app/bot/:botId/analytics"
            element={<AnalyticsPage botId={MOCK_IDS.BOT} />}
          />
          <Route path={ROUTES.PRICING} element={<PricingPage />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('renders analytics overview for Pro users', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.PRO },
    }))

    renderAnalyticsPage()

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
    renderAnalyticsPage()

    expect(screen.getByText(ANALYTICS_COPY.GATE_TITLE)).toBeInTheDocument()
    expect(
      screen.getByText(ANALYTICS_COPY.GATE_DESCRIPTION),
    ).toBeInTheDocument()
    expect(screen.getByText('1,284')).toBeInTheDocument()
  })

  it('navigates to pricing from the gate', () => {
    renderAnalyticsPage()

    fireEvent.click(
      screen.getByRole('button', { name: ANALYTICS_COPY.GATE_CTA }),
    )

    expect(
      screen.getByRole('heading', { name: 'Pricing', level: 1 }),
    ).toBeInTheDocument()
  })

  it('shows export for Business users and downloads CSV', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.BUSINESS },
    }))

    const downloadSpy = vi
      .spyOn(analyticsUtils, 'downloadAnalyticsExport')
      .mockImplementation(() => undefined)

    renderAnalyticsPage()

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
