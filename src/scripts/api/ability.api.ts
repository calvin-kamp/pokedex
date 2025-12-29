import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiAbility } from '@scripts/interfaces/api/ability'
import type { ApiListResponse } from '@scripts/interfaces/api/list-response'

export const fetchAbilityList = async (
    endpoint: string = 'ability',
    init?: RequestInit
): Promise<ApiListResponse> => {
    return fetchJson<ApiListResponse>(endpoint, init)
}

export const fetchAbility = async (
    endpointOrId: string | number,
    init?: RequestInit
): Promise<ApiAbility> => {
    const endpoint = typeof endpointOrId === 'number' ? `ability/${endpointOrId}` : endpointOrId
    return fetchJson<ApiAbility>(endpoint, init)
}
