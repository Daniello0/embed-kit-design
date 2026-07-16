import { create } from 'zustand'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { AUTH_MOCK } from '@/features/auth/auth.constants'
import { createAuthenticatedUser } from '@/features/auth/auth.utils'
import { MOCK_INITIAL_APP_STATE } from '@/common/constants/mock-seed.constants'
import { MOCK_CHAT_RESPONSES } from '@/common/constants/mock-responses.constants'
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
import { getMockResponseOrFallback } from '@/common/utils/mock-chat.utils'
import {
  createAssistantMessage,
  createUserMessage,
} from '@/features/chat/chat.utils'

interface AppState extends AppDataState {
  isReady: boolean
  chatTypingByBotId: Record<string, boolean>
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
  deleteBot: (botId: string) => void
  openPaywall: (trigger: PaywallTrigger) => void
  closePaywall: () => void
  sendMessage: (botId: string, text: string) => boolean
  login: (email: string) => void
  loginWithGoogle: () => void
  logout: () => void
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
 * Schedules a mock assistant reply for a user message.
 */
function scheduleAssistantReply(botId: string, query: string): void {
  const response = getMockResponseOrFallback(query, MOCK_CHAT_RESPONSES)

  window.setTimeout(() => {
    const assistantMessage = createAssistantMessage(
      response.content,
      response.citations,
    )

    useAppStore.setState((state) => ({
      chat: {
        ...state.chat,
        [botId]: [...(state.chat[botId] ?? []), assistantMessage],
      },
      chatTypingByBotId: {
        ...state.chatTypingByBotId,
        [botId]: false,
      },
      ui: state.ui.hasReachedAhaMoment
        ? state.ui
        : {
            ...state.ui,
            hasReachedAhaMoment: true,
          },
    }))
  }, response.delayMs)
}

/**
 * Global application store for cross-feature UI state.
 */
export const useAppStore = create<AppState>((set, get) => ({
  ...MOCK_INITIAL_APP_STATE,
  isReady: false,
  chatTypingByBotId: {},
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
  deleteBot: (botId) => {
    set((currentState) => {
      const nextDocuments = { ...currentState.documents }
      delete nextDocuments[botId]

      const nextChat = { ...currentState.chat }
      delete nextChat[botId]

      const nextWidgetConfigs = { ...currentState.widgetConfigs }
      delete nextWidgetConfigs[botId]

      const nextBots = currentState.bots.filter((bot) => bot.id !== botId)
      const wasActiveBot = currentState.ui.activeBotId === botId

      return {
        bots: nextBots,
        documents: nextDocuments,
        chat: nextChat,
        widgetConfigs: nextWidgetConfigs,
        ui: {
          ...currentState.ui,
          activeBotId: wasActiveBot
            ? (nextBots[0]?.id ?? null)
            : currentState.ui.activeBotId,
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
  sendMessage: (botId, text) => {
    const trimmed = text.trim()
    if (!trimmed) {
      return false
    }

    const userMessage = createUserMessage(trimmed)

    set((state) => ({
      chat: {
        ...state.chat,
        [botId]: [...(state.chat[botId] ?? []), userMessage],
      },
      chatTypingByBotId: {
        ...state.chatTypingByBotId,
        [botId]: true,
      },
    }))

    scheduleAssistantReply(botId, trimmed)
    return true
  },
  login: (email) => {
    set({ user: createAuthenticatedUser(email) })
  },
  loginWithGoogle: () => {
    set({ user: createAuthenticatedUser(AUTH_MOCK.GOOGLE_EMAIL) })
  },
  logout: () => {
    set({
      ...MOCK_INITIAL_APP_STATE,
      isReady: get().isReady,
      chatTypingByBotId: {},
    })
  },
}))

/**
 * Resets the store to the initial prototype state.
 */
export function resetAppStore(): void {
  useAppStore.setState({
    ...MOCK_INITIAL_APP_STATE,
    isReady: false,
    chatTypingByBotId: {},
  })
}
