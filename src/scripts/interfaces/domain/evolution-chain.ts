import type { NamedResource } from '@scripts/interfaces/common/resources'

export type EvolutionStage = NamedResource | NamedResource[]

export interface EvolutionChain {
    evolutions: EvolutionStage[]
}
