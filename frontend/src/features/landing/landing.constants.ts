export const LANDING_IMAGES = {
  HERO: '/gen-images/hero-landing.png',
  STEP_UPLOAD: '/gen-images/step-upload.png',
  STEP_CHAT: '/gen-images/step-chat.png',
  STEP_EMBED: '/gen-images/step-embed.png',
} as const

export const LANDING_PRELOAD_IMAGES = [
  LANDING_IMAGES.HERO,
  LANDING_IMAGES.STEP_UPLOAD,
  LANDING_IMAGES.STEP_CHAT,
  LANDING_IMAGES.STEP_EMBED,
] as const

export const LANDING_IMAGE_DIMENSIONS = {
  WIDTH: 1536,
  HEIGHT: 1024,
} as const

export const LANDING_IMAGE_ALT = {
  STEP_UPLOAD: 'Upload PDFs and documents to train your bot',
  STEP_CHAT: 'Test your bot in chat with source citations',
  STEP_EMBED: 'Embed the chat widget on your website',
} as const

export const LANDING_COPY = {
  LOG_IN: 'Log in',
  START_APP: 'Start app',
  HERO_TAGLINE:
    'Turn your docs into a chatbot. Embed it on your site in minutes.',
  HERO_CTA: 'Build your bot free',
  EXPLAINER_TITLE: 'How it works',
  PARTNERS_TITLE: 'Trusted by growing teams',
  PRICING_TITLE: 'Simple, transparent pricing',
  PRICING_LINK: 'View all plans',
  CTA_TITLE: 'Start building',
  CTA_SUBTEXT: 'Free plan · No credit card required',
} as const

export interface ExplainerStep {
  id: string
  title: string
  description: string
}

export const EXPLAINER_STEPS: ExplainerStep[] = [
  {
    id: 'upload',
    title: 'Upload',
    description: 'Add PDFs, docs, or FAQs to train your bot.',
  },
  {
    id: 'test',
    title: 'Test',
    description: 'Chat with your bot before going live.',
  },
  {
    id: 'embed',
    title: 'Embed',
    description: 'Copy one snippet and add it to your site.',
  },
]
