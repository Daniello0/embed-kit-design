export const LANDING_COPY = {
  LOG_IN: 'Log in',
  HERO_TAGLINE:
    'Turn your docs into a chatbot. Embed it on your site in minutes.',
  HERO_CTA: 'Build your bot free',
  EXAMPLES_TITLE: 'See it in action',
  EXAMPLE_UPLOAD: 'Upload documents',
  EXAMPLE_CHAT: 'Test in chat',
  EXAMPLE_WIDGET: 'Embed on your site',
  EXAMPLE_CITATION: 'pricing.pdf',
  EXAMPLE_CHAT_MESSAGE: 'Our Pro plan starts at $14.99/month.',
  EXAMPLE_WATERMARK: 'Powered by EmbedKit',
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
