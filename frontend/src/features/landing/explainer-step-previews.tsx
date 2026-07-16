import {
  LANDING_IMAGE_ALT,
  LANDING_IMAGE_DIMENSIONS,
  LANDING_IMAGES,
} from './landing.constants'
import styles from './landing.module.css'

interface StepImageProps {
  src: string
  alt: string
}

/**
 * Shared frame wrapper for explainer step screenshots.
 */
function StepImage({ src, alt }: StepImageProps) {
  return (
    <div className={styles.stepPreviewFrame}>
      <img
        src={src}
        alt={alt}
        className={styles.stepImage}
        width={LANDING_IMAGE_DIMENSIONS.WIDTH}
        height={LANDING_IMAGE_DIMENSIONS.HEIGHT}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  )
}

/**
 * Upload step screenshot for the first explainer step.
 */
export function UploadStepPreview() {
  return (
    <StepImage
      src={LANDING_IMAGES.STEP_UPLOAD}
      alt={LANDING_IMAGE_ALT.STEP_UPLOAD}
    />
  )
}

/**
 * Chat step screenshot for the second explainer step.
 */
export function ChatStepPreview() {
  return (
    <StepImage
      src={LANDING_IMAGES.STEP_CHAT}
      alt={LANDING_IMAGE_ALT.STEP_CHAT}
    />
  )
}

/**
 * Embed step screenshot for the third explainer step.
 */
export function EmbedStepPreview() {
  return (
    <StepImage
      src={LANDING_IMAGES.STEP_EMBED}
      alt={LANDING_IMAGE_ALT.STEP_EMBED}
    />
  )
}
