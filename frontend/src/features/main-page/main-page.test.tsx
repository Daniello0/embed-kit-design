import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, beforeEach } from 'vitest'
import { APP_NAME } from '@/common/constants/app.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import {
  LANDING_COPY,
  LANDING_IMAGE_ALT,
} from '@/features/landing/landing.constants'
import { MainPage } from './main-page'

async function renderMainPage() {
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>,
  )

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: APP_NAME, level: 1 }),
    ).toBeInTheDocument()
  })
}

describe('MainPage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders hero with product name, tagline, and primary CTA', async () => {
    await renderMainPage()

    expect(screen.getByText(LANDING_COPY.HERO_TAGLINE)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: LANDING_COPY.HERO_CTA }),
    ).toHaveAttribute('href', ROUTES.SIGNUP)
  })

  it('renders sticky header with logo and log in link', async () => {
    await renderMainPage()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: APP_NAME })).toHaveAttribute(
      'href',
      ROUTES.HOME,
    )
    expect(
      screen.getByRole('link', { name: LANDING_COPY.LOG_IN }),
    ).toHaveAttribute('href', ROUTES.LOGIN)
  })

  it('renders explainer, pricing summary, and partners sections', async () => {
    await renderMainPage()

    expect(
      screen.getByRole('heading', { name: LANDING_COPY.EXPLAINER_TITLE }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: LANDING_COPY.PRICING_TITLE }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: LANDING_COPY.PARTNERS_TITLE }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: LANDING_IMAGE_ALT.STEP_UPLOAD }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: LANDING_IMAGE_ALT.STEP_CHAT }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: LANDING_IMAGE_ALT.STEP_EMBED }),
    ).toBeInTheDocument()
  })

  it('renders footer CTA linking to signup', async () => {
    await renderMainPage()

    expect(
      screen.getByRole('link', { name: LANDING_COPY.CTA_TITLE }),
    ).toHaveAttribute('href', ROUTES.SIGNUP)
    expect(screen.getByText(LANDING_COPY.CTA_SUBTEXT)).toBeInTheDocument()
  })

  it('links pricing summary to the full pricing page', async () => {
    await renderMainPage()

    expect(
      screen.getByRole('link', { name: LANDING_COPY.PRICING_LINK }),
    ).toHaveAttribute('href', ROUTES.PRICING)
  })

  it('shows Start app links for authenticated users', async () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    await renderMainPage()

    const startAppLinks = screen.getAllByRole('link', {
      name: LANDING_COPY.START_APP,
    })

    expect(startAppLinks).toHaveLength(3)
    startAppLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', ROUTES.APP)
    })
  })
})
