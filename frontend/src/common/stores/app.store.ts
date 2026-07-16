import { create } from 'zustand'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { MOCK_INITIAL_APP_STATE } from '@/common/constants/mock-seed.constants'
import type { AppDataState } from '@/common/types/app-state.types'
import type { Bot } from '@/common/types/bot.types'
import type { WidgetConfig } from '@/common/types/widget-config.types'
import {
  canCreateBot,
  createBotRecord,
} from '@/features/dashboard/dashboard.utils'
import { KNOWLEDGE_UPLOAD_DELAY_MS } from '@/features/knowledge/knowledge.constants'
import {
  createDocumentFromFile,
  isDocumentLimitReached,
  isValidDocumentFile,
} from '@/features/knowledge/knowledge.utils'
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
  addDocument: (botId: string, file: File) => boolean
  removeDocument: (botId: string, documentId: string) => void
  createBot: (name: string, avatarUrl?: string | null) => boolean
  updateBot: (
    botId: string,
    patch: Partial<Pick<Bot, 'name' | 'avatarUrl'>>,
  ) => void
  openPaywall: (trigger: PaywallTrigger) => void
  closePaywall: () => void
}

/**
 * Updates a document status in the store.
 */
function patchDocumentStatus(
  state: AppDataState,
  botId: string,
  documentId: string,
  status: DocumentStatus,
): AppDataState['documents'] {
  const currentDocuments = state.documents[botId] ?? []

  return {
    ...state.documents,
    [botId]: currentDocuments.map((document) =>
      document.id === documentId ? { ...document, status } : document,
    ),
  }
}

/**
 * Schedules mock upload and processing transitions for a document.
 */
function scheduleDocumentProcessing(botId: string, documentId: string): void {
  window.setTimeout(() => {
    useAppStore.setState((state) => ({
      documents: patchDocumentStatus(
        state,
        botId,
        documentId,
        DocumentStatus.PROCESSING,
      ),
    }))
  }, KNOWLEDGE_UPLOAD_DELAY_MS.UPLOADING)

  window.setTimeout(() => {
    useAppStore.setState((state) => ({
      documents: patchDocumentStatus(
        state,
        botId,
        documentId,
        DocumentStatus.READY,
      ),
    }))
  }, KNOWLEDGE_UPLOAD_DELAY_MS.UPLOADING + KNOWLEDGE_UPLOAD_DELAY_MS.PROCESSING)
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
  addDocument: (botId, file) => {
    const state = get()
    const currentDocuments = state.documents[botId] ?? []

    if (isDocumentLimitReached(currentDocuments.length, state.user.plan)) {
      if (state.ui.hasReachedAhaMoment) {
        get().openPaywall(PaywallTrigger.DOCUMENT_LIMIT)
      }

      return false
    }

    if (!isValidDocumentFile(file)) {
      return false
    }

    const document = createDocumentFromFile(botId, file)

    set((currentState) => ({
      documents: {
        ...currentState.documents,
        [botId]: [...(currentState.documents[botId] ?? []), document],
      },
      bots: currentState.bots.map((bot) =>
        bot.id === botId
          ? {
              ...bot,
              documentCount: bot.documentCount + 1,
              updatedAt: new Date().toISOString(),
            }
          : bot,
      ),
    }))

    scheduleDocumentProcessing(botId, document.id)
    return true
  },
  removeDocument: (botId, documentId) => {
    set((currentState) => ({
      documents: {
        ...currentState.documents,
        [botId]: (currentState.documents[botId] ?? []).filter(
          (document) => document.id !== documentId,
        ),
      },
      bots: currentState.bots.map((bot) =>
        bot.id === botId
          ? {
              ...bot,
              documentCount: Math.max(0, bot.documentCount - 1),
              updatedAt: new Date().toISOString(),
            }
          : bot,
      ),
    }))
  },
  createBot: (name, avatarUrl) => {
    const state = get()

    if (!canCreateBot(state.bots.length, state.user.plan)) {
      if (state.ui.hasReachedAhaMoment) {
        get().openPaywall(PaywallTrigger.SECOND_BOT)
      }

      return false
    }

    const bot = createBotRecord(name, avatarUrl)

    set((currentState) => ({
      bots: [...currentState.bots, bot],
      ui: {
        ...currentState.ui,
        activeBotId: bot.id,
      },
    }))

    return true
  },
  updateBot: (botId, patch) => {
    set((currentState) => ({
      bots: currentState.bots.map((bot) =>
        bot.id === botId
          ? {
              ...bot,
              ...patch,
              name: patch.name?.trim() ?? bot.name,
              avatarUrl:
                patch.avatarUrl === undefined ? bot.avatarUrl : patch.avatarUrl,
              updatedAt: new Date().toISOString(),
            }
          : bot,
      ),
    }))
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
