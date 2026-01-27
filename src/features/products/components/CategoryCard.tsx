import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

interface Category {
    name: string
    slug: string
    url: string
}

interface CategoryCardProps {
    category: Category
    onViewProducts: (slug: string) => void
}

export function CategoryCard({ category, onViewProducts }: CategoryCardProps) {
    return (
        <div className="rounded-lg border border-border bg-card p-3 md:p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3">
                <h3 className="text-base md:text-lg font-semibold line-clamp-1">{category.name}</h3>
                <code className="rounded bg-muted px-1.5 py-0.5 text-[10px] md:text-xs font-mono text-muted-foreground mt-1 inline-block">
                    {category.slug}
                </code>
            </div>
            <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => onViewProducts(category.slug)}
            >
                View Products
                <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
