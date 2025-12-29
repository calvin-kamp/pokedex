import type {
    ApiPokemon,
    ApiAbilityEntry,
    ApiStatEntry,
    ApiTypeEntry,
} from '@scripts/interfaces/api/pokemon'

import type {
    PokemonAbility,
    PokemonStat,
    PokemonType,
    Pokemon,
} from '@scripts/interfaces/domain/pokemon'
import type { NamedResource } from '@scripts/interfaces/common/resources'

export class PokemonModel implements Pokemon {
    private pokemon: ApiPokemon
    private species: NamedResource
    constructor(data: ApiPokemon) {
        this.pokemon = data
        this.species = this.pokemon.species
    }

    get name(): string {
        return this.pokemon.name
    }

    get id(): number {
        return this.pokemon.id
    }

    get image(): string {
        return (
            this.pokemon.sprites.other?.dream_world?.front_default ||
            this.pokemon.sprites.other?.['official-artwork']?.front_default ||
            this.pokemon.sprites.other?.home?.front_default ||
            this.pokemon.sprites.front_default ||
            ''
        )
    }

    get height(): number {
        return this.pokemon.height
    }

    get weight(): number {
        return this.pokemon.weight
    }

    get types(): PokemonType[] {
        const apiTypes: ApiTypeEntry[] = this.pokemon.types ?? []

        return apiTypes.map((entry) => this.toType(entry))
    }

    get stats(): PokemonStat[] {
        const apiStats: ApiStatEntry[] = this.pokemon.stats ?? []

        return apiStats.map((entry) => this.toStat(entry))
    }

    get abilities(): PokemonAbility[] {
        const apiAbilities: ApiAbilityEntry[] = this.pokemon.abilities ?? []

        return apiAbilities
            .filter((entry) => !entry.is_hidden)
            .map((entry) => this.toAbility(entry))
    }

    get speciesUrl(): string {
        return this.species.url
    }

    get speciesName(): string {
        return this.species.name
    }

    private toType = (entry: ApiTypeEntry): PokemonType => {
        const {
            slot,
            type: { name, url },
        } = entry

        return { slot, name, url }
    }

    private toStat = (entry: ApiStatEntry): PokemonStat => {
        const {
            base_stat: baseStat,
            stat: { name, url },
        } = entry

        return { baseStat, name, url }
    }

    private toAbility = (entry: ApiAbilityEntry): PokemonAbility => {
        const {
            slot,
            ability: { name, url },
        } = entry

        return { slot, name, url }
    }
}
