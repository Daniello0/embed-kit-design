import { MessageRole } from '@/common/enums/message-role.enum'
import type { PlanTier } from '@/common/enums/plan-tier.enum'
import type { ChatMessage, Citation } from '@/common/types/chat-message.types'
import type { WidgetConfig } from '@/common/types/widget-config.types'
import { getSuggestedQuestionLimit } from '@/features/widget/widget.utils'

/**
 * Creates a stable prototype chat message identifier.
 */
export function createChatMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Builds a user chat message record.
 */
export function createUserMessage(content: string): ChatMessage {
  return {
    id: createChatMessageId(),
    role: MessageRole.USER,
    content: content.trim(),
    citations: [],
    createdAt: new Date().toISOString(),
  }
}

/**
 * Builds an assistant chat message record.
 */
export function createAssistantMessage(
  content: string,
  citations: Citation[],
): ChatMessage {
  return {
    id: createChatMessageId(),
    role: MessageRole.ASSISTANT,
    content,
    citations,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Returns suggested questions visible for the current plan tier.
 */
export function getVisibleSuggestedQuestions(
  config: WidgetConfig,
  plan: PlanTier,
): string[] {
  const limit = getSuggestedQuestionLimit(plan)
  return config.suggestedQuestions.slice(0, limit)
}

/**
 * Returns whether a chat thread contains any messages.
 */
export function hasChatMessages(messages: ChatMessage[]): boolean {
  return messages.length > 0
}
