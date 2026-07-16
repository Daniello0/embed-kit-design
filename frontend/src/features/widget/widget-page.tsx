import { WidgetPreview } from './widget-preview'
import { WidgetSettings } from './widget-settings'
import { WIDGET_COPY } from './widget.constants'
import styles from './widget.module.css'

interface WidgetPageProps {
  botId: string
}

/**
 * Widget builder page with settings and live preview.
 */
export function WidgetPage({ botId }: WidgetPageProps) {
  return (
    <section className={styles.widgetPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>{WIDGET_COPY.PAGE_TITLE}</h1>
        <p className={styles.description}>{WIDGET_COPY.PAGE_DESCRIPTION}</p>
      </header>

      <div className={styles.settingsPanel}>
        <h2 className={styles.panelTitle}>{WIDGET_COPY.SETTINGS_TITLE}</h2>
        <p className={styles.panelHint}>
          Changes apply to the preview after you save.
        </p>
        <WidgetSettings botId={botId} />
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
