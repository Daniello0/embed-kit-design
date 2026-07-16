import { useLandingReady } from '@/features/landing/use-landing-ready'
import {
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
  const landingReady = useLandingReady()

  if (!landingReady) {
    return <div className={styles.pageLoader} aria-hidden="true" />
  }

  return (
    <div className={styles.page}>
      <GradientBackground />
      <LandingHeader />
      <main className={styles.main}>
        <HeroSection />
        <ExplainerSteps />
        <PricingSummary />
        <PartnersSection />
        <LandingCta />
      </main>
    </div>
  )
}
