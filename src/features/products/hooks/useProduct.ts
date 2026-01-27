import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products'

export function useProduct(id: number) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productsApi.getProductById(id),
        enabled: !!id && id > 0,
    })
}
