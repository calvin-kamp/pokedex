export const pokemonTypeTemplate = (type) => {
    return `
        <li class="type type--${type.name}">
            ${type.name}
        </li>
    `
}
