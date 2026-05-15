import { mockMembers, type Member } from "@/data/mockMembers"

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

/**
 * Simulated API call to fetch members with pagination.
 */
export async function fetchMembers(page: number, limit: number): Promise<PaginatedResponse<Member>> {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            const start = (page - 1) * limit
            const end = start + limit
            const data = mockMembers.slice(start, end)
            
            resolve({
                data,
                total: mockMembers.length,
                page,
                limit,
                hasMore: end < mockMembers.length
            })
        }, 1200) // 1.2s delay for realism
    })
}
