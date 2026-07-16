import { describe, expect, it } from 'vitest'
import { DocumentFormat } from '@/common/enums/document-format.enum'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import {
  createDocumentFromFile,
  formatDocumentLimitLabel,
  getDocumentLimit,
  getDocumentStatusLabel,
  inferFormatFromFileName,
  isDocumentLimitReached,
  isValidDocumentFile,
} from './knowledge.utils'

describe('inferFormatFromFileName', () => {
  it('detects supported document formats', () => {
    expect(inferFormatFromFileName('pricing.pdf')).toBe(DocumentFormat.PDF)
    expect(inferFormatFromFileName('faq.TXT')).toBe(DocumentFormat.TXT)
    expect(inferFormatFromFileName('guide.docx')).toBe(DocumentFormat.DOCX)
  })

  it('returns null for unsupported extensions', () => {
    expect(inferFormatFromFileName('notes.md')).toBeNull()
    expect(inferFormatFromFileName('archive.zip')).toBeNull()
  })
})

describe('isValidDocumentFile', () => {
  it('accepts supported file types', () => {
    const file = new File(['content'], 'pricing.pdf', {
      type: 'application/pdf',
    })

    expect(isValidDocumentFile(file)).toBe(true)
  })

  it('rejects unsupported file types', () => {
    const file = new File(['content'], 'notes.md', { type: 'text/markdown' })

    expect(isValidDocumentFile(file)).toBe(false)
  })
})

describe('getDocumentLimit', () => {
  it('returns plan-specific document limits', () => {
    expect(getDocumentLimit(PlanTier.FREE)).toBe(5)
    expect(getDocumentLimit(PlanTier.PRO)).toBe(50)
    expect(getDocumentLimit(PlanTier.BUSINESS)).toBe(Number.POSITIVE_INFINITY)
  })
})

describe('isDocumentLimitReached', () => {
  it('blocks uploads when the Free plan limit is reached', () => {
    expect(isDocumentLimitReached(5, PlanTier.FREE)).toBe(true)
    expect(isDocumentLimitReached(4, PlanTier.FREE)).toBe(false)
  })

  it('allows unlimited documents on Business', () => {
    expect(isDocumentLimitReached(100, PlanTier.BUSINESS)).toBe(false)
  })
})

describe('formatDocumentLimitLabel', () => {
  it('formats capped plan limits', () => {
    expect(formatDocumentLimitLabel(3, PlanTier.FREE)).toBe('3 of 5 documents')
  })

  it('formats unlimited plans without a cap', () => {
    expect(formatDocumentLimitLabel(12, PlanTier.BUSINESS)).toBe('12 documents')
  })
})

describe('getDocumentStatusLabel', () => {
  it('maps document statuses to display labels', () => {
    expect(getDocumentStatusLabel(DocumentStatus.UPLOADING)).toBe('Uploading')
    expect(getDocumentStatusLabel(DocumentStatus.PROCESSING)).toBe('Processing')
    expect(getDocumentStatusLabel(DocumentStatus.READY)).toBe('Ready')
    expect(getDocumentStatusLabel(DocumentStatus.ERROR)).toBe('Error')
  })
})

describe('createDocumentFromFile', () => {
  it('creates a document in uploading state', () => {
    const file = new File(['content'], 'pricing.pdf', {
      type: 'application/pdf',
    })
    const document = createDocumentFromFile(MOCK_IDS.BOT, file)

    expect(document.botId).toBe(MOCK_IDS.BOT)
    expect(document.fileName).toBe('pricing.pdf')
    expect(document.format).toBe(DocumentFormat.PDF)
    expect(document.status).toBe(DocumentStatus.UPLOADING)
    expect(document.errorMessage).toBeNull()
    expect(document.id.length).toBeGreaterThan(0)
    expect(document.uploadedAt.length).toBeGreaterThan(0)
  })
})
