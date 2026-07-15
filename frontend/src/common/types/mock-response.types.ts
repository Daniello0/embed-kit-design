import type { Citation } from '@/common/types/chat-message.types'

export interface MockResponse {
  match: string
  content: string
  citations: Citation[]
  delayMs: number
}
