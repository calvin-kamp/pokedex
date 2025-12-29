export interface PokemonAccordion {
    vars: {
        queries: {
            component: string
            item: string
            summary: string
            content: string
        }

        animation: {
            durationMs: number
        }
    }

    init(root?: ParentNode): void
    animateOpen($item: HTMLDetailsElement): void
    animateClose($item: HTMLDetailsElement): void
}
