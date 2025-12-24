import type { ApiNamedResource } from '@scripts/interfaces/api/common/api-named-resource'

export interface ApiListResponse {
    count: number
    next: string | null
    previous: string | null
    results: ApiNamedResource[]
}
