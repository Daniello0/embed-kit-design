import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LANDING_PRELOAD_IMAGES } from './landing.constants'
import { useLandingReady } from './use-landing-ready'

describe('useLandingReady', () => {
  it('returns true after landing assets finish loading', async () => {
    const { result } = renderHook(() => useLandingReady())

    expect(result.current).toBe(false)

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it('preloads all landing images', () => {
    expect(LANDING_PRELOAD_IMAGES).toHaveLength(4)
  })
})
