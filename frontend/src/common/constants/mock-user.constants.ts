import { PlanTier } from '@/common/enums/plan-tier.enum'
import type { User } from '@/common/types/user.types'
import { MOCK_IDS } from './mock-ids.constants'

export const MOCK_USER: User = {
  id: MOCK_IDS.USER,
  email: 'demo@embedkit.io',
  plan: PlanTier.FREE,
  createdAt: '2026-01-15T10:00:00.000Z',
}

export const MOCK_GUEST_USER = {
  id: null,
  email: null,
  plan: PlanTier.FREE,
} as const
