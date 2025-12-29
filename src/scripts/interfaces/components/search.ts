export interface Search {
    vars: {
        queries: {
            component: string
            openSearch: string
            closeSearch: string
            searchInput: string
            searchSubmit: string
        }

        classes: {
            showSearch: string
        }

        timeOut: number | undefined

        state: {
            lastQuery: string
        }
    }

    init(): void
    addEventTrigger($search: HTMLElement): void
    isButtonOnlyMode(): boolean
    openSearch($search: HTMLElement, $searchInput: HTMLInputElement): void
    closeSearch($search: HTMLElement, $searchInput: HTMLInputElement): void
    closeAfterSubmit($search: HTMLElement, $searchInput: HTMLInputElement): void
    handleSearchInput($searchInput: HTMLInputElement): void
    handleSearchKeydown(
        e: KeyboardEvent,
        $search: HTMLElement,
        $searchInput: HTMLInputElement
    ): void
    submitSearch($search: HTMLElement, $searchInput: HTMLInputElement): void
    triggerSearch($searchInput: HTMLInputElement): void
    resetSearch(): void
    hideSearchBar($search: HTMLElement): void
    showSearchBar($search: HTMLElement): void
    loadSearchResults(searchQuery: string): void
}
