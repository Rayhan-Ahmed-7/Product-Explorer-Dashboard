import { Link } from 'react-router'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { ProductRowSkeleton } from './ProductRowSkeleton'
import type { Product } from '../../types/product'
import { formatPrice } from '@/lib/currencyUtils'
import type { Currency } from '@/lib/currencyUtils'

interface ProductTableViewProps {
    products: Product[]
    currency: Currency
    isFetchingNextPage: boolean
}

export function ProductTableView({ products, currency, isFetchingNextPage }: ProductTableViewProps) {
    return (
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
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                No products found matching your criteria
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
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
    )
}
