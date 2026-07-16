import { describe, expect, it } from 'vitest'
import { AuthView } from '@/common/enums/auth-view.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { ROUTES } from '@/common/constants/routes.constants'
import { AUTH_COPY, AUTH_MOCK } from './auth.constants'
import {
  createMockUserId,
  getAuthPageMeta,
  isUserAuthenticated,
  normalizeAuthEmail,
  resolveAuthViewFromPath,
  validateAuthCredentials,
} from './auth.utils'

describe('auth.utils', () => {
  it('resolves auth view from signup and login paths', () => {
    expect(resolveAuthViewFromPath(ROUTES.SIGNUP)).toBe(AuthView.SIGNUP)
    expect(resolveAuthViewFromPath(ROUTES.LOGIN)).toBe(AuthView.LOGIN)
    expect(resolveAuthViewFromPath('/app')).toBeNull()
  })

  it('returns signup page metadata', () => {
    const meta = getAuthPageMeta(AuthView.SIGNUP)

    expect(meta.heading).toBe(AUTH_COPY.SIGNUP_HEADING)
    expect(meta.submitLabel).toBe(AUTH_COPY.SIGNUP_SUBMIT)
    expect(meta.alternateRoute).toBe(ROUTES.LOGIN)
  })

  it('returns login page metadata', () => {
    const meta = getAuthPageMeta(AuthView.LOGIN)

    expect(meta.heading).toBe(AUTH_COPY.LOGIN_HEADING)
    expect(meta.submitLabel).toBe(AUTH_COPY.LOGIN_SUBMIT)
    expect(meta.alternateRoute).toBe(ROUTES.SIGNUP)
  })

  it('validates email and password credentials', () => {
    expect(validateAuthCredentials('demo@embedkit.io', 'secret123')).toBeNull()
    expect(validateAuthCredentials('invalid-email', 'secret123')).toBe(
      AUTH_COPY.INVALID_EMAIL,
    )
    expect(validateAuthCredentials('demo@embedkit.io', '123')).toBe(
      AUTH_COPY.INVALID_PASSWORD,
    )
  })

  it('normalizes email input', () => {
    expect(normalizeAuthEmail('  Demo@EmbedKit.IO  ')).toBe('demo@embedkit.io')
  })

  it('creates unique mock user ids', () => {
    const firstId = createMockUserId()
    const secondId = createMockUserId()

    expect(firstId).toMatch(/^user-/)
    expect(secondId).not.toBe(firstId)
  })

  it('detects authenticated users by id', () => {
    expect(
      isUserAuthenticated({ id: null, email: null, plan: PlanTier.FREE }),
    ).toBe(false)
    expect(
      isUserAuthenticated({
        id: 'user-1',
        email: 'demo@embedkit.io',
        plan: PlanTier.FREE,
      }),
    ).toBe(true)
  })

  it('exposes a stable mock Google email', () => {
    expect(AUTH_MOCK.GOOGLE_EMAIL).toContain('@')
  })
})
