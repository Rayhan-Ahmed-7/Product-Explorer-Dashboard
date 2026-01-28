import { Skeleton } from "@/components/ui/Skeleton"

export function CategoryCardSkeleton() {
    return (
        <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-3 space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-9 w-full rounded-md" />
        </div>
    )
}
