import { PlanTier } from '@/common/enums/plan-tier.enum'
import { PLAN_LIMITS } from '@/common/constants/routes.constants'
import { MOCK_SUGGESTED_QUESTIONS } from '@/common/constants/mock-bots.constants'
import type { WidgetConfig } from '@/common/types/widget-config.types'
import {
  WIDGET_DEFAULT_BUBBLE_COLOR,
  WIDGET_DEFAULT_WELCOME_MESSAGE,
} from './widget.constants'

/**
 * Creates default widget settings for a bot.
 */
export function createDefaultWidgetConfig(botId: string): WidgetConfig {
  return {
    botId,
    bubbleColor: WIDGET_DEFAULT_BUBBLE_COLOR,
    welcomeMessage: WIDGET_DEFAULT_WELCOME_MESSAGE,
    suggestedQuestions: [...MOCK_SUGGESTED_QUESTIONS],
    showWatermark: true,
  }
}

/**
 * Returns whether widget color and logo controls are gated for the plan.
 */
export function isWidgetBrandingLocked(plan: PlanTier): boolean {
  return plan === PlanTier.FREE
}

/**
 * Resolves whether the embed watermark should render for the plan and config.
 */
export function shouldShowWatermark(
  plan: PlanTier,
  showWatermark: boolean,
): boolean {
  if (plan === PlanTier.FREE) {
    return true
  }

  return showWatermark
}

/**
 * Returns the maximum number of suggested questions allowed for the plan.
 */
export function getSuggestedQuestionLimit(plan: PlanTier): number {
  return PLAN_LIMITS[plan].suggestedQuestions
}

/**
 * Merges partial widget settings into an existing config.
 */
export function mergeWidgetConfig(
  config: WidgetConfig,
  patch: Partial<Omit<WidgetConfig, 'botId'>>,
): WidgetConfig {
  return {
    ...config,
    ...patch,
    botId: config.botId,
  }
}
