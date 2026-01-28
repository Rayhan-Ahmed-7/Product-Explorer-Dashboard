import { ProductCard } from '../shared/ProductCard'
import { ProductCardSkeleton } from '../shared/ProductCardSkeleton'
import type { Product } from '../../types/product'

interface ProductGridViewProps {
    products: Product[]
    isFetchingNextPage: boolean
}

export function ProductGridView({ products, isFetchingNextPage }: ProductGridViewProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:hidden">
            {products.length === 0 ? (
                <div className="rounded-lg border border-border p-6 text-center text-muted-foreground">
                    No products found matching your criteria
                </div>
            ) : (
                products.map((product) => (
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
    )
}
