import { useState, type FormEvent } from 'react'
import { useAppStore } from '@/common/stores/app.store'
import { DASHBOARD_COPY } from './dashboard.constants'
import { validateBotName } from './dashboard.utils'
import styles from './dashboard.module.css'

interface CreateBotModalProps {
  open: boolean
  onClose: () => void
}

/**
 * Modal to create a bot with name and optional avatar.
 */
export function CreateBotModal({ open, onClose }: CreateBotModalProps) {
  const createBot = useAppStore((state) => state.createBot)
  const [name, setName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!open) {
    return null
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateBotName(name)) {
      setErrorMessage(DASHBOARD_COPY.INVALID_NAME)
      return
    }

    const created = createBot(name, avatarUrl || null)

    if (created) {
      setName('')
      setAvatarUrl('')
      setErrorMessage(null)
      onClose()
    }
  }

  return (
    <div className={styles.modalOverlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="create-bot-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="create-bot-title" className={styles.modalTitle}>
          {DASHBOARD_COPY.MODAL_CREATE_TITLE}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.formField}>
            <span className={styles.fieldLabel}>
              {DASHBOARD_COPY.BOT_NAME_LABEL}
            </span>
            <input
              className={styles.fieldInput}
              value={name}
              placeholder={DASHBOARD_COPY.BOT_NAME_PLACEHOLDER}
              onChange={(event) => {
                setName(event.target.value)
                setErrorMessage(null)
              }}
            />
          </label>
          <label className={styles.formField}>
            <span className={styles.fieldLabel}>
              {DASHBOARD_COPY.AVATAR_LABEL}
            </span>
            <input
              className={styles.fieldInput}
              value={avatarUrl}
              placeholder={DASHBOARD_COPY.AVATAR_PLACEHOLDER}
              onChange={(event) => setAvatarUrl(event.target.value)}
            />
          </label>
          {errorMessage ? (
            <p className={styles.formError} role="alert">
              {errorMessage}
            </p>
          ) : null}
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
            >
              {DASHBOARD_COPY.CANCEL}
            </button>
            <button type="submit" className={styles.primaryButton}>
              {DASHBOARD_COPY.SUBMIT_CREATE}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
