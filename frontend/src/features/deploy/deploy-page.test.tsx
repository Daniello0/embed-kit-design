import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PlanTier } from '@/common/enums/plan-tier.enum'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { MOCK_IDS } from '@/common/constants/mock-ids.constants'
import { resetAppStore, useAppStore } from '@/common/stores/app.store'
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

  it('renders embed code and watermark preview panels', () => {
    render(<DeployPage botId={MOCK_IDS.BOT} />)

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
    render(<DeployPage botId={MOCK_IDS.BOT} />)

    expect(
      screen.getByText('Your embed will show "Powered by EmbedKit".'),
    ).toBeInTheDocument()
    expect(screen.getByText(DEPLOY_WATERMARK_COMMENT)).toBeInTheDocument()
  })

  it('copies embed code with watermark comment on Free plan', async () => {
    render(<DeployPage botId={MOCK_IDS.BOT} />)

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

  it('opens the paywall when copying without branding on Free', () => {
    useAppStore.setState((state) => ({
      ui: { ...state.ui, hasReachedAhaMoment: true },
    }))

    render(<DeployPage botId={MOCK_IDS.BOT} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy without branding' }),
    )

    expect(useAppStore.getState().ui.paywallOpen).toBe(true)
    expect(useAppStore.getState().ui.paywallTrigger).toBe(
      PaywallTrigger.WATERMARK,
    )
  })

  it('copies watermark-free code on Pro plan', async () => {
    useAppStore.setState((state) => ({
      user: { ...state.user, plan: PlanTier.PRO },
    }))

    render(<DeployPage botId={MOCK_IDS.BOT} />)

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
