import { Navigate, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
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
    path: '/app/settings',
    element: <SettingsLayout />,
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
