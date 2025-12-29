import { languageStore } from '@scripts/stores/language-store'
import { applyLocale } from '@scripts/i18n/i18n-runtime'
import { pokedex } from '@scripts/components/pokedex'
import { pokemonDialog } from '@scripts/components/pokemon-dialog'
import type { LanguageSwitch } from '@scripts/interfaces/components/language-switch'

export const languageSwitch: LanguageSwitch = {
    vars: {
        queries: {
            component: '*[data-component=language-switch]',
            langSwitch: '*[data-language-switch]',
        },

        attributes: {
            language: 'data-language-switch',
        },
    },

    init(): void {
        const $languageSwitch = document.querySelector<HTMLDivElement>(this.vars.queries.component)

        if (!$languageSwitch) {
            return
        }

        this.getSelectedLanguage($languageSwitch)
        void applyLocale(languageStore.getLanguage())

        this.addEventTrigger($languageSwitch)
    },

    addEventTrigger($languageSwitch: HTMLDivElement): void {
        const $langSwitches = $languageSwitch.querySelectorAll<HTMLInputElement>(
            this.vars.queries.langSwitch
        )

        for (const $langSwitch of $langSwitches) {
            $langSwitch.addEventListener('change', () => {
                if (!$langSwitch.checked) {
                    return
                }

                this.setSelectedLanguage($langSwitch)
                pokedex.reloadPokemons()
                pokemonDialog.refreshOpenDialog()
            })
        }
    },

    setSelectedLanguage($langSwitch: HTMLInputElement): void {
        const language = $langSwitch.getAttribute(this.vars.attributes.language)

        if (language !== 'de' && language !== 'en') {
            return
        }

        languageStore.setLanguage(language)
        void applyLocale(language)
    },

    getSelectedLanguage($languageSwitch: HTMLDivElement): void {
        const selectedLanguage = languageStore.getLanguage()

        const $langSwitches = $languageSwitch.querySelectorAll<HTMLInputElement>(
            this.vars.queries.langSwitch
        )

        for (const $langSwitch of $langSwitches) {
            const language = $langSwitch.getAttribute(this.vars.attributes.language)

            if (language === selectedLanguage) {
                $langSwitch.checked = true
            }
        }
    },
}
