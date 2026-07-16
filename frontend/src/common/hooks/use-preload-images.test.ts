import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { preloadImages, usePreloadImages } from './use-preload-images'

class MockImage {
  onload: (() => void) | null = null

  onerror: (() => void) | null = null

  complete = false

  private _src = ''

  decode = (): Promise<void> => Promise.resolve()

  set src(value: string) {
    this._src = value
    queueMicrotask(() => {
      this.onload?.()
    })
  }

  get src(): string {
    return this._src
  }
}

describe('preloadImages', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('resolves when all images load', async () => {
    vi.stubGlobal('Image', MockImage)

    await expect(preloadImages(['/a.png', '/b.png'])).resolves.toBeUndefined()
  })

  it('resolves immediately for an empty list', async () => {
    await expect(preloadImages([])).resolves.toBeUndefined()
  })
})

describe('usePreloadImages', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns true immediately for an empty list', () => {
    const { result } = renderHook(() => usePreloadImages([]))

    expect(result.current).toBe(true)
  })

  it('returns false until images finish loading', async () => {
    vi.stubGlobal('Image', MockImage)

    const { result } = renderHook(() =>
      usePreloadImages(['/gen-images/hero-landing.png']),
    )

    expect(result.current).toBe(false)

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })
})
