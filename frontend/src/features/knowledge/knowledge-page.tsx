import { DocumentLimitIndicator } from './document-limit-indicator'
import { DocumentList } from './document-list'
import { DocumentUploadZone } from './document-upload-zone'
import { KNOWLEDGE_COPY } from './knowledge.constants'
import styles from './knowledge.module.css'

interface KnowledgePageProps {
  botId: string
}

/**
 * Knowledge base page for uploading and managing bot documents.
 */
export function KnowledgePage({ botId }: KnowledgePageProps) {
  return (
    <section className={styles.knowledgePage}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{KNOWLEDGE_COPY.PAGE_TITLE}</h1>
          <p className={styles.description}>
            {KNOWLEDGE_COPY.PAGE_DESCRIPTION}
          </p>
        </div>
        <DocumentLimitIndicator botId={botId} />
      </header>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>{KNOWLEDGE_COPY.UPLOAD_TITLE}</h2>
        </div>
        <DocumentUploadZone botId={botId} />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            {KNOWLEDGE_COPY.DOCUMENTS_TITLE}
          </h2>
        </div>
        <DocumentList botId={botId} />
      </div>
    </section>
  )
}
