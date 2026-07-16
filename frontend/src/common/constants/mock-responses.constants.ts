import type { MockResponse } from '@/common/types/mock-response.types'
import { MOCK_IDS } from './mock-ids.constants'

export const MOCK_CHAT_RESPONSES: MockResponse[] = [
  {
    match: 'pricing',
    content:
      'Our Pro plan starts at $14.99/month and includes 50 documents per bot, watermark-free embed, and analytics. The Business plan adds team seats, API access, and up to 5 bots.',
    citations: [
      {
        documentId: MOCK_IDS.DOCUMENTS.PRICING,
        documentName: 'pricing.pdf',
        excerpt: 'Pro — $14.99/mo, 50 documents, no watermark…',
      },
    ],
    delayMs: 1200,
  },
  {
    match: 'embed',
    content:
      'Copy the embed snippet from the Deploy tab and paste it before the closing </body> tag on your site. The widget loads asynchronously and shows a floating chat bubble.',
    citations: [
      {
        documentId: MOCK_IDS.DOCUMENTS.ONBOARDING,
        documentName: 'onboarding-guide.docx',
        excerpt: 'Add the script tag to your site footer…',
      },
    ],
    delayMs: 1000,
  },
  {
    match: 'onboarding',
    content:
      'Getting started takes three steps: upload your knowledge base, test answers in the chat tab, then customize and deploy the widget. Most teams ship their first bot in under 15 minutes.',
    citations: [
      {
        documentId: MOCK_IDS.DOCUMENTS.ONBOARDING,
        documentName: 'onboarding-guide.docx',
        excerpt: 'Step 1: Upload documents. Step 2: Test chat…',
      },
    ],
    delayMs: 1100,
  },
  {
    match: 'documents',
    content:
      'EmbedKit accepts PDF, TXT, and DOCX files. On the Free plan you can upload up to 5 documents per bot. Pro raises the limit to 50.',
    citations: [
      {
        documentId: MOCK_IDS.DOCUMENTS.FAQ,
        documentName: 'faq.txt',
        excerpt: 'Supported formats: PDF, TXT, DOCX…',
      },
    ],
    delayMs: 900,
  },
  {
    match: 'fallback',
    content:
      'I found relevant information in your documents. Could you rephrase your question or try one of the suggested prompts?',
    citations: [
      {
        documentId: MOCK_IDS.DOCUMENTS.FAQ,
        documentName: 'faq.txt',
        excerpt: 'Browse suggested questions for common topics…',
      },
    ],
    delayMs: 800,
  },
]
