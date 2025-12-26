export const localStorageHelper = {
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },

    getItem(key, fallback) {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : fallback
    },
}
