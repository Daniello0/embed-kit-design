import { Link, Navigate, Outlet, useParams } from 'react-router-dom'
import { BotNav } from '@/common/components/bot-nav'
import { ROUTES } from '@/common/constants/routes.constants'
import { useAppStore } from '@/common/stores/app.store'
import { AppShell } from './app-shell'
import { DASHBOARD_COPY } from './dashboard.constants'
import styles from './dashboard.module.css'

/**
 * Layout for bot-scoped routes with shell navigation and tab bar.
 */
export function BotLayout() {
  const { botId } = useParams()
  const plan = useAppStore((state) => state.user.plan)
  const bot = useAppStore((state) =>
    state.bots.find((entry) => entry.id === botId),
  )

  if (!botId || !bot) {
    return <Navigate to={ROUTES.APP} replace />
  }

  return (
    <AppShell title={bot.name}>
      <Link className={styles.backLink} to={ROUTES.APP}>
        {DASHBOARD_COPY.BACK_TO_BOTS}
      </Link>
      <BotNav botId={botId} plan={plan} />
      <Outlet />
    </AppShell>
  )
}
