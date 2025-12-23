import { pokemonTypeTemplate } from '@scripts/templates/pokemon-type'

export const pokemonCardTemplate = (pokemon) => {
    return `
        <article class="pokemon pokemon--card" data-js="pokemon">
            <button class="pokemon__trigger" data-pokemon-id="${pokemon.id}">
                <figure>
                    <picture>
                        <img src="${pokemon.image}" alt="${pokemon.name}"
                    </picture>
                </figure>

                <small>
                    ${pokemon.id}
                </small>

                <strong class="pokemon__name">
                    ${pokemon.name}
                </strong>

                <ul class="pokemon__types">
                    ${pokemon.types.map((type) => `${pokemonTypeTemplate(type)}`).join('')}
                </ul>
            </button>
        </article>
    `
}
