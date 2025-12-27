export const fetchJson = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
    const baseUrl: string = String(import.meta.env.VITE_POKEAPI_BASE_URL ?? '').replace(/\/+$/, '')
    const clean = String(endpoint ?? '').replace(/^\/+/, '')
    const apiUrl = clean.startsWith('http') ? clean : `${baseUrl}/${clean}`

    try {
        const response = await fetch(apiUrl, init)

        if (!response.ok) {
            throw new Error(
                `Response status: ${response.status} (${response.statusText}) for ${apiUrl}`
            )
        }

        return (await response.json()) as T
    } catch (error) {
        console.error(error)
        throw error
    }
}
