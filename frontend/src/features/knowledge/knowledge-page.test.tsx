import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { MOCK_DOCUMENTS } from '@/common/constants/mock-documents.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { KnowledgePage } from './knowledge-page'

describe('KnowledgePage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  it('renders upload and document sections', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    render(<KnowledgePage botId={MOCK_IDS.BOT} />)

    expect(
      screen.getByRole('heading', { name: 'Knowledge base' }),
    ).toBeInTheDocument()
    expect(screen.getByText('3 of 5 documents')).toBeInTheDocument()
    expect(screen.getByText('pricing.pdf')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Browse files' }),
    ).toBeInTheDocument()
  })

  it('shows empty state when no documents exist', () => {
    render(<KnowledgePage botId={MOCK_IDS.BOT} />)

    expect(
      screen.getByText('No documents yet. Upload your first file above.'),
    ).toBeInTheDocument()
  })

  it('adds a document from the file picker', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    render(<KnowledgePage botId={MOCK_IDS.BOT} />)

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const file = new File(['content'], 'support.pdf', {
      type: 'application/pdf',
    })

    fireEvent.change(input, { target: { files: [file] } })

    expect(useAppStore.getState().documents[MOCK_IDS.BOT]).toHaveLength(4)
    expect(screen.getByText('support.pdf')).toBeInTheDocument()
  })

  it('shows invalid file feedback', () => {
    render(<KnowledgePage botId={MOCK_IDS.BOT} />)

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const file = new File(['content'], 'notes.md', { type: 'text/markdown' })

    fireEvent.change(input, { target: { files: [file] } })

    expect(
      screen.getByText('Please upload a PDF, TXT, or DOCX file.'),
    ).toBeInTheDocument()
  })

  it('shows upgrade banner and opens paywall at the document limit', () => {
    useAppStore.setState({
      ...MOCK_DEMO_APP_STATE,
      documents: {
        [MOCK_IDS.BOT]: Array.from({ length: 5 }, (_, index) => ({
          ...MOCK_DOCUMENTS[MOCK_IDS.BOT][0],
          id: `doc-${index}`,
          fileName: `file-${index}.pdf`,
          status: DocumentStatus.READY,
        })),
      },
      ui: { ...MOCK_DEMO_APP_STATE.ui, hasReachedAhaMoment: true },
    })

    render(<KnowledgePage botId={MOCK_IDS.BOT} />)

    expect(screen.getByText('Document limit reached')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Upgrade to Pro' }))

    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe(
      PaywallTrigger.DOCUMENT_LIMIT,
    )
  })
})
