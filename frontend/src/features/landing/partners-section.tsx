import { MOCK_PARTNERS } from '@/common/constants/mock-partners.constants'
import { LANDING_COPY } from './landing.constants'
import styles from './landing.module.css'

/**
 * Partner logo row for social proof.
 */
export function PartnersSection() {
  return (
    <section className={styles.section} aria-labelledby="partners-heading">
      <h2 id="partners-heading" className={styles.sectionTitle}>
        {LANDING_COPY.PARTNERS_TITLE}
      </h2>

      <div className={styles.partnersRow}>
        {MOCK_PARTNERS.map((partner) => (
          <img
            key={partner.id}
            className={styles.partnerLogo}
            src={partner.logoUrl}
            alt={partner.name}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  )
}
