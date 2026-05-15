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
import { Button } from '@/components/ui/Button'
import { Plus, FileText, RefreshCw, SlidersHorizontal, Search, X } from 'lucide-react'
import { DataTableToolbar, DataTableToolbarSection } from '@/components/ui/DataTable/DataTableToolbar'
import { InputGroup, InputLeftSlot, InputRightSlot } from '@/components/ui/InputGroup'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

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

    const [isFilterOpen, setIsFilterOpen] = useState(false)

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
        refetch
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                        <FileText className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <ProductListSkeleton />
            ) : isError ? (
                <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                    <p className="text-destructive font-medium">Failed to load products</p>
                </div>
            ) : (
                <>
                    {/* Desktop View: Unified Card with Toolbar, Sidebar, and Table */}
                    <div className="hidden md:flex flex-col bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                        <DataTableToolbar>
                            <DataTableToolbarSection className="flex-wrap flex-1">
                                <Button
                                    variant={isFilterOpen ? "secondary" : "outline"}
                                    size="icon"
                                    className="shrink-0"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                </Button>

                                {showSearch && (
                                    <InputGroup className="">
                                        <InputLeftSlot>
                                            <Search className="h-4 w-4 text-muted-foreground" />
                                        </InputLeftSlot>
                                        <Input
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search products..."
                                            className="pl-10 pr-10"
                                        />
                                        {searchTerm && (
                                            <InputRightSlot>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSearchTerm('')}
                                                    className="h-auto p-0 hover:bg-transparent"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </InputRightSlot>
                                        )}
                                    </InputGroup>
                                )}
                            </DataTableToolbarSection>

                            <DataTableToolbarSection className="shrink-0 hidden lg:flex">
                                <Button
                                    variant="ghost"
                                    className="text-success hover:text-success/90 hover:bg-success/10 font-medium"
                                    onClick={() => refetch()}
                                    disabled={isFetchingNextPage}
                                >
                                    <RefreshCw className={cn("mr-2 h-4 w-4", isFetchingNextPage && "animate-spin")} /> Refresh
                                </Button>
                                <div className="text-sm text-muted-foreground ml-2 font-medium">
                                    1-{allProducts.length} of {totalProducts}
                                </div>
                            </DataTableToolbarSection>
                        </DataTableToolbar>

                        <div className="flex flex-1 overflow-hidden relative min-h-[500px]">
                            {/* Sliding Filter Sidebar */}
                            <div
                                className={cn(
                                    "transition-all duration-300 ease-in-out border-r border-border bg-muted/10 overflow-hidden flex-shrink-0",
                                    isFilterOpen ? "w-64 opacity-100" : "w-0 opacity-0 border-none"
                                )}
                            >
                                <div className="p-4 w-64">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Filters</h3>
                                    </div>
                                    <div className="flex flex-col gap-4">
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
                                            showSearch={false} // Search is in toolbar
                                            showFilters={showFilters}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Main Table Area */}
                            <div className="flex-1 min-w-0 overflow-auto">
                                <ProductTableView
                                    products={allProducts}
                                    currency={currency}
                                    isFetchingNextPage={isFetchingNextPage}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
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
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{allProducts.length} products loaded</span>
                        </div>
                        <ProductGridView
                            products={allProducts}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    </div>

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
