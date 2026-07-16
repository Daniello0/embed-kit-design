import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { APP_NAME } from '@/common/constants/app.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { LANDING_COPY } from '@/features/landing/landing.constants'
import { MainPage } from './main-page'

describe('MainPage', () => {
  it('renders hero with product name, tagline, and primary CTA', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: APP_NAME, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText(LANDING_COPY.HERO_TAGLINE)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: LANDING_COPY.HERO_CTA }),
    ).toHaveAttribute('href', ROUTES.SIGNUP)
  })

  it('renders sticky header with logo and log in link', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: APP_NAME })).toHaveAttribute(
      'href',
      ROUTES.HOME,
    )
    expect(
      screen.getByRole('link', { name: LANDING_COPY.LOG_IN }),
    ).toHaveAttribute('href', ROUTES.LOGIN)
  })

  it('renders examples, explainer, pricing summary, and partners sections', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: LANDING_COPY.EXAMPLES_TITLE }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: LANDING_COPY.EXPLAINER_TITLE }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: LANDING_COPY.PRICING_TITLE }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: LANDING_COPY.PARTNERS_TITLE }),
    ).toBeInTheDocument()
    expect(screen.getByText(LANDING_COPY.EXAMPLE_UPLOAD)).toBeInTheDocument()
    expect(screen.getByText(LANDING_COPY.EXAMPLE_CHAT)).toBeInTheDocument()
    expect(screen.getByText(LANDING_COPY.EXAMPLE_WIDGET)).toBeInTheDocument()
  })

  it('renders footer CTA linking to signup', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: LANDING_COPY.CTA_TITLE }),
    ).toHaveAttribute('href', ROUTES.SIGNUP)
    expect(screen.getByText(LANDING_COPY.CTA_SUBTEXT)).toBeInTheDocument()
  })

  it('links pricing summary to the full pricing page', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: LANDING_COPY.PRICING_LINK }),
    ).toHaveAttribute('href', ROUTES.PRICING)
  })
})
