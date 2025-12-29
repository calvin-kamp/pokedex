import type { PokemonModel } from '@scripts/models/pokemon-model'

const statMeta = (name: string): { key: string; fallback: string } => {
    switch (name) {
        case 'hp':
            return { key: 'pokemon.stat.hp', fallback: 'HP' }
        case 'attack':
            return { key: 'pokemon.stat.atk', fallback: 'ATK' }
        case 'defense':
            return { key: 'pokemon.stat.def', fallback: 'DEF' }
        case 'special-attack':
            return { key: 'pokemon.stat.spa', fallback: 'SpA' }
        case 'special-defense':
            return { key: 'pokemon.stat.spd', fallback: 'SpD' }
        case 'speed':
            return { key: 'pokemon.stat.spe', fallback: 'SPD' }
        default:
            return { key: '', fallback: name }
    }
}

export const statChartTemplate = (pokemon: PokemonModel): string => {
    const MAX = 255

    return `
        <ul class="pokemon-stats" data-i18n-attr="aria-label:pokemon.baseStats" aria-label="Base Stats">
            ${(pokemon.stats ?? [])
                .map((stat) => {
                    const value = Number(stat.baseStat ?? 0)
                    const percentage = Math.max(0, Math.min(100, Math.round((value / MAX) * 100)))
                    const meta = statMeta(stat.name)

                    return `
                        <li class="pokemon-stats__item" data-stat="${stat.name}">
                            <span class="pokemon-stats__label" ${
                                meta.key ? `data-i18n="${meta.key}"` : ''
                            }>${meta.fallback}</span>

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
