import { localStorageHelper } from '@scripts/utils/local-storage-helper'

export const languageStore = {
    vars: {
        defaultLanguage: 'en',
    },

    setLanguage(language: string) {
        localStorageHelper.setItem('language', language)
    },

    getLanguage() {
        const language = localStorage.getItem('language')

        if (!language) {
            this.setLanguage(this.vars.defaultLanguage)
            return this.vars.defaultLanguage
        }

        try {
            return JSON.parse(language)
        } catch {
            this.setLanguage(this.vars.defaultLanguage)
            return this.vars.defaultLanguage
        }
    },
}
