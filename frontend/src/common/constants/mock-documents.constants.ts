import { DocumentFormat } from '@/common/enums/document-format.enum'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import type { Document } from '@/common/types/document.types'
import { MOCK_IDS } from './mock-ids.constants'

export const MOCK_DOCUMENTS: Record<string, Document[]> = {
  [MOCK_IDS.BOT]: [
    {
      id: MOCK_IDS.DOCUMENTS.PRICING,
      botId: MOCK_IDS.BOT,
      fileName: 'pricing.pdf',
      format: DocumentFormat.PDF,
      status: DocumentStatus.READY,
      errorMessage: null,
      uploadedAt: '2026-02-01T09:15:00.000Z',
    },
    {
      id: MOCK_IDS.DOCUMENTS.FAQ,
      botId: MOCK_IDS.BOT,
      fileName: 'faq.txt',
      format: DocumentFormat.TXT,
      status: DocumentStatus.READY,
      errorMessage: null,
      uploadedAt: '2026-02-01T09:20:00.000Z',
    },
    {
      id: MOCK_IDS.DOCUMENTS.ONBOARDING,
      botId: MOCK_IDS.BOT,
      fileName: 'onboarding-guide.docx',
      format: DocumentFormat.DOCX,
      status: DocumentStatus.READY,
      errorMessage: null,
      uploadedAt: '2026-02-01T09:25:00.000Z',
    },
  ],
}
