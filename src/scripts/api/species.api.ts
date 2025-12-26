import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiSpecies } from '@scripts/interfaces/api/species'

export const fetchSpecies = async (pokemonId: number): Promise<ApiSpecies> => {
    const baseUrl: string = import.meta.env.VITE_POKEAPI_BASE_URL
    const apiUrl: string = `${baseUrl}/pokemon-species/${pokemonId}`

    return fetchJson<ApiSpecies>(apiUrl)
}
