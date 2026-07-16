import { Link } from 'react-router-dom'
import { PlanBadge } from '@/common/components/plan-badge'
import { MOCK_PRICING_PLANS } from '@/common/constants/mock-pricing.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { BillingPeriod } from '@/common/enums/billing-period.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { useAppStore } from '@/common/stores/app.store'
import {
  PRICING_COMPARISON_ROWS,
  PRICING_COPY,
  PRICING_PLAN_ORDER,
} from './pricing.constants'
import {
  formatPlanPrice,
  getPlanCta,
  isUserAuthenticated,
  type PlanCtaAction,
} from './pricing.utils'
import styles from './pricing.module.css'

interface PricingTableProps {
  billingPeriod: BillingPeriod
}

/**
 * Handles plan card CTA clicks for signup and upgrade flows.
 */
function handlePlanAction(
  action: PlanCtaAction,
  openPaywall: (trigger: PaywallTrigger) => void,
): void {
  if (action === 'upgrade-pro') {
    openPaywall(PaywallTrigger.WIDGET_BRANDING)
    return
  }

  if (action === 'upgrade-business') {
    openPaywall(PaywallTrigger.TEAM)
  }
}

/**
 * Three-tier pricing table with feature comparison.
 */
export function PricingTable({ billingPeriod }: PricingTableProps) {
  const user = useAppStore((state) => state.user)
  const openPaywall = useAppStore((state) => state.openPaywall)
  const authenticated = isUserAuthenticated(user)

  const orderedPlans = PRICING_PLAN_ORDER.map((tier) =>
    MOCK_PRICING_PLANS.find((plan) => plan.tier === tier),
  ).filter((plan): plan is NonNullable<typeof plan> => plan !== undefined)

  return (
    <div className={styles.pricingTable}>
      <div className={styles.planGrid}>
        {orderedPlans.map((plan) => {
          const price = formatPlanPrice(plan, billingPeriod)
          const cta = getPlanCta({
            tier: plan.tier,
            currentPlan: user.plan,
            isAuthenticated: authenticated,
          })
          const isPro = plan.tier === PlanTier.PRO

          return (
            <article
              key={plan.tier}
              className={`${styles.planCard} ${isPro ? styles.planCardFeatured : ''}`}
            >
              <div className={styles.planCardHeader}>
                <div>
                  <h2 className={styles.planName}>{plan.name}</h2>
                  <p className={styles.planPriceMain}>{price.main}</p>
                  {price.sub ? (
                    <p className={styles.planPriceSub}>{price.sub}</p>
                  ) : null}
                </div>
                <PlanBadge plan={plan.tier} />
              </div>

              <ul className={styles.planFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              {cta.action === 'signup' ? (
                <Link
                  className={`${styles.planCta} ${styles.planCtaPrimary}`}
                  to={ROUTES.SIGNUP}
                >
                  {cta.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`${styles.planCta} ${
                    cta.disabled
                      ? styles.planCtaDisabled
                      : styles.planCtaPrimary
                  }`}
                  disabled={cta.disabled}
                  onClick={() => handlePlanAction(cta.action, openPaywall)}
                >
                  {cta.label}
                </button>
              )}
            </article>
          )
        })}
      </div>

      <section className={styles.comparisonSection}>
        <h2 className={styles.comparisonTitle}>
          {PRICING_COPY.COMPARISON_TITLE}
        </h2>
        <div className={styles.comparisonTableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Free</th>
                <th scope="col">Pro</th>
                <th scope="col">Business</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_COMPARISON_ROWS.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td>{row.free}</td>
                  <td>{row.pro}</td>
                  <td>{row.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
