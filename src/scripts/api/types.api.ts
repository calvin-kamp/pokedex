import { fetchJson } from '@scripts/api/fetch-json'

export const fetchTypes = async (endpoint: string) => {
    const baseUrl: string = import.meta.env.VITE_POKEAPI_BASE_URL
    const apiUrl: string = endpoint?.startsWith('https') ? endpoint : `${baseUrl}/${endpoint}`

    return fetchJson(apiUrl)
}
