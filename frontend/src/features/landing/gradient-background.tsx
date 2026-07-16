import { LANDING_IMAGES } from './landing.constants'
import styles from './landing.module.css'

/**
 * Hero image backdrop for the top of the landing page.
 */
export function GradientBackground() {
  return (
    <div
      className={styles.heroBackground}
      style={{ backgroundImage: `url(${LANDING_IMAGES.HERO})` }}
      aria-hidden="true"
    />
  )
}
