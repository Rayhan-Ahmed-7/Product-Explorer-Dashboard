import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { useProducts } from '../hooks/useProducts'
import { useCategoryList } from '../hooks/useCategoryList'
import { useProductsUIStore } from '../stores/useProductsUIStore'
import { useCurrency } from '@/context/CurrencyContext'
import { formatPrice } from '@/lib/currencyUtils'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Select } from '@/components/ui/Select'
import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ProductRowSkeleton } from '../components/ProductRowSkeleton'
import { ProductListSkeleton } from '../components/ProductListSkeleton'

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
                    <h1 className="text-3xl font-bold text-foreground">Products</h1>
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
                <ProductListSkeleton />
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
                                                    <Link
                                                        to={`/products/${product.id}`}
                                                        className="font-medium hover:text-primary transition-colors hover:underline"
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
                                ))}
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
