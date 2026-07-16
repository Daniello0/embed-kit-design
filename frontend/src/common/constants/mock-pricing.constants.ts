import { PlanTier } from '@/common/enums/plan-tier.enum'
import type { PricingPlan } from '@/common/types/pricing-plan.types'

export const MOCK_PRICING_PLANS: PricingPlan[] = [
  {
    tier: PlanTier.FREE,
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      '1 bot',
      '5 documents per bot',
      '1,000 messages / month',
      'Widget with EmbedKit watermark',
      '3 suggested questions',
    ],
  },
  {
    tier: PlanTier.PRO,
    name: 'Pro',
    monthlyPrice: 14.99,
    annualPrice: 143.9,
    features: [
      '1 bot',
      '50 documents per bot',
      '20,000 messages / month',
      'Custom widget branding',
      'Analytics dashboard',
      'Unlimited suggested questions',
    ],
  },
  {
    tier: PlanTier.BUSINESS,
    name: 'Business',
    monthlyPrice: 49.99,
    annualPrice: 479.9,
    features: [
      'Up to 5 bots',
      'Unlimited documents',
      '100,000 messages / month',
      'Team seats (5)',
      'API access',
      'Analytics export',
    ],
  },
]
