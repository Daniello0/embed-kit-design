import { ASSETS } from './app.constants'

export interface MockPartner {
  id: string
  name: string
  logoUrl: string
}

export const MOCK_PARTNERS: MockPartner[] = [
  { id: 'partner-1', name: 'Acme Corp', logoUrl: ASSETS.PLACEHOLDER_LOGO },
  { id: 'partner-2', name: 'Northwind', logoUrl: ASSETS.PLACEHOLDER_LOGO },
  { id: 'partner-3', name: 'Globex', logoUrl: ASSETS.PLACEHOLDER_LOGO },
  { id: 'partner-4', name: 'Initech', logoUrl: ASSETS.PLACEHOLDER_LOGO },
  { id: 'partner-5', name: 'Umbrella', logoUrl: ASSETS.PLACEHOLDER_LOGO },
]
