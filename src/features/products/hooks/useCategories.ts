import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products'

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => productsApi.getCategories(),
        staleTime: 1000 * 60 * 60, // 1 hour - categories don't change often
    })
}
