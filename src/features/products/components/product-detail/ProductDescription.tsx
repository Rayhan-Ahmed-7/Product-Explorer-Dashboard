import { Card } from '@/components/ui/Card'

interface ProductDescriptionProps {
    description: string
}

export function ProductDescription({ description }: ProductDescriptionProps) {
    return (
        <Card>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Product Description</h3>
            <p className="text-sm text-card-foreground leading-relaxed">{description}</p>
        </Card>
    )
}
