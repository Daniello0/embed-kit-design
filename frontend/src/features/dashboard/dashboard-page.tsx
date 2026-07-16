import { useState } from 'react'
import { useAppStore } from '@/common/stores/app.store'
import { AppShell } from './app-shell'
import { BotGrid } from './bot-grid'
import { CreateBotModal } from './create-bot-modal'
import { DASHBOARD_COPY } from './dashboard.constants'
import { EditBotModal } from './edit-bot-modal'
import { EmptyBotsState } from './empty-bots-state'

/**
 * Dashboard page listing the user's bots.
 */
export function DashboardPage() {
  const bots = useAppStore((state) => state.bots)
  const [createOpen, setCreateOpen] = useState(false)
  const [editingBotId, setEditingBotId] = useState<string | null>(null)
  const editingBot = bots.find((bot) => bot.id === editingBotId) ?? null

  return (
    <AppShell title={DASHBOARD_COPY.PAGE_TITLE}>
      {bots.length === 0 ? (
        <EmptyBotsState onCreateClick={() => setCreateOpen(true)} />
      ) : (
        <BotGrid
          onCreateClick={() => setCreateOpen(true)}
          onEditClick={setEditingBotId}
        />
      )}

      <CreateBotModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditBotModal bot={editingBot} onClose={() => setEditingBotId(null)} />
    </AppShell>
  )
}
