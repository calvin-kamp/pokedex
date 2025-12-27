import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiEvolutionChain } from '@scripts/interfaces/api/evolution-chain'

export const fetchEvolutionChain = async (
    endpointOrId: string | number,
    init?: RequestInit
): Promise<ApiEvolutionChain> => {
    const endpoint =
        typeof endpointOrId === 'number' ? `evolution-chain/${endpointOrId}` : endpointOrId

    return fetchJson<ApiEvolutionChain>(endpoint, init)
}
