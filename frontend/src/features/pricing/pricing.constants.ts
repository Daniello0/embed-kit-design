import { PlanTier } from '@/common/enums/plan-tier.enum'

export const PRICING_ANNUAL_DISCOUNT_PERCENT = 20

export const PRICING_COPY = {
  PAGE_TITLE: 'Pricing',
  PAGE_DESCRIPTION:
    'Start free, then upgrade when you need more documents, branding, or team seats.',
  BILLING_MONTHLY: 'Monthly',
  BILLING_ANNUAL: 'Annual',
  BILLING_ANNUAL_BADGE: 'Save 20%',
  BILLED_ANNUALLY: 'Billed annually',
  COMPARISON_TITLE: 'Compare plans',
  NO_CREDIT_CARD: 'Free plan · No credit card required',
  CURRENT_PLAN: 'Current plan',
  GET_STARTED: 'Get started',
  INCLUDED_IN_PLAN: 'Included in your plan',
  UPGRADE_TO_PRO: 'Upgrade to Pro',
  UPGRADE_TO_BUSINESS: 'Upgrade to Business',
  BACK_HOME: 'Back to home',
  LOG_IN: 'Log in',
} as const

export interface PricingComparisonRow {
  feature: string
  free: string
  pro: string
  business: string
}

export const PRICING_COMPARISON_ROWS: PricingComparisonRow[] = [
  {
    feature: 'Bots',
    free: '1',
    pro: '1',
    business: 'Up to 5',
  },
  {
    feature: 'Documents per bot',
    free: '5',
    pro: '50',
    business: 'Unlimited',
  },
  {
    feature: 'Messages / month',
    free: '1,000',
    pro: '20,000',
    business: '100,000',
  },
  {
    feature: 'Embed widget',
    free: 'With watermark',
    pro: 'No watermark',
    business: 'No watermark',
  },
  {
    feature: 'Custom branding',
    free: 'No',
    pro: 'Colors, logo, welcome message',
    business: 'Above + custom domain',
  },
  {
    feature: 'Analytics',
    free: 'No',
    pro: 'Conversations, top questions',
    business: 'Export + team dashboard',
  },
  {
    feature: 'Team seats',
    free: '1',
    pro: '1',
    business: 'Up to 5',
  },
  {
    feature: 'API access',
    free: 'No',
    pro: 'No',
    business: 'Yes',
  },
  {
    feature: 'Suggested questions',
    free: '3',
    pro: 'Unlimited',
    business: 'Unlimited',
  },
  {
    feature: 'Support',
    free: 'Community',
    pro: 'Email',
    business: 'Priority',
  },
]

export const PRICING_PLAN_ORDER: PlanTier[] = [
  PlanTier.FREE,
  PlanTier.PRO,
  PlanTier.BUSINESS,
]
