import type { TranslationFunctions } from '@scripts/i18n/i18n-types'

const getByPath = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

const t = (LL: TranslationFunctions, key: string): string => {
    const fn = getByPath(LL, key)

    if (typeof fn !== 'function') {
        return key
    }

    return String(fn())
}

export const renderI18n = (LL: TranslationFunctions, root: ParentNode = document): void => {
    const textNodes = root.querySelectorAll<HTMLElement>('[data-i18n]')

    for (const el of textNodes) {
        const key = el.dataset.i18n

        if (!key) {
            continue
        }

        el.textContent = t(LL, key)
    }

    const attrNodes = root.querySelectorAll<HTMLElement>('[data-i18n-attr]')

    for (const el of attrNodes) {
        const spec = el.dataset.i18nAttr

        if (!spec) {
            continue
        }

        const parts = spec
            .split(';')
            .map((s) => s.trim())
            .filter(Boolean)

        for (const part of parts) {
            const [attrName, key] = part.split(':').map((s) => s.trim())

            if (!attrName || !key) {
                continue
            }

            el.setAttribute(attrName, t(LL, key))
        }
    }
}
