import { useEffect, useRef, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useProducts } from '../../hooks/useProducts'
import { useCategoryList } from '../../hooks/useCategoryList'
import { useCurrency } from '@/context/CurrencyContext'
import { ProductListSkeleton } from './ProductListSkeleton'
import { useDebounce } from '@/hooks/useDebounce'
import { useProductsUIStore } from '../../stores/useProductsUIStore'
import { ProductFilters } from './ProductFilters'
import { ProductTableView } from './ProductTableView'
import { ProductGridView } from './ProductGridView'

interface ProductListProps {
    title?: string
    showFilters?: boolean
    showSearch?: boolean
}

export function ProductList({
    title = 'Products',
    showFilters = true,
    showSearch = true
}: ProductListProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { currency } = useCurrency()
    const store = useProductsUIStore()

    const category = searchParams.get('category') || ''
    const sortBy = searchParams.get('sortBy') || ''
    const sortOrder = (searchParams.get('order') as 'asc' | 'desc') || 'asc'
    const searchQuery = searchParams.get('q') || ''

    // Sync URL parameters to store
    useEffect(() => {
        if (category !== store.category) store.setCategory(category)
        if (sortBy !== store.sortBy) store.setSortBy(sortBy)
        if (sortOrder !== store.sortOrder) store.setSortOrder(sortOrder)
        if (searchQuery !== store.search) store.setSearch(searchQuery)
    }, [category, sortBy, sortOrder, searchQuery])

    // Local search state for immediate input feedback
    const [searchTerm, setSearchTerm] = useState(searchQuery)
    const debouncedSearch = useDebounce(searchTerm, 500)

    // Sync URL when debounce completes
    useEffect(() => {
        if (debouncedSearch !== searchQuery) {
            updateParams('q', debouncedSearch)
        }
    }, [debouncedSearch])

    // Sync local state if URL changes externally (e.g. back button)
    useEffect(() => {
        if (searchQuery !== searchTerm) {
            setSearchTerm(searchQuery)
        }
    }, [searchQuery])

    const updateParams = (key: string, value: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)
            if (value) {
                newParams.set(key, value)
            } else {
                newParams.delete(key)
            }
            return newParams
        })
    }

    const { data: categoryList } = useCategoryList()

    // Memoized query options to prevent unnecessary re-fetches or re-renders
    const queryOptions = useMemo(() => ({
        category: category || undefined,
        sortBy: sortBy || undefined,
        order: sortOrder,
        limit: 20,
        search: searchQuery || undefined
    }), [category, sortBy, sortOrder, searchQuery])

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useProducts(queryOptions)

    // Infinite scroll observer
    const observerTarget = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }
        )

        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    // Memoize flattened products list
    const allProducts = useMemo(() => {
        return data?.pages.flatMap((page) => page.products) ?? []
    }, [data])

    const totalProducts = data?.pages[0]?.total ?? 0

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                    <p className="text-muted-foreground mt-1">
                        {totalProducts} products available
                    </p>
                </div>

                <ProductFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    category={category}
                    setCategory={(val) => updateParams('category', val)}
                    sortBy={sortBy}
                    setSortBy={(val) => updateParams('sortBy', val)}
                    sortOrder={sortOrder}
                    setSortOrder={(val) => updateParams('order', val)}
                    categoryList={categoryList || []}
                    showSearch={showSearch}
                    showFilters={showFilters}
                />
            </div>

            {isLoading ? (
                <ProductListSkeleton />
            ) : isError ? (
                <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                    <p className="text-destructive font-medium">Failed to load products</p>
                </div>
            ) : (
                <>
                    <ProductTableView
                        products={allProducts}
                        currency={currency}
                        isFetchingNextPage={isFetchingNextPage}
                    />

                    <ProductGridView
                        products={allProducts}
                        isFetchingNextPage={isFetchingNextPage}
                    />

                    {/* Infinite Scroll Trigger */}
                    <div ref={observerTarget} className="flex justify-center py-4">
                        {!hasNextPage && allProducts.length > 0 && (
                            <p className="text-sm text-muted-foreground">No more products to load</p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
