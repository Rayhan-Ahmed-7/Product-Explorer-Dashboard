import { api } from '@/lib/axios'
import type { ProductsResponse, Category, CategoryList, ProductQueryParams, Product } from '../types/product'

export const productsApi = {
    // Get products with pagination, sorting, and filtering
    getProducts: async (params: ProductQueryParams = {}): Promise<ProductsResponse> => {
        const { data } = await api.get<ProductsResponse>('/products', { params })
        return data
    },

    // Get single product by ID
    getProductById: async (id: number): Promise<Product> => {
        const { data } = await api.get<Product>(`/products/${id}`)
        return data
    },

    // Get products by category
    getProductsByCategory: async (
        category: string,
        params: ProductQueryParams = {}
    ): Promise<ProductsResponse> => {
        const { data } = await api.get<ProductsResponse>(`/products/category/${category}`, { params })
        return data
    },

    // Get category objects with URLs
    getCategories: async (): Promise<Category[]> => {
        const { data } = await api.get<Category[]>('/products/categories')
        return data
    },

    // Get simple category list (slugs only)
    getCategoryList: async (): Promise<CategoryList> => {
        const { data } = await api.get<CategoryList>('/products/category-list')
        return data
    },

    // Search products
    searchProducts: async (query: string, params: ProductQueryParams = {}): Promise<ProductsResponse> => {
        const { data } = await api.get<ProductsResponse>('/products/search', {
            params: { q: query, ...params }
        })
        return data
    },
}
