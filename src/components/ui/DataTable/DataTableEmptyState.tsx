import { SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DataTableEmptyStateProps {
    message?: string
    className?: string
}

export function DataTableEmptyState({
    message = 'No results found.',
    className,
}: DataTableEmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-3 py-16 text-center',
                className
            )}
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <SearchX className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{message}</p>
        </div>
    )
}
