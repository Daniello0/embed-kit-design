import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Minimal static previews of upload, chat, and widget.
 */
export function ExamplesSection() {
  return (
    <section className={styles.section} aria-labelledby="examples-heading">
      <h2 id="examples-heading" className={styles.sectionTitle}>
        {LANDING_COPY.EXAMPLES_TITLE}
      </h2>

      <div className={styles.examplesGrid}>
        <article className={styles.exampleCard}>
          <div className={styles.examplePreview}>
            <div className={styles.uploadPreview}>
              <svg
                className={styles.uploadIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  d="M12 16V4m0 0L8 8m4-4 4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.uploadFile}>pricing.pdf</span>
              <span className={styles.uploadFile}>faq.docx</span>
            </div>
          </div>
          <p className={styles.exampleLabel}>{LANDING_COPY.EXAMPLE_UPLOAD}</p>
        </article>

        <article className={styles.exampleCard}>
          <div className={styles.examplePreview}>
            <div className={styles.chatPreview}>
              <div className={styles.chatBubble}>
                {LANDING_COPY.EXAMPLE_CHAT_MESSAGE}
              </div>
              <span className={styles.citationChip}>
                {LANDING_COPY.EXAMPLE_CITATION}
              </span>
            </div>
          </div>
          <p className={styles.exampleLabel}>{LANDING_COPY.EXAMPLE_CHAT}</p>
        </article>

        <article className={styles.exampleCard}>
          <div className={styles.examplePreview}>
            <div className={styles.widgetPreview}>
              <div className={styles.widgetBrowserBar}>
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
              </div>
              <span className={styles.widgetWatermark}>
                {LANDING_COPY.EXAMPLE_WATERMARK}
              </span>
              <span className={styles.widgetBubble} aria-hidden="true" />
            </div>
          </div>
          <p className={styles.exampleLabel}>{LANDING_COPY.EXAMPLE_WIDGET}</p>
        </article>
      </div>
    </section>
  )
}
