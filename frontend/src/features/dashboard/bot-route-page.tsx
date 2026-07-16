import type { ComponentType } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/common/constants/routes.constants'

interface BotRoutePageProps {
  Page: ComponentType<{ botId: string }>
}

/**
 * Renders a bot-scoped page from the route param.
 */
export function BotRoutePage({ Page }: BotRoutePageProps) {
  const { botId } = useParams()

  if (!botId) {
    return <Navigate to={ROUTES.APP} replace />
  }

  return <Page botId={botId} />
}
