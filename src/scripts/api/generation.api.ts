import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiGeneration } from '@scripts/interfaces/api/generation'
import type { ApiListResponse } from '@scripts/interfaces/api/list-response'

export const fetchGenerationList = async (
    endpoint: string = 'generation',
    init?: RequestInit
): Promise<ApiListResponse> => {
    return fetchJson<ApiListResponse>(endpoint, init)
}

export const fetchGeneration = async (
    endpointOrId: string | number,
    init?: RequestInit
): Promise<ApiGeneration> => {
    const endpoint = typeof endpointOrId === 'number' ? `generation/${endpointOrId}` : endpointOrId
    return fetchJson<ApiGeneration>(endpoint, init)
}
