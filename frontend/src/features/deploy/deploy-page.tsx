import { EmbedCodeBlock } from './embed-code-block'
import { WatermarkPreview } from './watermark-preview'
import { DEPLOY_COPY } from './deploy.constants'
import styles from './deploy.module.css'

interface DeployPageProps {
  botId: string
}

/**
 * Deploy page for copying the embed snippet and previewing branding.
 */
export function DeployPage({ botId }: DeployPageProps) {
  return (
    <section className={styles.deployPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>{DEPLOY_COPY.PAGE_TITLE}</h1>
        <p className={styles.description}>{DEPLOY_COPY.PAGE_DESCRIPTION}</p>
      </header>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>{DEPLOY_COPY.CODE_BLOCK_TITLE}</h2>
        <p className={styles.panelHint}>{DEPLOY_COPY.CODE_BLOCK_HINT}</p>
        <EmbedCodeBlock botId={botId} />
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>
          {DEPLOY_COPY.WATERMARK_PREVIEW_TITLE}
        </h2>
        <p className={styles.panelHint}>{DEPLOY_COPY.WATERMARK_PREVIEW_HINT}</p>
        <WatermarkPreview botId={botId} />
      </div>
    </section>
  )
}
