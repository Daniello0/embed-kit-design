import { PlanTier } from '@/common/enums/plan-tier.enum'
import {
  DEPLOY_COPY,
  DEPLOY_EMBED_CDN_URL,
  DEPLOY_WATERMARK_COMMENT,
} from './deploy.constants'

/**
 * Builds the base embed script snippet for a bot.
 */
export function buildEmbedScript(botId: string): string {
  return `<script
  src="${DEPLOY_EMBED_CDN_URL}"
  data-bot-id="${botId}"
  async
></script>`
}

/**
 * Returns whether the embed copy should include the watermark comment.
 */
export function includesWatermarkInCopy(plan: PlanTier): boolean {
  return plan === PlanTier.FREE
}

/**
 * Builds the clipboard buffer for the embed snippet.
 */
export function buildEmbedCopyBuffer(botId: string, plan: PlanTier): string {
  const script = buildEmbedScript(botId)

  if (includesWatermarkInCopy(plan)) {
    return `${script}\n${DEPLOY_WATERMARK_COMMENT}`
  }

  return script
}

/**
 * Returns whether watermark removal is gated for the plan.
 */
export function isEmbedWatermarkLocked(plan: PlanTier): boolean {
  return plan === PlanTier.FREE
}

/**
 * Returns the toast message shown after a successful copy action.
 */
export function getCopySuccessMessage(plan: PlanTier): string {
  if (plan === PlanTier.FREE) {
    return DEPLOY_COPY.COPY_SUCCESS_FREE
  }

  return DEPLOY_COPY.COPY_SUCCESS_PAID
}
