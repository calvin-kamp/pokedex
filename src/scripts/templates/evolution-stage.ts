import type { EvolutionCardsStage } from '@scripts/interfaces/components/pokemon-dialog'
import { evolutionCardTemplate } from '@scripts/templates/evolution-card'

export const evolutionStageTemplate = (stages: EvolutionCardsStage[]): string => {
    return `
        <ul class="evolution-chain">
            ${stages
                .map((stage) => {
                    if (Array.isArray(stage)) {
                        return `
                            <li class="evolution-chain__stage evolution-chain__stage--branch">
                                <ul class="evolution-chain__row">
                                    ${stage
                                        .map(
                                            (card) => `
                                                <li class="evolution-chain__item">
                                                    ${evolutionCardTemplate(card)}
                                                </li>
                                            `
                                        )
                                        .join('')}
                                </ul>
                            </li>
                        `
                    }

                    return `
                        <li class="evolution-chain__stage">
                            <div class="evolution-chain__single">
                                ${evolutionCardTemplate(stage)}
                            </div>
                        </li>
                    `
                })
                .join('')}
        </ul>
    `
}
