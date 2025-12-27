export const localStorageHelper = {
    setItem(key: string, value: unknown): void {
        localStorage.setItem(key, JSON.stringify(value))
    },

    getItem<T>(key: string, fallback: T): T {
        const item = localStorage.getItem(key)

        if (!item) {
            return fallback
        }

        try {
            return JSON.parse(item) as T
        } catch {
            return fallback
        }
    },
}
