import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface PaginationState {
    pageIndex: number  // 0-based
    pageSize: number
    total: number
    onPageChange: (page: number) => void
}

interface DataTablePaginationProps {
    pagination: PaginationState
    className?: string
}

/**
 * Optional footer bar showing "X–Y of Z" count and Prev / Next controls.
 * Only rendered when the `pagination` prop is supplied to `DataTable`.
 */
export function DataTablePagination({ pagination, className }: DataTablePaginationProps) {
    const { pageIndex, pageSize, total, onPageChange } = pagination

    const from = total === 0 ? 0 : pageIndex * pageSize + 1
    const to = Math.min((pageIndex + 1) * pageSize, total)
    const totalPages = Math.ceil(total / pageSize)

    const canGoPrev = pageIndex > 0
    const canGoNext = pageIndex < totalPages - 1

    return (
        <div className={cn('flex items-center justify-between border-t border-border px-4 py-3', className)}>
            <p className="text-sm text-muted-foreground">
                {total === 0 ? 'No results' : `${from}–${to} of ${total}`}
            </p>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={!canGoPrev}
                    onClick={() => onPageChange(pageIndex - 1)}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="min-w-[4rem] text-center text-sm text-muted-foreground">
                    {totalPages === 0 ? '0 / 0' : `${pageIndex + 1} / ${totalPages}`}
                </span>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={!canGoNext}
                    onClick={() => onPageChange(pageIndex + 1)}
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
