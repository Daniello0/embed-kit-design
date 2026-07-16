import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MOCK_CHAT_RESPONSES } from '@/common/constants/mock-responses.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { ChatPage } from './chat-page'

describe('ChatPage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders the chat header and empty state', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    render(<ChatPage botId={MOCK_IDS.BOT} />)

    expect(
      screen.getByRole('heading', { name: 'Test chat' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Try asking')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'What are your pricing plans?' }),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Ask a question about your documents…'),
    ).toBeInTheDocument()
  })

  it('sends a suggested question and shows the mock response', () => {
    vi.useFakeTimers()
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    render(<ChatPage botId={MOCK_IDS.BOT} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'What are your pricing plans?' }),
    )

    expect(screen.getByText('What are your pricing plans?')).toBeInTheDocument()
    expect(screen.getByLabelText('Assistant is typing')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(MOCK_CHAT_RESPONSES[0]?.delayMs ?? 1200)
    })

    expect(screen.getByText(/Our Pro plan starts at/i)).toBeInTheDocument()
    expect(screen.getByText('pricing.pdf')).toBeInTheDocument()
    expect(useAppStore.getState().ui.hasReachedAhaMoment).toBe(true)

    vi.useRealTimers()
  })

  it('sends a typed message from the input', () => {
    vi.useFakeTimers()
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    render(<ChatPage botId={MOCK_IDS.BOT} />)

    fireEvent.change(
      screen.getByPlaceholderText('Ask a question about your documents…'),
      { target: { value: 'How do I embed the widget?' } },
    )
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(
      screen.getByText(/Copy the embed snippet from the Deploy tab/i),
    ).toBeInTheDocument()

    vi.useRealTimers()
  })
})
