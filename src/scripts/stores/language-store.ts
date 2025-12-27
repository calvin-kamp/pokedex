import { localStorageHelper } from '@scripts/utils/local-storage-helper'
import type { Language } from '@scripts/interfaces/stores/language'

export const languageStore = {
    vars: {
        defaultLanguage: 'en' as Language,
        storageKey: 'language',
    },

    setLanguage(language: Language): void {
        localStorageHelper.setItem(this.vars.storageKey, language)
    },

    getLanguage(): Language {
        return localStorageHelper.getItem<Language>(this.vars.storageKey, this.vars.defaultLanguage)
    },
}
