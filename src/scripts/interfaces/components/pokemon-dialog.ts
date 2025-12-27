export interface PokemonDialog {
    vars: {
        queries: {
            component: string
            content: string
            closeButton: string
            prevButton: string
            nextButton: string
        }

        attributes: {
            pokemonId: string
        }

        pokemonId: number
        pokemonIds: number[]
    }

    init(): void
    setPokemonIds(pokemonIds: number[]): void
    getNeighborIds(currentId: number): { prevId: number | null; nextId: number | null }
    setAttributes($pokemonDialog: HTMLDialogElement): void
    addEventTrigger($pokemonDialog: HTMLDialogElement): void
    loadPreviousPokemon($pokemonDialog: HTMLDialogElement): void
    loadNextPokemon($pokemonDialog: HTMLDialogElement): void
    navigateTo($pokemonDialog: HTMLDialogElement, pokemonId: number): void
    loadPokemonData($pokemonDialog: HTMLDialogElement, pokemonId: number): void
    openDialog(id: number, pokemonIds: number[]): void
    closeDialog($pokemonDialog: HTMLDialogElement): void
}
