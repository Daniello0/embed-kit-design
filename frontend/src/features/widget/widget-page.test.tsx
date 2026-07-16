import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { WidgetPage } from './widget-page'

describe('WidgetPage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders settings and preview panels', () => {
    render(<WidgetPage botId={MOCK_IDS.BOT} />)

    expect(
      screen.getByRole('heading', { name: 'Widget builder' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Welcome message')).toBeInTheDocument()
    expect(screen.getByLabelText('Widget chat preview')).toBeInTheDocument()
  })

  it('saves welcome message updates to the store', () => {
    render(<WidgetPage botId={MOCK_IDS.BOT} />)

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
    render(<WidgetPage botId={MOCK_IDS.BOT} />)

    expect(
      screen.getByText('Custom branding is a Pro feature'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Bubble color')).toBeDisabled()
  })

  it('unlocks color picker on Pro plan', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.PRO },
    }))

    render(<WidgetPage botId={MOCK_IDS.BOT} />)

    expect(
      screen.queryByText('Custom branding is a Pro feature'),
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText('Bubble color')).not.toBeDisabled()
  })
})
