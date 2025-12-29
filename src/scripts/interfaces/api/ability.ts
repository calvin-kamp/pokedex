import type { ApiNamedResource } from '@scripts/interfaces/api/common/resources'

export type ApiAbilityNameEntry = {
    language: ApiNamedResource
    name: string
}

export interface ApiAbility {
    name: string
    names: ApiAbilityNameEntry[]
}
