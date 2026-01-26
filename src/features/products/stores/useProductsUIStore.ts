import { create } from 'zustand'

interface ProductsUIState {
    category: string
    sortBy: string
    sortOrder: 'asc' | 'desc'

    // Actions
    setCategory: (category: string) => void
    setSortBy: (sortBy: string) => void
    setSortOrder: (order: 'asc' | 'desc') => void
    resetFilters: () => void
}

export const useProductsUIStore = create<ProductsUIState>((set) => ({
    category: '',
    sortBy: '',
    sortOrder: 'asc',

    setCategory: (category) => set({ category }),
    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (sortOrder) => set({ sortOrder }),
    resetFilters: () => set({ category: '', sortBy: '', sortOrder: 'asc' }),
}))
