import type {
    PokemonDialog,
    PokemonDialogData,
    EvolutionCardsStage,
    EvolutionCard,
} from '@scripts/interfaces/components/pokemon-dialog'
import { fetchPokemon } from '@scripts/api/pokemon.api'
import { PokemonModel } from '@scripts/models/pokemon-model'
import { fetchType } from '@scripts/api/type.api'
import { TypeModel } from '@scripts/models/type-model'
import { fetchSpecies } from '@scripts/api/species.api'
import { SpeciesModel } from '@scripts/models/species-model'
import { fetchEvolutionChain } from '@scripts/api/evolution-chain.api'
import { EvolutionChainModel } from '@scripts/models/evolution-chain-model'
import { pokemonDetailTemplate } from '@scripts/templates/pokemon-detail'
import { pokemonAccordion } from '@scripts/components/pokemon-accordion'
import type { EvolutionStage } from '@scripts/interfaces/domain/evolution-chain'
import type { NamedResource } from '@scripts/interfaces/common/resources'
import { applyLocale } from '@scripts/i18n/i18n-runtime'
import { languageStore } from '@scripts/stores/language-store'

const resolveEvolutionCard = async (resource: NamedResource): Promise<EvolutionCard> => {
    const [pokemonData, speciesData] = await Promise.all([
        fetchPokemon(`pokemon/${resource.name}`),
        fetchSpecies(resource.url),
    ])

    return {
        pokemon: new PokemonModel(pokemonData),
        species: new SpeciesModel(speciesData),
    }
}

const resolveEvolutionStages = async (stages: EvolutionStage[]): Promise<EvolutionCardsStage[]> => {
    return Promise.all(
        stages.map(async (stage) => {
            if (Array.isArray(stage)) {
                return Promise.all(stage.map((r) => resolveEvolutionCard(r)))
            }

            return resolveEvolutionCard(stage)
        })
    )
}

export const pokemonDialog: PokemonDialog = {
    vars: {
        queries: {
            component: '*[data-component=pokemon-dialog]',
            content: '*[data-pokemon-dialog-content]',
            closeButton: '*[data-pokemon-dialog-close]',
            prevButton: '*[data-pokemon-dialog-previous]',
            nextButton: '*[data-pokemon-dialog-next]',
            evolutionCard: '*[data-evolution-card]',
        },

        attributes: {
            pokemonId: 'data-pokemon-id',
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

    refreshOpenDialog(): void {
        const $pokemonDialog = document.querySelector<HTMLDialogElement>(
            this.vars.queries.component
        )

        if (!$pokemonDialog || !$pokemonDialog.open) {
            return
        }

        this.setAttributes($pokemonDialog)
        this.loadPokemonData($pokemonDialog, this.vars.pokemonId)
    },

    setPokemonIds(pokemonIds: number[]): void {
        const unique = Array.from(new Set(pokemonIds)).filter((id) => Number.isFinite(id) && id > 0)
        this.vars.pokemonIds = unique
    },

    getNeighborIds(currentId: number): { prevId: number | null; nextId: number | null } {
        const ids = this.vars.pokemonIds
        const index = ids.indexOf(currentId)

        if (index === -1) {
            return { prevId: null, nextId: null }
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
                $prevBtn.setAttribute(this.vars.attributes.pokemonId, String(prevId))
                $prevBtn.disabled = false
            } else {
                $prevBtn.removeAttribute(this.vars.attributes.pokemonId)
                $prevBtn.disabled = true
            }
        }

        if ($nextBtn) {
            if (nextId) {
                $nextBtn.setAttribute(this.vars.attributes.pokemonId, String(nextId))
                $nextBtn.disabled = false
            } else {
                $nextBtn.removeAttribute(this.vars.attributes.pokemonId)
                $nextBtn.disabled = true
            }
        }
    },

    addEventTrigger($pokemonDialog: HTMLDialogElement): void {
        const $closeBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.closeButton
        )
        $closeBtn?.addEventListener('click', () => this.closeDialog($pokemonDialog))

        const $prevBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.prevButton
        )
        $prevBtn?.addEventListener('click', () => this.loadPreviousPokemon($pokemonDialog))

        const $nextBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.nextButton
        )
        $nextBtn?.addEventListener('click', () => this.loadNextPokemon($pokemonDialog))

        $pokemonDialog.addEventListener('cancel', (e) => {
            e.preventDefault()
            this.closeDialog($pokemonDialog)
        })

        $pokemonDialog.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            if (target !== $pokemonDialog) {
                return
            }

            const rect = $pokemonDialog.getBoundingClientRect()
            const me = e as MouseEvent
            const isInside =
                me.clientX >= rect.left &&
                me.clientX <= rect.right &&
                me.clientY >= rect.top &&
                me.clientY <= rect.bottom

            if (!isInside) {
                this.closeDialog($pokemonDialog)
            }
        })

        $pokemonDialog.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            const $card = target.closest<HTMLButtonElement>(this.vars.queries.evolutionCard)
            if (!$card) {
                return
            }

            const id = Number($card.getAttribute(this.vars.attributes.pokemonId))
            if (!Number.isFinite(id) || id <= 0) {
                return
            }

            this.navigateTo($pokemonDialog, id)
        })
    },

    loadPreviousPokemon($pokemonDialog: HTMLDialogElement): void {
        const $prevBtn = $pokemonDialog.querySelector<HTMLButtonElement>(
            this.vars.queries.prevButton
        )
        if (!$prevBtn) {
            return
        }

        const prevId = Number($prevBtn.getAttribute(this.vars.attributes.pokemonId))
        if (!prevId) {
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

        const nextId = Number($nextBtn.getAttribute(this.vars.attributes.pokemonId))
        if (!nextId) {
            return
        }

        this.navigateTo($pokemonDialog, nextId)
    },

    navigateTo($pokemonDialog: HTMLDialogElement, pokemonId: number): void {
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

        Promise.resolve()
            .then(async () => {
                const pokemonData = await fetchPokemon(pokemonId)
                const pokemon = new PokemonModel(pokemonData)

                const [typesData, speciesData] = await Promise.all([
                    Promise.all(
                        pokemon.types.map((t) => fetchType(t.url).then((d) => new TypeModel(d)))
                    ),
                    fetchSpecies(pokemonId).then((d) => new SpeciesModel(d)),
                ])

                const evolutionChainData = await fetchEvolutionChain(speciesData.evolutionChainUrl)
                const evolutionChain = new EvolutionChainModel(evolutionChainData)

                const evolutionStages = await resolveEvolutionStages(evolutionChain.evolutions)

                const dialogData: PokemonDialogData = {
                    pokemon,
                    species: speciesData,
                    types: typesData,
                    evolutionChain,
                    evolutionStages,
                }

                const templateEl = document.createElement('template')
                templateEl.innerHTML = pokemonDetailTemplate(
                    dialogData.pokemon,
                    dialogData.species,
                    dialogData.types,
                    dialogData.evolutionStages
                )

                $content.appendChild(templateEl.content.cloneNode(true))
                await applyLocale(languageStore.getLanguage(), $content)
                pokemonAccordion.init($content)
            })
            .catch((error) => console.error(error))
    },

    openDialog(id: number, pokemonIds: number[]): void {
        const $pokemonDialog = document.querySelector<HTMLDialogElement>(
            this.vars.queries.component
        )
        if (!$pokemonDialog) {
            return
        }

        this.setPokemonIds(pokemonIds)
        this.navigateTo($pokemonDialog, id)

        $pokemonDialog.showModal()
    },

    closeDialog($pokemonDialog: HTMLDialogElement): void {
        $pokemonDialog.close()
    },
}
