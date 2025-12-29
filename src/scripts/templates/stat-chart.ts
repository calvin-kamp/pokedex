import type { PokemonModel } from '@scripts/models/pokemon-model'

const statLabel = (name: string): string => {
    const map: Record<string, string> = {
        hp: 'HP',
        attack: 'ATK',
        defense: 'DEF',
        'special-attack': 'SpA',
        'special-defense': 'SpD',
        speed: 'SPD',
    }

    return map[name] ?? name
}

export const statChartTemplate = (pokemon: PokemonModel): string => {
    const MAX = 255

    return `
        <ul class="pokemon-stats" aria-label="Base Stats">
            ${(pokemon.stats ?? [])
                .map((stat) => {
                    const value = Number(stat.baseStat ?? 0)
                    const percentage = Math.max(0, Math.min(100, Math.round((value / MAX) * 100)))

                    return `
                        <li class="pokemon-stats__item" data-stat="${stat.name}">
                            <span class="pokemon-stats__label">${statLabel(stat.name)}</span>

                            <span class="pokemon-stats__bar" aria-hidden="true">
                                <span class="pokemon-stats__bar-fill" style="--percentage:${percentage}%"></span>
                            </span>

                            <span class="pokemon-stats__value">${value}</span>
                        </li>
                    `
                })
                .join('')}
        </ul>
    `
}
