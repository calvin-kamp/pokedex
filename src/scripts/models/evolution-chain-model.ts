import type { ApiEvolutionChain, ApiChainLink } from '@scripts/interfaces/api/evolution-chain'
import type { EvolutionChain, EvolutionStage } from '@scripts/interfaces/domain/evolution-chain'
import type { NamedResource } from '@scripts/interfaces/common/resources'

export class EvolutionChainModel implements EvolutionChain {
    private evolutionChain: ApiEvolutionChain

    constructor(data: ApiEvolutionChain) {
        this.evolutionChain = data
    }

    get evolutions(): EvolutionStage[] {
        return this.buildStages(this.evolutionChain.chain)
    }

    private buildStages(root: ApiChainLink): EvolutionStage[] {
        const result: EvolutionStage[] = []

        let currentLevel: ApiChainLink[] = [root]

        while (currentLevel.length > 0) {
            const resources: NamedResource[] = currentLevel.map((node) => this.toResource(node))

            result.push(resources.length === 1 ? resources[0] : resources)

            const nextLevel: ApiChainLink[] = []
            for (const node of currentLevel) {
                nextLevel.push(...(node.evolves_to ?? []))
            }

            currentLevel = nextLevel
        }

        return result
    }

    private toResource(node: ApiChainLink): NamedResource {
        const { name, url } = node.species
        return { name, url }
    }
}
