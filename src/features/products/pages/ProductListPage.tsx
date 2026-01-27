import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useProducts } from '../hooks/useProducts'
import { useCategoryList } from '../hooks/useCategoryList'
import { useCurrency } from '@/context/CurrencyContext'
import { formatPrice } from '@/lib/currencyUtils'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { ProductRowSkeleton } from '../components/ProductRowSkeleton'
import { ProductListSkeleton } from '../components/ProductListSkeleton'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { useDebounce } from '@/hooks/useDebounce'
import { Search, X } from 'lucide-react'
import { useProductsUIStore } from '../stores/useProductsUIStore'
import { InputGroup, InputLeftSlot, InputRightSlot } from '@/components/ui/InputGroup'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ProductListPage() {
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
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useProducts({
        category: category || undefined,
        sortBy: sortBy || undefined,
        order: sortOrder,
        limit: 20,
        search: searchQuery || undefined
    })

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

    const allProducts = data?.pages.flatMap((page) => page.products) ?? []
    const totalProducts = data?.pages[0]?.total ?? 0

    // Prepare category options
    const categoryOptions = [
        { value: '', label: 'All Categories' },
        ...(categoryList?.map((cat) => ({
            value: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')
        })) ?? [])
    ]

    // Prepare sort options
    const sortOptions = [
        { value: '', label: 'Sort By' },
        { value: 'price', label: 'Price' },
        { value: 'title', label: 'Title' },
        { value: 'rating', label: 'Rating' },
    ]

    // Prepare sort order options
    const sortOrderOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ]

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Products</h1>
                    <p className="text-muted-foreground mt-1">
                        {totalProducts} products available
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <InputGroup className="w-full md:w-72">
                        <InputLeftSlot>
                            <Search className="h-4 w-4" />
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

                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        {/* Category Filter */}
                        <Select
                            options={categoryOptions}
                            value={category}
                            onChange={(value) => updateParams('category', value)}
                            placeholder="All Categories"
                            className="w-full md:w-48"
                        />

                        {/* Sort By */}
                        <Select
                            options={sortOptions}
                            value={sortBy}
                            onChange={(value) => updateParams('sortBy', value)}
                            placeholder="Sort By"
                            className="w-full md:w-40"
                        />

                        {/* Sort Order */}
                        {sortBy && (
                            <Select
                                options={sortOrderOptions}
                                value={sortOrder}
                                onChange={(value) => updateParams('order', value)}
                                className="w-full md:w-36"
                            />
                        )}
                    </div>
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
                    {/* Desktop View (Table) */}
                    <div className="hidden md:block rounded-lg border border-border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">ID</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Stock</TableHead>
                                    <TableHead className="text-right">Rating</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allProducts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No products found matching your criteria
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    allProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">{product.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                        className="h-10 w-10 rounded object-cover"
                                                    />
                                                    <div>
                                                        <Link
                                                            to={`/products/${product.id}`}
                                                            className="font-medium hover:text-primary hover:underline"
                                                        >
                                                            {product.title}
                                                        </Link>
                                                        <div className="text-sm text-muted-foreground line-clamp-1">
                                                            {product.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="info">
                                                    {product.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{product.brand || '-'}</TableCell>
                                            <TableCell className="text-right font-medium">
                                                {formatPrice(product.price, currency)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    variant={
                                                        product.stock > 50
                                                            ? 'success'
                                                            : product.stock > 0
                                                                ? 'warning'
                                                                : 'destructive'
                                                    }
                                                >
                                                    {product.stock}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="font-medium">{product.rating.toFixed(1)}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                                {isFetchingNextPage && (
                                    <>
                                        {[...Array(20)].map((_, i) => (
                                            <ProductRowSkeleton key={`skeleton-${i}`} />
                                        ))}
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile View (Cards) */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {allProducts.length === 0 ? (
                            <div className="rounded-lg border border-border p-6 text-center text-muted-foreground">
                                No products found matching your criteria
                            </div>
                        ) : (
                            allProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                        {isFetchingNextPage && (
                            <>
                                {[...Array(4)].map((_, i) => (
                                    <ProductCardSkeleton key={`skeleton-mobile-${i}`} />
                                ))}
                            </>
                        )}
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
