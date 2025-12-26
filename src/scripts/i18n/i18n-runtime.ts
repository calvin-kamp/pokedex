import type { Locales, TranslationFunctions } from '@scripts/i18n/i18n-types'
import { baseLocale, isLocale, i18nObject } from '@scripts/i18n/i18n-util'
import { loadLocaleAsync } from '@scripts/i18n/i18n-util.async'
import { renderI18n } from '@scripts/i18n/render-i18n'

let currentLocale: Locales = baseLocale
let LL: TranslationFunctions = i18nObject(baseLocale)

export const getLL = (): TranslationFunctions => LL
export const getLocale = (): Locales => currentLocale

export const applyLocale = async (locale: string, root: ParentNode = document): Promise<void> => {
    const next: Locales = isLocale(locale) ? (locale as Locales) : baseLocale

    await loadLocaleAsync(next)

    currentLocale = next
    LL = i18nObject(next)

    document.documentElement.lang = next
    renderI18n(LL, root)
}
