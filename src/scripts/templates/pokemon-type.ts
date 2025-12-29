import type { Type } from '@scripts/interfaces/domain/type'

export const pokemonTypeTemplate = (type: Type) => {
    return `
        <li class="type type--${type.name}">
            ${type.localizedName}
        </li>
    `
}
