import styles from './landing.module.css'

/**
 * Curved pink and purple stripe bands for the hero.
 */
export function GradientBackground() {
  return (
    <div className={styles.gradientBackground} aria-hidden="true">
      <div className={styles.gradientBandPink} />
      <div className={styles.gradientBandPurple} />
    </div>
  )
}
