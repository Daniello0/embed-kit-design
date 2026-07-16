import { Link } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { useAppStore } from '@/common/stores/app.store'
import { isUserAuthenticated } from '@/features/auth/auth.utils'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Landing page header with logo and auth-aware navigation.
 */
export function LandingHeader() {
  const user = useAppStore((state) => state.user)
  const authenticated = isUserAuthenticated(user)

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={ROUTES.HOME}>
        {APP_NAME}
      </Link>
      {authenticated ? (
        <Link className={styles.logInLink} to={ROUTES.APP}>
          {LANDING_COPY.START_APP}
        </Link>
      ) : (
        <Link className={styles.logInLink} to={ROUTES.LOGIN}>
          {LANDING_COPY.LOG_IN}
        </Link>
      )}
    </header>
  )
}
