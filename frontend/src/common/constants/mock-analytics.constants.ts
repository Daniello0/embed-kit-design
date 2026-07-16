export interface MockAnalyticsStat {
  label: string
  value: string
  change: string
}

export interface MockAnalyticsDailyCount {
  date: string
  conversations: number
}

export const MOCK_ANALYTICS_STATS: MockAnalyticsStat[] = [
  { label: 'Total conversations', value: '1,284', change: '+12%' },
  { label: 'Messages answered', value: '4,902', change: '+8%' },
  { label: 'Avg. response time', value: '1.2s', change: '-5%' },
  { label: 'Resolution rate', value: '87%', change: '+3%' },
]

export const MOCK_ANALYTICS_DAILY: MockAnalyticsDailyCount[] = [
  { date: '2026-03-04', conversations: 42 },
  { date: '2026-03-05', conversations: 58 },
  { date: '2026-03-06', conversations: 51 },
  { date: '2026-03-07', conversations: 63 },
  { date: '2026-03-08', conversations: 47 },
  { date: '2026-03-09', conversations: 72 },
  { date: '2026-03-10', conversations: 68 },
]

export const MOCK_TOP_QUESTIONS = [
  { question: 'What are your pricing plans?', count: 186 },
  { question: 'How do I embed the widget?', count: 142 },
  { question: 'Do you offer a free trial?', count: 98 },
  { question: 'What file formats are supported?', count: 76 },
] as const
