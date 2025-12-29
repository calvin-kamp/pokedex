import type { NamedResource } from '@scripts/interfaces/common/resources'

export interface AbilityLocalizedNameEntry {
    name: string
    language: NamedResource
}

export interface Ability {
    name: string
    localizedName: string
}
