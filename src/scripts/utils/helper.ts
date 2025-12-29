import { languageStore } from '@scripts/stores/language-store'

export const formatPokedexNumber = (n: number, length: number = 3): string => {
    const value = Number.isFinite(n) ? Math.trunc(n) : 0
    return String(value).padStart(length, '0')
}

const numberFormat = (locale: string, fractionDigits: number = 1): Intl.NumberFormat => {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    })
}

/**
 * PokeAPI: height = decimeters (dm)
 * - de: m
 * - en: ft/in
 */
export const formatPokemonHeight = (heightDm: number): string => {
    const dm = Number.isFinite(heightDm) ? heightDm : 0
    const meters = dm / 10
    const lang = languageStore.getLanguage()

    if (lang === 'de') {
        return `${numberFormat('de-DE', 1).format(meters)} m`
    }

    // en
    const totalInches = meters * 39.37007874015748
    let feet = Math.floor(totalInches / 12)
    let inches = Math.round(totalInches - feet * 12)

    if (inches === 12) {
        feet += 1
        inches = 0
    }

    return `${feet} ft ${inches} in`
}

/**
 * PokeAPI: weight = hectograms (hg)
 * - de: kg
 * - en: lb
 */
export const formatPokemonWeight = (weightHg: number): string => {
    const hg = Number.isFinite(weightHg) ? weightHg : 0
    const kg = hg / 10
    const lang = languageStore.getLanguage()

    if (lang === 'de') {
        return `${numberFormat('de-DE', 1).format(kg)} kg`
    }

    // en
    const lb = kg * 2.2046226218487757
    return `${numberFormat('en-US', 1).format(lb)} lb`
}
