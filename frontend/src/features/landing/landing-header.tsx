import { Link } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Landing page header with logo and Log in link.
 */
export function LandingHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={ROUTES.HOME}>
        {APP_NAME}
      </Link>
      <Link className={styles.logInLink} to={ROUTES.LOGIN}>
        {LANDING_COPY.LOG_IN}
      </Link>
    </header>
  )
}
