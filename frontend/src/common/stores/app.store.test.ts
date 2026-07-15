import { describe, expect, it, beforeEach } from 'vitest'
import { useAppStore } from './app.store'

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ isReady: false })
  })

  it('updates ready state', () => {
    useAppStore.getState().setReady(true)
    expect(useAppStore.getState().isReady).toBe(true)
  })
})
