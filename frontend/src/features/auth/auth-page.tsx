import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { useAppStore } from '@/common/stores/app.store'
import { AuthForm } from './auth-form'
import { AUTH_COPY } from './auth.constants'
import {
  getAuthPageMeta,
  isUserAuthenticated,
  resolveAuthViewFromPath,
} from './auth.utils'
import { GoogleAuthButton } from './google-auth-button'
import styles from './auth.module.css'

/**
 * Sign up and log in page layout.
 */
export function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppStore((state) => state.user)
  const view = resolveAuthViewFromPath(location.pathname)

  if (!view) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  if (isUserAuthenticated(user)) {
    return <Navigate to={ROUTES.APP} replace />
  }

  const meta = getAuthPageMeta(view)

  const handleSuccess = () => {
    navigate(ROUTES.APP)
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link className={styles.logo} to={ROUTES.HOME}>
          {APP_NAME}
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.heading}>{meta.heading}</h1>

          <AuthForm view={view} onSuccess={handleSuccess} />

          <p className={styles.divider}>{AUTH_COPY.DIVIDER}</p>

          <GoogleAuthButton onSuccess={handleSuccess} />

          <p className={styles.toggle}>
            {meta.togglePrompt}
            <Link className={styles.toggleLink} to={meta.alternateRoute}>
              {meta.toggleLinkLabel}
            </Link>
          </p>

          <p className={styles.footerNote}>{AUTH_COPY.NO_CREDIT_CARD}</p>
        </div>
      </main>
    </div>
  )
}
