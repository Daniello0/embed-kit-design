import { useEffect } from 'react'
import { APP_NAME } from '@/common/constants/app.constants'
import { useAppStore } from '@/common/stores/app.store'
import styles from './main-page.module.css'

/**
 * Landing page shown at the application root.
 */
export function MainPage() {
  const isReady = useAppStore((state) => state.isReady)
  const setReady = useAppStore((state) => state.setReady)

  useEffect(() => {
    setReady(true)
  }, [setReady])

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Document-grounded chatbots</p>
        <h1 className={styles.title}>{APP_NAME}</h1>
        <p className={styles.subtitle}>
          {isReady ? 'Not ready yet.' : 'Initializing…'}
        </p>
      </section>
    </main>
  )
}
