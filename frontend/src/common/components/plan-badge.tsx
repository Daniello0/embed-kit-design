import { PlanTier } from '@/common/enums/plan-tier.enum'
import styles from './plan-badge.module.css'

interface PlanBadgeProps {
  plan: PlanTier
}

const PLAN_LABELS: Record<PlanTier, string> = {
  [PlanTier.FREE]: 'Free',
  [PlanTier.PRO]: 'Pro',
  [PlanTier.BUSINESS]: 'Business',
}

const PLAN_CLASS: Record<PlanTier, string> = {
  [PlanTier.FREE]: styles.free,
  [PlanTier.PRO]: styles.pro,
  [PlanTier.BUSINESS]: styles.business,
}

/**
 * Free, Pro, or Business plan chip.
 */
export function PlanBadge({ plan }: PlanBadgeProps) {
  return (
    <span className={`${styles.badge} ${PLAN_CLASS[plan]}`}>
      {PLAN_LABELS[plan]}
    </span>
  )
}
