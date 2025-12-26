import type { NamedResource } from '@scripts/interfaces/common/resources'

export interface TypeLocalizedNameEntry {
    name: string
    language: NamedResource
}

export interface Type {
    name: string
    localizedName: string
}
