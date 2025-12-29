import type { PokemonAccordion } from '@scripts/interfaces/components/pokemon-accordion'

export const pokemonAccordion: PokemonAccordion = {
    vars: {
        queries: {
            component: '*[data-component="pokemon-accordion"]',
            item: '*[data-accordion-item]',
            summary: '*[data-accordion-summary]',
            content: '*[data-accordion-content]',
        },

        animation: {
            durationMs: 240,
        },
    },

    init(root: ParentNode = document): void {
        const $accordions = Array.from(
            root.querySelectorAll<HTMLElement>(this.vars.queries.component)
        )

        for (const $accordion of $accordions) {
            if ($accordion.dataset.accordionBound === 'true') {
                continue
            }

            $accordion.dataset.accordionBound = 'true'

            const $items = Array.from(
                $accordion.querySelectorAll<HTMLDetailsElement>(this.vars.queries.item)
            )

            if (!$items.length) {
                continue
            }

            const openItems = $items.filter((d) => d.open)
            if (openItems.length === 0) {
                $items[0].open = true
            } else if (openItems.length > 1) {
                openItems.slice(1).forEach((d) => (d.open = false))
            }

            $accordion.addEventListener('click', (e) => {
                const target = e.target as HTMLElement
                const $summary = target.closest<HTMLElement>(this.vars.queries.summary)

                if (!$summary) {
                    return
                }

                const $item = $summary.closest<HTMLDetailsElement>(this.vars.queries.item)

                if (!$item) {
                    return
                }

                e.preventDefault()

                if ($item.open) {
                    this.animateClose($item)
                    return
                }

                for (const other of $items) {
                    if (other !== $item && other.open) {
                        this.animateClose(other)
                    }
                }

                this.animateOpen($item)
            })
        }
    },

    animateOpen($item: HTMLDetailsElement): void {
        const $content = $item.querySelector<HTMLElement>(this.vars.queries.content)

        if (!$content) {
            $item.open = true
            return
        }

        $content.style.transitionDuration = `${this.vars.animation.durationMs}ms`
        $content.style.overflow = 'hidden'

        $item.open = true

        $content.style.height = '0px'
        void $content.offsetHeight

        const targetHeight = $content.scrollHeight
        $content.style.height = `${targetHeight}px`

        const onEnd = (ev: TransitionEvent) => {
            if (ev.propertyName !== 'height') {
                return
            }

            $content.removeEventListener('transitionend', onEnd)

            $content.style.height = 'auto'
            $content.style.overflow = ''
        }

        $content.addEventListener('transitionend', onEnd)
    },

    animateClose($item: HTMLDetailsElement): void {
        const $content = $item.querySelector<HTMLElement>(this.vars.queries.content)

        if (!$content) {
            $item.open = false
            return
        }

        $content.style.transitionDuration = `${this.vars.animation.durationMs}ms`
        $content.style.overflow = 'hidden'

        const startHeight = $content.scrollHeight
        $content.style.height = `${startHeight}px`
        void $content.offsetHeight

        $content.style.height = '0px'

        const onEnd = (ev: TransitionEvent) => {
            if (ev.propertyName !== 'height') {
                return
            }

            $content.removeEventListener('transitionend', onEnd)

            $item.open = false

            $content.style.height = ''
            $content.style.overflow = ''
        }

        $content.addEventListener('transitionend', onEnd)
    },
}
