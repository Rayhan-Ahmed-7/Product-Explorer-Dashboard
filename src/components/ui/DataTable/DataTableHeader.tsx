import { flexRender, type HeaderGroup } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { cn } from '@/lib/utils'

interface DataTableHeaderProps<TData> {
    headerGroups: HeaderGroup<TData>[]
}

/**
 * Renders the `<thead>` section.
 * Clicking a sortable header cycles: asc → desc → none.
 * Sort icons are rendered via lucide-react.
 */
export function DataTableHeader<TData>({ headerGroups }: DataTableHeaderProps<TData>) {
    return (
        <TableHeader>
            {headerGroups.map((headerGroup) => (
                <TableRow 
                    key={headerGroup.id} 
                    className="hover:bg-transparent"
                >
                    {headerGroup.headers.map((header) => {
                        const canSort = header.column.getCanSort()
                        const sorted = header.column.getIsSorted()

                        const metaClassName = (
                            header.column.columnDef.meta as { className?: string } | undefined
                        )?.className

                        return (
                            <TableHead
                                key={header.id}
                                colSpan={header.colSpan}
                                className={cn(metaClassName)}
                                style={{
                                    width: `${header.getSize()}px`,
                                    minWidth: `${header.getSize()}px`,
                                }}
                            >
                                {header.isPlaceholder ? null : (
                                    canSort ? (
                                        <button
                                            type="button"
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="flex items-center gap-1.5 select-none w-full cursor-pointer hover:text-foreground transition-colors"
                                        >
                                            <span className="truncate">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </span>

                                            <span className="shrink-0 text-muted-foreground ml-auto">
                                                {sorted === 'asc' ? (
                                                    <ArrowUp className="h-3.5 w-3.5 text-foreground" />
                                                ) : sorted === 'desc' ? (
                                                    <ArrowDown className="h-3.5 w-3.5 text-foreground" />
                                                ) : (
                                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                                )}
                                            </span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center w-full">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                    )
                                )}
                            </TableHead>
                        )
                    })}
                </TableRow>
            ))}
        </TableHeader>
    )
}
