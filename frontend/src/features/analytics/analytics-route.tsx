import { Navigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'
import { AnalyticsPage } from './analytics-page'

/**
 * Resolves the analytics page from the bot route param.
 */
export function AnalyticsRoute() {
  const { botId } = useParams()

  if (!botId) {
    return <Navigate to={ROUTES.APP} replace />
  }

  return <AnalyticsPage botId={botId} />
}
