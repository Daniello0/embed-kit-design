import { describe, expect, it } from 'vitest'
import { MOCK_CHAT_RESPONSES } from '@/common/constants/mock-responses.constants'
import { findMockResponse, getMockResponseOrFallback } from './mock-chat.utils'

describe('findMockResponse', () => {
  it('matches by case-insensitive substring', () => {
    const match = findMockResponse('What is your pricing?', MOCK_CHAT_RESPONSES)

    expect(match?.match).toBe('pricing')
  })

  it('returns undefined when no match exists', () => {
    expect(
      findMockResponse('unknown topic', MOCK_CHAT_RESPONSES),
    ).toBeUndefined()
  })
})

describe('getMockResponseOrFallback', () => {
  it('returns matched response when found', () => {
    const response = getMockResponseOrFallback(
      'Tell me about onboarding',
      MOCK_CHAT_RESPONSES,
    )

    expect(response.match).toBe('onboarding')
  })

  it('returns fallback response when no match exists', () => {
    const response = getMockResponseOrFallback(
      'random question',
      MOCK_CHAT_RESPONSES,
    )

    expect(response.match).toBe('fallback')
    expect(response.citations.length).toBeGreaterThan(0)
  })
})
