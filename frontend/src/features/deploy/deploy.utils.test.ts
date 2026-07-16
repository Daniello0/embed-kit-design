import { describe, expect, it } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import {
  DEPLOY_EMBED_CDN_URL,
  DEPLOY_WATERMARK_COMMENT,
} from './deploy.constants'
import {
  buildEmbedCopyBuffer,
  buildEmbedScript,
  getCopySuccessMessage,
  isEmbedWatermarkLocked,
} from './deploy.utils'

describe('buildEmbedScript', () => {
  it('builds a script tag with the bot id and CDN url', () => {
    const script = buildEmbedScript(MOCK_IDS.BOT)

    expect(script).toContain(`src="${DEPLOY_EMBED_CDN_URL}"`)
    expect(script).toContain(`data-bot-id="${MOCK_IDS.BOT}"`)
    expect(script).toContain('async')
  })
})

describe('buildEmbedCopyBuffer', () => {
  it('appends the watermark comment on the Free plan', () => {
    const buffer = buildEmbedCopyBuffer(MOCK_IDS.BOT, PlanTier.FREE)

    expect(buffer).toContain(DEPLOY_WATERMARK_COMMENT)
    expect(buffer.startsWith('<script')).toBe(true)
  })

  it('omits the watermark comment on paid plans', () => {
    const proBuffer = buildEmbedCopyBuffer(MOCK_IDS.BOT, PlanTier.PRO)
    const businessBuffer = buildEmbedCopyBuffer(MOCK_IDS.BOT, PlanTier.BUSINESS)

    expect(proBuffer).not.toContain(DEPLOY_WATERMARK_COMMENT)
    expect(businessBuffer).not.toContain(DEPLOY_WATERMARK_COMMENT)
  })
})

describe('isEmbedWatermarkLocked', () => {
  it('locks watermark removal on the Free plan', () => {
    expect(isEmbedWatermarkLocked(PlanTier.FREE)).toBe(true)
  })

  it('unlocks watermark removal on paid plans', () => {
    expect(isEmbedWatermarkLocked(PlanTier.PRO)).toBe(false)
    expect(isEmbedWatermarkLocked(PlanTier.BUSINESS)).toBe(false)
  })
})

describe('getCopySuccessMessage', () => {
  it('returns upgrade messaging for Free users', () => {
    expect(getCopySuccessMessage(PlanTier.FREE)).toContain('Upgrade')
  })

  it('returns a neutral success message for paid users', () => {
    expect(getCopySuccessMessage(PlanTier.PRO)).toContain('copied')
  })
})
