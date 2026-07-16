import { describe, expect, it } from 'vitest'
import { BillingPeriod } from '@/common/enums/billing-period.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_PRICING_PLANS } from '@/common/constants/mock-pricing.constants'
import {
  formatPlanPrice,
  getPlanCta,
  getPricingPlanByTier,
  isUserAuthenticated,
} from './pricing.utils'

const proPlan = MOCK_PRICING_PLANS.find((plan) => plan.tier === PlanTier.PRO)

describe('getPricingPlanByTier', () => {
  it('returns plan details for each tier', () => {
    expect(getPricingPlanByTier(PlanTier.FREE)?.name).toBe('Free')
    expect(getPricingPlanByTier(PlanTier.PRO)?.monthlyPrice).toBe(14.99)
    expect(getPricingPlanByTier(PlanTier.BUSINESS)?.name).toBe('Business')
  })
})

describe('formatPlanPrice', () => {
  it('returns Free for the free tier', () => {
    const freePlan = getPricingPlanByTier(PlanTier.FREE)

    expect(freePlan).not.toBeNull()
    expect(formatPlanPrice(freePlan!, BillingPeriod.MONTHLY)).toEqual({
      main: 'Free',
    })
  })

  it('formats monthly prices for paid plans', () => {
    expect(proPlan).toBeDefined()
    expect(formatPlanPrice(proPlan!, BillingPeriod.MONTHLY)).toEqual({
      main: '$14.99/mo',
    })
  })

  it('formats annual prices as monthly equivalent with billing note', () => {
    expect(proPlan).toBeDefined()
    expect(formatPlanPrice(proPlan!, BillingPeriod.ANNUAL)).toEqual({
      main: '$11.99/mo',
      sub: 'Billed annually',
    })
  })
})

describe('isUserAuthenticated', () => {
  it('returns false when user id is missing', () => {
    expect(
      isUserAuthenticated({ id: null, email: null, plan: PlanTier.FREE }),
    ).toBe(false)
  })

  it('returns true when user id is present', () => {
    expect(
      isUserAuthenticated({
        id: 'user-1',
        email: 'founder@example.com',
        plan: PlanTier.FREE,
      }),
    ).toBe(true)
  })
})

describe('getPlanCta', () => {
  it('returns Get started for unauthenticated users', () => {
    expect(
      getPlanCta({
        tier: PlanTier.PRO,
        currentPlan: PlanTier.FREE,
        isAuthenticated: false,
      }),
    ).toEqual({
      label: 'Get started',
      action: 'signup',
      disabled: false,
    })
  })

  it('marks the current plan as disabled', () => {
    expect(
      getPlanCta({
        tier: PlanTier.FREE,
        currentPlan: PlanTier.FREE,
        isAuthenticated: true,
      }),
    ).toEqual({
      label: 'Current plan',
      action: 'none',
      disabled: true,
    })
  })

  it('returns upgrade action for higher tiers', () => {
    expect(
      getPlanCta({
        tier: PlanTier.PRO,
        currentPlan: PlanTier.FREE,
        isAuthenticated: true,
      }),
    ).toEqual({
      label: 'Upgrade to Pro',
      action: 'upgrade-pro',
      disabled: false,
    })

    expect(
      getPlanCta({
        tier: PlanTier.BUSINESS,
        currentPlan: PlanTier.PRO,
        isAuthenticated: true,
      }),
    ).toEqual({
      label: 'Upgrade to Business',
      action: 'upgrade-business',
      disabled: false,
    })
  })

  it('marks lower tiers as included for authenticated users', () => {
    expect(
      getPlanCta({
        tier: PlanTier.FREE,
        currentPlan: PlanTier.PRO,
        isAuthenticated: true,
      }),
    ).toEqual({
      label: 'Included in your plan',
      action: 'none',
      disabled: true,
    })
  })
})
