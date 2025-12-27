import { fetchPokemonList, fetchPokemon } from '@scripts/api/pokemon.api'
import { PokemonModel } from '@scripts/models/pokemon-model'
import { fetchSpecies } from '@scripts/api/species.api'
import { fetchType } from '@scripts/api/type.api'
import { TypeModel } from '@scripts/models/type-model'
import { pokemonCardTemplate } from '@scripts/templates/pokemon-card'
import { SpeciesModel } from '@scripts/models/species-model'
import { pokemonDialog } from '@scripts/components/pokemon-dialog'
import type { Pokedex, PokemonCardData } from '@scripts/interfaces/components/pokedex'

export const pokedex: Pokedex = {
    vars: {
        queries: {
            component: '*[data-component=pokedex]',
            list: '*[data-pokedex-list]',
            pokemonCard: '*[data-component=pokemon]',
            openDialogButton: '*[data-pokemon-id]',
            loadMoreButton: '*[data-pokedex-load-more]',
        },

        attributes: {
            pokemonId: 'data-pokemon-id',
        },

        api: {
            limit: 24,
            offset: 0,

            loadMoreAmount: 12,
            reloadLimit: 24,

            defaultEndpoint: 'pokemon?limit=24&offset=0',
        },
    },

    init(): void {
        const $pokedex = document.querySelector<HTMLElement>(this.vars.queries.component)

        if (!$pokedex) {
            return
        }

        this.loadPokemonData(this.vars.api.defaultEndpoint, { append: false })
        this.addEventTrigger($pokedex)
    },

    addEventTrigger($pokedex: HTMLElement) {
        const $loadMoreButton = $pokedex.querySelector<HTMLButtonElement>(
            this.vars.queries.loadMoreButton
        )

        $loadMoreButton?.addEventListener('click', () => {
            this.loadMorePokemons()
        })

        const $pokedexList = $pokedex.querySelector<HTMLUListElement>(this.vars.queries.list)

        $pokedexList?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            const $openDialogButton = target.closest<HTMLElement>(
                this.vars.queries.openDialogButton
            )

            if (!$openDialogButton) {
                return
            }

            const pokemonId = Number($openDialogButton.getAttribute(this.vars.attributes.pokemonId))

            if (!Number.isFinite(pokemonId) || pokemonId <= 0) {
                return
            }

            const pokemonIds = Array.from(
                $pokedexList.querySelectorAll<HTMLElement>(`*[${this.vars.attributes.pokemonId}]`)
            )
                .map((el) => {
                    return Number(el.getAttribute(this.vars.attributes.pokemonId))
                })
                .filter((id) => {
                    return Number.isFinite(id) && id > 0
                })

            pokemonDialog.openDialog(pokemonId, pokemonIds)
        })
    },

    loadMorePokemons(): void {
        const limit = this.vars.api.loadMoreAmount
        const endpoint = `pokemon?limit=${limit}&offset=${this.vars.api.offset}`

        this.loadPokemonData(endpoint, { append: true })

        this.vars.api.reloadLimit += this.vars.api.loadMoreAmount
    },

    loadPokemonData(endpoint: string, options?: { append?: boolean }): void {
        const $pokedex = document.querySelector<HTMLElement>(this.vars.queries.component)
        const $pokedexList = $pokedex?.querySelector<HTMLUListElement>(this.vars.queries.list)
        const $loadMoreButton = $pokedex?.querySelector<HTMLButtonElement>(
            this.vars.queries.loadMoreButton
        )

        if (!$pokedex || !$pokedexList || !$loadMoreButton) {
            return
        }

        const append = options?.append ?? true

        $loadMoreButton.disabled = true

        if (!append) {
            $pokedexList.innerHTML = ''
        }

        fetchPokemonList(endpoint)
            .then((pokemonList) => Promise.all(pokemonList.results.map((p) => fetchPokemon(p.url))))
            .then((pokemonsData) =>
                Promise.all(
                    pokemonsData.map((pokemonData) => {
                        const pokemon = new PokemonModel(pokemonData)

                        const speciesPromise = fetchSpecies(pokemon.id).then(
                            (speciesData) => new SpeciesModel(speciesData)
                        )

                        const typesPromise = Promise.all(
                            pokemon.types.map((t) =>
                                fetchType(t.url).then((typeData) => new TypeModel(typeData))
                            )
                        )

                        return Promise.all([speciesPromise, typesPromise]).then(
                            ([species, types]): PokemonCardData => ({ pokemon, species, types })
                        )
                    })
                )
            )
            .then((cards) => {
                this.renderPokemonCards(cards, { append, $pokedexList })

                if (append) {
                    this.vars.api.offset += cards.length
                    return
                }

                this.vars.api.offset = cards.length
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                $loadMoreButton.disabled = false
            })
    },

    renderPokemonCards(
        cards: PokemonCardData[],
        context: { append: boolean; $pokedexList: HTMLUListElement }
    ): void {
        const { append, $pokedexList } = context

        if (!append) {
            $pokedexList.innerHTML = ''
        }

        for (const card of cards) {
            const liEl = document.createElement('li')

            liEl.classList.add('pokedex__item', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3')

            liEl.innerHTML = pokemonCardTemplate(card.pokemon, card.species, card.types)
            $pokedexList.appendChild(liEl)
        }
    },

    reloadPokemons(): void {
        const endpoint = `pokemon?limit=${this.vars.api.reloadLimit}&offset=0`
        this.loadPokemonData(endpoint, { append: false })
    },

    loadPokemonsByIds(ids: number[], options?: { append?: boolean }): void {
        const $pokedex = document.querySelector<HTMLElement>(this.vars.queries.component)
        const $pokedexList = $pokedex?.querySelector<HTMLUListElement>(this.vars.queries.list)
        const $loadMoreButton = $pokedex?.querySelector<HTMLButtonElement>(
            this.vars.queries.loadMoreButton
        )

        if (!$pokedex || !$pokedexList || !$loadMoreButton) {
            return
        }

        const append = options?.append ?? false

        $loadMoreButton.disabled = true

        if (!append) {
            $pokedexList.innerHTML = ''
        }

        Promise.all(ids.map((id) => fetchPokemon(`pokemon/${id}`)))
            .then((pokemonsData) =>
                Promise.all(
                    pokemonsData.map((pokemonData) => {
                        const pokemon = new PokemonModel(pokemonData)

                        const speciesPromise = fetchSpecies(pokemon.id).then(
                            (speciesData) => new SpeciesModel(speciesData)
                        )

                        const typesPromise = Promise.all(
                            pokemon.types.map((t) =>
                                fetchType(t.url).then((typeData) => new TypeModel(typeData))
                            )
                        )

                        return Promise.all([speciesPromise, typesPromise]).then(
                            ([species, types]): PokemonCardData => ({ pokemon, species, types })
                        )
                    })
                )
            )
            .then((cards) => {
                this.renderPokemonCards(cards, { append, $pokedexList })
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                $loadMoreButton.disabled = false
            })
    },
}
