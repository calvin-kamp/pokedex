import type { NamedResource } from '@scripts/interfaces/common/resources'

export interface Generation {
    id: number
    name: string
    localizedName: string
}

export type GenerationLocalizedNameEntry = {
    name: string
    language: NamedResource
}
