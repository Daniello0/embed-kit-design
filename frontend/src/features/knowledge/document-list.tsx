import { useAppStore } from '@/common/stores/app.store'
import type { Document } from '@/common/types/document.types'
import { KNOWLEDGE_COPY } from './knowledge.constants'
import { DocumentRow } from './document-row'
import styles from './knowledge.module.css'

interface DocumentListProps {
  botId: string
}

const EMPTY_DOCUMENTS: Document[] = []

/**
 * List of uploaded documents with status badges.
 */
export function DocumentList({ botId }: DocumentListProps) {
  const documents = useAppStore(
    (state) => state.documents[botId] ?? EMPTY_DOCUMENTS,
  )
  const removeDocument = useAppStore((state) => state.removeDocument)

  if (documents.length === 0) {
    return <p className={styles.emptyState}>{KNOWLEDGE_COPY.DOCUMENTS_EMPTY}</p>
  }

  return (
    <ul className={styles.documentList}>
      {documents.map((document) => (
        <DocumentRow
          key={document.id}
          document={document}
          onRemove={(documentId) => removeDocument(botId, documentId)}
        />
      ))}
    </ul>
  )
}
