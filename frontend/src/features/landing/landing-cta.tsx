import { Link } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Start building CTA band linking to signup.
 */
export function LandingCta() {
  return (
    <section className={styles.ctaBand} aria-labelledby="cta-heading">
      <div className={styles.ctaInner}>
        <h2 id="cta-heading" className={styles.sectionTitle}>
          {LANDING_COPY.CTA_TITLE}
        </h2>
        <Link className={styles.ctaButton} to={ROUTES.SIGNUP}>
          {LANDING_COPY.CTA_TITLE}
        </Link>
        <p className={styles.ctaSubtext}>{LANDING_COPY.CTA_SUBTEXT}</p>
      </div>
    </section>
  )
}
