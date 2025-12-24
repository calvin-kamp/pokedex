import type { ApiResource, ApiNamedResource } from '@scripts/interfaces/api/common/resources'

export type ApiPokedexNumberEntry = {
    entry_number: number
    pokedex: ApiNamedResource
}

export type ApiFlavorTextEntry = {
    flavor_text: string
    language: ApiNamedResource
    version: ApiNamedResource
}

export type ApiNameEntry = {
    language: ApiNamedResource
    name: string
}

export type ApiGeneraEntry = {
    language: ApiNamedResource
    genus: string
}

export interface ApiSpecies {
    name: string
    id: number
    evolution_chain: ApiResource
    evolves_from_species: ApiNamedResource | null
    pokedex_numbers: ApiPokedexNumberEntry[]
    generation: ApiNamedResource
    flavor_text_entries: ApiFlavorTextEntry[]
    genera: ApiGeneraEntry[]
    names: ApiNameEntry[]
}
