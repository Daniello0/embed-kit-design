import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { ROUTES } from '@/common/constants/routes.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
import { PricingPage } from '@/features/pricing/pricing-page'
import { DeployPage } from './deploy-page'
import { DEPLOY_WATERMARK_COMMENT } from './deploy.constants'

describe('DeployPage', () => {
  beforeEach(() => {
    resetAppStore()
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  function renderDeployPage() {
    return render(
      <MemoryRouter initialEntries={[`/app/bot/${MOCK_IDS.BOT}/deploy`]}>
        <Routes>
          <Route
            path="/app/bot/:botId/deploy"
            element={<DeployPage botId={MOCK_IDS.BOT} />}
          />
          <Route path={ROUTES.PRICING} element={<PricingPage />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('renders embed code and watermark preview panels', () => {
    renderDeployPage()

    expect(screen.getByRole('heading', { name: 'Deploy' })).toBeInTheDocument()
    expect(screen.getByLabelText('Embed code snippet')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'With watermark (Free)' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Without watermark (Pro)' }),
    ).toBeInTheDocument()
  })

  it('shows the free-plan watermark notice', () => {
    renderDeployPage()

    expect(
      screen.getByText('Your embed will show "Powered by EmbedKit".'),
    ).toBeInTheDocument()
    expect(screen.getByText(DEPLOY_WATERMARK_COMMENT)).toBeInTheDocument()
  })

  it('copies embed code with watermark comment on Free plan', async () => {
    renderDeployPage()

    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }))

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining(DEPLOY_WATERMARK_COMMENT),
      )
    })

    expect(
      screen.getByText('Widget live! Upgrade to remove EmbedKit branding.'),
    ).toBeInTheDocument()
  })

  it('navigates to pricing when removing watermark on Free', () => {
    renderDeployPage()

    fireEvent.click(screen.getByRole('button', { name: 'Remove watermark' }))

    expect(
      screen.getByRole('heading', { name: 'Pricing', level: 1 }),
    ).toBeInTheDocument()
  })

  it('copies watermark-free code on Pro plan', async () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.PRO },
    }))

    renderDeployPage()

    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }))

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.not.stringContaining(DEPLOY_WATERMARK_COMMENT),
      )
    })

    expect(
      screen.queryByText('Your embed will show "Powered by EmbedKit".'),
    ).not.toBeInTheDocument()
  })
})
