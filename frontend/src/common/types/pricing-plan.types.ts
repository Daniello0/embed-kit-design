import type { PlanTier } from '@/common/enums/plan-tier.enum'

export interface PricingPlan {
  tier: PlanTier
  name: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
}
