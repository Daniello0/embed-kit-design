import { useMemo } from 'react'
import { useAppStore } from '@/common/stores/app.store'
import { createDefaultWidgetConfig } from '@/features/widget/widget.utils'
import { CHAT_COPY } from './chat.constants'
import { getVisibleSuggestedQuestions } from './chat.utils'
import styles from './chat.module.css'

interface SuggestedQuestionsProps {
  botId: string
  onSelect: (question: string) => void
  disabled?: boolean
}

/**
 * Clickable suggested question pills.
 */
export function SuggestedQuestions({
  botId,
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  const plan = useAppStore((state) => state.user.plan)
  const storedConfig = useAppStore((state) => state.widgetConfigs[botId])
  const config = useMemo(
    () => storedConfig ?? createDefaultWidgetConfig(botId),
    [storedConfig, botId],
  )
  const questions = getVisibleSuggestedQuestions(config, plan)

  if (questions.length === 0) {
    return null
  }

  return (
    <div className={styles.suggestedQuestions}>
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          className={styles.suggestedQuestion}
          disabled={disabled}
          onClick={() => onSelect(question)}
        >
          {question}
        </button>
      ))}
    </div>
  )
}

interface SuggestedQuestionsSectionProps extends SuggestedQuestionsProps {
  showTitle?: boolean
}

/**
 * Empty-state wrapper for suggested questions.
 */
export function SuggestedQuestionsSection({
  showTitle = true,
  ...props
}: SuggestedQuestionsSectionProps) {
  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyHint}>{CHAT_COPY.EMPTY_STATE_HINT}</p>
      {showTitle ? (
        <h2 className={styles.suggestedTitle}>
          {CHAT_COPY.SUGGESTED_QUESTIONS_TITLE}
        </h2>
      ) : null}
      <SuggestedQuestions {...props} />
    </div>
  )
}
