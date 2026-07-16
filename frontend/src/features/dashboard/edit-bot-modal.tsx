import { useState, type FormEvent } from 'react'
import { useAppStore } from '@/common/stores/app.store'
import type { Bot } from '@/common/types/bot.types'
import { DASHBOARD_COPY } from './dashboard.constants'
import { validateBotName } from './dashboard.utils'
import styles from './dashboard.module.css'

interface EditBotFormProps {
  bot: Bot
  onClose: () => void
}

/**
 * Edit form keyed by bot id so fields reset when the target changes.
 */
function EditBotForm({ bot, onClose }: EditBotFormProps) {
  const updateBot = useAppStore((state) => state.updateBot)
  const [name, setName] = useState(bot.name)
  const [avatarUrl, setAvatarUrl] = useState(bot.avatarUrl ?? '')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateBotName(name)) {
      setErrorMessage(DASHBOARD_COPY.INVALID_NAME)
      return
    }

    updateBot(bot.id, {
      name,
      avatarUrl: avatarUrl.trim() || null,
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.formField}>
        <span className={styles.fieldLabel}>
          {DASHBOARD_COPY.BOT_NAME_LABEL}
        </span>
        <input
          className={styles.fieldInput}
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setErrorMessage(null)
          }}
        />
      </label>
      <label className={styles.formField}>
        <span className={styles.fieldLabel}>{DASHBOARD_COPY.AVATAR_LABEL}</span>
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
          {DASHBOARD_COPY.SUBMIT_EDIT}
        </button>
      </div>
    </form>
  )
}

interface EditBotModalProps {
  bot: Bot | null
  onClose: () => void
}

/**
 * Modal to edit bot name and avatar.
 */
export function EditBotModal({ bot, onClose }: EditBotModalProps) {
  if (!bot) {
    return null
  }

  return (
    <div className={styles.modalOverlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="edit-bot-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="edit-bot-title" className={styles.modalTitle}>
          {DASHBOARD_COPY.MODAL_EDIT_TITLE}
        </h2>
        <EditBotForm key={bot.id} bot={bot} onClose={onClose} />
      </div>
    </div>
  )
}
