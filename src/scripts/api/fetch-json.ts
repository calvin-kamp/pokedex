export const fetchJson = async <T>(endpoint: string = 'pokemon'): Promise<T> => {
    const baseUrl: string = import.meta.env.VITE_POKEAPI_BASE_URL
    const apiUrl: string = endpoint?.startsWith('https') ? endpoint : `${baseUrl}/${endpoint}`

    try {
        const response: Response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const result: T = await response.json()

        return result
    } catch (error) {
        console.error(error)

        throw error
    }
}
