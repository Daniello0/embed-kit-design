import { MOCK_TOP_QUESTIONS } from '@/common/constants/mock-analytics.constants'
import styles from './analytics.module.css'

/**
 * Ranked list of the most frequently asked questions.
 */
export function AnalyticsTopQuestions() {
  return (
    <ol className={styles.questionList}>
      {MOCK_TOP_QUESTIONS.map((entry, index) => (
        <li key={entry.question} className={styles.questionItem}>
          <span className={styles.questionRank}>{index + 1}</span>
          <div className={styles.questionContent}>
            <p className={styles.questionText}>{entry.question}</p>
            <p className={styles.questionCount}>
              {entry.count.toLocaleString('en-US')} asks
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
