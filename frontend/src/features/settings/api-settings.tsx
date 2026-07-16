import { useState } from 'react'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { useAppStore } from '@/common/stores/app.store'
import { SettingsGate } from './settings-gate'
import { MOCK_API_KEY_PREFIX, SETTINGS_COPY } from './settings.constants'
import { isApiSettingsLocked } from './settings.utils'
import styles from './settings.module.css'

/**
 * Creates a mock API key for the prototype.
 */
function createMockApiKey(): string {
  return `${MOCK_API_KEY_PREFIX}${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`
}

/**
 * API keys placeholder with plan gate.
 */
export function ApiSettings() {
  const plan = useAppStore((state) => state.user.plan)
  const openPaywall = useAppStore((state) => state.openPaywall)
  const locked = isApiSettingsLocked(plan)
  const [apiKey, setApiKey] = useState<string | null>(null)

  const handleGenerateKey = () => {
    setApiKey(createMockApiKey())
  }

  return (
    <section>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{SETTINGS_COPY.API_TITLE}</h2>
        <p className={styles.sectionDescription}>
          {SETTINGS_COPY.API_DESCRIPTION}
        </p>
      </header>

      <SettingsGate
        locked={locked}
        description={SETTINGS_COPY.API_DESCRIPTION}
        onUpgradeClick={() => openPaywall(PaywallTrigger.API)}
      >
        <div className={styles.placeholderPanel}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              {SETTINGS_COPY.API_KEY_LABEL}
            </span>
            <p className={styles.monoValue}>
              {apiKey ?? SETTINGS_COPY.API_PLACEHOLDER_KEY}
            </p>
            <p className={styles.hint}>{SETTINGS_COPY.API_KEY_HINT}</p>
          </div>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleGenerateKey}
          >
            {apiKey
              ? SETTINGS_COPY.REGENERATE_KEY_BUTTON
              : SETTINGS_COPY.GENERATE_KEY_BUTTON}
          </button>
        </div>
      </SettingsGate>
    </section>
  )
}
