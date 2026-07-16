import { NavLink } from 'react-router-dom'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { BotNavTab } from '@/common/enums/bot-nav-tab.enum'
import {
  BOT_NAV_COPY,
  BOT_NAV_TABS,
  getBotNavTabPath,
} from '@/common/constants/bot-nav.constants'
import styles from './bot-nav.module.css'

interface BotNavProps {
  botId: string
  plan: PlanTier
}

/**
 * Returns whether a bot nav tab should show a lock icon.
 */
function isBotNavTabLocked(tab: BotNavTab, plan: PlanTier): boolean {
  if (tab === BotNavTab.ANALYTICS) {
    return plan === PlanTier.FREE
  }

  return false
}

/**
 * Tab bar for bot sub-routes.
 */
export function BotNav({ botId, plan }: BotNavProps) {
  return (
    <nav className={styles.nav} aria-label={BOT_NAV_COPY.ARIA_LABEL}>
      {BOT_NAV_TABS.map((tab) => {
        const locked = tab.gated && isBotNavTabLocked(tab.id, plan)

        return (
          <NavLink
            key={tab.id}
            to={getBotNavTabPath(botId, tab.id)}
            className={({ isActive }) =>
              `${styles.tabLink} ${isActive ? styles.tabLinkActive : ''}`
            }
          >
            <span className={styles.tabLabel}>{tab.label}</span>
            {locked ? (
              <span className={styles.lockIcon} aria-hidden="true">
                {BOT_NAV_COPY.LOCK_ICON}
              </span>
            ) : null}
          </NavLink>
        )
      })}
    </nav>
  )
}
