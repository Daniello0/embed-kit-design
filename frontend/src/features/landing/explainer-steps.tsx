import { EXPLAINER_STEPS, LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

const STEP_ICONS: Record<string, string> = {
  upload: 'M12 16V4m0 0L8 8m4-4 4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  test: 'M8 10h8M8 14h5M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  embed: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
}

/**
 * Upload, test, and embed three-step explainer.
 */
export function ExplainerSteps() {
  return (
    <section className={styles.section} aria-labelledby="explainer-heading">
      <h2 id="explainer-heading" className={styles.sectionTitle}>
        {LANDING_COPY.EXPLAINER_TITLE}
      </h2>

      <div className={styles.explainerGrid}>
        {EXPLAINER_STEPS.map((step) => (
          <article key={step.id} className={styles.explainerStep}>
            <div className={styles.stepIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  d={STEP_ICONS[step.id]}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
