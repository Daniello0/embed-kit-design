import { Link, useNavigate } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { useAppStore } from '@/common/stores/app.store'
import { isUserAuthenticated } from '@/features/auth/auth.utils'
import styles from './public-page-header.module.css'

interface PublicPageHeaderProps {
  backHomeLabel?: string
  showBackHome?: boolean
}

/**
 * Public page header with logo and auth-aware navigation actions.
 */
export function PublicPageHeader({
  backHomeLabel = 'Back to home',
  showBackHome = true,
}: PublicPageHeaderProps) {
  const navigate = useNavigate()
  const user = useAppStore((state) => state.user)
  const logout = useAppStore((state) => state.logout)
  const authenticated = isUserAuthenticated(user)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.HOME)
  }

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={ROUTES.HOME}>
        {APP_NAME}
      </Link>
      <div className={styles.actions}>
        {showBackHome ? (
          <Link className={styles.link} to={ROUTES.HOME}>
            {backHomeLabel}
          </Link>
        ) : null}
        {authenticated ? (
          <>
            <Link className={styles.linkAccent} to={ROUTES.APP}>
              Start app
            </Link>
            <span className={styles.userBadge}>{user.email}</span>
            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <Link className={styles.linkAccent} to={ROUTES.LOGIN}>
            Log in
          </Link>
        )}
      </div>
    </header>
  )
}
