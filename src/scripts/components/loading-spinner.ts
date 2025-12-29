import type { LoadingSpinner } from '@scripts/interfaces/components/loading-spinner'

export const loadingSpinner: LoadingSpinner = {
    vars: {
        queries: {
            component: '*[data-component="loader"]',
        },
    },

    getElement(): HTMLElement | null {
        return document.querySelector<HTMLElement>(this.vars.queries.component)
    },

    show(): void {
        this.toggle(true)
    },

    hide(): void {
        this.toggle(false)
    },

    toggle(isVisible: boolean): void {
        const el = this.getElement()

        if (!el) {
            return
        }

        el.hidden = !isVisible
    },
}
