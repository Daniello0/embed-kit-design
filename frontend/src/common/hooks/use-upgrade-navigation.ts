import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'

/**
 * Returns a handler that navigates to the pricing page.
 */
export function useUpgradeNavigation(): () => void {
  const navigate = useNavigate()

  return useCallback(() => {
    navigate(ROUTES.PRICING)
  }, [navigate])
}
