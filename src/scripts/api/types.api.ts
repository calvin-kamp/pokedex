import { fetchJson } from '@scripts/api/fetch-json'
import type { ApiType } from '@scripts/interfaces/api/type'

export const fetchTypes = async (endpoint: string): Promise<ApiType> => {
    const baseUrl: string = import.meta.env.VITE_POKEAPI_BASE_URL
    const apiUrl: string = endpoint?.startsWith('https') ? endpoint : `${baseUrl}/${endpoint}`

    return fetchJson(apiUrl)
}
