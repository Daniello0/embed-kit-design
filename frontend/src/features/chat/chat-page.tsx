import { ChatInput } from './chat-input'
import { ChatThread } from './chat-thread'
import { CHAT_COPY } from './chat.constants'
import styles from './chat.module.css'

interface ChatPageProps {
  botId: string
}

/**
 * Test chat page for previewing bot answers from uploaded documents.
 */
export function ChatPage({ botId }: ChatPageProps) {
  return (
    <section className={styles.chatPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>{CHAT_COPY.PAGE_TITLE}</h1>
        <p className={styles.description}>{CHAT_COPY.PAGE_DESCRIPTION}</p>
      </header>

      <div className={styles.chatLayout}>
        <ChatThread botId={botId} />
        <ChatInput botId={botId} />
      </div>
    </section>
  )
}
