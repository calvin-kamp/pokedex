import type { ApiNamedResource } from '@scripts/interfaces/api/common/resources'

export type ApiGenerationNameEntry = {
    language: ApiNamedResource
    name: string
}

export interface ApiGeneration {
    id: number
    name: string
    names: ApiGenerationNameEntry[]
    main_region: ApiNamedResource

    abilities: ApiNamedResource[]
    moves: ApiNamedResource[]
    pokemon_species: ApiNamedResource[]
    types: ApiNamedResource[]
    version_groups: ApiNamedResource[]
}
