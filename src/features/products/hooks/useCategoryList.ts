import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products'

export function useCategoryList() {
    return useQuery({
        queryKey: ['category-list'],
        queryFn: () => productsApi.getCategoryList(),
        staleTime: 1000 * 60 * 60, // 1 hour - categories don't change often
    })
}
