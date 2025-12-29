import { pokemonTypeTemplate } from '@scripts/templates/pokemon-type'
import type { PokemonModel } from '@scripts/models/pokemon-model'
import type { SpeciesModel } from '@scripts/models/species-model'
import type { TypeModel } from '@scripts/models/type-model'
import type { EvolutionCardsStage } from '@scripts/interfaces/components/pokemon-dialog'
import { evolutionStageTemplate } from '@scripts/templates/evolution-stage'
import { statChartTemplate } from '@scripts/templates/stat-chart'
import {
    formatPokedexNumber,
    formatPokemonHeight,
    formatPokemonWeight,
} from '@scripts/utils/helper'

const humanize = (value: string): string => {
    return String(value ?? '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
}

const hasRealEvolution = (stages: EvolutionCardsStage[] = []): boolean => {
    if (!stages.length) {
        return false
    }

    const flatten = (input: EvolutionCardsStage[]): unknown[] => {
        const out: unknown[] = []
        for (const s of input) {
            if (Array.isArray(s)) {
                out.push(...s)
            } else {
                out.push(s)
            }
        }
        return out
    }

    return flatten(stages).length > 1
}

export const pokemonDetailTemplate = (
    pokemon: PokemonModel,
    species: SpeciesModel,
    types: TypeModel[],
    evolutionStages: EvolutionCardsStage[]
): string => {
    const description = species.localizedDescription
    const abilities = pokemon.abilities ?? []

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
                <details class="pokemon-accordion__item data-accordion-item" open>
                    <summary class="pokemon-accordion__summary data-accordion-summary">
                        <span class="pokemon-accordion__title">Übersicht</span>
                        <span class="pokemon-accordion__chevron" aria-hidden="true"></span>
                    </summary>

                    <div class="pokemon-accordion__content data-accordion-content">
                        <section class="pokemon__section">
                            <h3 class="pokemon__headline">Beschreibung</h3>
                            <p class="pokemon__description">${description || '—'}</p>
                        </section>

                        <section class="pokemon__section">
                            <h3 class="pokemon__headline">Infos</h3>

                            <ul class="pokemon-info">
                                <li class="pokemon-info__item">
                                    <small>Größe</small>
                                    <strong>${formatPokemonHeight(pokemon.height)}</strong>
                                </li>
                                
                                <li class="pokemon-info__item">
                                    <small>Gewicht</small>
                                    <strong>${formatPokemonWeight(pokemon.weight)}</strong>
                                </li>
                            </ul>

                            <div class="pokemon__subsection">
                                <h4 class="pokemon__subheadline">Fähigkeiten</h4>

                                ${
                                    abilities.length
                                        ? `
                                            <ul class="pokemon-abilities">
                                                ${abilities
                                                    .map(
                                                        (ability) =>
                                                            `<li class="pokemon-abilities__item">${humanize(
                                                                ability.name
                                                            )}</li>`
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

                <details class="pokemon-accordion__item data-accordion-item">
                    <summary class="pokemon-accordion__summary data-accordion-summary">
                        <span class="pokemon-accordion__title">Stats</span>
                        <span class="pokemon-accordion__chevron" aria-hidden="true"></span>
                    </summary>

                    <div class="pokemon-accordion__content data-accordion-content">
                        <section class="pokemon__section">
                            <h3 class="pokemon__headline">Stats</h3>
                            ${statChartTemplate(pokemon)}
                        </section>
                    </div>
                </details>

                ${
                    showEvolution
                        ? `
                            <details class="pokemon-accordion__item data-accordion-item">
                                <summary class="pokemon-accordion__summary data-accordion-summary">
                                    <span class="pokemon-accordion__title">Evolution</span>
                                    <span class="pokemon-accordion__chevron" aria-hidden="true"></span>
                                </summary>

                                <div class="pokemon-accordion__content data-accordion-content">
                                    <section class="pokemon__section">
                                        <h3 class="pokemon__headline">Evolution</h3>
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
