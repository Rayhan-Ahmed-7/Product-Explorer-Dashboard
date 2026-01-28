import { Skeleton } from "@/components/ui/Skeleton"

export function ProductCardSkeleton() {
    return (
        <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex gap-4">
                {/* Image Skeleton */}
                <Skeleton className="h-24 w-24 shrink-0 rounded-md" />

                {/* Content Skeleton */}
                <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex justify-between gap-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-5 w-8" />
                        </div>
                        <Skeleton className="h-4 w-1/2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
