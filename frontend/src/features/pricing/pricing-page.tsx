import { useState } from 'react'
import { Link } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { BillingPeriod } from '@/common/enums/billing-period.enum'
import { BillingToggle } from './billing-toggle'
import { PRICING_COPY } from './pricing.constants'
import { PricingTable } from './pricing-table'
import styles from './pricing.module.css'

/**
 * Standalone public pricing page.
 */
export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState(BillingPeriod.MONTHLY)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} to={ROUTES.HOME}>
          {APP_NAME}
        </Link>
        <div className={styles.headerActions}>
          <Link className={styles.headerLink} to={ROUTES.HOME}>
            {PRICING_COPY.BACK_HOME}
          </Link>
          <Link className={styles.headerLinkAccent} to={ROUTES.LOGIN}>
            {PRICING_COPY.LOG_IN}
          </Link>
        </div>
      </header>

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
