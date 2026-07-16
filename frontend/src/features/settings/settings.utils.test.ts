import { describe, expect, it } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { SettingsTab } from '@/common/enums/settings-tab.enum'
import {
  formatMemberSince,
  getPricingPlanByTier,
  getSettingsTab,
  isApiSettingsLocked,
  isTeamSettingsLocked,
  shouldBlockSettingsTab,
} from './settings.utils'

describe('settings.utils', () => {
  it('locks team settings for Free and Pro plans', () => {
    expect(isTeamSettingsLocked(PlanTier.FREE)).toBe(true)
    expect(isTeamSettingsLocked(PlanTier.PRO)).toBe(true)
    expect(isTeamSettingsLocked(PlanTier.BUSINESS)).toBe(false)
  })

  it('locks API settings for Free and Pro plans', () => {
    expect(isApiSettingsLocked(PlanTier.FREE)).toBe(true)
    expect(isApiSettingsLocked(PlanTier.PRO)).toBe(true)
    expect(isApiSettingsLocked(PlanTier.BUSINESS)).toBe(false)
  })

  it('blocks gated tabs when the plan does not include the feature', () => {
    expect(shouldBlockSettingsTab(SettingsTab.TEAM, PlanTier.FREE)).toBe(true)
    expect(shouldBlockSettingsTab(SettingsTab.API, PlanTier.PRO)).toBe(true)
    expect(shouldBlockSettingsTab(SettingsTab.PROFILE, PlanTier.FREE)).toBe(
      false,
    )
  })

  it('returns tab config with paywall trigger for gated tabs', () => {
    const teamTab = getSettingsTab(SettingsTab.TEAM)

    expect(teamTab?.gated).toBe(true)
    expect(teamTab?.paywallTrigger).toBe(PaywallTrigger.TEAM)
  })

  it('formats member since dates for display', () => {
    expect(formatMemberSince('2026-01-15T10:00:00.000Z')).toBe(
      'January 15, 2026',
    )
  })

  it('returns pricing plan details by tier', () => {
    const proPlan = getPricingPlanByTier(PlanTier.PRO)

    expect(proPlan?.name).toBe('Pro')
    expect(proPlan?.monthlyPrice).toBe(14.99)
  })
})
