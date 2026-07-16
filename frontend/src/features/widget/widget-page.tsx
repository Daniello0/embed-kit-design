import { useUpgradeNavigation } from '@/common/hooks/use-upgrade-navigation'
import { useAppStore } from '@/common/stores/app.store'
import { WidgetCustomizationGate } from './widget-customization-gate'
import { WidgetPreview } from './widget-preview'
import { WidgetSettings } from './widget-settings'
import { WIDGET_COPY } from './widget.constants'
import { isWidgetBrandingLocked } from './widget.utils'
import styles from './widget.module.css'

interface WidgetPageProps {
  botId: string
}

/**
 * Widget builder page with settings and live preview.
 */
export function WidgetPage({ botId }: WidgetPageProps) {
  const plan = useAppStore((state) => state.user.plan)
  const navigateToPricing = useUpgradeNavigation()
  const customizationLocked = isWidgetBrandingLocked(plan)

  return (
    <section className={styles.widgetPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>{WIDGET_COPY.PAGE_TITLE}</h1>
        <p className={styles.description}>{WIDGET_COPY.PAGE_DESCRIPTION}</p>
      </header>

      <div className={styles.settingsPanel}>
        <WidgetCustomizationGate
          locked={customizationLocked}
          onUpgradeClick={navigateToPricing}
        >
          <h2 className={styles.panelTitle}>{WIDGET_COPY.SETTINGS_TITLE}</h2>
          <p className={styles.panelHint}>
            Changes apply to the preview after you save.
          </p>
          <WidgetSettings botId={botId} />
        </WidgetCustomizationGate>
      </div>

      <div className={styles.previewPanel}>
        <div>
          <h2 className={styles.panelTitle}>{WIDGET_COPY.PREVIEW_LABEL}</h2>
          <p className={styles.panelHint}>{WIDGET_COPY.PREVIEW_HINT}</p>
        </div>
        <WidgetPreview botId={botId} />
      </div>
    </section>
  )
}
