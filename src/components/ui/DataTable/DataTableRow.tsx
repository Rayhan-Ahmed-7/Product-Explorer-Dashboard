import { memo } from 'react'
import { flexRender, type Row } from '@tanstack/react-table'
import { TableCell, TableRow } from '@/components/ui/Table'
import { cn } from '@/lib/utils'
interface DataTableRowProps<TData> {
    row: Row<TData>
    isSelected?: boolean
    onRowClick?: (row: TData) => void
}

/**
 * Renders a single table row with all its cells.
 * Memoized to prevent expensive re-renders during rapid scrolling in virtualized lists.
 */
export const DataTableRow = memo(function DataTableRow<TData>({ 
    row, 
    isSelected,
    onRowClick, 
}: DataTableRowProps<TData>) {
    return (
        <TableRow
            data-state={isSelected ? 'selected' : undefined}
            className={cn(onRowClick && 'cursor-pointer')}
            onClick={onRowClick ? () => onRowClick(row.original) : undefined}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell
                    key={cell.id}
                    className={cn(
                        (cell.column.columnDef.meta as { className?: string } | undefined)
                            ?.className
                    )}
                    style={{
                        width: `${cell.column.getSize()}px`,
                        minWidth: `${cell.column.getSize()}px`,
                    }}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}, (prev, next) => {
    return (
        prev.row.id === next.row.id &&
        prev.isSelected === next.isSelected &&
        prev.row.original === next.row.original &&
        prev.onRowClick === next.onRowClick
    )
}) as <TData>(props: DataTableRowProps<TData>) => React.ReactElement

