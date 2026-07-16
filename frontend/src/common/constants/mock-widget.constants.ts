import type { WidgetConfig } from '@/common/types/widget-config.types'
import { MOCK_SUGGESTED_QUESTIONS } from './mock-bots.constants'
import { MOCK_IDS } from './mock-ids.constants'

export const MOCK_WIDGET_CONFIGS: Record<string, WidgetConfig> = {
  [MOCK_IDS.BOT]: {
    botId: MOCK_IDS.BOT,
    bubbleColor: '#EC4899',
    welcomeMessage: 'Hi! Ask me anything about EmbedKit.',
    suggestedQuestions: [...MOCK_SUGGESTED_QUESTIONS],
    showWatermark: true,
  },
}

export const MOCK_EMBED_SNIPPET = `<script
  src="https://cdn.embedkit.io/widget.js"
  data-bot-id="${MOCK_IDS.BOT}"
  async
></script>`

export const MOCK_EMBED_WATERMARK_COMMENT = '<!-- Powered by EmbedKit -->'
