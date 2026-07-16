import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { useAppStore } from '@/common/stores/app.store'
import { SettingsGate } from './settings-gate'
import { SETTINGS_COPY } from './settings.constants'
import { isTeamSettingsLocked } from './settings.utils'
import styles from './settings.module.css'

/**
 * Team management placeholder with plan gate.
 */
export function TeamSettings() {
  const plan = useAppStore((state) => state.user.plan)
  const openPaywall = useAppStore((state) => state.openPaywall)
  const locked = isTeamSettingsLocked(plan)

  return (
    <section>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{SETTINGS_COPY.TEAM_TITLE}</h2>
        <p className={styles.sectionDescription}>
          {SETTINGS_COPY.TEAM_DESCRIPTION}
        </p>
      </header>

      <SettingsGate
        locked={locked}
        description={SETTINGS_COPY.TEAM_EMPTY_DESCRIPTION}
        onUpgradeClick={() => openPaywall(PaywallTrigger.TEAM)}
      >
        <div className={styles.placeholderPanel}>
          <h3 className={styles.placeholderTitle}>
            {SETTINGS_COPY.TEAM_EMPTY_TITLE}
          </h3>
          <p className={styles.placeholderDescription}>
            {SETTINGS_COPY.TEAM_EMPTY_DESCRIPTION}
          </p>
          <button type="button" className={styles.primaryButton}>
            {SETTINGS_COPY.INVITE_BUTTON}
          </button>
        </div>
      </SettingsGate>
    </section>
  )
}
