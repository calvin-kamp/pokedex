import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiPokemon } from '@scripts/interfaces/api/pokemon'
import type { ApiListResponse } from '@scripts/interfaces/api/list-response'

export const fetchPokemonList = async (
    endpoint: string = 'pokemon',
    init?: RequestInit
): Promise<ApiListResponse> => {
    return fetchJson<ApiListResponse>(endpoint, init)
}

export const fetchPokemon = async (
    endpointOrId: string | number,
    init?: RequestInit
): Promise<ApiPokemon> => {
    const apiUrl = typeof endpointOrId === 'number' ? `pokemon/${endpointOrId}` : endpointOrId

    return fetchJson<ApiPokemon>(apiUrl, init)
}
