import { AuthView } from '@/common/enums/auth-view.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { ROUTES } from '@/common/constants/routes.constants'
import type { AppUserState } from '@/common/types/app-state.types'
import { AUTH_COPY, AUTH_VALIDATION } from './auth.constants'

export interface AuthPageMeta {
  heading: string
  submitLabel: string
  togglePrompt: string
  toggleLinkLabel: string
  alternateRoute: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Maps an auth route path to the corresponding view.
 */
export function resolveAuthViewFromPath(pathname: string): AuthView | null {
  if (pathname === ROUTES.SIGNUP) {
    return AuthView.SIGNUP
  }

  if (pathname === ROUTES.LOGIN) {
    return AuthView.LOGIN
  }

  return null
}

/**
 * Returns copy and navigation metadata for an auth screen.
 */
export function getAuthPageMeta(view: AuthView): AuthPageMeta {
  if (view === AuthView.SIGNUP) {
    return {
      heading: AUTH_COPY.SIGNUP_HEADING,
      submitLabel: AUTH_COPY.SIGNUP_SUBMIT,
      togglePrompt: AUTH_COPY.LOGIN_TOGGLE_PROMPT,
      toggleLinkLabel: AUTH_COPY.LOGIN_TOGGLE_LINK,
      alternateRoute: ROUTES.LOGIN,
    }
  }

  return {
    heading: AUTH_COPY.LOGIN_HEADING,
    submitLabel: AUTH_COPY.LOGIN_SUBMIT,
    togglePrompt: AUTH_COPY.SIGNUP_TOGGLE_PROMPT,
    toggleLinkLabel: AUTH_COPY.SIGNUP_TOGGLE_LINK,
    alternateRoute: ROUTES.SIGNUP,
  }
}

/**
 * Validates email and password fields for mock auth.
 */
export function validateAuthCredentials(
  email: string,
  password: string,
): string | null {
  if (!validateEmail(email)) {
    return AUTH_COPY.INVALID_EMAIL
  }

  if (!validatePassword(password)) {
    return AUTH_COPY.INVALID_PASSWORD
  }

  return null
}

/**
 * Returns whether the user is signed in.
 */
export function isUserAuthenticated(user: AppUserState): boolean {
  return user.id !== null
}

/**
 * Normalizes email input before storing mock user data.
 */
export function normalizeAuthEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Creates a stable prototype user identifier.
 */
export function createMockUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Validates an email address format.
 */
export function validateEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

/**
 * Validates a password against prototype auth rules.
 */
export function validatePassword(password: string): boolean {
  return password.length >= AUTH_VALIDATION.MIN_PASSWORD_LENGTH
}

/**
 * Builds the mock user state after successful auth.
 */
export function createAuthenticatedUser(email: string): AppUserState {
  return {
    id: createMockUserId(),
    email: normalizeAuthEmail(email),
    plan: PlanTier.FREE,
  }
}
