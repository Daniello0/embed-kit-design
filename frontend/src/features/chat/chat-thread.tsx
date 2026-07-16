import { useEffect, useRef } from 'react'
import type { ChatMessage as ChatMessageType } from '@/common/types/chat-message.types'
import { useAppStore } from '@/common/stores/app.store'
import { ChatMessage } from './chat-message'
import { SuggestedQuestionsSection } from './suggested-questions'
import { TypingIndicator } from './typing-indicator'
import { hasChatMessages } from './chat.utils'
import styles from './chat.module.css'

const EMPTY_MESSAGES: ChatMessageType[] = []

interface ChatThreadProps {
  botId: string
}

/**
 * Scrollable message list with auto-scroll.
 */
export function ChatThread({ botId }: ChatThreadProps) {
  const messages = useAppStore((state) => state.chat[botId] ?? EMPTY_MESSAGES)
  const isTyping = useAppStore(
    (state) => state.chatTypingByBotId[botId] ?? false,
  )
  const sendMessage = useAppStore((state) => state.sendMessage)
  const threadRef = useRef<HTMLDivElement>(null)
  const hasMessages = hasChatMessages(messages)

  useEffect(() => {
    const thread = threadRef.current
    if (!thread) {
      return
    }

    thread.scrollTop = thread.scrollHeight
  }, [messages, isTyping])

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(botId, question)
  }

  return (
    <div ref={threadRef} className={styles.thread}>
      {!hasMessages && !isTyping ? (
        <SuggestedQuestionsSection
          botId={botId}
          onSelect={handleSuggestedQuestion}
          disabled={isTyping}
        />
      ) : (
        <div className={styles.messageList}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping ? <TypingIndicator /> : null}
        </div>
      )}
    </div>
  )
}
