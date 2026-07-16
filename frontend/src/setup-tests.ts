import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

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

vi.stubGlobal('Image', MockImage)

Object.defineProperty(document, 'fonts', {
  configurable: true,
  value: {
    ready: Promise.resolve(),
  },
})
