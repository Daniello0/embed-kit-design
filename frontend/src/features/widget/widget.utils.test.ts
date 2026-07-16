import { describe, expect, it } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import {
  createDefaultWidgetConfig,
  getSuggestedQuestionLimit,
  isWidgetBrandingLocked,
  mergeWidgetConfig,
  shouldShowWatermark,
} from './widget.utils'

describe('createDefaultWidgetConfig', () => {
  it('returns a config with defaults for the given bot', () => {
    const config = createDefaultWidgetConfig(MOCK_IDS.BOT)

    expect(config.botId).toBe(MOCK_IDS.BOT)
    expect(config.bubbleColor).toBe('#EC4899')
    expect(config.welcomeMessage.length).toBeGreaterThan(0)
    expect(config.suggestedQuestions).toHaveLength(3)
    expect(config.showWatermark).toBe(true)
  })
})

describe('isWidgetBrandingLocked', () => {
  it('locks branding controls on the Free plan', () => {
    expect(isWidgetBrandingLocked(PlanTier.FREE)).toBe(true)
  })

  it('unlocks branding controls on paid plans', () => {
    expect(isWidgetBrandingLocked(PlanTier.PRO)).toBe(false)
    expect(isWidgetBrandingLocked(PlanTier.BUSINESS)).toBe(false)
  })
})

describe('shouldShowWatermark', () => {
  it('shows watermark on Free regardless of config flag', () => {
    expect(shouldShowWatermark(PlanTier.FREE, false)).toBe(true)
  })

  it('hides watermark on paid plans when config disables it', () => {
    expect(shouldShowWatermark(PlanTier.PRO, false)).toBe(false)
  })
})

describe('getSuggestedQuestionLimit', () => {
  it('limits Free plan to three questions', () => {
    expect(getSuggestedQuestionLimit(PlanTier.FREE)).toBe(3)
  })

  it('allows unlimited questions on Pro', () => {
    expect(getSuggestedQuestionLimit(PlanTier.PRO)).toBe(
      Number.POSITIVE_INFINITY,
    )
  })
})

describe('mergeWidgetConfig', () => {
  it('merges patches into an existing config', () => {
    const base = createDefaultWidgetConfig(MOCK_IDS.BOT)
    const merged = mergeWidgetConfig(base, { welcomeMessage: 'Hello there!' })

    expect(merged.welcomeMessage).toBe('Hello there!')
    expect(merged.bubbleColor).toBe(base.bubbleColor)
  })
})
