import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiSpecies } from '@scripts/interfaces/api/species'

export const fetchSpecies = async (endpointOrUrl: string): Promise<ApiSpecies> => {
    return fetchJson<ApiSpecies>(endpointOrUrl)
}
