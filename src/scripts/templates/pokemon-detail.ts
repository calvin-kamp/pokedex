import { pokemonTypeTemplate } from '@scripts/templates/pokemon-type'
import type { PokemonModel } from '@scripts/models/pokemon-model'
import type { SpeciesModel } from '@scripts/models/species-model'
import type { TypeModel } from '@scripts/models/type-model'
import type { EvolutionCardsStage } from '@scripts/interfaces/components/pokemon-dialog'
import type { AbilityModel } from '@scripts/models/ability-model'
import { evolutionStageTemplate } from '@scripts/templates/evolution-stage'
import { statChartTemplate } from '@scripts/templates/stat-chart'
import {
    formatPokedexNumber,
    formatPokemonHeight,
    formatPokemonWeight,
} from '@scripts/utils/helper'

const hasRealEvolution = (stages: EvolutionCardsStage[] = []): boolean => {
    if (!stages.length) return false

    const flatten = (input: EvolutionCardsStage[]): unknown[] => {
        const out: unknown[] = []
        for (const s of input) out.push(...(Array.isArray(s) ? s : [s]))
        return out
    }

    return flatten(stages).length > 1
}

export const pokemonDetailTemplate = (
    pokemon: PokemonModel,
    species: SpeciesModel,
    types: TypeModel[],
    evolutionStages: EvolutionCardsStage[],
    abilitiesModels: AbilityModel[]
): string => {
    const description = species.localizedDescription
    const abilities = abilitiesModels ?? []
    const showEvolution = hasRealEvolution(evolutionStages)

    return `
        <article class="pokemon pokemon--detail" data-pokemon-id="${pokemon.id}">
            <header class="pokemon__header">
                <figure class="pokemon__thumb">
                    <img class="pokemon__image" src="${pokemon.image}" alt="${
        species.localizedName
    }">
                </figure>

                <div class="pokemon__meta">
                    <small class="pokemon__pokedex-number">
                        #${formatPokedexNumber(species.nationalPokedexNumber)}
                    </small>

                    <h2 class="pokemon__name">${species.localizedName}</h2>

                    <ul class="pokemon__types">
                        ${types.map((t) => pokemonTypeTemplate(t)).join('')}
                    </ul>
                </div>
            </header>

            <div class="pokemon-accordion" data-component="pokemon-accordion">
                <details class="pokemon-accordion__item" data-accordion-item open>
                    <summary class="pokemon-accordion__summary" data-accordion-summary>
                        <span class="pokemon-accordion__title" data-i18n="pokemon.overview">Overview</span>
                        <span class="pokemon-accordion__chevron" aria-hidden="true"></span>
                    </summary>

                    <div class="pokemon-accordion__content" data-accordion-content>
                        <section class="pokemon__section">
                            <h3 class="pokemon__headline" data-i18n="pokemon.description">Description</h3>
                            <p class="pokemon__description">${description || '—'}</p>
                        </section>

                        <section class="pokemon__section">
                            <h3 class="pokemon__headline" data-i18n="pokemon.info">Info</h3>

                            <ul class="pokemon-info">
                                <li class="pokemon-info__item">
                                    <small data-i18n="pokemon.height">Height</small>
                                    <strong>${formatPokemonHeight(pokemon.height)}</strong>
                                </li>
                                
                                <li class="pokemon-info__item">
                                    <small data-i18n="pokemon.weight">Weight</small>
                                    <strong>${formatPokemonWeight(pokemon.weight)}</strong>
                                </li>
                            </ul>

                            <div class="pokemon__subsection">
                                <h4 class="pokemon__subheadline" data-i18n="pokemon.abilities">Abilities</h4>

                                ${
                                    abilities.length
                                        ? `
                                            <ul class="pokemon-abilities">
                                                ${abilities
                                                    .map(
                                                        (a) =>
                                                            `<li class="pokemon-abilities__item">${a.localizedName}</li>`
                                                    )
                                                    .join('')}
                                            </ul>
                                        `
                                        : `<p class="pokemon__muted">—</p>`
                                }
                            </div>
                        </section>
                    </div>
                </details>

                <details class="pokemon-accordion__item" data-accordion-item>
                    <summary class="pokemon-accordion__summary" data-accordion-summary>
                        <span class="pokemon-accordion__title" data-i18n="pokemon.stats">Stats</span>
                        <span class="pokemon-accordion__chevron" aria-hidden="true"></span>
                    </summary>

                    <div class="pokemon-accordion__content" data-accordion-content>
                        <section class="pokemon__section">
                            <h3 class="pokemon__headline" data-i18n="pokemon.baseStats">Base Stats</h3>
                            ${statChartTemplate(pokemon)}
                        </section>
                    </div>
                </details>

                ${
                    showEvolution
                        ? `
                            <details class="pokemon-accordion__item" data-accordion-item>
                                <summary class="pokemon-accordion__summary" data-accordion-summary>
                                    <span class="pokemon-accordion__title" data-i18n="pokemon.evolution">Evolution</span>
                                    <span class="pokemon-accordion__chevron" aria-hidden="true"></span>
                                </summary>

                                <div class="pokemon-accordion__content" data-accordion-content>
                                    <section class="pokemon__section">
                                        <h3 class="pokemon__headline" data-i18n="pokemon.evolution">Evolution</h3>
                                        ${evolutionStageTemplate(evolutionStages)}
                                    </section>
                                </div>
                            </details>
                        `
                        : ''
                }
            </div>
        </article>
    `
}
