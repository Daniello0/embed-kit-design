import { describe, expect, it, beforeEach } from 'vitest'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
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
})
