import { Link } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Hero with product name, tagline, and primary CTA.
 */
export function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>{APP_NAME}</h1>
      <p className={styles.heroTagline}>{LANDING_COPY.HERO_TAGLINE}</p>
      <Link className={styles.heroCta} to={ROUTES.SIGNUP}>
        {LANDING_COPY.HERO_CTA}
      </Link>
    </section>
  )
}
