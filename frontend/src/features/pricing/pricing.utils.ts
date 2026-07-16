import { MOCK_PRICING_PLANS } from '@/common/constants/mock-pricing.constants'
import { BillingPeriod } from '@/common/enums/billing-period.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import type { AppUserState } from '@/common/types/app-state.types'
import type { PricingPlan } from '@/common/types/pricing-plan.types'
import { PRICING_COPY } from './pricing.constants'

export interface PlanPriceDisplay {
  main: string
  sub?: string
}

export type PlanCtaAction =
  'none' | 'signup' | 'upgrade-pro' | 'upgrade-business'

export interface PlanCta {
  label: string
  action: PlanCtaAction
  disabled: boolean
}

interface GetPlanCtaParams {
  tier: PlanTier
  currentPlan: PlanTier
  isAuthenticated: boolean
}

const PLAN_TIER_RANK: Record<PlanTier, number> = {
  [PlanTier.FREE]: 0,
  [PlanTier.PRO]: 1,
  [PlanTier.BUSINESS]: 2,
}

/**
 * Returns mock pricing details for a plan tier.
 */
export function getPricingPlanByTier(tier: PlanTier): PricingPlan | null {
  return MOCK_PRICING_PLANS.find((plan) => plan.tier === tier) ?? null
}

/**
 * Formats a plan price for monthly or annual billing display.
 */
export function formatPlanPrice(
  plan: PricingPlan,
  period: BillingPeriod,
): PlanPriceDisplay {
  if (plan.monthlyPrice === 0) {
    return { main: 'Free' }
  }

  if (period === BillingPeriod.MONTHLY) {
    return { main: `$${plan.monthlyPrice.toFixed(2)}/mo` }
  }

  const monthlyEquivalent = plan.annualPrice / 12

  return {
    main: `$${monthlyEquivalent.toFixed(2)}/mo`,
    sub: PRICING_COPY.BILLED_ANNUALLY,
  }
}

/**
 * Returns whether the user is signed in.
 */
export function isUserAuthenticated(user: AppUserState): boolean {
  return user.id !== null
}

/**
 * Resolves CTA label and action for a pricing tier card.
 */
export function getPlanCta({
  tier,
  currentPlan,
  isAuthenticated,
}: GetPlanCtaParams): PlanCta {
  if (!isAuthenticated) {
    return {
      label: PRICING_COPY.GET_STARTED,
      action: 'signup',
      disabled: false,
    }
  }

  if (tier === currentPlan) {
    return {
      label: PRICING_COPY.CURRENT_PLAN,
      action: 'none',
      disabled: true,
    }
  }

  if (PLAN_TIER_RANK[tier] < PLAN_TIER_RANK[currentPlan]) {
    return {
      label: PRICING_COPY.INCLUDED_IN_PLAN,
      action: 'none',
      disabled: true,
    }
  }

  if (tier === PlanTier.PRO) {
    return {
      label: PRICING_COPY.UPGRADE_TO_PRO,
      action: 'upgrade-pro',
      disabled: false,
    }
  }

  return {
    label: PRICING_COPY.UPGRADE_TO_BUSINESS,
    action: 'upgrade-business',
    disabled: false,
  }
}
