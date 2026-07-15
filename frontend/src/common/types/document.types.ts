import type { DocumentFormat } from '@/common/enums/document-format.enum'
import type { DocumentStatus } from '@/common/enums/document-status.enum'

export interface Document {
  id: string
  botId: string
  fileName: string
  format: DocumentFormat
  status: DocumentStatus
  errorMessage: string | null
  uploadedAt: string
}
