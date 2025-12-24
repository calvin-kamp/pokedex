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
} from '@scripts/interfaces/domain/species'

export class SpeciesModel {
    private species: ApiSpecies

    constructor(data: ApiSpecies) {
        this.species = data
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
        return this.species.evolves_from_species?.url || undefined
    }

    get pokedexNumbers(): SpeciesPokedexNumberEntry[] {
        const apiPokedexNumbers: ApiPokedexNumberEntry[] = this.species.pokedex_numbers ?? []
        return apiPokedexNumbers.map((entry) => this.toPokedexNumber(entry))
    }

    get generationName(): string {
        return this.species.generation.name
    }

    get generationUrl(): string {
        return this.species.generation.url
    }

    get descriptions(): SpeciesDescriptionEntry[] {
        const apiEntries: ApiFlavorTextEntry[] = this.species.flavor_text_entries ?? []
        return apiEntries.map((entry) => this.toDescription(entry))
    }

    get categories(): SpeciesCategoryEntry[] {
        const apiEntries: ApiGenusEntry[] = this.species.genera ?? []
        return apiEntries.map((entry) => this.toCategory(entry))
    }

    get localizedNames(): SpeciesLocalizedNameEntry[] {
        const apiEntries: ApiNameEntry[] = this.species.names ?? []
        return apiEntries.map((entry) => this.toLocalizedName(entry))
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
