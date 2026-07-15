import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
import { MainPage } from '@/features/main-page/main-page'

/**
 * Application route definitions.
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainPage />,
  },
])
