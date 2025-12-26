import { languageStore } from '@scripts/stores/language-store'

export const languageSwitch = {
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

        this.addEventTrigger($languageSwitch)
        this.getSelectedLanguage($languageSwitch)
    },

    addEventTrigger($languageSwitch: HTMLDivElement): void {
        const $langSwitches = $languageSwitch.querySelectorAll<HTMLInputElement>(
            this.vars.queries.langSwitch
        )

        for (const $langSwitch of $langSwitches) {
            $langSwitch.addEventListener('change', () => {
                this.setSelectedLanguage($langSwitch)
            })
        }
    },

    setSelectedLanguage($langSwitch: HTMLInputElement): void {
        const language = $langSwitch.getAttribute(this.vars.attributes.language)

        if (!language?.length) {
            return
        }

        languageStore.setLanguage(language)
    },

    getSelectedLanguage($languageSwitch: HTMLDivElement) {
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
