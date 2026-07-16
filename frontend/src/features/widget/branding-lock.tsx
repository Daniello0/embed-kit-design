import type { ReactNode } from 'react'
import { WIDGET_COPY } from './widget.constants'
import styles from './widget.module.css'

interface BrandingLockProps {
  locked: boolean
  onUpgradeClick: () => void
  children: ReactNode
}

/**
 * Upgrade tooltip overlay for gated branding controls.
 */
export function BrandingLock({
  locked,
  onUpgradeClick,
  children,
}: BrandingLockProps) {
  if (!locked) {
    return <>{children}</>
  }

  return (
    <div className={styles.lockWrapper}>
      {children}
      <div className={styles.lockOverlay} aria-hidden="true">
        <div className={styles.lockCard}>
          <span className={styles.lockIcon} aria-hidden="true">
            🔒
          </span>
          <p className={styles.lockTitle}>{WIDGET_COPY.BRANDING_LOCK_TITLE}</p>
          <p className={styles.lockDescription}>
            {WIDGET_COPY.BRANDING_LOCK_DESCRIPTION}
          </p>
          <button
            type="button"
            className={styles.upgradeButton}
            onClick={onUpgradeClick}
          >
            {WIDGET_COPY.BRANDING_LOCK_CTA}
          </button>
        </div>
      </div>
    </div>
  )
}
