import type { PokemonModel } from '@scripts/models/pokemon-model'
import type { SpeciesModel } from '@scripts/models/species-model'
import type { TypeModel } from '@scripts/models/type-model'
import type { EvolutionChainModel } from '@scripts/models/evolution-chain-model'

export type PokemonDialogTabKey = 'overview' | 'stats' | 'evolution'

export type EvolutionCard = {
    pokemon: PokemonModel
    species: SpeciesModel
}

export type EvolutionCardsStage = EvolutionCard | EvolutionCard[]

export type PokemonDialogData = {
    pokemon: PokemonModel
    species: SpeciesModel
    types: TypeModel[]
    evolutionChain: EvolutionChainModel
    evolutionStages: EvolutionCardsStage[]
}
