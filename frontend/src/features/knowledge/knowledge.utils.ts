import { DocumentFormat } from '@/common/enums/document-format.enum'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { PLAN_LIMITS } from '@/common/constants/routes.constants'
import type { Document } from '@/common/types/document.types'
import { ACCEPTED_FILE_EXTENSIONS, KNOWLEDGE_COPY } from './knowledge.constants'

/**
 * Infers document format from a file name extension.
 */
export function inferFormatFromFileName(
  fileName: string,
): DocumentFormat | null {
  const extension = `.${fileName.split('.').pop()?.toLowerCase() ?? ''}`

  if (extension === '.pdf') {
    return DocumentFormat.PDF
  }

  if (extension === '.txt') {
    return DocumentFormat.TXT
  }

  if (extension === '.docx') {
    return DocumentFormat.DOCX
  }

  return null
}

/**
 * Returns whether a file uses an accepted knowledge-base format.
 */
export function isValidDocumentFile(file: File): boolean {
  const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`
  return ACCEPTED_FILE_EXTENSIONS.includes(
    extension as (typeof ACCEPTED_FILE_EXTENSIONS)[number],
  )
}

/**
 * Returns the maximum documents allowed for a plan tier.
 */
export function getDocumentLimit(plan: PlanTier): number {
  return PLAN_LIMITS[plan].documentsPerBot
}

/**
 * Returns whether the document count has reached the plan limit.
 */
export function isDocumentLimitReached(
  documentCount: number,
  plan: PlanTier,
): boolean {
  const limit = getDocumentLimit(plan)
  return documentCount >= limit
}

/**
 * Formats the document usage label for the current plan.
 */
export function formatDocumentLimitLabel(
  documentCount: number,
  plan: PlanTier,
): string {
  const limit = getDocumentLimit(plan)

  if (limit === Number.POSITIVE_INFINITY) {
    return `${documentCount} ${KNOWLEDGE_COPY.LIMIT_LABEL}`
  }

  return `${documentCount} of ${limit} ${KNOWLEDGE_COPY.LIMIT_LABEL}`
}

/**
 * Returns a user-facing label for a document status.
 */
export function getDocumentStatusLabel(status: DocumentStatus): string {
  switch (status) {
    case DocumentStatus.UPLOADING:
      return KNOWLEDGE_COPY.STATUS_UPLOADING
    case DocumentStatus.PROCESSING:
      return KNOWLEDGE_COPY.STATUS_PROCESSING
    case DocumentStatus.READY:
      return KNOWLEDGE_COPY.STATUS_READY
    case DocumentStatus.ERROR:
      return KNOWLEDGE_COPY.STATUS_ERROR
    default:
      throw new Error(`Unsupported document status: ${status}`)
  }
}

/**
 * Creates a stable prototype document identifier.
 */
export function createDocumentId(): string {
  return `doc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Builds a new document record from an uploaded file.
 */
export function createDocumentFromFile(botId: string, file: File): Document {
  const format = inferFormatFromFileName(file.name)

  if (!format) {
    throw new Error(KNOWLEDGE_COPY.INVALID_TYPE)
  }

  return {
    id: createDocumentId(),
    botId,
    fileName: file.name,
    format,
    status: DocumentStatus.UPLOADING,
    errorMessage: null,
    uploadedAt: new Date().toISOString(),
  }
}
