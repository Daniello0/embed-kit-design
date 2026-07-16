import { describe, expect, it } from 'vitest'
import { BotStatus } from '@/common/enums/bot-status.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import {
  canCreateBot,
  createBotRecord,
  formatDocumentCountLabel,
  formatLastUpdated,
  getBotLimit,
  getBotStatusLabel,
  validateBotName,
} from './dashboard.utils'

describe('getBotLimit', () => {
  it('returns plan-specific bot limits', () => {
    expect(getBotLimit(PlanTier.FREE)).toBe(1)
    expect(getBotLimit(PlanTier.PRO)).toBe(1)
    expect(getBotLimit(PlanTier.BUSINESS)).toBe(5)
  })
})

describe('canCreateBot', () => {
  it('blocks second bot on Free and Pro', () => {
    expect(canCreateBot(1, PlanTier.FREE)).toBe(false)
    expect(canCreateBot(1, PlanTier.PRO)).toBe(false)
  })

  it('allows multiple bots on Business until the cap', () => {
    expect(canCreateBot(1, PlanTier.BUSINESS)).toBe(true)
    expect(canCreateBot(5, PlanTier.BUSINESS)).toBe(false)
  })
})

describe('validateBotName', () => {
  it('requires a non-empty trimmed name', () => {
    expect(validateBotName('Support')).toBe(true)
    expect(validateBotName('  Help  ')).toBe(true)
    expect(validateBotName('')).toBe(false)
    expect(validateBotName('   ')).toBe(false)
  })
})

describe('formatLastUpdated', () => {
  it('formats ISO dates for display', () => {
    expect(formatLastUpdated('2026-03-10T14:30:00.000Z')).toBe('Mar 10, 2026')
  })
})

describe('formatDocumentCountLabel', () => {
  it('pluralizes the document count', () => {
    expect(formatDocumentCountLabel(1)).toBe('1 document')
    expect(formatDocumentCountLabel(3)).toBe('3 documents')
  })
})

describe('getBotStatusLabel', () => {
  it('maps bot statuses to display labels', () => {
    expect(getBotStatusLabel(BotStatus.READY)).toBe('Active')
    expect(getBotStatusLabel(BotStatus.PROCESSING)).toBe('Processing')
    expect(getBotStatusLabel(BotStatus.DRAFT)).toBe('Draft')
  })
})

describe('createBotRecord', () => {
  it('creates a ready bot with zero documents', () => {
    const bot = createBotRecord('Help Desk')

    expect(bot.name).toBe('Help Desk')
    expect(bot.status).toBe(BotStatus.READY)
    expect(bot.documentCount).toBe(0)
    expect(bot.avatarUrl).toBeNull()
    expect(bot.id.length).toBeGreaterThan(0)
    expect(bot.createdAt.length).toBeGreaterThan(0)
    expect(bot.updatedAt).toBe(bot.createdAt)
  })

  it('stores an optional avatar URL', () => {
    const bot = createBotRecord('Sales Bot', '/avatar.png')

    expect(bot.avatarUrl).toBe('/avatar.png')
  })
})
