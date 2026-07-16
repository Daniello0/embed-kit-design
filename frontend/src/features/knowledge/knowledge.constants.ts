export const KNOWLEDGE_COPY = {
  PAGE_TITLE: 'Knowledge base',
  PAGE_DESCRIPTION:
    'Upload documents so your bot can answer questions from your content.',
  UPLOAD_TITLE: 'Add documents',
  UPLOAD_HINT: 'Drag and drop PDF, TXT, or DOCX files here.',
  EMPTY_STATE:
    "Drop your FAQ, pricing page, or onboarding guide — we'll turn it into answers.",
  DROP_ACTIVE: 'Drop files to upload',
  BROWSE_BUTTON: 'Browse files',
  ACCEPTED_FORMATS: 'PDF, TXT, DOCX',
  INVALID_TYPE: 'Please upload a PDF, TXT, or DOCX file.',
  LIMIT_REACHED: 'Free plan includes 5 documents. Upgrade to add more.',
  UPGRADE_BANNER_TITLE: 'Document limit reached',
  UPGRADE_BANNER_DESCRIPTION:
    'Upgrade to Pro to upload up to 50 documents per bot.',
  UPGRADE_BANNER_CTA: 'Upgrade to Pro',
  LIMIT_LABEL: 'documents',
  REMOVE_BUTTON: 'Remove document',
  STATUS_UPLOADING: 'Uploading',
  STATUS_PROCESSING: 'Processing',
  STATUS_READY: 'Ready',
  STATUS_ERROR: 'Error',
  DOCUMENTS_TITLE: 'Uploaded documents',
  DOCUMENTS_EMPTY: 'No documents yet. Upload your first file above.',
} as const

export const KNOWLEDGE_UPLOAD_DELAY_MS = {
  UPLOADING: 400,
  PROCESSING: 800,
} as const

export const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.txt', '.docx'] as const
