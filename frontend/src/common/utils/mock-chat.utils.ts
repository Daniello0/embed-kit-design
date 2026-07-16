import type { MockResponse } from '@/common/types/mock-response.types'

/**
 * Finds the first mock chat response whose match string appears in the query.
 */
export function findMockResponse(
  query: string,
  responses: MockResponse[],
): MockResponse | undefined {
  const normalizedQuery = query.trim().toLowerCase()

  return responses.find(
    (response) =>
      response.match !== 'fallback' &&
      normalizedQuery.includes(response.match.toLowerCase()),
  )
}

/**
 * Resolves a mock chat response, using the fallback entry when no match is found.
 */
export function getMockResponseOrFallback(
  query: string,
  responses: MockResponse[],
): MockResponse {
  const match = findMockResponse(query, responses)
  if (match) {
    return match
  }

  const fallback = responses.find((response) => response.match === 'fallback')
  if (!fallback) {
    throw new Error('Mock chat responses must include a fallback entry.')
  }

  return fallback
}
