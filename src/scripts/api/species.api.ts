import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiSpecies } from '@scripts/interfaces/api/species'

export const fetchSpecies = async (
    endpointOrPokemonId: string | number,
    init?: RequestInit
): Promise<ApiSpecies> => {
    const apiUrl =
        typeof endpointOrPokemonId === 'number'
            ? `pokemon-species/${endpointOrPokemonId}`
            : endpointOrPokemonId

    return fetchJson<ApiSpecies>(apiUrl, init)
}
