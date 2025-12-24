import type { NamedResource } from '@scripts/interfaces/common/resources'

export interface SpeciesPokedexNumberEntry {
    entryNumber: number
    pokedex: NamedResource
}

export interface SpeciesDescriptionEntry {
    description: string
    language: NamedResource
    version: NamedResource
}

export interface SpeciesCategoryEntry {
    category: string
    language: NamedResource
}

export interface SpeciesLocalizedNameEntry {
    name: string
    language: NamedResource
}
