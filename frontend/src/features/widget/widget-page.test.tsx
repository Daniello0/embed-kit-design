import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, beforeEach } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { PricingPage } from '@/features/pricing/pricing-page'
import { WidgetPage } from './widget-page'

function renderWidgetPage() {
  return render(
    <MemoryRouter initialEntries={[`/app/bot/${MOCK_IDS.BOT}/widget`]}>
      <Routes>
        <Route
          path="/app/bot/:botId/widget"
          element={<WidgetPage botId={MOCK_IDS.BOT} />}
        />
        <Route path={ROUTES.PRICING} element={<PricingPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('WidgetPage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders settings and preview panels', () => {
    renderWidgetPage()

    expect(
      screen.getByRole('heading', { name: 'Widget builder' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Welcome message')).toBeInTheDocument()
    expect(screen.getByLabelText('Widget chat preview')).toBeInTheDocument()
  })

  it('saves welcome message updates to the store', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.PRO },
    }))

    renderWidgetPage()

    const welcomeInput = screen.getByLabelText('Welcome message')
    fireEvent.change(welcomeInput, {
      target: { value: 'Welcome to our help desk' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    const config = useAppStore.getState().widgetConfigs[MOCK_IDS.BOT]
    expect(config?.welcomeMessage).toBe('Welcome to our help desk')
    expect(screen.getByText('Widget settings saved.')).toBeInTheDocument()
  })

  it('shows branding lock on the Free plan', () => {
    renderWidgetPage()

    expect(
      screen.getByText('Custom branding is a Pro feature'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Welcome message')).toBeInTheDocument()
  })

  it('navigates to pricing from the branding gate', () => {
    renderWidgetPage()

    fireEvent.click(screen.getByRole('button', { name: 'Upgrade to Pro' }))

    expect(
      screen.getByRole('heading', { name: 'Pricing', level: 1 }),
    ).toBeInTheDocument()
  })

  it('unlocks customization on Pro plan', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.PRO },
    }))

    renderWidgetPage()

    expect(
      screen.queryByText('Custom branding is a Pro feature'),
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText('Bubble color')).not.toBeDisabled()
  })
})
