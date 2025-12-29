export interface LoadingSpinner {
    vars: {
        queries: {
            component: string
        }
    }

    getElement(): HTMLElement | null
    show(): void
    hide(): void
    toggle(isVisible: boolean): void
}
