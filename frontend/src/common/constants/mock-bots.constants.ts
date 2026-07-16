import { BotStatus } from '@/common/enums/bot-status.enum'
import type { Bot } from '@/common/types/bot.types'
import { ASSETS } from './app.constants'
import { MOCK_IDS } from './mock-ids.constants'

export const MOCK_BOTS: Bot[] = [
  {
    id: MOCK_IDS.BOT,
    name: 'Support Assistant',
    avatarUrl: ASSETS.PLACEHOLDER_AVATAR,
    status: BotStatus.READY,
    documentCount: 3,
    createdAt: '2026-02-01T09:00:00.000Z',
    updatedAt: '2026-03-10T14:30:00.000Z',
  },
]

export const MOCK_SUGGESTED_QUESTIONS = [
  'What are your pricing plans?',
  'How do I embed the widget?',
  'What documents can I upload?',
] as const
