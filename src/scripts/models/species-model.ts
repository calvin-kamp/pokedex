import type {
    ApiSpecies,
    ApiPokedexNumberEntry,
    ApiFlavorTextEntry,
    ApiNameEntry,
    ApiGenusEntry,
} from '@scripts/interfaces/api/species'

import type {
    SpeciesPokedexNumberEntry,
    SpeciesDescriptionEntry,
    SpeciesCategoryEntry,
    SpeciesLocalizedNameEntry,
    Species,
} from '@scripts/interfaces/domain/species'

import type { NamedResource } from '@scripts/interfaces/common/resources'
import { languageStore } from '@scripts/stores/language-store'

export class SpeciesModel implements Species {
    private species: ApiSpecies
    private generation: NamedResource

    constructor(data: ApiSpecies) {
        this.species = data
        this.generation = this.species.generation
    }

    get name(): string {
        return this.species.name
    }

    get id(): number {
        return this.species.id
    }

    get evolutionChainUrl(): string {
        return this.species.evolution_chain.url
    }

    get evolvesFromSpeciesUrl(): string | undefined {
        return this.species.evolves_from_species?.url
    }

    get generationName(): string {
        return this.generation.name
    }

    get generationUrl(): string {
        return this.generation.url
    }

    get descriptions(): SpeciesDescriptionEntry[] {
        const apiEntries: ApiFlavorTextEntry[] = this.species.flavor_text_entries ?? []
        return apiEntries.map((entry) => this.toDescription(entry))
    }

    get localizedDescription(): string {
        const lang = languageStore.getLanguage()

        const entry =
            this.descriptions.find((d) => d.language.name === lang) ??
            this.descriptions.find((d) => d.language.name === 'en') ??
            this.descriptions[0]

        const text = entry?.description ?? ''
        return text.replace(/\f/g, ' ').replace(/\s+/g, ' ').trim()
    }

    get categories(): SpeciesCategoryEntry[] {
        const apiEntries: ApiGenusEntry[] = this.species.genera ?? []
        return apiEntries.map((entry) => this.toCategory(entry))
    }

    get localizedName(): string {
        const lang = languageStore.getLanguage()

        const entry = (this.species.names ?? [])
            .map((e) => this.toLocalizedName(e))
            .find((e) => e.language.name === lang)

        return entry?.name ?? this.species.name
    }

    get nationalPokedexNumber(): number {
        const entry = this.pokedexNumbers.find((e) => e.pokedex.name === 'national')
        return entry?.entryNumber ?? this.id
    }

    get pokedexNumbers(): SpeciesPokedexNumberEntry[] {
        const apiPokedexNumbers: ApiPokedexNumberEntry[] = this.species.pokedex_numbers ?? []
        return apiPokedexNumbers.map((entry) => this.toPokedexNumber(entry))
    }

    private toPokedexNumber(entry: ApiPokedexNumberEntry): SpeciesPokedexNumberEntry {
        const {
            entry_number: entryNumber,
            pokedex: { name, url },
        } = entry

        return { entryNumber, pokedex: { name, url } }
    }

    private toDescription(entry: ApiFlavorTextEntry): SpeciesDescriptionEntry {
        const {
            flavor_text: description,
            language: { name: languageName, url: languageUrl },
            version: { name: versionName, url: versionUrl },
        } = entry

        return {
            description,
            language: { name: languageName, url: languageUrl },
            version: { name: versionName, url: versionUrl },
        }
    }

    private toCategory(entry: ApiGenusEntry): SpeciesCategoryEntry {
        const {
            genus: category,
            language: { name, url },
        } = entry

        return { category, language: { name, url } }
    }

    private toLocalizedName(entry: ApiNameEntry): SpeciesLocalizedNameEntry {
        const {
            name,
            language: { name: languageName, url: languageUrl },
        } = entry

        return { name, language: { name: languageName, url: languageUrl } }
    }
}
