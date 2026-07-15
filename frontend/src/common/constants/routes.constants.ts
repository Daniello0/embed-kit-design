import { PlanTier } from '@/common/enums/plan-tier.enum'

export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  PRICING: '/pricing',
  APP: '/app',
  SETTINGS_PROFILE: '/app/settings/profile',
  SETTINGS_BILLING: '/app/settings/billing',
  SETTINGS_TEAM: '/app/settings/team',
  SETTINGS_API: '/app/settings/api',
} as const

/**
 * Builds bot-scoped application routes.
 */
export const botRoutes = {
  knowledge: (botId: string) => `/app/bot/${botId}/knowledge`,
  chat: (botId: string) => `/app/bot/${botId}/chat`,
  widget: (botId: string) => `/app/bot/${botId}/widget`,
  deploy: (botId: string) => `/app/bot/${botId}/deploy`,
  analytics: (botId: string) => `/app/bot/${botId}/analytics`,
} as const

export const PLAN_LIMITS = {
  [PlanTier.FREE]: {
    bots: 1,
    documentsPerBot: 5,
    messagesPerMonth: 1_000,
    suggestedQuestions: 3,
    teamSeats: 1,
  },
  [PlanTier.PRO]: {
    bots: 1,
    documentsPerBot: 50,
    messagesPerMonth: 20_000,
    suggestedQuestions: Number.POSITIVE_INFINITY,
    teamSeats: 1,
  },
  [PlanTier.BUSINESS]: {
    bots: 5,
    documentsPerBot: Number.POSITIVE_INFINITY,
    messagesPerMonth: 100_000,
    suggestedQuestions: Number.POSITIVE_INFINITY,
    teamSeats: 5,
  },
} as const
