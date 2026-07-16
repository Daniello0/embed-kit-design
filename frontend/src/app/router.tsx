import { Navigate, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
import { AnalyticsPage } from '@/features/analytics/analytics-page'
import { AuthPage, RequireAuth } from '@/features/auth'
import { ChatPage } from '@/features/chat'
import { BotLayout, BotRoutePage, DashboardPage } from '@/features/dashboard'
import { DeployPage } from '@/features/deploy'
import { KnowledgePage } from '@/features/knowledge'
import { MainPage } from '@/features/main-page/main-page'
import { PricingPage } from '@/features/pricing'
import {
  ApiSettings,
  BillingSettings,
  ProfileSettings,
  SettingsLayout,
  TeamSettings,
} from '@/features/settings'
import { WidgetPage } from '@/features/widget'

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
    path: '/app/bot/:botId',
    element: (
      <RequireAuth>
        <BotLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="knowledge" replace />,
      },
      {
        path: 'knowledge',
        element: <BotRoutePage Page={KnowledgePage} />,
      },
      {
        path: 'chat',
        element: <BotRoutePage Page={ChatPage} />,
      },
      {
        path: 'widget',
        element: <BotRoutePage Page={WidgetPage} />,
      },
      {
        path: 'deploy',
        element: <BotRoutePage Page={DeployPage} />,
      },
      {
        path: 'analytics',
        element: <BotRoutePage Page={AnalyticsPage} />,
      },
    ],
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
