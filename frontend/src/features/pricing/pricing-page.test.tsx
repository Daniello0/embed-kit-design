import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { BillingToggle } from './billing-toggle'
import { PricingPage } from './pricing-page'
import { PricingTable } from './pricing-table'
import { BillingPeriod } from '@/common/enums/billing-period.enum'

describe('BillingToggle', () => {
  it('switches billing period when an option is clicked', () => {
    const onChange = vi.fn()

    render(<BillingToggle value={BillingPeriod.MONTHLY} onChange={onChange} />)

    fireEvent.click(screen.getByRole('button', { name: /Annual/i }))

    expect(onChange).toHaveBeenCalledWith(BillingPeriod.ANNUAL)
  })
})

describe('PricingTable', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders three plan cards and comparison rows', () => {
    render(
      <MemoryRouter>
        <PricingTable billingPeriod={BillingPeriod.MONTHLY} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Free', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Pro', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Business', level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByText('Compare plans')).toBeInTheDocument()
    expect(screen.getByText('Documents per bot')).toBeInTheDocument()
  })

  it('shows Get started links for guests', () => {
    render(
      <MemoryRouter>
        <PricingTable billingPeriod={BillingPeriod.MONTHLY} />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('link', { name: 'Get started' })).toHaveLength(3)
  })

  it('shows current plan and upgrade actions for signed-in users', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    render(
      <MemoryRouter>
        <PricingTable billingPeriod={BillingPeriod.MONTHLY} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: 'Current plan' })).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Upgrade to Pro' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Upgrade to Business' }),
    ).toBeInTheDocument()
  })

  it('displays annual pricing when selected', () => {
    render(
      <MemoryRouter>
        <PricingTable billingPeriod={BillingPeriod.ANNUAL} />
      </MemoryRouter>,
    )

    expect(screen.getByText('$11.99/mo')).toBeInTheDocument()
    expect(screen.getAllByText('Billed annually').length).toBeGreaterThan(0)
  })
})

describe('PricingPage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders page header, billing toggle, and plans', () => {
    render(
      <MemoryRouter>
        <PricingPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Pricing', level: 1 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('group', { name: 'Billing period' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Free plan · No credit card required'),
    ).toBeInTheDocument()
  })

  it('updates displayed prices when billing period changes', () => {
    render(
      <MemoryRouter>
        <PricingPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /Annual/i }))

    expect(screen.getByText('$11.99/mo')).toBeInTheDocument()
  })

  it('shows current plan for authenticated users on their tier', () => {
    useAppStore.setState({
      ...MOCK_DEMO_APP_STATE,
      user: { ...MOCK_DEMO_APP_STATE.user, plan: PlanTier.PRO },
    })

    render(
      <MemoryRouter>
        <PricingPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByText(MOCK_DEMO_APP_STATE.user.email!),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Log in' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Current plan' })).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Upgrade to Business' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Included in your plan' }),
    ).toBeDisabled()
  })
})
