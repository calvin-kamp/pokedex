import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiListResponse } from '@scripts/interfaces/api/list-response'
import type { ApiPokemon } from '@scripts/interfaces/api/pokemon'

export const fetchPokemonList = async (endpoint: string = 'pokemon'): Promise<ApiListResponse> => {
    return fetchJson<ApiListResponse>(endpoint)
}

export const fetchPokemon = async (endpoint: string): Promise<ApiPokemon> => {
    return fetchJson<ApiPokemon>(endpoint)
}
