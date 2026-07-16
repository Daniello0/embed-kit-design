import type { ReactNode } from 'react'
import { SETTINGS_COPY } from './settings.constants'
import styles from './settings.module.css'

interface SettingsGateProps {
  locked: boolean
  description: string
  onUpgradeClick: () => void
  children: ReactNode
}

/**
 * Upgrade overlay for Business-gated settings sections.
 */
export function SettingsGate({
  locked,
  description,
  onUpgradeClick,
  children,
}: SettingsGateProps) {
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
          <p className={styles.gateTitle}>{SETTINGS_COPY.GATE_TITLE}</p>
          <p className={styles.gateDescription}>{description}</p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onUpgradeClick}
          >
            {SETTINGS_COPY.GATE_CTA}
          </button>
        </div>
      </div>
    </div>
  )
}
