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
        <ul class="pokemon-stats">
            ${pokemon.stats
                .map((s) => {
                    const value = Number(s.baseStat ?? 0)
                    const pct = Math.max(0, Math.min(100, Math.round((value / MAX) * 100)))

                    return `
                        <li class="pokemon-stats__item">
                            <span class="pokemon-stats__label">${statLabel(s.name)}</span>
                            <span class="pokemon-stats__bar" aria-hidden="true">
                                <span class="pokemon-stats__bar-fill" style="width:${pct}%"></span>
                            </span>
                            <span class="pokemon-stats__value">${value}</span>
                        </li>
                    `
                })
                .join('')}
        </ul>
    `
}
