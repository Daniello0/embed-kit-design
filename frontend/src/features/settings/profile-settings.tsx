import { PlanBadge } from '@/common/components/plan-badge'
import { MOCK_USER } from '@/common/constants/mock-user.constants'
import { useAppStore } from '@/common/stores/app.store'
import { SETTINGS_COPY } from './settings.constants'
import { formatMemberSince } from './settings.utils'
import styles from './settings.module.css'

/**
 * Read-only profile email display.
 */
export function ProfileSettings() {
  const email = useAppStore((state) => state.user.email)
  const plan = useAppStore((state) => state.user.plan)
  const displayEmail = email ?? MOCK_USER.email

  return (
    <section>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{SETTINGS_COPY.PROFILE_TITLE}</h2>
        <p className={styles.sectionDescription}>
          {SETTINGS_COPY.PROFILE_DESCRIPTION}
        </p>
      </header>

      <dl className={styles.fieldList}>
        <div className={styles.field}>
          <dt className={styles.fieldLabel}>{SETTINGS_COPY.EMAIL_LABEL}</dt>
          <dd>
            <input
              className={styles.readOnlyInput}
              type="email"
              value={displayEmail}
              readOnly
              aria-readonly="true"
            />
          </dd>
        </div>

        <div className={styles.field}>
          <dt className={styles.fieldLabel}>Plan</dt>
          <dd>
            <PlanBadge plan={plan} />
          </dd>
        </div>

        <div className={styles.field}>
          <dt className={styles.fieldLabel}>
            {SETTINGS_COPY.MEMBER_SINCE_LABEL}
          </dt>
          <dd className={styles.fieldValue}>
            {formatMemberSince(MOCK_USER.createdAt)}
          </dd>
        </div>
      </dl>
    </section>
  )
}
