import type { ApiAbility, ApiAbilityNameEntry } from '@scripts/interfaces/api/ability'
import type { Ability, AbilityLocalizedNameEntry } from '@scripts/interfaces/domain/ability'
import { languageStore } from '@scripts/stores/language-store'

const humanize = (value: string): string => {
    return String(value ?? '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
}

export class AbilityModel implements Ability {
    private ability: ApiAbility

    constructor(data: ApiAbility) {
        this.ability = data
    }

    get name(): string {
        return this.ability.name
    }

    get localizedName(): string {
        const lang = languageStore.getLanguage()

        const entry = (this.ability.names ?? [])
            .map((e) => this.toLocalizedName(e))
            .find((e) => e.language.name === lang)

        return entry?.name ?? humanize(this.ability.name)
    }

    private toLocalizedName(entry: ApiAbilityNameEntry): AbilityLocalizedNameEntry {
        const { language, name } = entry
        return { language, name }
    }
}
