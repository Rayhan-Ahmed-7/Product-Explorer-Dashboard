import { Badge } from "@/components/ui/Badge"
import { useCurrency } from "@/context/CurrencyContext"
import { formatPrice } from "@/lib/currencyUtils"
import type { Product } from "@/features/products/types/product"
import { Link } from "react-router"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { currency } = useCurrency()

    return (
        <div className="group relative rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md">
            <div className="flex gap-4">
                {/* Image */}
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            <Link
                                to={`/products/${product.id}`}
                                className="font-medium hover:text-primary hover:underline line-clamp-2"
                            >
                                {product.title}
                            </Link>
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <span className="text-yellow-500">★</span>
                                {product.rating.toFixed(1)}
                            </div>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                            {product.brand || product.category}
                        </p>
                    </div>

                    <div className="mt-2 flex flex-wrap items-end justify-between gap-y-2 gap-x-1">
                        <div className="font-semibold text-lg">
                            {formatPrice(product.price, currency)}
                        </div>
                        <Badge
                            variant={
                                product.stock > 50
                                    ? 'success'
                                    : product.stock > 0
                                        ? 'warning'
                                        : 'destructive'
                            }
                            className="text-[10px] px-1.5 py-0.5 h-fit whitespace-nowrap"
                        >
                            {product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
