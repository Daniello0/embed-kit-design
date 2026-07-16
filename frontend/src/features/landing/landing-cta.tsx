import { Link } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
import { useAppStore } from '@/common/stores/app.store'
import { isUserAuthenticated } from '@/features/auth/auth.utils'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Start building CTA band linking to signup or the app.
 */
export function LandingCta() {
  const user = useAppStore((state) => state.user)
  const authenticated = isUserAuthenticated(user)
  const ctaHref = authenticated ? ROUTES.APP : ROUTES.SIGNUP
  const ctaLabel = authenticated
    ? LANDING_COPY.START_APP
    : LANDING_COPY.CTA_TITLE

  return (
    <section className={styles.ctaBand} aria-label={LANDING_COPY.CTA_TITLE}>
      <div className={styles.ctaInner}>
        <Link id="cta-button" className={styles.ctaButton} to={ctaHref}>
          {ctaLabel}
        </Link>
        <p className={styles.ctaSubtext}>{LANDING_COPY.CTA_SUBTEXT}</p>
      </div>
    </section>
  )
}
