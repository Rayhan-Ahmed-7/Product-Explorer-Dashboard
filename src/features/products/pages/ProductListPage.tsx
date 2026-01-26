import { useEffect, useRef } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useCategoryList } from '../hooks/useCategoryList'
import { useProductsUIStore } from '../stores/useProductsUIStore'
import { useCurrency } from '@/context/CurrencyContext'
import { formatPrice } from '@/lib/currencyUtils'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Select } from '@/components/ui/Select'
import { Loader2 } from 'lucide-react'

export default function ProductListPage() {
    const { category, sortBy, sortOrder, setCategory, setSortBy, setSortOrder } = useProductsUIStore()
    const { currency } = useCurrency()

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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Products</h1>
                    <p className="text-muted-foreground mt-1">
                        {totalProducts} products available
                    </p>
                </div>

                <div className="flex gap-3">
                    {/* Category Filter */}
                    <Select
                        options={categoryOptions}
                        value={category}
                        onChange={setCategory}
                        placeholder="All Categories"
                        className="w-48"
                    />

                    {/* Sort By */}
                    <Select
                        options={sortOptions}
                        value={sortBy}
                        onChange={setSortBy}
                        placeholder="Sort By"
                        className="w-40"
                    />

                    {/* Sort Order */}
                    {sortBy && (
                        <Select
                            options={sortOrderOptions}
                            value={sortOrder}
                            onChange={(value) => setSortOrder(value as 'asc' | 'desc')}
                            className="w-36"
                        />
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : isError ? (
                <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                    <p className="text-destructive font-medium">Failed to load products</p>
                </div>
            ) : (
                <>
                    <div className="rounded-lg border">
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
                                {allProducts.map((product) => (
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
                                                    <div className="font-medium">{product.title}</div>
                                                    <div className="text-sm text-muted-foreground line-clamp-1">
                                                        {product.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                                {product.category}
                                            </span>
                                        </TableCell>
                                        <TableCell>{product.brand || '-'}</TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatPrice(product.price, currency)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.stock > 50
                                                    ? 'bg-green-100 text-green-800'
                                                    : product.stock > 0
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <span className="text-yellow-500">★</span>
                                                <span className="font-medium">{product.rating.toFixed(1)}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Infinite Scroll Trigger */}
                    <div ref={observerTarget} className="flex justify-center py-4">
                        {isFetchingNextPage && (
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        )}
                        {!hasNextPage && allProducts.length > 0 && (
                            <p className="text-sm text-muted-foreground">No more products to load</p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
