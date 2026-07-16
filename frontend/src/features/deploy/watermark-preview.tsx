import { useMemo } from 'react'
import { useUpgradeNavigation } from '@/common/hooks/use-upgrade-navigation'
import { useAppStore } from '@/common/stores/app.store'
import { createDefaultWidgetConfig } from '@/features/widget/widget.utils'
import { DEPLOY_COPY } from './deploy.constants'
import { isEmbedWatermarkLocked } from './deploy.utils'
import styles from './deploy.module.css'

interface WatermarkPreviewProps {
  botId: string
}

interface MiniWidgetPreviewProps {
  showWatermark: boolean
  label: string
  welcomeMessage: string
  bubbleColor: string
  locked?: boolean
  onUpgradeClick?: () => void
}

/**
 * Renders a compact widget preview for watermark comparison.
 */
function MiniWidgetPreview({
  showWatermark,
  label,
  welcomeMessage,
  bubbleColor,
  locked = false,
  onUpgradeClick,
}: MiniWidgetPreviewProps) {
  return (
    <article
      className={`${styles.previewCard} ${locked ? styles.previewCardLocked : ''}`}
    >
      <h3 className={styles.previewLabel}>{label}</h3>
      <div className={styles.previewFrame}>
        <div className={styles.previewContent}>
          <h4 className={styles.previewHeading}>
            {DEPLOY_COPY.MOCK_PAGE_TITLE}
          </h4>
          <p className={styles.previewBody}>
            Visitors see your chat bubble floating above page content.
          </p>
        </div>

        <section className={styles.widgetPanel} aria-hidden="true">
          <header className={styles.widgetPanelHeader}>Chat</header>
          <div className={styles.widgetPanelBody}>
            <p className={styles.welcomeBubble}>{welcomeMessage}</p>
          </div>
          {showWatermark ? (
            <p className={styles.watermark}>{DEPLOY_COPY.WATERMARK_LABEL}</p>
          ) : null}
        </section>

        <button
          type="button"
          className={styles.widgetBubble}
          style={{ backgroundColor: bubbleColor }}
          aria-hidden="true"
          tabIndex={-1}
        >
          💬
        </button>

        {locked ? (
          <div className={styles.lockOverlay}>
            <div className={styles.lockCard}>
              <p className={styles.lockDescription}>
                {DEPLOY_COPY.REMOVE_WATERMARK_DESCRIPTION}
              </p>
              <button
                type="button"
                className={styles.upgradeButton}
                onClick={onUpgradeClick}
              >
                {DEPLOY_COPY.REMOVE_WATERMARK_CTA}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

/**
 * Side-by-side watermark on and off preview.
 */
export function WatermarkPreview({ botId }: WatermarkPreviewProps) {
  const plan = useAppStore((state) => state.user.plan)
  const navigateToPricing = useUpgradeNavigation()
  const storedConfigEntry = useAppStore((state) => state.widgetConfigs[botId])
  const config = useMemo(
    () => storedConfigEntry ?? createDefaultWidgetConfig(botId),
    [storedConfigEntry, botId],
  )
  const watermarkLocked = isEmbedWatermarkLocked(plan)

  return (
    <div className={styles.previewGrid}>
      <MiniWidgetPreview
        showWatermark
        label={DEPLOY_COPY.WITH_WATERMARK_LABEL}
        welcomeMessage={config.welcomeMessage}
        bubbleColor={config.bubbleColor}
      />
      <MiniWidgetPreview
        showWatermark={false}
        label={DEPLOY_COPY.WITHOUT_WATERMARK_LABEL}
        welcomeMessage={config.welcomeMessage}
        bubbleColor={config.bubbleColor}
        locked={watermarkLocked}
        onUpgradeClick={navigateToPricing}
      />
    </div>
  )
}
