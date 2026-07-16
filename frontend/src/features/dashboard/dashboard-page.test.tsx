import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { botRoutes, ROUTES } from '@/common/constants/routes.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { DashboardPage } from './dashboard-page'

function renderDashboard() {
  return render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  )
}

describe('DashboardPage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders empty state when no bots exist', () => {
    renderDashboard()

    expect(
      screen.getByRole('heading', { name: 'Create your first chatbot' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create bot' }),
    ).toBeInTheDocument()
  })

  it('renders bot cards with actions in demo state', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderDashboard()

    expect(
      screen.getByRole('heading', { name: 'Your bots', level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'EmbedKit' })).toHaveAttribute(
      'href',
      ROUTES.HOME,
    )
    expect(screen.getByText('Support Assistant')).toBeInTheDocument()
    expect(screen.getByText('3 documents')).toBeInTheDocument()
    expect(screen.getByLabelText('Knowledge base')).toHaveAttribute(
      'href',
      botRoutes.knowledge(MOCK_IDS.BOT),
    )
  })

  it('creates a bot from the modal', () => {
    renderDashboard()

    fireEvent.click(screen.getByRole('button', { name: 'Create bot' }))
    fireEvent.change(screen.getByPlaceholderText('Support Assistant'), {
      target: { value: 'Help Desk' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    expect(useAppStore.getState().bots).toHaveLength(1)
    expect(screen.getByText('Help Desk')).toBeInTheDocument()
  })

  it('opens the edit modal from a bot card', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderDashboard()

    fireEvent.click(screen.getByLabelText('Edit bot'))

    expect(
      screen.getByRole('heading', { name: 'Edit bot' }),
    ).toBeInTheDocument()
    expect(screen.getByDisplayValue('Support Assistant')).toBeInTheDocument()
  })

  it('updates a bot from the edit modal', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderDashboard()

    fireEvent.click(screen.getByLabelText('Edit bot'))
    fireEvent.change(screen.getByDisplayValue('Support Assistant'), {
      target: { value: 'Updated Assistant' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(useAppStore.getState().bots[0]?.name).toBe('Updated Assistant')
    expect(screen.getByText('Updated Assistant')).toBeInTheDocument()
  })

  it('deletes a bot from the edit modal', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderDashboard()

    fireEvent.click(screen.getByLabelText('Edit bot'))
    fireEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Delete',
      }),
    )

    expect(useAppStore.getState().bots).toHaveLength(0)
    expect(
      screen.getByRole('heading', { name: 'Create your first chatbot' }),
    ).toBeInTheDocument()
  })

  it('opens the paywall when creating a second bot on Free', () => {
    useAppStore.setState({
      ...MOCK_DEMO_APP_STATE,
      ui: { ...MOCK_DEMO_APP_STATE.ui, hasReachedAhaMoment: true },
    })

    renderDashboard()

    fireEvent.click(screen.getByRole('button', { name: 'Add another bot' }))
    fireEvent.change(screen.getByPlaceholderText('Support Assistant'), {
      target: { value: 'Second Bot' },
    })
    fireEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Create',
      }),
    )

    expect(useAppStore.getState().bots).toHaveLength(1)
    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe(
      PaywallTrigger.SECOND_BOT,
    )
  })

  it('shows the create card when bots exist', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderDashboard()

    expect(
      screen.getByRole('button', { name: 'Add another bot' }),
    ).toBeInTheDocument()
  })
})
