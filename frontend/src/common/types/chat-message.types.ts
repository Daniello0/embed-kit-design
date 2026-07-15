import type { MessageRole } from '@/common/enums/message-role.enum'

export interface Citation {
  documentId: string
  documentName: string
  excerpt: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  citations: Citation[]
  createdAt: string
}
