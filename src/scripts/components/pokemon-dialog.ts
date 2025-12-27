import type { PokemonDialog } from '@scripts/interfaces/components/pokemon-dialog'
import { fetchSpecies } from '@scripts/api/species.api'
import { SpeciesModel } from '@scripts/models/species-model'
import { fetchEvolutionChain } from '@scripts/api/evolution-chain.api'
import { EvolutionChainModel } from '@scripts/models/evolution-chain-model'
import { pokemonDetailTemplate } from '../templates/pokemon-detail'

export const pokemonDialog: PokemonDialog = {
    vars: {
        queries: {
            component: '*[data-component=pokemon-dialog]',
            content: '*[data-pokemon-dialog-content]',
            closeButton: '*[data-pokemon-dialog-close]',
            prevButton: '*[data-pokemon-dialog-previous]',
            nextButton: '*[data-pokemon-dialog-next]',
            pokedexList: '*[data-pokedex-list]',
            pokemonIdAttr: 'data-pokemon-id',
        },

        pokemonId: 0,
        pokemonIds: [] as number[],
    },

    init(): void {
        const $pokemonDialog = document.querySelector<HTMLDialogElement>(
            this.vars.queries.component
        )

        if (!$pokemonDialog) {
            return
        }

        this.addEventTrigger($pokemonDialog)
    },

    getVisiblePokemonIds(): number[] {
        const $list = document.querySelector<HTMLElement>(this.vars.queries.pokedexList)

        if (!$list) {
            return []
        }

        const ids = Array.from(
            $list.querySelectorAll<HTMLElement>(`*[${this.vars.queries.pokemonIdAttr}]`)
        )
            .map((el) => {
                return Number(el.getAttribute(this.vars.queries.pokemonIdAttr))
            })
            .filter((id) => {
                return Number.isFinite(id) && id > 0
            })

        return Array.from(new Set(ids))
    },

    getNeighborIds(currentId: number): { prevId: number | null; nextId: number | null } {
        const ids = this.vars.pokemonIds
        const index = ids.indexOf(currentId)

        if (index === -1) {
            const prevFallback = currentId - 1
            const nextFallback = currentId + 1

            return {
                prevId: prevFallback >= 1 ? prevFallback : null,
                nextId: nextFallback,
            }
        }

        const prevId = index > 0 ? ids[index - 1] : null
        const nextId = index < ids.length - 1 ? ids[index + 1] : null

        return { prevId, nextId }
    },

    setAttributes($pokemonDialog: HTMLDialogElement): void {
        const $prevBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.prevButton
        )
        const $nextBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.nextButton
        )

        const { prevId, nextId } = this.getNeighborIds(this.vars.pokemonId)

        if ($prevBtn) {
            if (prevId) {
                $prevBtn.setAttribute(this.vars.queries.pokemonIdAttr, String(prevId))
                $prevBtn.disabled = false
            } else {
                $prevBtn.removeAttribute(this.vars.queries.pokemonIdAttr)
                $prevBtn.disabled = true
            }
        }

        if ($nextBtn) {
            if (nextId) {
                $nextBtn.setAttribute(this.vars.queries.pokemonIdAttr, String(nextId))
                $nextBtn.disabled = false
            } else {
                $nextBtn.removeAttribute(this.vars.queries.pokemonIdAttr)
                $nextBtn.disabled = true
            }
        }
    },

    addEventTrigger($pokemonDialog: HTMLDialogElement): void {
        const $closeBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.closeButton
        )

        $closeBtn?.addEventListener('click', () => {
            this.closeDialog($pokemonDialog)
        })

        const $prevBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.prevButton
        )

        $prevBtn?.addEventListener('click', () => {
            this.loadPreviousPokemon($pokemonDialog)
        })

        const $nextBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.nextButton
        )

        $nextBtn?.addEventListener('click', () => {
            this.loadNextPokemon($pokemonDialog)
        })
    },

    loadPreviousPokemon($pokemonDialog: HTMLDialogElement): void {
        const $prevBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.prevButton
        )

        if (!$prevBtn) {
            return
        }

        const prevId = Number($prevBtn.getAttribute(this.vars.queries.pokemonIdAttr))

        if (!prevId || prevId < 1) {
            return
        }

        this.navigateTo($pokemonDialog, prevId)
    },

    loadNextPokemon($pokemonDialog: HTMLDialogElement): void {
        const $nextBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.nextButton
        )

        if (!$nextBtn) {
            return
        }

        const nextId = Number($nextBtn.getAttribute(this.vars.queries.pokemonIdAttr))

        if (!nextId) {
            return
        }

        this.navigateTo($pokemonDialog, nextId)
    },

    navigateTo($pokemonDialog: HTMLDialogElement, pokemonId: number): void {
        if (!this.vars.pokemonIds.length) {
            this.vars.pokemonIds = this.getVisiblePokemonIds()
        }

        this.vars.pokemonId = pokemonId
        this.setAttributes($pokemonDialog)
        this.loadPokemonData($pokemonDialog, pokemonId)
    },

    loadPokemonData($pokemonDialog: HTMLDialogElement, pokemonId: number): void {
        const $content = $pokemonDialog.querySelector<HTMLDivElement>(this.vars.queries.content)

        if (!$content) {
            return
        }

        $content.innerHTML = ''

        fetchSpecies(pokemonId)
            .then((speciesData) => {
                const species = new SpeciesModel(speciesData)

                return fetchEvolutionChain(species.evolutionChainUrl).then((evolutionChainData) => {
                    const evolutionChain = new EvolutionChainModel(evolutionChainData)

                    const templateEl = document.createElement('template')
                    templateEl.innerHTML = pokemonDetailTemplate(species, evolutionChain)

                    $content.appendChild(templateEl.content.cloneNode(true))
                })
            })
            .catch((error) => {
                console.error(error)
            })
    },

    openDialog(id: number): void {
        const $pokemonDialog = document.querySelector<HTMLDialogElement>(
            this.vars.queries.component
        )

        if (!$pokemonDialog) {
            return
        }

        this.vars.pokemonIds = this.getVisiblePokemonIds()
        this.navigateTo($pokemonDialog, id)

        $pokemonDialog.showModal()
    },

    closeDialog($pokemonDialog: HTMLDialogElement): void {
        $pokemonDialog.close()
    },
}
