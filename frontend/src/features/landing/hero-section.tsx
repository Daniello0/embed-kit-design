import { Link } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { useAppStore } from '@/common/stores/app.store'
import { isUserAuthenticated } from '@/features/auth/auth.utils'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Hero with product name, tagline, and primary CTA.
 */
export function HeroSection() {
  const user = useAppStore((state) => state.user)
  const authenticated = isUserAuthenticated(user)
  const ctaHref = authenticated ? ROUTES.APP : ROUTES.SIGNUP
  const ctaLabel = authenticated
    ? LANDING_COPY.START_APP
    : LANDING_COPY.HERO_CTA

  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>{APP_NAME}</h1>
      <p className={styles.heroTagline}>{LANDING_COPY.HERO_TAGLINE}</p>
      <Link className={styles.heroCta} to={ctaHref}>
        {ctaLabel}
      </Link>
    </section>
  )
}
