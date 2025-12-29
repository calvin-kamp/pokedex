import type { EvolutionCard } from '@scripts/interfaces/components/pokemon-dialog'
import { formatPokedexNumber } from '@scripts/utils/helper'

export const evolutionCardTemplate = (card: EvolutionCard): string => {
    return `
        <button class="evolution-card" data-evolution-card  data-pokemon-id="${card.pokemon.id}">
            <img
                class="evolution-card__image"
                src="${card.pokemon.image}"
                alt="${card.species.localizedName}"
            />
            <div class="evolution-card__wrapper">
                <small class="evolution-card__pokedex-number">#${formatPokedexNumber(
                    card.species.nationalPokedexNumber
                )}</small>
                <strong class="evolution-card__name">${card.species.localizedName}</strong>
            </div>
        </button>
    `
}
