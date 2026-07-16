import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
import { useAppStore } from '@/common/stores/app.store'
import { isUserAuthenticated } from './auth.utils'

interface RequireAuthProps {
  children: ReactNode
}

/**
 * Redirects guests to the login screen.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const user = useAppStore((state) => state.user)

  if (!isUserAuthenticated(user)) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <>{children}</>
}
