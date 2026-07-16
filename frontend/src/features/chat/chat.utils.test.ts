import { describe, expect, it } from 'vitest'
import { MessageRole } from '@/common/enums/message-role.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_SUGGESTED_QUESTIONS } from '@/common/constants/mock-bots.constants'
import { createDefaultWidgetConfig } from '@/features/widget/widget.utils'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import {
  createAssistantMessage,
  createUserMessage,
  getVisibleSuggestedQuestions,
  hasChatMessages,
} from './chat.utils'

describe('createUserMessage', () => {
  it('creates a user message without citations', () => {
    const message = createUserMessage('What are your pricing plans?')

    expect(message.role).toBe(MessageRole.USER)
    expect(message.content).toBe('What are your pricing plans?')
    expect(message.citations).toEqual([])
    expect(message.id.length).toBeGreaterThan(0)
    expect(message.createdAt.length).toBeGreaterThan(0)
  })
})

describe('createAssistantMessage', () => {
  it('creates an assistant message with citations', () => {
    const citations = [
      {
        documentId: MOCK_IDS.DOCUMENTS.PRICING,
        documentName: 'pricing.pdf',
        excerpt: 'Pro — $14.99/mo…',
      },
    ]

    const message = createAssistantMessage(
      'Our Pro plan starts at $14.99/month.',
      citations,
    )

    expect(message.role).toBe(MessageRole.ASSISTANT)
    expect(message.content).toBe('Our Pro plan starts at $14.99/month.')
    expect(message.citations).toEqual(citations)
  })
})

describe('getVisibleSuggestedQuestions', () => {
  it('limits suggested questions to three on the Free plan', () => {
    const config = createDefaultWidgetConfig(MOCK_IDS.BOT)
    config.suggestedQuestions = [
      ...MOCK_SUGGESTED_QUESTIONS,
      'Can I remove the watermark?',
      'Do you support team seats?',
    ]

    const questions = getVisibleSuggestedQuestions(config, PlanTier.FREE)

    expect(questions).toHaveLength(3)
    expect(questions).toEqual(MOCK_SUGGESTED_QUESTIONS.slice(0, 3))
  })

  it('returns all suggested questions on paid plans', () => {
    const config = createDefaultWidgetConfig(MOCK_IDS.BOT)
    config.suggestedQuestions = [
      ...MOCK_SUGGESTED_QUESTIONS,
      'Can I remove the watermark?',
    ]

    const questions = getVisibleSuggestedQuestions(config, PlanTier.PRO)

    expect(questions).toHaveLength(4)
  })
})

describe('hasChatMessages', () => {
  it('returns false for an empty thread', () => {
    expect(hasChatMessages([])).toBe(false)
  })

  it('returns true when messages exist', () => {
    expect(hasChatMessages([createUserMessage('Hello')])).toBe(true)
  })
})
