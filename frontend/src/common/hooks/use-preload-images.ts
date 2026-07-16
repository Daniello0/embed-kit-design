import { useLayoutEffect, useState } from 'react'

interface PreloadImagesOptions {
  waitForFonts?: boolean
}

/**
 * Waits for web fonts to finish loading when supported.
 */
async function waitForDocumentFonts(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts?.ready) {
    return
  }

  await document.fonts.ready
}

/**
 * Loads and decodes a single image URL into the browser cache.
 */
function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      if (typeof image.decode === 'function') {
        void image.decode().then(resolve).catch(resolve)
        return
      }

      resolve()
    }

    image.onerror = () => {
      reject(new Error(`Failed to preload image: ${url}`))
    }

    image.src = url
  })
}

/**
 * Preloads and decodes a list of image URLs into the browser cache.
 */
export async function preloadImages(
  urls: readonly string[],
  options: PreloadImagesOptions = {},
): Promise<void> {
  const { waitForFonts = false } = options
  const tasks: Promise<void>[] = []

  if (urls.length > 0) {
    tasks.push(...urls.map((url) => preloadImage(url)))
  }

  if (waitForFonts) {
    tasks.push(waitForDocumentFonts())
  }

  if (tasks.length === 0) {
    return
  }

  await Promise.all(tasks)
}

/**
 * Preloads image URLs before revealing dependent UI.
 * Starts loading in useLayoutEffect to minimize layout shift on first paint.
 */
export function usePreloadImages(
  urls: readonly string[],
  options: PreloadImagesOptions = {},
): boolean {
  const { waitForFonts = false } = options
  const [ready, setReady] = useState(urls.length === 0 && !waitForFonts)

  useLayoutEffect(() => {
    if (urls.length === 0 && !waitForFonts) {
      return
    }

    let cancelled = false

    preloadImages(urls, { waitForFonts })
      .then(() => {
        if (!cancelled) {
          setReady(true)
        }
      })
      .catch((error: unknown) => {
        console.warn('Asset preload failed:', error)
        if (!cancelled) {
          setReady(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [urls, waitForFonts])

  return ready
}
