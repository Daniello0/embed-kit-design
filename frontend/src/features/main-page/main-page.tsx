import {
  ExamplesSection,
  ExplainerSteps,
  GradientBackground,
  HeroSection,
  LandingCta,
  LandingHeader,
  PartnersSection,
  PricingSummary,
} from '@/features/landing'
import styles from './main-page.module.css'

/**
 * Landing page shown at the application root.
 */
export function MainPage() {
  return (
    <div className={styles.page}>
      <GradientBackground />
      <LandingHeader />
      <main className={styles.main}>
        <HeroSection />
        <ExamplesSection />
        <ExplainerSteps />
        <PricingSummary />
        <PartnersSection />
        <LandingCta />
      </main>
    </div>
  )
}
