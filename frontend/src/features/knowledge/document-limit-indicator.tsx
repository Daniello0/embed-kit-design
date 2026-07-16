import { useAppStore } from '@/common/stores/app.store'
import type { Document } from '@/common/types/document.types'
import {
  formatDocumentLimitLabel,
  isDocumentLimitReached,
} from './knowledge.utils'
import styles from './knowledge.module.css'

interface DocumentLimitIndicatorProps {
  botId: string
}

const EMPTY_DOCUMENTS: Document[] = []

/**
 * Shows current document usage against the plan limit.
 */
export function DocumentLimitIndicator({ botId }: DocumentLimitIndicatorProps) {
  const plan = useAppStore((state) => state.user.plan)
  const documents = useAppStore(
    (state) => state.documents[botId] ?? EMPTY_DOCUMENTS,
  )
  const label = formatDocumentLimitLabel(documents.length, plan)
  const atLimit = isDocumentLimitReached(documents.length, plan)

  return (
    <p
      className={`${styles.limitIndicator} ${atLimit ? styles.limitIndicatorWarning : ''}`}
    >
      {label}
    </p>
  )
}
