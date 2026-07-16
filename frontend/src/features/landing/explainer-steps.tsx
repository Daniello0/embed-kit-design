import { EXPLAINER_STEPS, LANDING_COPY } from './landing.constants'
import {
  ChatStepPreview,
  EmbedStepPreview,
  UploadStepPreview,
} from './explainer-step-previews'
import styles from './landing.module.css'

const STEP_ICONS: Record<string, string> = {
  upload: 'M12 16V4m0 0L8 8m4-4 4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  test: 'M8 10h8M8 14h5M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  embed: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
}

const STEP_PREVIEWS = {
  upload: UploadStepPreview,
  test: ChatStepPreview,
  embed: EmbedStepPreview,
} as const

/**
 * Vertical upload → test → embed explainer with large alternating previews.
 */
export function ExplainerSteps() {
  return (
    <section className={styles.section} aria-labelledby="explainer-heading">
      <h2 id="explainer-heading" className={styles.sectionTitle}>
        {LANDING_COPY.EXPLAINER_TITLE}
      </h2>

      <ol className={styles.explainerFlow}>
        {EXPLAINER_STEPS.map((step, index) => {
          const Preview = STEP_PREVIEWS[step.id as keyof typeof STEP_PREVIEWS]
          const reversed = index % 2 === 1

          return (
            <li
              key={step.id}
              className={
                reversed
                  ? styles.explainerFlowStepReverse
                  : styles.explainerFlowStep
              }
            >
              <div className={styles.explainerFlowVisual}>
                <Preview />
              </div>
              <div className={styles.explainerFlowContent}>
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
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
