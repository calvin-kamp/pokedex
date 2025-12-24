import type { ApiNamedResource } from '@scripts/interfaces/api/common/resources'

interface ApiPokemonSprites {
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
    sprites: ApiPokemonSprites
    stats: ApiStatEntry[]
    types: ApiTypeEntry[]
    abilities: ApiAbilityEntry[]
}
