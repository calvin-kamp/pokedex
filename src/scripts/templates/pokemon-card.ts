import { pokemonTypeTemplate } from '@scripts/templates/pokemon-type'
import type { PokemonModel } from '@scripts/models/pokemon-model'
import type { SpeciesModel } from '@scripts/models/species-model'
import type { TypeModel } from '@scripts/models/type-model'
import { formatPokedexNumber } from '@scripts/utils/helper'

const getTypeBorderVar = (typeName: string): string => {
    // nutzt deine Tokens: --color-type-<name>-background
    return `var(--color-type-${typeName}-background)`
}

export const pokemonCardTemplate = (
    pokemon: PokemonModel,
    species: SpeciesModel,
    types: TypeModel[]
): string => {
    const primaryType = types[0]?.name ?? 'normal'
    const secondaryType = types[1]?.name ?? null

    const border1 = getTypeBorderVar(primaryType)
    const border2 = secondaryType ? getTypeBorderVar(secondaryType) : border1

    return `
        <article
            class="pokemon pokemon--card"
            data-component="pokemon"
            data-pokemon-id="${pokemon.id}"
            style="--pokemon-border-color-1:${border1};--pokemon-border-color-2:${border2};"
        >
            <button class="pokemon__trigger" type="button">
                <figure class="pokemon__thumb">
                    <picture>
                        <img class="pokemon__image" src="${pokemon.image}" alt="${pokemon.name}">
                    </picture>
                </figure>

                <small class="pokemon__pokedex-number">
                    #${formatPokedexNumber(species.nationalPokedexNumber)}
                </small>

                <strong class="pokemon__name">
                    ${species.localizedName}
                </strong>

                <ul class="pokemon__types">
                    ${types.map((type) => pokemonTypeTemplate(type)).join('')}
                </ul>
            </button>
        </article>
    `
}
