import { DocumentStatus } from '@/common/enums/document-status.enum'
import type { Document } from '@/common/types/document.types'
import { KNOWLEDGE_COPY } from './knowledge.constants'
import { getDocumentStatusLabel } from './knowledge.utils'
import styles from './knowledge.module.css'

interface DocumentRowProps {
  document: Document
  onRemove: (documentId: string) => void
}

/**
 * Returns the status badge class for a document state.
 */
function getStatusClassName(status: DocumentStatus): string {
  switch (status) {
    case DocumentStatus.UPLOADING:
      return styles.statusUploading
    case DocumentStatus.PROCESSING:
      return styles.statusProcessing
    case DocumentStatus.READY:
      return styles.statusReady
    case DocumentStatus.ERROR:
      return styles.statusError
    default:
      return styles.statusProcessing
  }
}

/**
 * Single document row with name, format, status, and remove action.
 */
export function DocumentRow({ document, onRemove }: DocumentRowProps) {
  return (
    <li className={styles.documentRow}>
      <div className={styles.documentMeta}>
        <p className={styles.documentName}>{document.fileName}</p>
        <p className={styles.documentFormat}>{document.format}</p>
      </div>

      <div className={styles.documentActions}>
        <span
          className={`${styles.statusBadge} ${getStatusClassName(document.status)}`}
        >
          {getDocumentStatusLabel(document.status)}
        </span>
        <button
          type="button"
          className={styles.ghostButton}
          aria-label={`${KNOWLEDGE_COPY.REMOVE_BUTTON}: ${document.fileName}`}
          onClick={() => onRemove(document.id)}
        >
          {KNOWLEDGE_COPY.REMOVE_BUTTON}
        </button>
      </div>
    </li>
  )
}
