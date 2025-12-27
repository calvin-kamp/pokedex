import type { PokemonModel } from '@scripts/models/pokemon-model'
import type { SpeciesModel } from '@scripts/models/species-model'
import type { TypeModel } from '@scripts/models/type-model'

export type PokemonCardData = {
    pokemon: PokemonModel
    species: SpeciesModel
    types: TypeModel[]
}

export interface Pokedex {
    vars: {
        queries: {
            component: string
            list: string
            pokemonCard: string
            openDialogButton: string
            loadMoreButton: string
        }

        attributes: {
            pokemonId: string
        }

        api: {
            limit: number
            offset: number
            loadMoreAmount: number
            reloadLimit: number
            defaultEndpoint: string
        }
    }

    init(): void
    addEventTrigger($pokedex: HTMLElement): void
    loadMorePokemons(): void
    loadPokemonData(endpoint: string, options?: { append?: boolean }): void
    renderPokemonCards(
        cards: PokemonCardData[],
        context: { append: boolean; $pokedexList: HTMLUListElement }
    ): void
    reloadPokemons(): void
    loadPokemonsByIds(ids: number[], options?: { append?: boolean }): void
}
