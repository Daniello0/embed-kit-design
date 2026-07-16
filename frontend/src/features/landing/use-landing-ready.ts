import { usePreloadImages } from '@/common/hooks/use-preload-images'
import { LANDING_PRELOAD_IMAGES } from './landing.constants'

/**
 * Waits for landing images and fonts before revealing the page.
 */
export function useLandingReady(): boolean {
  return usePreloadImages(LANDING_PRELOAD_IMAGES, { waitForFonts: true })
}
