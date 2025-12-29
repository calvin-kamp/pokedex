import type { ApiGeneration, ApiGenerationNameEntry } from '@scripts/interfaces/api/generation'
import type {
    Generation,
    GenerationLocalizedNameEntry,
} from '@scripts/interfaces/domain/generation'
import { languageStore } from '@scripts/stores/language-store'

export class GenerationModel implements Generation {
    private generation: ApiGeneration

    constructor(data: ApiGeneration) {
        this.generation = data
    }

    get id(): number {
        return this.generation.id
    }

    get name(): string {
        return this.generation.name
    }

    get localizedName(): string {
        const lang = languageStore.getLanguage()
        const entry = (this.generation.names ?? [])
            .map((e) => this.toLocalizedName(e))
            .find((e) => e.language.name === lang)

        return entry?.name ?? this.generation.name
    }

    private toLocalizedName(entry: ApiGenerationNameEntry): GenerationLocalizedNameEntry {
        const {
            name,
            language: { name: languageName, url: languageUrl },
        } = entry

        return { name, language: { name: languageName, url: languageUrl } }
    }
}
