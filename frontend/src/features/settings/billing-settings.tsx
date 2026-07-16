import { Link } from 'react-router-dom'
import { PlanBadge } from '@/common/components/plan-badge'
import { ROUTES } from '@/common/constants/routes.constants'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { useAppStore } from '@/common/stores/app.store'
import { SETTINGS_COPY } from './settings.constants'
import { getPricingPlanByTier } from './settings.utils'
import styles from './settings.module.css'

/**
 * Formats a monthly price for display.
 */
function formatMonthlyPrice(price: number): string {
  if (price === 0) {
    return 'Free'
  }

  return `$${price.toFixed(2)}/mo`
}

/**
 * Current plan display and upgrade actions.
 */
export function BillingSettings() {
  const plan = useAppStore((state) => state.user.plan)
  const currentPlan = getPricingPlanByTier(plan)

  if (!currentPlan) {
    throw new Error(`Missing pricing plan for tier: ${plan}`)
  }

  return (
    <section>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{SETTINGS_COPY.BILLING_TITLE}</h2>
        <p className={styles.sectionDescription}>
          {SETTINGS_COPY.BILLING_DESCRIPTION}
        </p>
      </header>

      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div>
            <p className={styles.fieldLabel}>
              {SETTINGS_COPY.CURRENT_PLAN_LABEL}
            </p>
            <h3 className={styles.planName}>{currentPlan.name}</h3>
            <p className={styles.planPrice}>
              {formatMonthlyPrice(currentPlan.monthlyPrice)}
            </p>
          </div>
          <PlanBadge plan={plan} />
        </div>

        <div>
          <p className={styles.fieldLabel}>
            {SETTINGS_COPY.PLAN_FEATURES_LABEL}
          </p>
          <ul className={styles.featureList}>
            {currentPlan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className={styles.actionRow}>
          {plan === PlanTier.FREE ? (
            <Link className={styles.primaryButton} to={ROUTES.PRICING}>
              {SETTINGS_COPY.UPGRADE_TO_PRO}
            </Link>
          ) : null}

          {plan !== PlanTier.BUSINESS ? (
            <Link className={styles.secondaryButton} to={ROUTES.PRICING}>
              {SETTINGS_COPY.UPGRADE_TO_BUSINESS}
            </Link>
          ) : null}

          <Link className={styles.ghostButton} to={ROUTES.PRICING}>
            {SETTINGS_COPY.VIEW_PRICING}
          </Link>
        </div>

        {plan === PlanTier.BUSINESS ? (
          <p className={styles.topPlanNotice}>
            {SETTINGS_COPY.TOP_PLAN_MESSAGE}
          </p>
        ) : null}
      </div>
    </section>
  )
}
