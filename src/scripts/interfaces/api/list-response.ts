import type { ApiNamedResource } from '@scripts/interfaces/api/common/resources'

export interface ApiListResponse {
    count: number
    next: string | null
    previous: string | null
    results: ApiNamedResource[]
}
