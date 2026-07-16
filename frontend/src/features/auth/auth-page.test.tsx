import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { ROUTES } from '@/common/constants/routes.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { DashboardPage } from '@/features/dashboard'
import { AuthPage } from './auth-page'
import { AUTH_COPY } from './auth.constants'

function renderAuthRoute(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path={ROUTES.SIGNUP} element={<AuthPage />} />
        <Route path={ROUTES.LOGIN} element={<AuthPage />} />
        <Route path={ROUTES.APP} element={<DashboardPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AuthPage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders signup copy on the signup route', () => {
    renderAuthRoute(ROUTES.SIGNUP)

    expect(
      screen.getByRole('heading', { name: AUTH_COPY.SIGNUP_HEADING }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: AUTH_COPY.SIGNUP_SUBMIT }),
    ).toBeInTheDocument()
    expect(screen.getByText(AUTH_COPY.NO_CREDIT_CARD)).toBeInTheDocument()
  })

  it('renders login copy on the login route', () => {
    renderAuthRoute(ROUTES.LOGIN)

    expect(
      screen.getByRole('heading', { name: AUTH_COPY.LOGIN_HEADING }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: AUTH_COPY.LOGIN_SUBMIT }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: AUTH_COPY.SIGNUP_TOGGLE_LINK }),
    ).toHaveAttribute('href', ROUTES.SIGNUP)
  })

  it('shows validation errors for invalid credentials', () => {
    renderAuthRoute(ROUTES.SIGNUP)

    fireEvent.change(screen.getByPlaceholderText(AUTH_COPY.EMAIL_PLACEHOLDER), {
      target: { value: 'invalid-email' },
    })
    fireEvent.change(
      screen.getByPlaceholderText(AUTH_COPY.PASSWORD_PLACEHOLDER),
      {
        target: { value: '123' },
      },
    )
    fireEvent.click(
      screen.getByRole('button', { name: AUTH_COPY.SIGNUP_SUBMIT }),
    )

    expect(screen.getByRole('alert')).toHaveTextContent(AUTH_COPY.INVALID_EMAIL)
    expect(useAppStore.getState().user.id).toBeNull()
  })

  it('logs in with email and navigates to the dashboard', () => {
    renderAuthRoute(ROUTES.SIGNUP)

    fireEvent.change(screen.getByPlaceholderText(AUTH_COPY.EMAIL_PLACEHOLDER), {
      target: { value: 'demo@embedkit.io' },
    })
    fireEvent.change(
      screen.getByPlaceholderText(AUTH_COPY.PASSWORD_PLACEHOLDER),
      {
        target: { value: 'secret123' },
      },
    )
    fireEvent.click(
      screen.getByRole('button', { name: AUTH_COPY.SIGNUP_SUBMIT }),
    )

    expect(useAppStore.getState().user.email).toBe('demo@embedkit.io')
    expect(
      screen.getByRole('heading', { name: 'Create your first chatbot' }),
    ).toBeInTheDocument()
  })

  it('logs in with Google and navigates to the dashboard', () => {
    renderAuthRoute(ROUTES.LOGIN)

    fireEvent.click(
      screen.getByRole('button', { name: AUTH_COPY.GOOGLE_BUTTON }),
    )

    expect(useAppStore.getState().user.email).toBe('google.user@embedkit.io')
    expect(
      screen.getByRole('heading', { name: 'Create your first chatbot' }),
    ).toBeInTheDocument()
  })

  it('redirects authenticated users away from auth screens', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderAuthRoute(ROUTES.LOGIN)

    expect(
      screen.getByRole('heading', { name: 'Your bots', level: 1 }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: AUTH_COPY.LOGIN_HEADING }),
    ).not.toBeInTheDocument()
  })

  it('preserves the authenticated user plan when redirecting', () => {
    useAppStore.setState({
      ...MOCK_DEMO_APP_STATE,
      user: { ...MOCK_DEMO_APP_STATE.user, plan: PlanTier.PRO },
    })

    renderAuthRoute(ROUTES.SIGNUP)

    expect(useAppStore.getState().user.plan).toBe(PlanTier.PRO)
  })
})
