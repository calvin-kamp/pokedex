import type { ApiNamedResource } from '@scripts/interfaces/api/common/api-named-resource'

interface Sprites {
    front_default: string | null

    other?: {
        dream_world?: {
            front_default: string | null
        }
        'official-artwork'?: {
            front_default: string | null
        }
        home?: {
            front_default: string | null
        }
    }
}

export type ApiTypeEntry = {
    slot: number
    type: ApiNamedResource
}

export type ApiStatEntry = {
    base_stat: number
    effort: number
    stat: ApiNamedResource
}

export type ApiAbilityEntry = {
    slot: number
    is_hidden: boolean
    ability: ApiNamedResource
}

export interface ApiPokemon {
    id: number
    name: string
    weight: number
    height: number
    species: ApiNamedResource
    sprites: Sprites
    stats: ApiStatEntry[]
    types: ApiTypeEntry[]
    abilities: ApiAbilityEntry[]
}
