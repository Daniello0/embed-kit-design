import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { ROUTES } from '@/common/constants/routes.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { BotLayout } from './bot-layout'

function renderBotLayout(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/app/bot/:botId" element={<BotLayout />}>
          <Route path="chat" element={<p>Chat outlet</p>} />
        </Route>
        <Route path={ROUTES.APP} element={<p>Dashboard</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BotLayout', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders the bot name and navigation for a known bot', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderBotLayout(`/app/bot/${MOCK_IDS.BOT}/chat`)

    expect(
      screen.getByRole('heading', { name: 'Support Assistant', level: 1 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Bot sections' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Chat outlet')).toBeInTheDocument()
  })

  it('redirects to the dashboard when the bot does not exist', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderBotLayout('/app/bot/missing-bot/chat')

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
