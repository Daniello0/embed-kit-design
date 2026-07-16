import type { AppDataState } from '@/common/types/app-state.types'
import { MOCK_BOTS } from './mock-bots.constants'
import { MOCK_DOCUMENTS } from './mock-documents.constants'
import { MOCK_GUEST_USER, MOCK_USER } from './mock-user.constants'
import { MOCK_WIDGET_CONFIGS } from './mock-widget.constants'

/** Default prototype state for unauthenticated visitors. */
export const MOCK_INITIAL_APP_STATE: AppDataState = {
  user: MOCK_GUEST_USER,
  bots: [],
  documents: {},
  chat: {},
  widgetConfigs: {},
  ui: {
    activeBotId: null,
    paywallOpen: false,
    paywallTrigger: null,
    upgradeBannerDismissed: false,
    hasReachedAhaMoment: false,
  },
}

/** Pre-populated demo state after mock sign-in. */
export const MOCK_DEMO_APP_STATE: AppDataState = {
  user: {
    id: MOCK_USER.id,
    email: MOCK_USER.email,
    plan: MOCK_USER.plan,
  },
  bots: MOCK_BOTS,
  documents: MOCK_DOCUMENTS,
  chat: {},
  widgetConfigs: MOCK_WIDGET_CONFIGS,
  ui: {
    activeBotId: MOCK_BOTS[0]?.id ?? null,
    paywallOpen: false,
    paywallTrigger: null,
    upgradeBannerDismissed: false,
    hasReachedAhaMoment: false,
  },
}
