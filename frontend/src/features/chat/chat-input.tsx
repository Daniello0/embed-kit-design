import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { useAppStore } from '@/common/stores/app.store'
import { CHAT_COPY } from './chat.constants'
import styles from './chat.module.css'

interface ChatInputProps {
  botId: string
}

/**
 * Text input and send button for chat.
 */
export function ChatInput({ botId }: ChatInputProps) {
  const sendMessage = useAppStore((state) => state.sendMessage)
  const isTyping = useAppStore(
    (state) => state.chatTypingByBotId[botId] ?? false,
  )
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const sent = sendMessage(botId, value)
    if (sent) {
      setValue('')
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form className={styles.inputBar} onSubmit={handleFormSubmit}>
      <textarea
        className={styles.textarea}
        value={value}
        placeholder={CHAT_COPY.INPUT_PLACEHOLDER}
        aria-label={CHAT_COPY.INPUT_PLACEHOLDER}
        disabled={isTyping}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className={styles.sendButton}
        aria-label={CHAT_COPY.SEND_BUTTON}
        disabled={isTyping || value.trim().length === 0}
      >
        {CHAT_COPY.SEND_BUTTON}
      </button>
    </form>
  )
}
