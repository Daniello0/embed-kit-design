import type { PlanTier } from '@/common/enums/plan-tier.enum'

export interface User {
  id: string
  email: string
  plan: PlanTier
  createdAt: string
}
