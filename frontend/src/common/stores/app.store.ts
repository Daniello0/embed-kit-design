import { create } from 'zustand'

interface AppState {
  isReady: boolean
  setReady: (ready: boolean) => void
}

/**
 * Global application store for cross-feature UI state.
 */
export const useAppStore = create<AppState>((set) => ({
  isReady: false,
  setReady: (ready) => set({ isReady: ready }),
}))
