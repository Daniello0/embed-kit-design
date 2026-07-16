import { Navigate, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
import { AuthPage, RequireAuth } from '@/features/auth'
import { AnalyticsRoute } from '@/features/analytics'
import { DashboardPage } from '@/features/dashboard'
import { MainPage } from '@/features/main-page/main-page'
import { PricingPage } from '@/features/pricing'
import {
  ApiSettings,
  BillingSettings,
  ProfileSettings,
  SettingsLayout,
  TeamSettings,
} from '@/features/settings'

/**
 * Application route definitions.
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainPage />,
  },
  {
    path: ROUTES.PRICING,
    element: <PricingPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <AuthPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <AuthPage />,
  },
  {
    path: ROUTES.APP,
    element: (
      <RequireAuth>
        <DashboardPage />
      </RequireAuth>
    ),
  },
  {
    path: '/app/bot/:botId/analytics',
    element: (
      <RequireAuth>
        <AnalyticsRoute />
      </RequireAuth>
    ),
  },
  {
    path: '/app/settings',
    element: (
      <RequireAuth>
        <SettingsLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.SETTINGS_PROFILE} replace />,
      },
      {
        path: 'profile',
        element: <ProfileSettings />,
      },
      {
        path: 'billing',
        element: <BillingSettings />,
      },
      {
        path: 'team',
        element: <TeamSettings />,
      },
      {
        path: 'api',
        element: <ApiSettings />,
      },
    ],
  },
])
