export interface LanguageSwitch {
    vars: {
        queries: {
            component: string
            langSwitch: string
        }

        attributes: {
            language: string
        }
    }

    init(): void
    addEventTrigger($langSwitch: HTMLDivElement): void
    setSelectedLanguage($langSwitch: HTMLInputElement): void
    getSelectedLanguage($languageSwitch: HTMLDivElement): void
}
