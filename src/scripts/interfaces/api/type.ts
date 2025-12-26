import type { ApiNamedResource } from '@scripts/interfaces/api/common/resources'

export type ApiNameEntry = {
    language: ApiNamedResource
    name: string
}

export interface ApiType {
    name: string
    names: ApiNameEntry[]
}
