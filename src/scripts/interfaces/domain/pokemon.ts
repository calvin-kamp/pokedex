import type { NamedResource } from '@scripts/interfaces/common/resources'

export interface PokemonType extends NamedResource {
    slot: number
}

export interface PokemonStat extends NamedResource {
    baseStat: number
}

export interface PokemonAbility extends NamedResource {
    slot: number
}
