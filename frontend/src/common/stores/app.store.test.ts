import { describe, expect, it, beforeEach, vi } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { MOCK_DOCUMENTS } from '@/common/constants/mock-documents.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { MOCK_CHAT_RESPONSES } from '@/common/constants/mock-responses.constants'
import { KNOWLEDGE_UPLOAD_DELAY_MS } from '@/features/knowledge/knowledge.constants'
import { resetAppStore, useAppStore } from './app.store'

describe('useAppStore', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('updates ready state', () => {
    useAppStore.getState().setReady(true)
    expect(useAppStore.getState().isReady).toBe(true)
  })

  it('returns default widget config for unknown bots', () => {
    const config = useAppStore.getState().getWidgetConfig(MOCK_IDS.BOT)

    expect(config.botId).toBe(MOCK_IDS.BOT)
    expect(config.welcomeMessage.length).toBeGreaterThan(0)
  })

  it('merges widget config updates', () => {
    useAppStore.getState().updateWidgetConfig(MOCK_IDS.BOT, {
      welcomeMessage: 'Updated greeting',
    })

    const config = useAppStore.getState().widgetConfigs[MOCK_IDS.BOT]
    expect(config?.welcomeMessage).toBe('Updated greeting')
  })

  it('opens paywall only after the aha moment', () => {
    useAppStore.getState().openPaywall(PaywallTrigger.WIDGET_BRANDING)
    expect(useAppStore.getState().ui.paywallOpen).toBe(false)

    useAppStore.setState((state) => ({
      ui: { ...state.ui, hasReachedAhaMoment: true },
    }))
    useAppStore.getState().openPaywall(PaywallTrigger.WIDGET_BRANDING)

    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe(
      PaywallTrigger.WIDGET_BRANDING,
    )
  })

  it('adds a document and advances it through mock processing', () => {
    vi.useFakeTimers()
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    const file = new File(['content'], 'support.pdf', {
      type: 'application/pdf',
    })
    const added = useAppStore.getState().addDocument(MOCK_IDS.BOT, file)

    expect(added).toBe(true)
    expect(useAppStore.getState().documents[MOCK_IDS.BOT]).toHaveLength(4)
    expect(useAppStore.getState().documents[MOCK_IDS.BOT]?.[3]?.status).toBe(
      DocumentStatus.UPLOADING,
    )

    vi.advanceTimersByTime(KNOWLEDGE_UPLOAD_DELAY_MS.UPLOADING)
    expect(useAppStore.getState().documents[MOCK_IDS.BOT]?.[3]?.status).toBe(
      DocumentStatus.PROCESSING,
    )

    vi.advanceTimersByTime(KNOWLEDGE_UPLOAD_DELAY_MS.PROCESSING)
    expect(useAppStore.getState().documents[MOCK_IDS.BOT]?.[3]?.status).toBe(
      DocumentStatus.READY,
    )

    vi.useRealTimers()
  })

  it('blocks uploads when the document limit is reached', () => {
    useAppStore.setState({
      ...MOCK_DEMO_APP_STATE,
      documents: {
        [MOCK_IDS.BOT]: Array.from({ length: 5 }, (_, index) => ({
          ...MOCK_DOCUMENTS[MOCK_IDS.BOT][0],
          id: `doc-${index}`,
          fileName: `file-${index}.pdf`,
        })),
      },
      ui: { ...MOCK_DEMO_APP_STATE.ui, hasReachedAhaMoment: true },
    })

    const file = new File(['content'], 'extra.pdf', { type: 'application/pdf' })
    const added = useAppStore.getState().addDocument(MOCK_IDS.BOT, file)

    expect(added).toBe(false)
    expect(useAppStore.getState().documents[MOCK_IDS.BOT]).toHaveLength(5)
    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe(
      PaywallTrigger.DOCUMENT_LIMIT,
    )
  })

  it('removes a document and updates the bot count', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)
    const documentId = MOCK_DOCUMENTS[MOCK_IDS.BOT][0]?.id

    useAppStore.getState().removeDocument(MOCK_IDS.BOT, documentId)

    expect(useAppStore.getState().documents[MOCK_IDS.BOT]).toHaveLength(2)
    expect(useAppStore.getState().bots[0]?.documentCount).toBe(2)
  })

  it('creates a bot and sets it as active', () => {
    const created = useAppStore.getState().createBot('Help Desk')

    expect(created).toBe(true)
    expect(useAppStore.getState().bots).toHaveLength(1)
    expect(useAppStore.getState().bots[0]?.name).toBe('Help Desk')
    expect(useAppStore.getState().ui.activeBotId).toBe(
      useAppStore.getState().bots[0]?.id,
    )
  })

  it('blocks a second bot and opens the paywall after the aha moment', () => {
    useAppStore.setState({
      ...MOCK_DEMO_APP_STATE,
      ui: { ...MOCK_DEMO_APP_STATE.ui, hasReachedAhaMoment: true },
    })

    const created = useAppStore.getState().createBot('Second Bot')

    expect(created).toBe(false)
    expect(useAppStore.getState().bots).toHaveLength(1)
    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe(
      PaywallTrigger.SECOND_BOT,
    )
  })

  it('updates bot name and avatar', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    useAppStore.getState().updateBot(MOCK_IDS.BOT, {
      name: 'Updated Assistant',
      avatarUrl: '/new-avatar.png',
    })

    expect(useAppStore.getState().bots[0]?.name).toBe('Updated Assistant')
    expect(useAppStore.getState().bots[0]?.avatarUrl).toBe('/new-avatar.png')
  })

  it('rejects empty chat messages', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    const sent = useAppStore.getState().sendMessage(MOCK_IDS.BOT, '   ')

    expect(sent).toBe(false)
    expect(useAppStore.getState().chat[MOCK_IDS.BOT]).toBeUndefined()
  })

  it('logs in with email and defaults to the Free plan', () => {
    useAppStore.getState().login('Demo@EmbedKit.IO')

    expect(useAppStore.getState().user.id).not.toBeNull()
    expect(useAppStore.getState().user.email).toBe('demo@embedkit.io')
    expect(useAppStore.getState().user.plan).toBe(PlanTier.FREE)
  })

  it('logs in with Google using the mock account email', () => {
    useAppStore.getState().loginWithGoogle()

    expect(useAppStore.getState().user.email).toBe('google.user@embedkit.io')
    expect(useAppStore.getState().user.id).not.toBeNull()
  })

  it('logs out and clears authenticated state', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    useAppStore.getState().logout()

    expect(useAppStore.getState().user.id).toBeNull()
    expect(useAppStore.getState().user.email).toBeNull()
    expect(useAppStore.getState().bots).toHaveLength(0)
  })

  it('queues a mock assistant reply after sending a message', () => {
    vi.useFakeTimers()
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    const sent = useAppStore
      .getState()
      .sendMessage(MOCK_IDS.BOT, 'What are your pricing plans?')

    expect(sent).toBe(true)
    expect(useAppStore.getState().chat[MOCK_IDS.BOT]).toHaveLength(1)
    expect(useAppStore.getState().chatTypingByBotId[MOCK_IDS.BOT]).toBe(true)

    vi.advanceTimersByTime(MOCK_CHAT_RESPONSES[0]?.delayMs ?? 1200)

    expect(useAppStore.getState().chat[MOCK_IDS.BOT]).toHaveLength(2)
    expect(useAppStore.getState().chat[MOCK_IDS.BOT]?.[1]?.role).toBe(
      'assistant',
    )
    expect(useAppStore.getState().chatTypingByBotId[MOCK_IDS.BOT]).toBe(false)
    expect(useAppStore.getState().ui.hasReachedAhaMoment).toBe(true)

    vi.useRealTimers()
  })
})
