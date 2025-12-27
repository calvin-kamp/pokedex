import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiType } from '@scripts/interfaces/api/type'
import type { ApiListResponse } from '@scripts/interfaces/api/list-response'

export const fetchTypeList = async (
    endpoint: string = 'type',
    init?: RequestInit
): Promise<ApiListResponse> => {
    return fetchJson<ApiListResponse>(endpoint, init)
}

export const fetchType = async (
    endpointOrId: string | number,
    init?: RequestInit
): Promise<ApiType> => {
    const endpoint = typeof endpointOrId === 'number' ? `type/${endpointOrId}` : endpointOrId
    return fetchJson<ApiType>(endpoint, init)
}
