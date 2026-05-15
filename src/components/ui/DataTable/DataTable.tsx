/**
 * DataTable.tsx
 *
 * The top-level orchestrator. Drop this in with a `data` array and
 * a `columns` definition — everything else is handled internally.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={products}
 *   columns={columns}
 *   isLoading={isLoading}
 *   enableSorting
 *   enableRowSelection
 * />
 * ```
 */

import { useState, useRef, useCallback } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    type ColumnDef,
    type SortingState,
    type RowSelectionState,
    type OnChangeFn,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Table } from '@/components/ui/Table'
import { cn } from '@/lib/utils'
import { DataTableHeader } from './DataTableHeader'
import { DataTableBody } from './DataTableBody'
import { DataTablePagination, type PaginationState } from './DataTablePagination'
import { InfiniteScroll } from '@/components/ui/InfiniteScroll'
import { DataTableOverlay } from './DataTableOverlay'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataTableProps<TData> {
    // ── Data ──────────────────────────────────────────────────────────────────
    data: TData[]
    columns: ColumnDef<TData>[]

    // ── Loading / empty state ─────────────────────────────────────────────────
    isLoading?: boolean
    /** Message shown when `data` is empty. Default: "No results found." */
    emptyMessage?: string

    // ── Features (opt-in) ─────────────────────────────────────────────────────
    /** Whether virtualization is enabled (recommended for >100 rows). */
    enableVirtualization?: boolean
    /** Initial estimate for row height in px (default 72). */
    estimatedRowHeight?: number
    // ── Sorting ───────────────────────────────────────────────────────────────
    enableSorting?: boolean
    /**
     * Called when the user clicks a sortable header.
     * When provided, sorting is treated as server-side (the table does NOT
     * sort the data array internally). When absent, client-side sorting is used.
     */
    onSortingChange?: OnChangeFn<SortingState>
    /** Current sorting state when using server-side sorting. */
    sorting?: SortingState

    /** Enable row checkboxes. Default: false. */
    enableRowSelection?: boolean
    /** Controlled selection state. */
    rowSelection?: RowSelectionState
    /** Called when the selection changes. */
    onRowSelectionChange?: OnChangeFn<RowSelectionState>

    // ── Pagination (optional, page-based) ────────────────────────────────────
    pagination?: PaginationState

    /** Infinite Scroll configuration */
    infiniteScroll?: {
        onLoadMore: () => void
        hasMore: boolean
        isLoadingMore?: boolean
    }

    // ── Row interaction ───────────────────────────────────────────────────────
    /** Called when a row is clicked. */
    onRowClick?: (row: TData) => void

    // ── Styling ───────────────────────────────────────────────────────────────
    /** className applied to the outer wrapper `<div>`. */
    className?: string
    /** className applied to the `<table>` element. */
    tableClassName?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData>({
    data,
    columns,
    isLoading = false,
    emptyMessage,
    enableVirtualization = true,
    estimatedRowHeight = 100,
    enableSorting = true,
    onSortingChange,
    sorting: externalSorting,
    enableRowSelection = false,
    rowSelection: externalRowSelection,
    onRowSelectionChange,
    pagination,
    infiniteScroll,
    onRowClick,
    className,
    tableClassName,
}: DataTableProps<TData>) {
    // ── Internal state (used only when no external state is provided) ─────────
    const [internalSorting, setInternalSorting] = useState<SortingState>([])
    const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({})
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const isServerSideSorting = Boolean(onSortingChange)

    const table = useReactTable({
        data,
        columns,

        // IDs
        getRowId: (row: any) => row.id,

        // Sort
        enableSorting,
        manualSorting: isServerSideSorting,
        state: {
            sorting: externalSorting ?? internalSorting,
            rowSelection: externalRowSelection ?? internalRowSelection,
        },
        onSortingChange: onSortingChange ?? setInternalSorting,
        onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,

        // Row models
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: isServerSideSorting ? undefined : getSortedRowModel(),

        // Row selection
        enableRowSelection,
    })

    const rows = table.getRowModel().rows
    const visibleColumnCount = table.getVisibleLeafColumns().length

    // ── Virtualization ────────────────────────────────────────────────────────
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: useCallback(() => scrollContainerRef.current, []),
        estimateSize: useCallback(() => estimatedRowHeight, [estimatedRowHeight]),
        overscan: 10,
    })

    const virtualRows = rowVirtualizer.getVirtualItems()
    const totalSize = rowVirtualizer.getTotalSize()

    return (
        <div className={cn('flex flex-col rounded-lg border border-border overflow-hidden', className)}>
            <div className="relative flex-1 min-h-0">
                {/* Overlay for initial and infinite loading states - Fixed position relative to table viewport */}
                {(isLoading || (infiniteScroll && infiniteScroll.isLoadingMore)) && (
                    <DataTableOverlay
                        message={infiniteScroll?.isLoadingMore ? 'Loading more members...' : 'Loading...'}
                    />
                )}

                <div
                    ref={scrollContainerRef}
                    className="h-full overflow-auto"
                >
                    <Table className={cn('relative', tableClassName)}>
                        <DataTableHeader headerGroups={table.getHeaderGroups()} />
                        <DataTableBody
                            rows={rows}
                            columnCount={visibleColumnCount}
                            virtualRows={enableVirtualization ? virtualRows : undefined}
                            totalSize={enableVirtualization ? totalSize : undefined}
                            isLoading={isLoading}
                            emptyMessage={emptyMessage}
                            onRowClick={onRowClick}
                        />
                    </Table>

                    {/* Sentinel for Infinite Scroll */}
                    {infiniteScroll && (
                        <InfiniteScroll
                            onIntersect={infiniteScroll.onLoadMore}
                            hasMore={infiniteScroll.hasMore}
                            isLoading={infiniteScroll.isLoadingMore}
                            root={scrollContainerRef}
                        />
                    )}
                </div>
            </div>

            {pagination && <DataTablePagination pagination={pagination} />}
        </div>
    )
}
