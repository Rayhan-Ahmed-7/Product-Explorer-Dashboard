import { create } from 'zustand'

interface ProductsUIState {
    category: string
    sortBy: string
    sortOrder: 'asc' | 'desc'
    search: string

    // Actions
    setCategory: (category: string) => void
    setSortBy: (sortBy: string) => void
    setSortOrder: (order: 'asc' | 'desc') => void
    setSearch: (search: string) => void
    resetFilters: () => void
}

export const useProductsUIStore = create<ProductsUIState>((set) => ({
    category: '',
    sortBy: '',
    sortOrder: 'asc',
    search: '',

    setCategory: (category) => set({ category }),
    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (sortOrder) => set({ sortOrder }),
    setSearch: (search) => set({ search }),
    resetFilters: () => set({ category: '', sortBy: '', sortOrder: 'asc', search: '' }),
}))
