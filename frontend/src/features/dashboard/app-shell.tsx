import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { PlanBadge } from '@/common/components/plan-badge'
import { useAppStore } from '@/common/stores/app.store'
import { DASHBOARD_COPY } from './dashboard.constants'
import styles from './dashboard.module.css'

interface AppShellProps {
  title: string
  children: ReactNode
}

/**
 * App shell with top bar, plan badge, and user menu.
 */
export function AppShell({ title, children }: AppShellProps) {
  const navigate = useNavigate()
  const plan = useAppStore((state) => state.user.plan)
  const email = useAppStore((state) => state.user.email)
  const logout = useAppStore((state) => state.logout)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.HOME)
  }

  return (
    <div className={styles.dashboardPage}>
      <header className={styles.topBar}>
        <Link className={styles.logo} to={ROUTES.APP}>
          {APP_NAME}
        </Link>
        <h1 className={styles.pageTitle}>{title}</h1>
        <div className={styles.topBarActions}>
          <PlanBadge plan={plan} />
          <div className={styles.userMenu}>
            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label={DASHBOARD_COPY.USER_MENU_LABEL}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {email ?? 'Account'}
            </button>
            {menuOpen ? (
              <div className={styles.menuDropdown} role="menu">
                <Link
                  className={styles.menuLink}
                  to={ROUTES.SETTINGS_PROFILE}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  {DASHBOARD_COPY.SETTINGS}
                </Link>
                <button
                  type="button"
                  className={styles.menuAction}
                  role="menuitem"
                  onClick={handleLogout}
                >
                  {DASHBOARD_COPY.LOG_OUT}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  )
}
