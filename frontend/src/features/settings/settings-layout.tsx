import type { MouseEvent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { useAppStore } from '@/common/stores/app.store'
import { SETTINGS_COPY, SETTINGS_TABS } from './settings.constants'
import { shouldBlockSettingsTab } from './settings.utils'
import styles from './settings.module.css'

/**
 * Settings page with sidebar tabs.
 */
export function SettingsLayout() {
  const plan = useAppStore((state) => state.user.plan)
  const openPaywall = useAppStore((state) => state.openPaywall)

  const handleTabClick = (
    tabId: (typeof SETTINGS_TABS)[number]['id'],
    paywallTrigger: PaywallTrigger | null,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (!shouldBlockSettingsTab(tabId, plan) || !paywallTrigger) {
      return
    }

    event.preventDefault()
    openPaywall(paywallTrigger)
  }

  return (
    <section className={styles.settingsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>{SETTINGS_COPY.PAGE_TITLE}</h1>
        <p className={styles.description}>{SETTINGS_COPY.PAGE_DESCRIPTION}</p>
      </header>

      <nav className={styles.sidebar} aria-label="Settings">
        {SETTINGS_TABS.map((tab) => {
          const locked = shouldBlockSettingsTab(tab.id, plan)

          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                `${styles.tabLink} ${isActive ? styles.tabLinkActive : ''}`
              }
              onClick={(event) =>
                handleTabClick(tab.id, tab.paywallTrigger, event)
              }
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              {tab.gated && locked ? (
                <span className={styles.lockIcon} aria-hidden="true">
                  🔒
                </span>
              ) : null}
            </NavLink>
          )
        })}
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </section>
  )
}
