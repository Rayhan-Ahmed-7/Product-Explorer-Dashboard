import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/currencyUtils'
import type { Currency } from '@/lib/currencyUtils'

interface ProductSpecificationsProps {
    brand?: string
    category: string
    tags: string[]
    price: number
    currency: Currency
}

export function ProductSpecifications({ brand, category, tags, price, currency }: ProductSpecificationsProps) {
    return (
        <Card>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Product Specifications</h3>
            <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Brand</span>
                    <span className="text-sm font-medium text-card-foreground">{brand || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="text-sm font-medium text-card-foreground capitalize">{category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Sub-Category</span>
                    <span className="text-sm font-medium text-card-foreground">{tags[0] || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Retail Price</span>
                    <span className="text-sm font-bold text-card-foreground">{formatPrice(price, currency)}</span>
                </div>
            </div>
        </Card>
    )
}
