import { BotStatus } from '@/common/enums/bot-status.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { PLAN_LIMITS } from '@/common/constants/routes.constants'
import type { Bot } from '@/common/types/bot.types'
import { DASHBOARD_COPY } from './dashboard.constants'

/**
 * Returns the maximum bots allowed for a plan tier.
 */
export function getBotLimit(plan: PlanTier): number {
  return PLAN_LIMITS[plan].bots
}

/**
 * Returns whether the user can create another bot on their plan.
 */
export function canCreateBot(botCount: number, plan: PlanTier): boolean {
  return botCount < getBotLimit(plan)
}

/**
 * Validates a bot name before create or update.
 */
export function validateBotName(name: string): boolean {
  return name.trim().length > 0
}

/**
 * Creates a stable prototype bot identifier.
 */
export function createBotId(): string {
  return `bot-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Builds a new bot record for the store.
 */
export function createBotRecord(name: string, avatarUrl?: string | null): Bot {
  const now = new Date().toISOString()

  return {
    id: createBotId(),
    name: name.trim(),
    avatarUrl: avatarUrl?.trim() || null,
    status: BotStatus.READY,
    documentCount: 0,
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Formats an ISO timestamp for bot card display.
 */
export function formatLastUpdated(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate))
}

/**
 * Formats the document count badge on a bot card.
 */
export function formatDocumentCountLabel(count: number): string {
  return count === 1 ? '1 document' : `${count} documents`
}

/**
 * Returns a user-facing label for a bot status.
 */
export function getBotStatusLabel(status: BotStatus): string {
  switch (status) {
    case BotStatus.READY:
      return DASHBOARD_COPY.STATUS_READY
    case BotStatus.PROCESSING:
      return DASHBOARD_COPY.STATUS_PROCESSING
    case BotStatus.DRAFT:
      return DASHBOARD_COPY.STATUS_DRAFT
    default:
      throw new Error(`Unsupported bot status: ${status}`)
  }
}
