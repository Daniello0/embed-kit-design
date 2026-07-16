import { BotNavTab } from '@/common/enums/bot-nav-tab.enum'
import { botRoutes } from '@/common/constants/routes.constants'

export const BOT_NAV_COPY = {
  ARIA_LABEL: 'Bot sections',
  LOCK_ICON: '🔒',
} as const

export interface BotNavTabConfig {
  id: BotNavTab
  label: string
  gated: boolean
}

export const BOT_NAV_TABS: BotNavTabConfig[] = [
  { id: BotNavTab.KNOWLEDGE, label: 'Knowledge', gated: false },
  { id: BotNavTab.CHAT, label: 'Test chat', gated: false },
  { id: BotNavTab.WIDGET, label: 'Widget', gated: false },
  { id: BotNavTab.DEPLOY, label: 'Deploy', gated: false },
  { id: BotNavTab.ANALYTICS, label: 'Analytics', gated: true },
]

/**
 * Builds the route path for a bot navigation tab.
 */
export function getBotNavTabPath(botId: string, tab: BotNavTab): string {
  switch (tab) {
    case BotNavTab.KNOWLEDGE:
      return botRoutes.knowledge(botId)
    case BotNavTab.CHAT:
      return botRoutes.chat(botId)
    case BotNavTab.WIDGET:
      return botRoutes.widget(botId)
    case BotNavTab.DEPLOY:
      return botRoutes.deploy(botId)
    case BotNavTab.ANALYTICS:
      return botRoutes.analytics(botId)
    default:
      return botRoutes.knowledge(botId)
  }
}
