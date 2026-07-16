import { useState } from 'react'
import { PublicPageHeader } from '@/common/components/public-page-header'
import { BillingPeriod } from '@/common/enums/billing-period.enum'
import { PRICING_COPY } from './pricing.constants'
import { BillingToggle } from './billing-toggle'
import { PricingTable } from './pricing-table'
import styles from './pricing.module.css'

/**
 * Standalone public pricing page.
 */
export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState(BillingPeriod.MONTHLY)

  return (
    <div className={styles.page}>
      <PublicPageHeader backHomeLabel={PRICING_COPY.BACK_HOME} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{PRICING_COPY.PAGE_TITLE}</h1>
          <p className={styles.description}>{PRICING_COPY.PAGE_DESCRIPTION}</p>
          <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
        </section>

        <PricingTable billingPeriod={billingPeriod} />

        <p className={styles.footerNote}>{PRICING_COPY.NO_CREDIT_CARD}</p>
      </main>
    </div>
  )
}
