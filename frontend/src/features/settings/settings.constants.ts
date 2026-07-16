import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { SettingsTab } from '@/common/enums/settings-tab.enum'
import { ROUTES } from '@/common/constants/routes.constants'

export const SETTINGS_COPY = {
  PAGE_TITLE: 'Settings',
  PAGE_DESCRIPTION: 'Manage your account, plan, and workspace.',
  PROFILE_TITLE: 'Profile',
  PROFILE_DESCRIPTION: 'Your account details.',
  EMAIL_LABEL: 'Email',
  MEMBER_SINCE_LABEL: 'Member since',
  BILLING_TITLE: 'Billing',
  BILLING_DESCRIPTION: 'Your current plan and upgrade options.',
  CURRENT_PLAN_LABEL: 'Current plan',
  PLAN_FEATURES_LABEL: 'Included in your plan',
  UPGRADE_TO_PRO: 'Upgrade to Pro',
  UPGRADE_TO_BUSINESS: 'Upgrade to Business',
  VIEW_PRICING: 'View all plans',
  TOP_PLAN_MESSAGE: 'You are on our highest plan.',
  TEAM_TITLE: 'Team',
  TEAM_DESCRIPTION: 'Invite teammates to collaborate on your bots.',
  TEAM_EMPTY_TITLE: 'Just you for now',
  TEAM_EMPTY_DESCRIPTION:
    'Invite up to 5 teammates on the Business plan to share bot access.',
  INVITE_BUTTON: 'Invite teammate',
  API_TITLE: 'API',
  API_DESCRIPTION: 'Generate keys to integrate EmbedKit programmatically.',
  API_KEY_LABEL: 'API key',
  API_KEY_HINT: 'Keep this key secret. Regenerating invalidates the old key.',
  GENERATE_KEY_BUTTON: 'Generate API key',
  REGENERATE_KEY_BUTTON: 'Regenerate key',
  API_PLACEHOLDER_KEY: 'No API key yet',
  GATE_TITLE: 'Business plan required',
  GATE_CTA: 'Upgrade to Business',
} as const

export interface SettingsTabConfig {
  id: SettingsTab
  label: string
  path: string
  gated: boolean
  paywallTrigger: PaywallTrigger | null
}

export const SETTINGS_TABS: SettingsTabConfig[] = [
  {
    id: SettingsTab.PROFILE,
    label: 'Profile',
    path: ROUTES.SETTINGS_PROFILE,
    gated: false,
    paywallTrigger: null,
  },
  {
    id: SettingsTab.BILLING,
    label: 'Billing',
    path: ROUTES.SETTINGS_BILLING,
    gated: false,
    paywallTrigger: null,
  },
  {
    id: SettingsTab.TEAM,
    label: 'Team',
    path: ROUTES.SETTINGS_TEAM,
    gated: true,
    paywallTrigger: PaywallTrigger.TEAM,
  },
  {
    id: SettingsTab.API,
    label: 'API',
    path: ROUTES.SETTINGS_API,
    gated: true,
    paywallTrigger: PaywallTrigger.API,
  },
]

export const MOCK_API_KEY_PREFIX = 'ek_live_'
