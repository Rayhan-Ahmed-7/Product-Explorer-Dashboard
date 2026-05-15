import { TableBody, TableCell, TableRow } from '@/components/ui/Table'
import { Skeleton } from '@/components/ui/Skeleton'

interface DataTableSkeletonRowsProps {
    /** Number of placeholder rows to render. */
    rowCount?: number
    /** Number of columns — drives how many skeleton cells appear per row. */
    columnCount: number
}

/**
 * Generic skeleton rows that mirror the column count of the table.
 * No per-table customisation needed — the shimmer always matches the layout.
 */
export function DataTableSkeletonRows({
    rowCount = 5,
    columnCount,
}: DataTableSkeletonRowsProps) {
    return (
        <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                    {Array.from({ length: columnCount }).map((_, colIndex) => (
                        <TableCell key={`skeleton-cell-${colIndex}`}>
                            <Skeleton className="h-4 w-full max-w-[120px]" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    )
}
