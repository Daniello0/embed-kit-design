import type { ReactNode } from 'react'
import { ANALYTICS_COPY } from './analytics.constants'
import styles from './analytics.module.css'

interface AnalyticsGateProps {
  locked: boolean
  onUpgradeClick: () => void
  children: ReactNode
}

/**
 * Blurred analytics state with upgrade CTA.
 */
export function AnalyticsGate({
  locked,
  onUpgradeClick,
  children,
}: AnalyticsGateProps) {
  if (!locked) {
    return <>{children}</>
  }

  return (
    <div className={styles.gateWrapper}>
      <div className={styles.gateContent} aria-hidden="true">
        {children}
      </div>
      <div className={styles.gateOverlay}>
        <div className={styles.gateCard}>
          <span className={styles.lockIcon} aria-hidden="true">
            🔒
          </span>
          <p className={styles.gateTitle}>{ANALYTICS_COPY.GATE_TITLE}</p>
          <p className={styles.gateDescription}>
            {ANALYTICS_COPY.GATE_DESCRIPTION}
          </p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onUpgradeClick}
          >
            {ANALYTICS_COPY.GATE_CTA}
          </button>
        </div>
      </div>
    </div>
  )
}
