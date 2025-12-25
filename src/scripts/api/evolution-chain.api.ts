import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiEvolutionChain } from '@scripts/interfaces/api/evolution-chain'

export const fetchEvolutionChain = async (endpoint: string): Promise<ApiEvolutionChain> => {
    return fetchJson<ApiEvolutionChain>(endpoint)
}
