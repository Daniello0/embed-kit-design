import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import {
  BOT_NAV_TABS,
  getBotNavTabPath,
} from '@/common/constants/bot-nav.constants'
import { botRoutes } from '@/common/constants/routes.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { BotNav } from './bot-nav'

function renderBotNav(initialPath: string, plan: PlanTier = PlanTier.FREE) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <BotNav botId={MOCK_IDS.BOT} plan={plan} />
    </MemoryRouter>,
  )
}

describe('BotNav', () => {
  it('renders all bot section tabs with correct links', () => {
    renderBotNav(botRoutes.knowledge(MOCK_IDS.BOT))

    BOT_NAV_TABS.forEach((tab) => {
      expect(screen.getByRole('link', { name: tab.label })).toHaveAttribute(
        'href',
        getBotNavTabPath(MOCK_IDS.BOT, tab.id),
      )
    })
  })

  it('marks the active tab from the current route', () => {
    renderBotNav(botRoutes.chat(MOCK_IDS.BOT))

    expect(screen.getByRole('link', { name: 'Test chat' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('shows a lock icon on analytics for Free users', () => {
    renderBotNav(botRoutes.analytics(MOCK_IDS.BOT))

    const analyticsLink = screen.getByRole('link', { name: 'Analytics' })
    expect(within(analyticsLink).getByText('🔒')).toBeInTheDocument()
  })

  it('does not show a lock icon on analytics for Pro users', () => {
    renderBotNav(botRoutes.analytics(MOCK_IDS.BOT), PlanTier.PRO)

    const analyticsLink = screen.getByRole('link', { name: 'Analytics' })
    expect(within(analyticsLink).queryByText('🔒')).not.toBeInTheDocument()
  })
})
