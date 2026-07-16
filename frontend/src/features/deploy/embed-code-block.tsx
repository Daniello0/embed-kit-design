import { useMemo, useState } from 'react'
import { PaywallTrigger } from '@/common/enums/paywall-trigger.enum'
import { useAppStore } from '@/common/stores/app.store'
import { CopyConfirmToast } from './copy-confirm-toast'
import { DEPLOY_COPY, DEPLOY_WATERMARK_COMMENT } from './deploy.constants'
import {
  buildEmbedCopyBuffer,
  getCopySuccessMessage,
  isEmbedWatermarkLocked,
} from './deploy.utils'
import styles from './deploy.module.css'

interface EmbedCodeBlockProps {
  botId: string
}

interface HighlightedEmbedCodeProps {
  botId: string
  includeWatermarkComment: boolean
}

/**
 * Renders the embed snippet with basic syntax highlighting.
 */
function HighlightedEmbedCode({
  botId,
  includeWatermarkComment,
}: HighlightedEmbedCodeProps) {
  return (
    <pre className={styles.codePre} aria-label="Embed code snippet">
      <code>
        <span className={styles.codeTag}>&lt;script</span>
        {'\n  '}
        <span className={styles.codeAttr}>src</span>=
        <span className={styles.codeValue}>
          "https://cdn.embedkit.io/widget.js"
        </span>
        {'\n  '}
        <span className={styles.codeAttr}>data-bot-id</span>=
        <span className={styles.codeValue}>"{botId}"</span>
        {'\n  '}
        <span className={styles.codeAttr}>async</span>
        {'\n'}
        <span className={styles.codeTag}>&gt;&lt;/script&gt;</span>
        {includeWatermarkComment ? (
          <>
            {'\n'}
            <span className={styles.codeComment}>
              {DEPLOY_WATERMARK_COMMENT}
            </span>
          </>
        ) : null}
      </code>
    </pre>
  )
}

/**
 * Copies text to the clipboard and reports whether it succeeded.
 */
async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) {
    return false
  }

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Syntax-highlighted embed code with copy action.
 */
export function EmbedCodeBlock({ botId }: EmbedCodeBlockProps) {
  const plan = useAppStore((state) => state.user.plan)
  const openPaywall = useAppStore((state) => state.openPaywall)
  const [toastVisible, setToastVisible] = useState(false)
  const watermarkLocked = isEmbedWatermarkLocked(plan)
  const copyBuffer = useMemo(
    () => buildEmbedCopyBuffer(botId, plan),
    [botId, plan],
  )
  const successMessage = useMemo(() => getCopySuccessMessage(plan), [plan])

  const handleCopy = async () => {
    const copied = await copyTextToClipboard(copyBuffer)
    if (copied) {
      setToastVisible(true)
    }
  }

  const handleCopyWithoutWatermark = () => {
    openPaywall(PaywallTrigger.WATERMARK)
  }

  return (
    <div className={styles.codeBlock}>
      <HighlightedEmbedCode
        botId={botId}
        includeWatermarkComment={watermarkLocked}
      />

      <div className={styles.codeActions}>
        <button
          type="button"
          className={styles.copyButton}
          onClick={() => void handleCopy()}
        >
          {DEPLOY_COPY.COPY_BUTTON}
        </button>
        {watermarkLocked ? (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleCopyWithoutWatermark}
          >
            {DEPLOY_COPY.COPY_WITHOUT_WATERMARK}
          </button>
        ) : null}
      </div>

      {watermarkLocked ? (
        <p className={styles.watermarkNotice}>
          {DEPLOY_COPY.FREE_WATERMARK_NOTICE}
        </p>
      ) : null}

      <CopyConfirmToast
        message={successMessage}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </div>
  )
}
