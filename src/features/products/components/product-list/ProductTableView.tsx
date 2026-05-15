import { useMemo } from 'react'
import {
    DataTable,
    avatarColumn,
    badgeColumn,
    textColumn,
    numberColumn,
    type ColumnDef,
} from '@/components/ui/DataTable'
import type { Product } from '../../types/product'
import { formatPrice, type Currency } from '@/lib/currencyUtils'
import { Star } from 'lucide-react'

interface ProductTableViewProps {
    products: Product[]
    currency: Currency
    isFetchingNextPage: boolean
}

export function ProductTableView({ products, currency, isFetchingNextPage }: ProductTableViewProps) {
    const columns = useMemo<ColumnDef<Product>[]>(
        () => [
            textColumn<Product>({
                id: 'id',
                header: 'ID',
                accessor: 'id',
                enableSorting: false,
                className: 'max-w-4',
            }),
            avatarColumn<Product>({
                header: 'Product',
                imageAccessor: 'thumbnail',
                titleAccessor: 'title',
                subtitleAccessor: 'description',
                href: (row) => `/products/${row.id}`,
                className: 'max-w-[200px]',
            }),
            badgeColumn<Product>({
                header: 'Category',
                accessor: 'category',
                variant: 'info',
            }),
            textColumn<Product>({
                header: 'Brand',
                accessor: 'brand',
                fallback: '—',
                enableSorting: false,
            }),
            numberColumn<Product>({
                header: 'Price',
                accessor: 'price',
                format: (v) => formatPrice(v, currency),
                align: 'right',
            }),
            {
                id: 'stock',
                header: 'Stock',
                accessorKey: 'stock',
                enableSorting: true,
                meta: { className: 'text-right' },
                cell: ({ getValue }) => {
                    const stock = getValue() as number
                    const variant =
                        stock > 50 ? 'success' : stock > 0 ? 'warning' : 'destructive'
                    // Re-use badgeColumn logic inline for the conditional variant
                    return (
                        <div className="flex justify-end">
                            <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
                                    ${variant === 'success' ? 'bg-success/10 text-success border-success/20' : ''}
                                    ${variant === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : ''}
                                    ${variant === 'destructive' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                                `}
                            >
                                {stock}
                            </span>
                        </div>
                    )
                },
            },
            {
                id: 'rating',
                header: 'Rating',
                accessorKey: 'rating',
                enableSorting: true,
                meta: { className: 'text-right' },
                cell: ({ getValue }) => {
                    const rating = getValue() as number
                    return (
                        <div className="flex items-center justify-end gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium tabular-nums">{rating.toFixed(1)}</span>
                        </div>
                    )
                },
            },
        ],
        [currency]
    )

    return (
        <div className="hidden md:block">
            <DataTable
                className="border-0 rounded-none border-t"
                data={products}
                columns={columns}
                isLoading={isFetchingNextPage && products.length === 0}
                emptyMessage="No products found matching your criteria."
                enableSorting
            />

            {/* Append skeleton rows at the bottom during infinite-scroll fetch */}
            {isFetchingNextPage && products.length > 0 && (
                <div className="mt-0 rounded-b-lg border-x border-b border-border">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 border-t border-border px-4 py-3 animate-pulse"
                        >
                            <div className="h-4 w-8 rounded bg-muted" />
                            <div className="flex items-center gap-3 flex-1">
                                <div className="h-10 w-10 rounded-md bg-muted shrink-0" />
                                <div className="space-y-1.5 flex-1">
                                    <div className="h-4 w-40 rounded bg-muted" />
                                    <div className="h-3 w-64 rounded bg-muted" />
                                </div>
                            </div>
                            <div className="h-5 w-24 rounded-full bg-muted" />
                            <div className="h-4 w-20 rounded bg-muted" />
                            <div className="h-4 w-16 rounded bg-muted ml-auto" />
                            <div className="h-5 w-12 rounded-full bg-muted" />
                            <div className="h-4 w-10 rounded bg-muted" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
