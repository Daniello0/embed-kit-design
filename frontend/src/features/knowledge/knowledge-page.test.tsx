import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, beforeEach } from 'vitest'
import { DocumentStatus } from '@/common/enums/document-status.enum'
import { MOCK_DOCUMENTS } from '@/common/constants/mock-documents.constants'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { MOCK_DEMO_APP_STATE } from '@/common/constants/mock-seed.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { PricingPage } from '@/features/pricing/pricing-page'
import { KnowledgePage } from './knowledge-page'

describe('KnowledgePage', () => {
  beforeEach(() => {
    resetAppStore()
  })

  function renderKnowledgePage() {
    return render(
      <MemoryRouter initialEntries={[`/app/bot/${MOCK_IDS.BOT}/knowledge`]}>
        <Routes>
          <Route
            path="/app/bot/:botId/knowledge"
            element={<KnowledgePage botId={MOCK_IDS.BOT} />}
          />
          <Route path={ROUTES.PRICING} element={<PricingPage />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('renders upload and document sections', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderKnowledgePage()

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
    renderKnowledgePage()

    expect(
      screen.getByText('No documents yet. Upload your first file above.'),
    ).toBeInTheDocument()
  })

  it('adds a document from the file picker', () => {
    useAppStore.setState(MOCK_DEMO_APP_STATE)

    renderKnowledgePage()

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
    renderKnowledgePage()

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const file = new File(['content'], 'notes.md', { type: 'text/markdown' })

    fireEvent.change(input, { target: { files: [file] } })

    expect(
      screen.getByText('Please upload a PDF, TXT, or DOCX file.'),
    ).toBeInTheDocument()
  })

  it('shows upgrade banner and navigates to pricing at the document limit', () => {
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

    renderKnowledgePage()

    expect(screen.getByText('Document limit reached')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Upgrade to Pro' }))

    expect(
      screen.getByRole('heading', { name: 'Pricing', level: 1 }),
    ).toBeInTheDocument()
  })
})
