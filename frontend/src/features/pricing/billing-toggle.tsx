import { BillingPeriod } from '@/common/enums/billing-period.enum'
import { PRICING_COPY } from './pricing.constants'
import styles from './pricing.module.css'

interface BillingToggleProps {
  value: BillingPeriod
  onChange: (period: BillingPeriod) => void
}

/**
 * Monthly and annual billing toggle.
 */
export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div
      className={styles.billingToggle}
      role="group"
      aria-label="Billing period"
    >
      <button
        type="button"
        className={`${styles.billingOption} ${
          value === BillingPeriod.MONTHLY ? styles.billingOptionActive : ''
        }`}
        aria-pressed={value === BillingPeriod.MONTHLY}
        onClick={() => onChange(BillingPeriod.MONTHLY)}
      >
        {PRICING_COPY.BILLING_MONTHLY}
      </button>
      <button
        type="button"
        className={`${styles.billingOption} ${
          value === BillingPeriod.ANNUAL ? styles.billingOptionActive : ''
        }`}
        aria-pressed={value === BillingPeriod.ANNUAL}
        onClick={() => onChange(BillingPeriod.ANNUAL)}
      >
        {PRICING_COPY.BILLING_ANNUAL}
        <span className={styles.billingBadge}>
          {PRICING_COPY.BILLING_ANNUAL_BADGE}
        </span>
      </button>
    </div>
  )
}
