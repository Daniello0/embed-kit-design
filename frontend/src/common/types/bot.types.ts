import type { BotStatus } from '@/common/enums/bot-status.enum'

export interface Bot {
  id: string
  name: string
  avatarUrl: string | null
  status: BotStatus
  documentCount: number
  createdAt: string
  updatedAt: string
}
