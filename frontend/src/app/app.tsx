import { RouterProvider } from 'react-router-dom'
import { router } from './router'

/**
 * Root application component.
 */
export function App() {
  return <RouterProvider router={router} />
}
