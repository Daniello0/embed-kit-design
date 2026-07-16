import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { ROUTES } from '@/common/constants/routes.constants'
import { botRoutes } from '@/common/constants/routes.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { router } from './router'

function renderRoute(path: string) {
  const memoryRouter = createMemoryRouter(router.routes, {
    initialEntries: [path],
  })

  return render(<RouterProvider router={memoryRouter} />)
}

describe('router', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders the landing page at the root route', async () => {
    renderRoute(ROUTES.HOME)

    await waitFor(() => {
      expect(
        screen.getByText(/Turn your docs into a chatbot/i),
      ).toBeInTheDocument()
    })
  })

  it('redirects guests away from protected bot routes', () => {
    renderRoute(botRoutes.chat(MOCK_IDS.BOT))

    expect(
      screen.getByRole('heading', { name: 'Welcome back' }),
    ).toBeInTheDocument()
  })

  it('renders bot sub-routes for authenticated users', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderRoute(botRoutes.knowledge(MOCK_IDS.BOT))

    expect(
      screen.getByRole('heading', { name: 'Knowledge base' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Bot sections' }),
    ).toBeInTheDocument()
  })

  it('redirects bare bot routes to knowledge', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderRoute(`/app/bot/${MOCK_IDS.BOT}`)

    expect(
      screen.getByRole('heading', { name: 'Knowledge base' }),
    ).toBeInTheDocument()
  })
})
