import type { ReactNode } from 'react'
import styles from './action-tooltip.module.css'

interface ActionTooltipProps {
  label: string
  children: ReactNode
}

/**
 * Hover tooltip wrapper for compact icon actions.
 */
export function ActionTooltip({ label, children }: ActionTooltipProps) {
  return (
    <span className={styles.wrapper}>
      {children}
      <span className={styles.tooltip} role="tooltip">
        {label}
      </span>
    </span>
  )
}
