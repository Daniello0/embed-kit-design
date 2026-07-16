import { ROUTES } from '@/common/constants/routes.constants'

export const AUTH_VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
} as const

export const AUTH_MOCK = {
  GOOGLE_EMAIL: 'google.user@embedkit.io',
} as const

export const AUTH_COPY = {
  SIGNUP_HEADING: 'Create your account',
  LOGIN_HEADING: 'Welcome back',
  EMAIL_LABEL: 'Email',
  EMAIL_PLACEHOLDER: 'you@company.com',
  PASSWORD_LABEL: 'Password',
  PASSWORD_PLACEHOLDER: 'Enter your password',
  SIGNUP_SUBMIT: 'Sign up',
  LOGIN_SUBMIT: 'Log in',
  GOOGLE_BUTTON: 'Continue with Google',
  DIVIDER: 'or continue with Google',
  SIGNUP_TOGGLE_PROMPT: "Don't have an account?",
  SIGNUP_TOGGLE_LINK: 'Sign up',
  LOGIN_TOGGLE_PROMPT: 'Already have an account?',
  LOGIN_TOGGLE_LINK: 'Log in',
  INVALID_EMAIL: 'Enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 6 characters.',
  NO_CREDIT_CARD: 'Free plan · No credit card required',
} as const

export const AUTH_ROUTES = {
  [ROUTES.SIGNUP]: true,
  [ROUTES.LOGIN]: true,
} as const
