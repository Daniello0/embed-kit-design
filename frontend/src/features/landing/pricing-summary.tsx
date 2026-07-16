import { Link } from 'react-router-dom'
import { PlanBadge } from '@/common/components/plan-badge'
import { MOCK_PRICING_PLANS } from '@/common/constants/mock-pricing.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { BillingPeriod } from '@/common/enums/billing-period.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { PRICING_PLAN_ORDER } from '@/features/pricing/pricing.constants'
import { formatPlanPrice } from '@/features/pricing/pricing.utils'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Returns the lead feature line for a compact pricing card.
 */
function getPlanHighlight(tier: PlanTier): string {
  const plan = MOCK_PRICING_PLANS.find((entry) => entry.tier === tier)
  return plan?.features[0] ?? ''
}

/**
 * Compact tier cards with link to pricing page.
 */
export function PricingSummary() {
  const orderedPlans = PRICING_PLAN_ORDER.map((tier) =>
    MOCK_PRICING_PLANS.find((plan) => plan.tier === tier),
  ).filter((plan): plan is NonNullable<typeof plan> => plan !== undefined)

  return (
    <section className={styles.section} aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className={styles.sectionTitle}>
        {LANDING_COPY.PRICING_TITLE}
      </h2>

      <div className={styles.pricingGrid}>
        {orderedPlans.map((plan) => {
          const price = formatPlanPrice(plan, BillingPeriod.MONTHLY)
          const isPro = plan.tier === PlanTier.PRO

          return (
            <article
              key={plan.tier}
              className={`${styles.pricingCard} ${isPro ? styles.pricingCardFeatured : ''}`}
            >
              <div className={styles.pricingCardHeader}>
                <h3 className={styles.pricingPlanName}>{plan.name}</h3>
                <PlanBadge plan={plan.tier} />
              </div>
              <p className={styles.pricingPrice}>{price.main}</p>
              <p className={styles.pricingHighlight}>
                {getPlanHighlight(plan.tier)}
              </p>
            </article>
          )
        })}
      </div>

      <div className={styles.pricingLinkWrapper}>
        <Link className={styles.pricingLink} to={ROUTES.PRICING}>
          {LANDING_COPY.PRICING_LINK}
        </Link>
      </div>
    </section>
  )
}
