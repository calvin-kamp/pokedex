import type { ApiNamedResource } from '@scripts/interfaces/api/common/resources'

export interface ApiChainLink {
    species: ApiNamedResource
    evolves_to?: ApiChainLink[]
}

export interface ApiEvolutionChain {
    chain: ApiChainLink
}
