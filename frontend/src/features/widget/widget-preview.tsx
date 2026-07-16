import { useMemo, useState } from 'react'
import { useAppStore } from '@/common/stores/app.store'
import { WIDGET_COPY } from './widget.constants'
import { createDefaultWidgetConfig, shouldShowWatermark } from './widget.utils'
import styles from './widget.module.css'

interface WidgetPreviewProps {
  botId: string
}

/**
 * Live floating chat bubble preview on a mock page.
 */
export function WidgetPreview({ botId }: WidgetPreviewProps) {
  const plan = useAppStore((state) => state.user.plan)
  const storedConfigEntry = useAppStore((state) => state.widgetConfigs[botId])
  const config = useMemo(
    () => storedConfigEntry ?? createDefaultWidgetConfig(botId),
    [storedConfigEntry, botId],
  )
  const [isOpen, setIsOpen] = useState(true)
  const showWatermark = shouldShowWatermark(plan, config.showWatermark)

  return (
    <div className={styles.previewFrame}>
      <div className={styles.browserChrome}>
        <div className={styles.browserDots} aria-hidden="true">
          <span className={styles.browserDot} />
          <span className={styles.browserDot} />
          <span className={styles.browserDot} />
        </div>
        <div className={styles.browserUrl}>https://your-site.com</div>
      </div>

      <div className={styles.mockContent}>
        <h3 className={styles.mockHeading}>{WIDGET_COPY.MOCK_PAGE_TITLE}</h3>
        <p className={styles.mockBody}>{WIDGET_COPY.MOCK_PAGE_BODY}</p>
      </div>

      <div className={styles.widgetLayer}>
        {isOpen ? (
          <section
            className={styles.widgetPanel}
            aria-label="Widget chat preview"
          >
            <header className={styles.panelHeader}>
              <h4 className={styles.panelHeaderTitle}>Chat</h4>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close widget preview"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </header>
            <div className={styles.panelBody}>
              <p className={styles.welcomeBubble}>{config.welcomeMessage}</p>
              {config.suggestedQuestions.length > 0 ? (
                <div className={styles.questionPills}>
                  {config.suggestedQuestions.map((question) => (
                    <span key={question} className={styles.questionPill}>
                      {question}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {showWatermark ? (
              <p className={styles.watermark}>{WIDGET_COPY.WATERMARK_LABEL}</p>
            ) : null}
          </section>
        ) : null}

        <button
          type="button"
          className={styles.widgetBubble}
          style={{ backgroundColor: config.bubbleColor }}
          aria-label="Open widget preview"
          onClick={() => setIsOpen((open) => !open)}
        >
          💬
        </button>
      </div>
    </div>
  )
}
