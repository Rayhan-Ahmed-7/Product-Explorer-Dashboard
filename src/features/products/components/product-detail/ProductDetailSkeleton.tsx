import { Skeleton } from "@/components/ui/Skeleton"
import { Card } from "@/components/ui/Card"

export function ProductDetailSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Skeleton className="h-9 w-9" /> {/* Back button */}
            </div>

            {/* Top Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} padding="sm">
                        <div className="flex items-start gap-3">
                            <Skeleton className="h-9 w-9 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Media Gallery Skeleton */}
                    <Card>
                        <Skeleton className="h-4 w-32 mb-4" />
                        <div className="space-y-4">
                            <Skeleton className="aspect-square w-full rounded-lg" />
                            <div className="grid grid-cols-4 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="aspect-square rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Description Skeleton */}
                    <Card>
                        <Skeleton className="h-4 w-40 mb-4" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </Card>

                    {/* Specs Skeleton */}
                    <Card>
                        <Skeleton className="h-4 w-44 mb-4" />
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Logistics Skeleton */}
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={i >= 2 ? "col-span-2" : ""}>
                                    <Skeleton className="h-3 w-24 mb-2" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Policies Skeleton */}
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Skeleton className="h-2 w-2 rounded-full mt-1.5" />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Metadata Skeleton */}
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-4 w-36" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-20 mb-1" />
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <div className="space-y-1 sm:col-span-2 md:col-span-1">
                                <Skeleton className="h-3 w-24 mb-1" />
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Reviews Skeleton */}
                    <Card>
                        <div className="flex items-center justify-between mb-4 gap-4">
                            <Skeleton className="h-5 w-32 sm:w-48 shrink" />
                            <Skeleton className="h-9 w-24 sm:w-32 shrink-0" />
                        </div>
                        <Skeleton className="h-3 w-32 sm:w-40 mb-4" />
                        <div className="space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                                    {/* Mobile Skeleton: Mirrors md:hidden block in ReviewsList */}
                                    <div className="md:hidden space-y-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                                <div className="min-w-0 space-y-1 flex-1">
                                                    <Skeleton className="h-4 w-20" />
                                                    <Skeleton className="h-[10px] w-24" />
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <Skeleton className="h-2 w-10 ml-auto mb-1" />
                                                <Skeleton className="h-4 w-12 ml-auto" />
                                            </div>
                                        </div>

                                        <Skeleton className="h-10 w-full rounded-lg" />

                                        <div className="space-y-1">
                                            <Skeleton className="h-2 w-16 mb-1" />
                                            <div className="border-l-2 border-primary/20 pl-3 space-y-1.5">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-5/6" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Skeleton: Mirrors md:grid block in ReviewsList */}
                                    <div className="hidden md:grid md:grid-cols-12 gap-4 items-start">
                                        <div className="md:col-span-3">
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-[10px] w-32" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <Skeleton className="h-2 w-10 mb-1.5" />
                                            <div className="flex items-center gap-1">
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-3 w-4" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-5">
                                            <Skeleton className="h-2 w-16 mb-1.5" />
                                            <Skeleton className="h-4 w-full line-clamp-2" />
                                        </div>
                                        <div className="md:col-span-2 text-right">
                                            <Skeleton className="h-2 w-10 ml-auto mb-1.5" />
                                            <Skeleton className="h-4 w-20 ml-auto" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
