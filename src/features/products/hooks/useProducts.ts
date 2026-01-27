import { useInfiniteQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products'
import type { ProductQueryParams } from '../types/product'

export interface UseProductsOptions {
    category?: string
    sortBy?: string
    order?: 'asc' | 'desc'
    limit?: number
    search?: string
}

export function useProducts(options: UseProductsOptions = {}) {
    const { category, sortBy, order, limit = 20, search } = options

    return useInfiniteQuery({
        queryKey: ['products', { category, sortBy, order, limit, search }],
        queryFn: async ({ pageParam = 0 }) => {
            const params: ProductQueryParams = {
                limit,
                skip: pageParam,
                ...(sortBy && { sortBy }),
                ...(order && { order }),
            }

            if (search) {
                return productsApi.searchProducts(search, params)
            }

            if (category) {
                return productsApi.getProductsByCategory(category, params)
            }

            return productsApi.getProducts(params)
        },
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce((sum, page) => sum + page.products.length, 0)
            return totalFetched < lastPage.total ? totalFetched : undefined
        },
        initialPageParam: 0,
    })
}
