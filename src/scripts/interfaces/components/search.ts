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

        windowWidth: number
        timeOut: number | undefined

        state: {
            lastQuery: string
        }
    }

    init(): void
    addEventTrigger($search: HTMLElement): void
    openSearch($search: HTMLElement, $searchInput: HTMLInputElement): void
    closeSearch($search: HTMLElement, $searchInput: HTMLInputElement): void
    handleSearchInput($searchInput: HTMLInputElement): void
    handleSearchKeydown(
        e: KeyboardEvent,
        $search: HTMLElement,
        $searchInput: HTMLInputElement
    ): void
    submitSearch($searchInput: HTMLInputElement): void
    triggerSearch($searchInput: HTMLInputElement): void
    resetSearchIfNeeded(): void
    hideSearchBar($search: HTMLElement): void
    showSearchBar($search: HTMLElement): void
    loadSearchResults(searchQuery: string): void
}
