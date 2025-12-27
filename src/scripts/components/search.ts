import nameMap from '@json/pokemon-name-map.json'
import { languageStore } from '@scripts/stores/language-store'
import { pokedex } from '@scripts/components/pokedex'
import type { Search } from '@scripts/interfaces/components/search'

export const search: Search = {
    vars: {
        queries: {
            component: '*[data-component=search]',
            openSearch: '*[data-search-open]',
            closeSearch: '*[data-search-close]',
            searchInput: '*[data-search-input]',
            searchSubmit: '*[data-search-submit]',
        },

        classes: {
            showSearch: 'search--visible',
        },

        windowWidth: 0,
        timeOut: undefined as number | undefined,

        state: {
            lastQuery: '',
        },
    },

    init() {
        const $search = document.querySelector<HTMLElement>(this.vars.queries.component)

        if (!$search) {
            return
        }

        this.addEventTrigger($search)
    },

    addEventTrigger($search: HTMLElement) {
        const $openSearch = $search.querySelector<HTMLButtonElement>(this.vars.queries.openSearch)
        const $closeSearch = $search.querySelector<HTMLButtonElement>(this.vars.queries.closeSearch)

        const $searchInput = $search.querySelector<HTMLInputElement>(this.vars.queries.searchInput)
        const $searchTrigger = $search.querySelector<HTMLButtonElement>(
            this.vars.queries.searchSubmit
        )

        if (!$openSearch || !$closeSearch || !$searchInput || !$searchTrigger) {
            return
        }

        $openSearch.addEventListener('click', () => {
            this.openSearch($search, $searchInput)
        })

        $closeSearch.addEventListener('click', () => {
            this.closeSearch($search, $searchInput)
        })

        $searchInput.addEventListener('input', () => {
            this.handleSearchInput($searchInput)
        })

        $searchInput.addEventListener('keydown', (e) => {
            this.handleSearchKeydown(e, $search, $searchInput)
        })

        $searchTrigger.addEventListener('click', () => {
            this.submitSearch($searchInput)
        })
    },

    openSearch($search: HTMLElement, $searchInput: HTMLInputElement): void {
        this.showSearchBar($search)
        $searchInput.focus()
    },

    closeSearch($search: HTMLElement, $searchInput: HTMLInputElement): void {
        window.clearTimeout(this.vars.timeOut)

        $searchInput.value = ''
        $searchInput.blur()

        this.resetSearch()
        this.hideSearchBar($search)
    },

    handleSearchInput($searchInput: HTMLInputElement): void {
        window.clearTimeout(this.vars.timeOut)

        const searchQuery = $searchInput.value.trim()

        if (searchQuery.length < 3) {
            this.resetSearch()
            return
        }

        this.vars.timeOut = window.setTimeout(() => {
            this.triggerSearch($searchInput)
        }, 300)
    },

    handleSearchKeydown(
        e: KeyboardEvent,
        $search: HTMLElement,
        $searchInput: HTMLInputElement
    ): void {
        if (e.key === 'Enter') {
            e.preventDefault()
            window.clearTimeout(this.vars.timeOut)
            this.triggerSearch($searchInput)
            return
        }

        if (e.key === 'Escape') {
            this.closeSearch($search, $searchInput)
            return
        }
    },

    submitSearch($searchInput: HTMLInputElement): void {
        window.clearTimeout(this.vars.timeOut)
        this.triggerSearch($searchInput)
    },

    triggerSearch($searchInput: HTMLInputElement): void {
        const searchQuery = $searchInput.value.trim()

        if (searchQuery.length < 3) {
            return
        }

        this.vars.state.lastQuery = searchQuery
        this.loadSearchResults(searchQuery)
    },

    resetSearch(): void {
        if (this.vars.state.lastQuery.length === 0) {
            return
        }

        this.vars.state.lastQuery = ''
        pokedex.reloadPokemons()
    },

    hideSearchBar($search: HTMLElement) {
        $search.classList.remove(this.vars.classes.showSearch)
    },

    showSearchBar($search: HTMLElement) {
        $search.classList.add(this.vars.classes.showSearch)
    },

    loadSearchResults(searchQuery: string) {
        const language = languageStore.getLanguage()

        const list = Object.entries(nameMap.bySlug).map(([slug, entry]) => {
            return {
                slug: slug,
                id: entry.id,
                en: entry.en,
                de: entry.de,
            }
        })

        const hits = list.filter((entry) => {
            const value = entry[language].toLowerCase()
            return value.includes(searchQuery.toLowerCase())
        })

        const ids = hits.map((hit) => {
            return hit.id
        })

        pokedex.loadPokemonsByIds(ids, { append: false })
    },
}
