import { useState, type FormEvent } from 'react'
import { AuthView } from '@/common/enums/auth-view.enum'
import { useAppStore } from '@/common/stores/app.store'
import { AUTH_COPY } from './auth.constants'
import { getAuthPageMeta, validateAuthCredentials } from './auth.utils'
import styles from './auth.module.css'

interface AuthFormProps {
  view: AuthView
  onSuccess: () => void
}

/**
 * Email and password authentication fields.
 */
export function AuthForm({ view, onSuccess }: AuthFormProps) {
  const login = useAppStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { submitLabel } = getAuthPageMeta(view)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationError = validateAuthCredentials(email, password)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    login(email)
    onSuccess()
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{AUTH_COPY.EMAIL_LABEL}</span>
        <input
          className={styles.fieldInput}
          type="email"
          autoComplete="email"
          value={email}
          placeholder={AUTH_COPY.EMAIL_PLACEHOLDER}
          onChange={(event) => {
            setEmail(event.target.value)
            setErrorMessage(null)
          }}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>{AUTH_COPY.PASSWORD_LABEL}</span>
        <input
          className={styles.fieldInput}
          type="password"
          autoComplete={
            view === AuthView.SIGNUP ? 'new-password' : 'current-password'
          }
          value={password}
          placeholder={AUTH_COPY.PASSWORD_PLACEHOLDER}
          onChange={(event) => {
            setPassword(event.target.value)
            setErrorMessage(null)
          }}
        />
      </label>

      {errorMessage ? (
        <p className={styles.formError} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" className={styles.primaryButton}>
        {submitLabel}
      </button>
    </form>
  )
}
