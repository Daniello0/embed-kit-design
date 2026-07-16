import type { ReactNode } from 'react'
import { WIDGET_COPY } from './widget.constants'
import styles from './widget.module.css'

interface WidgetCustomizationGateProps {
  locked: boolean
  onUpgradeClick: () => void
  children: ReactNode
}

/**
 * Blurred widget customization panel with upgrade CTA.
 */
export function WidgetCustomizationGate({
  locked,
  onUpgradeClick,
  children,
}: WidgetCustomizationGateProps) {
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
          <span className={styles.gateLockIcon} aria-hidden="true">
            🔒
          </span>
          <p className={styles.gateTitle}>{WIDGET_COPY.BRANDING_LOCK_TITLE}</p>
          <p className={styles.gateDescription}>
            {WIDGET_COPY.BRANDING_LOCK_DESCRIPTION}
          </p>
          <button
            type="button"
            className={styles.gateUpgradeButton}
            onClick={onUpgradeClick}
          >
            {WIDGET_COPY.BRANDING_LOCK_CTA}
          </button>
        </div>
      </div>
    </div>
  )
}
