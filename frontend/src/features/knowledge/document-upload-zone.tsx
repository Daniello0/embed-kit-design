import { useRef, useState, type DragEvent } from 'react'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { useAppStore } from '@/common/stores/app.store'
import type { Document } from '@/common/types/document.types'
import { KNOWLEDGE_COPY } from './knowledge.constants'
import { isDocumentLimitReached } from './knowledge.utils'
import styles from './knowledge.module.css'

interface DocumentUploadZoneProps {
  botId: string
}

const EMPTY_DOCUMENTS: Document[] = []

/**
 * Uploads each dropped or selected file through the store.
 */
function uploadFiles(
  botId: string,
  files: FileList | File[],
  addDocument: (botId: string, file: File) => boolean,
): boolean {
  const fileArray = Array.from(files)
  let hasInvalidFile = false

  for (const file of fileArray) {
    const added = addDocument(botId, file)

    if (!added && fileArray.length === 1) {
      hasInvalidFile = true
    }
  }

  return hasInvalidFile
}

/**
 * Drag-and-drop upload zone for PDF, TXT, and DOCX.
 */
export function DocumentUploadZone({ botId }: DocumentUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const plan = useAppStore((state) => state.user.plan)
  const documents = useAppStore(
    (state) => state.documents[botId] ?? EMPTY_DOCUMENTS,
  )
  const addDocument = useAppStore((state) => state.addDocument)
  const openPaywall = useAppStore((state) => state.openPaywall)
  const atLimit = isDocumentLimitReached(documents.length, plan)

  const handleFiles = (files: FileList | File[]) => {
    setErrorMessage(null)

    if (atLimit) {
      openPaywall(PaywallTrigger.DOCUMENT_LIMIT)
      return
    }

    const hasInvalidFile = uploadFiles(botId, files, addDocument)

    if (hasInvalidFile) {
      setErrorMessage(KNOWLEDGE_COPY.INVALID_TYPE)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragActive(false)

    if (event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files)
    }
  }

  return (
    <div>
      <div
        className={`${styles.uploadZone} ${isDragActive ? styles.uploadZoneActive : ''}`}
        onDragEnter={(event) => {
          event.preventDefault()
          setIsDragActive(true)
        }}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragActive(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          setIsDragActive(false)
        }}
        onDrop={handleDrop}
      >
        <span className={styles.uploadIcon} aria-hidden="true">
          📄
        </span>
        <p className={styles.uploadTitle}>
          {isDragActive
            ? KNOWLEDGE_COPY.DROP_ACTIVE
            : KNOWLEDGE_COPY.EMPTY_STATE}
        </p>
        <p className={styles.uploadHint}>{KNOWLEDGE_COPY.UPLOAD_HINT}</p>
        <p className={styles.uploadFormats}>
          {KNOWLEDGE_COPY.ACCEPTED_FORMATS}
        </p>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => inputRef.current?.click()}
        >
          {KNOWLEDGE_COPY.BROWSE_BUTTON}
        </button>
        <input
          ref={inputRef}
          className={styles.hiddenInput}
          type="file"
          accept=".pdf,.txt,.docx"
          multiple
          onChange={(event) => {
            if (event.target.files) {
              handleFiles(event.target.files)
              event.target.value = ''
            }
          }}
        />
      </div>

      {errorMessage ? (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      ) : null}

      {atLimit ? (
        <div className={styles.upgradeBanner}>
          <div className={styles.upgradeCopy}>
            <p className={styles.upgradeTitle}>
              {KNOWLEDGE_COPY.UPGRADE_BANNER_TITLE}
            </p>
            <p className={styles.upgradeDescription}>
              {KNOWLEDGE_COPY.UPGRADE_BANNER_DESCRIPTION}
            </p>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => openPaywall(PaywallTrigger.DOCUMENT_LIMIT)}
          >
            {KNOWLEDGE_COPY.UPGRADE_BANNER_CTA}
          </button>
        </div>
      ) : null}
    </div>
  )
}
