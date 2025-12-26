import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiListResponse } from '@scripts/interfaces/api/list-response'
import type { ApiPokemon } from '@scripts/interfaces/api/pokemon'

export const fetchPokemonList = async (endpoint: string = 'pokemon'): Promise<ApiListResponse> => {
    const baseUrl: string = import.meta.env.VITE_POKEAPI_BASE_URL
    const apiUrl: string = endpoint.startsWith('https') ? endpoint : `${baseUrl}/${endpoint}`

    return fetchJson<ApiListResponse>(apiUrl)
}

export const fetchPokemon = async (endpoint: string): Promise<ApiPokemon> => {
    const baseUrl: string = import.meta.env.VITE_POKEAPI_BASE_URL
    const apiUrl: string = endpoint.startsWith('https') ? endpoint : `${baseUrl}/${endpoint}`

    return fetchJson<ApiPokemon>(apiUrl)
}
