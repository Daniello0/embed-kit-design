import { useMemo, useState } from 'react'
import { useAppStore } from '@/common/stores/app.store'
import type { WidgetConfig } from '@/common/types/widget-config.types'
import { WIDGET_COPY } from './widget.constants'
import {
  createDefaultWidgetConfig,
  getSuggestedQuestionLimit,
} from './widget.utils'
import styles from './widget.module.css'

interface WidgetSettingsProps {
  botId: string
  onApplied?: (config: WidgetConfig) => void
}

interface WidgetDraft {
  bubbleColor: string
  welcomeMessage: string
  suggestedQuestions: string[]
}

interface WidgetSettingsFormProps {
  botId: string
  initialConfig: WidgetConfig
  onApplied?: (config: WidgetConfig) => void
}

/**
 * Builds editable widget settings from the stored config.
 */
function createDraft(config: WidgetConfig): WidgetDraft {
  return {
    bubbleColor: config.bubbleColor,
    welcomeMessage: config.welcomeMessage,
    suggestedQuestions: [...config.suggestedQuestions],
  }
}

function WidgetSettingsForm({
  botId,
  initialConfig,
  onApplied,
}: WidgetSettingsFormProps) {
  const plan = useAppStore((state) => state.user.plan)
  const updateWidgetConfig = useAppStore((state) => state.updateWidgetConfig)
  const [draft, setDraft] = useState(() => createDraft(initialConfig))
  const [saved, setSaved] = useState(false)
  const questionLimit = getSuggestedQuestionLimit(plan)
  const canAddQuestion = draft.suggestedQuestions.length < questionLimit

  const handleApply = () => {
    const trimmedQuestions = draft.suggestedQuestions
      .map((question) => question.trim())
      .filter(Boolean)
      .slice(0, questionLimit)

    const nextConfig = {
      bubbleColor: draft.bubbleColor,
      welcomeMessage:
        draft.welcomeMessage.trim() || WIDGET_COPY.WELCOME_MESSAGE_PLACEHOLDER,
      suggestedQuestions: trimmedQuestions,
    }

    updateWidgetConfig(botId, nextConfig)
    onApplied?.({ ...initialConfig, ...nextConfig })
    setSaved(true)
  }

  const updateQuestion = (index: number, value: string) => {
    setDraft((current) => ({
      ...current,
      suggestedQuestions: current.suggestedQuestions.map(
        (question, questionIndex) =>
          questionIndex === index ? value : question,
      ),
    }))
    setSaved(false)
  }

  const removeQuestion = (index: number) => {
    setDraft((current) => ({
      ...current,
      suggestedQuestions: current.suggestedQuestions.filter(
        (_, questionIndex) => questionIndex !== index,
      ),
    }))
    setSaved(false)
  }

  const addQuestion = () => {
    if (!canAddQuestion) {
      return
    }

    setDraft((current) => ({
      ...current,
      suggestedQuestions: [...current.suggestedQuestions, ''],
    }))
    setSaved(false)
  }

  return (
    <form
      className={styles.settingsForm}
      onSubmit={(event) => {
        event.preventDefault()
        handleApply()
      }}
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`bubble-color-${botId}`}>
          {WIDGET_COPY.BUBBLE_COLOR_LABEL}
        </label>
        <div className={styles.colorRow}>
          <input
            id={`bubble-color-${botId}`}
            className={styles.colorInput}
            type="color"
            value={draft.bubbleColor}
            onChange={(event) => {
              setDraft((current) => ({
                ...current,
                bubbleColor: event.target.value,
              }))
              setSaved(false)
            }}
          />
          <span className={styles.colorValue}>
            {draft.bubbleColor.toUpperCase()}
          </span>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`welcome-message-${botId}`}>
          {WIDGET_COPY.WELCOME_MESSAGE_LABEL}
        </label>
        <textarea
          id={`welcome-message-${botId}`}
          className={styles.textArea}
          value={draft.welcomeMessage}
          placeholder={WIDGET_COPY.WELCOME_MESSAGE_PLACEHOLDER}
          onChange={(event) => {
            setDraft((current) => ({
              ...current,
              welcomeMessage: event.target.value,
            }))
            setSaved(false)
          }}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>
          {WIDGET_COPY.SUGGESTED_QUESTIONS_LABEL}
        </span>
        <p className={styles.hint}>{WIDGET_COPY.SUGGESTED_QUESTIONS_HINT}</p>
        <ul className={styles.questionList}>
          {draft.suggestedQuestions.map((question, index) => (
            <li key={`question-${index}`} className={styles.questionRow}>
              <input
                className={styles.textInput}
                value={question}
                placeholder={WIDGET_COPY.QUESTION_PLACEHOLDER}
                onChange={(event) => updateQuestion(index, event.target.value)}
              />
              <button
                type="button"
                className={styles.removeButton}
                aria-label={`Remove question ${index + 1}`}
                onClick={() => removeQuestion(index)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.addButton}
          disabled={!canAddQuestion}
          onClick={addQuestion}
        >
          {WIDGET_COPY.ADD_QUESTION}
        </button>
      </div>

      <button type="submit" className={styles.applyButton}>
        {WIDGET_COPY.APPLY_BUTTON}
      </button>
      {saved ? (
        <p className={styles.savedNotice}>{WIDGET_COPY.APPLIED_TOAST}</p>
      ) : null}
    </form>
  )
}

/**
 * Widget color, welcome message, and suggested questions.
 */
export function WidgetSettings({ botId, onApplied }: WidgetSettingsProps) {
  const storedConfigEntry = useAppStore((state) => state.widgetConfigs[botId])
  const initialConfig = useMemo(
    () => storedConfigEntry ?? createDefaultWidgetConfig(botId),
    [storedConfigEntry, botId],
  )

  return (
    <WidgetSettingsForm
      key={botId}
      botId={botId}
      initialConfig={initialConfig}
      onApplied={onApplied}
    />
  )
}
