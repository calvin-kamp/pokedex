import type { ApiType, ApiNameEntry } from '@scripts/interfaces/api/type'
import type { Type, TypeLocalizedNameEntry } from '@scripts/interfaces/domain/type'
import { languageStore } from '@scripts/stores/language-store'

export class TypeModel implements Type {
    private type: ApiType
    constructor(data: ApiType) {
        this.type = data
    }

    get name(): string {
        return this.type.name
    }

    get localizedName(): string {
        const lang = languageStore.getLanguage()

        const entry = (this.type.names ?? [])
            .map((e) => this.toLocalizedName(e))
            .find((e) => e.language.name === lang)

        return entry?.name ?? this.type.name
    }

    private toLocalizedName(entry: ApiNameEntry): TypeLocalizedNameEntry {
        const {
            name,
            language: { name: languageName, url: languageUrl },
        } = entry

        return { name, language: { name: languageName, url: languageUrl } }
    }
}
