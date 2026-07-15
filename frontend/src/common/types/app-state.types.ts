import type { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import type { PlanTier } from '@/common/enums/plan-tier.enum'
import type { Bot } from '@/common/types/bot.types'
import type { ChatMessage } from '@/common/types/chat-message.types'
import type { Document } from '@/common/types/document.types'
import type { WidgetConfig } from '@/common/types/widget-config.types'

export interface AppUiState {
  activeBotId: string | null
  paywallOpen: boolean
  paywallTrigger: PaywallTrigger | null
  upgradeBannerDismissed: boolean
  hasReachedAhaMoment: boolean
}

export interface AppUserState {
  id: string | null
  email: string | null
  plan: PlanTier
}

export interface AppDataState {
  user: AppUserState
  bots: Bot[]
  documents: Record<string, Document[]>
  chat: Record<string, ChatMessage[]>
  widgetConfigs: Record<string, WidgetConfig>
  ui: AppUiState
}
