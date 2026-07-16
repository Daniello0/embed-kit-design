import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, beforeEach } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { MOCK_USER } from '@/common/constants/mock-user.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import {
  ApiSettings,
  BillingSettings,
  ProfileSettings,
  SettingsLayout,
  TeamSettings,
} from './index'

function renderSettingsRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/app/settings" element={<SettingsLayout />}>
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="billing" element={<BillingSettings />} />
          <Route path="team" element={<TeamSettings />} />
          <Route path="api" element={<ApiSettings />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('Settings feature', () => {
  beforeEach(() => {
    resetAppStore()
    useAppStore.setState(MOCK_DEMO_APP_STATE)
  })

  it('renders sidebar tabs and profile content', () => {
    renderSettingsRoute(ROUTES.SETTINGS_PROFILE)

    expect(
      screen.getByRole('heading', { name: 'Settings' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Billing' })).toBeInTheDocument()
    expect(screen.getByDisplayValue(MOCK_USER.email)).toBeInTheDocument()
  })

  it('shows current plan on billing tab', () => {
    renderSettingsRoute(ROUTES.SETTINGS_BILLING)

    expect(screen.getByRole('heading', { name: 'Billing' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Free', level: 3 }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Widget with EmbedKit watermark'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Upgrade to Pro' }),
    ).toBeInTheDocument()
  })

  it('shows team gate on the Free plan', () => {
    renderSettingsRoute(ROUTES.SETTINGS_TEAM)

    expect(screen.getByText('Business plan required')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Team/ })).toBeInTheDocument()
  })

  it('opens paywall when a locked tab is clicked', () => {
    useAppStore.setState((state) => ({
      ui: { ...state.ui, hasReachedAhaMoment: true },
    }))

    renderSettingsRoute(ROUTES.SETTINGS_PROFILE)

    fireEvent.click(screen.getByRole('link', { name: /Team/ }))

    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe('team')
  })

  it('unlocks team settings on the Business plan', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.BUSINESS },
    }))

    renderSettingsRoute(ROUTES.SETTINGS_TEAM)

    expect(screen.queryByText('Business plan required')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Invite teammate' }),
    ).toBeInTheDocument()
  })

  it('generates a mock API key on the Business plan', () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.BUSINESS },
    }))

    renderSettingsRoute(ROUTES.SETTINGS_API)

    fireEvent.click(screen.getByRole('button', { name: 'Generate API key' }))

    expect(screen.getByText(/^ek_live_/)).toBeInTheDocument()
  })
})
