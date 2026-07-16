import { create } from 'zustand'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { MOCK_INITIAL_APP_STATE } from '@/common/constants/mock-seed.constants'
import type { AppDataState } from '@/common/types/app-state.types'
import type { WidgetConfig } from '@/common/types/widget-config.types'
import {
  createDefaultWidgetConfig,
  mergeWidgetConfig,
} from '@/features/widget/widget.utils'

interface AppState extends AppDataState {
  isReady: boolean
  setReady: (ready: boolean) => void
  getWidgetConfig: (botId: string) => WidgetConfig
  updateWidgetConfig: (
    botId: string,
    patch: Partial<Omit<WidgetConfig, 'botId'>>,
  ) => void
  openPaywall: (trigger: PaywallTrigger) => void
  closePaywall: () => void
}

/**
 * Global application store for cross-feature UI state.
 */
export const useAppStore = create<AppState>((set, get) => ({
  ...MOCK_INITIAL_APP_STATE,
  isReady: false,
  setReady: (ready) => set({ isReady: ready }),
  getWidgetConfig: (botId) => {
    const existing = get().widgetConfigs[botId]
    return existing ?? createDefaultWidgetConfig(botId)
  },
  updateWidgetConfig: (botId, patch) => {
    set((state) => {
      const current =
        state.widgetConfigs[botId] ?? createDefaultWidgetConfig(botId)
      return {
        widgetConfigs: {
          ...state.widgetConfigs,
          [botId]: mergeWidgetConfig(current, patch),
        },
      }
    })
  },
  openPaywall: (trigger) => {
    const { hasReachedAhaMoment } = get().ui
    if (!hasReachedAhaMoment) {
      return
    }

    set((state) => ({
      ui: {
        ...state.ui,
        paywallOpen: true,
        paywallTrigger: trigger,
      },
    }))
  },
  closePaywall: () => {
    set((state) => ({
      ui: {
        ...state.ui,
        paywallOpen: false,
        paywallTrigger: null,
      },
    }))
  },
}))

/**
 * Resets the store to the initial prototype state.
 */
export function resetAppStore(): void {
  useAppStore.setState({
    ...MOCK_INITIAL_APP_STATE,
    isReady: false,
  })
}
