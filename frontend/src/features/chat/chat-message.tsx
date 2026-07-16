import type { ChatMessage as ChatMessageType } from '@/common/types/chat-message.types'
import { MessageRole } from '@/common/enums/message-role.enum'
import { CHAT_COPY } from './chat.constants'
import styles from './chat.module.css'

interface ChatMessageProps {
  message: ChatMessageType
}

/**
 * User or assistant bubble with citation chips.
 */
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === MessageRole.USER
  const messageClass = isUser ? styles.messageUser : styles.messageAssistant
  const bubbleClass = isUser ? styles.bubbleUser : styles.bubbleAssistant

  return (
    <article className={messageClass} aria-label={`${message.role} message`}>
      <div className={bubbleClass}>{message.content}</div>
      {!isUser && message.citations.length > 0 ? (
        <ul className={styles.citations} aria-label={CHAT_COPY.CITATION_LABEL}>
          {message.citations.map((citation) => (
            <li key={`${citation.documentId}-${citation.excerpt}`}>
              <span className={styles.citationChip}>
                <span className={styles.citationName}>
                  {citation.documentName}
                </span>
                <span className={styles.citationExcerpt}>
                  {citation.excerpt}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
