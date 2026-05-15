import { type Row } from '@tanstack/react-table'
import { TableBody, TableCell, TableRow } from '@/components/ui/Table'
import { DataTableRow } from './DataTableRow'
import { DataTableEmptyState } from './DataTableEmptyState'

interface DataTableBodyProps<TData> {
    rows: Row<TData>[]
    columnCount: number
    virtualRows?: { index: number; start: number; end: number }[]
    totalSize?: number
    isLoading?: boolean
    emptyMessage?: string
    onRowClick?: (row: TData) => void
}

/**
 * Renders the `<tbody>` section with virtualization support.
 */
export function DataTableBody<TData>({
    rows,
    columnCount,
    virtualRows,
    totalSize,
    isLoading,
    emptyMessage,
    onRowClick,
}: DataTableBodyProps<TData>) {
    if (rows.length === 0 && !isLoading) {
        return (
            <TableBody>
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={columnCount} className="p-0">
                        <DataTableEmptyState message={emptyMessage} />
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }

    // If virtualization is enabled, render only the visible rows with spacers (padding)
    if (virtualRows && totalSize !== undefined) {
        const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0
        const paddingBottom = virtualRows.length > 0 
            ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0) 
            : 0

        return (
            <TableBody>
                {paddingTop > 0 && (
                    <TableRow className="hover:bg-transparent border-0">
                        <TableCell colSpan={columnCount} style={{ height: `${paddingTop}px`, padding: 0, border: 0 }} />
                    </TableRow>
                )}
                {virtualRows.map((virtualRow) => {
                    const row = rows[virtualRow.index]
                    if (!row) return null
                    return (
                        <DataTableRow 
                            key={row.id} 
                            row={row} 
                            isSelected={row.getIsSelected()}
                            onRowClick={onRowClick}
                        />
                    )
                })}
                {paddingBottom > 0 && (
                    <TableRow className="hover:bg-transparent border-0">
                        <TableCell colSpan={columnCount} style={{ height: `${paddingBottom}px`, padding: 0, border: 0 }} />
                    </TableRow>
                )}
            </TableBody>
        )
    }

    // Fallback to standard rendering if virtualization is not configured
    return (
        <TableBody>
            {rows.map((row) => (
                <DataTableRow key={row.id} row={row} onRowClick={onRowClick} />
            ))}
        </TableBody>
    )
}
