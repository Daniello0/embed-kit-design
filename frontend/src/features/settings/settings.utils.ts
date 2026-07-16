import { PlanTier } from '@/common/enums/plan-tier.enum'
import { SettingsTab } from '@/common/enums/settings-tab.enum'
import { MOCK_PRICING_PLANS } from '@/common/constants/mock-pricing.constants'
import type { PricingPlan } from '@/common/types/pricing-plan.types'
import { SETTINGS_TABS, type SettingsTabConfig } from './settings.constants'

/**
 * Returns whether team settings are locked for the current plan.
 */
export function isTeamSettingsLocked(plan: PlanTier): boolean {
  return plan !== PlanTier.BUSINESS
}

/**
 * Returns whether API settings are locked for the current plan.
 */
export function isApiSettingsLocked(plan: PlanTier): boolean {
  return plan !== PlanTier.BUSINESS
}

/**
 * Returns whether a settings tab should block access for the plan.
 */
export function shouldBlockSettingsTab(
  tabId: SettingsTab,
  plan: PlanTier,
): boolean {
  if (tabId === SettingsTab.TEAM) {
    return isTeamSettingsLocked(plan)
  }

  if (tabId === SettingsTab.API) {
    return isApiSettingsLocked(plan)
  }

  return false
}

/**
 * Resolves settings tab configuration by id.
 */
export function getSettingsTab(tabId: SettingsTab): SettingsTabConfig | null {
  return SETTINGS_TABS.find((tab) => tab.id === tabId) ?? null
}

/**
 * Formats an ISO date for the profile member-since field.
 */
export function formatMemberSince(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate))
}

/**
 * Returns mock pricing details for a plan tier.
 */
export function getPricingPlanByTier(tier: PlanTier): PricingPlan | null {
  return MOCK_PRICING_PLANS.find((plan) => plan.tier === tier) ?? null
}
