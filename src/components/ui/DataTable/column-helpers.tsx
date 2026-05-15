/**
 * column-helpers.tsx
 *
 * Factory functions that return TanStack Table `ColumnDef` objects.
 * Each helper covers a common cell pattern so you never repeat the same
 * rendering logic across different tables.
 *
 * Usage:
 *   import { avatarColumn, badgeColumn, textColumn, numberColumn, actionColumn } from '@/components/ui/DataTable'
 */

import { useState, useRef, useEffect } from 'react'
import { type ColumnDef, type CellContext } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router'
import type { LucideIcon } from 'lucide-react'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Checkbox } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

/** Re-export so callers don't need to import from tanstack directly. */
export type { ColumnDef }

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Safely reads a top-level key from any object. */
function get<TData>(row: TData, accessor: keyof TData): unknown {
    return row[accessor]
}

// ─── 1. Text Column ───────────────────────────────────────────────────────────

interface TextColumnOptions<TData> {
    /** Column header label. */
    header: string
    /** Key on the data object. */
    accessor: keyof TData
    /** Shown when the value is null / undefined / empty string. */
    fallback?: string
    /** Optional value formatter (e.g. truncate, capitalise). */
    format?: (value: unknown) => string
    /** Extra className forwarded to both `<th>` and `<td>` via column meta. */
    className?: string
    /** Whether the column is sortable. Default: true. */
    enableSorting?: boolean
    id?: string
}

export function textColumn<TData>(opts: TextColumnOptions<TData>): ColumnDef<TData> {
    return {
        id: opts.id ?? String(opts.accessor),
        header: opts.header,
        accessorKey: opts.accessor as string,
        enableSorting: opts.enableSorting ?? true,
        meta: { className: opts.className },
        cell: ({ getValue }: CellContext<TData, unknown>) => {
            const raw = getValue()
            if (raw === null || raw === undefined || raw === '') {
                return <span className="text-muted-foreground">{opts.fallback ?? '—'}</span>
            }
            return <span>{opts.format ? opts.format(raw) : String(raw)}</span>
        },
    }
}

// ─── 2. Number Column ─────────────────────────────────────────────────────────

interface NumberColumnOptions<TData> {
    header: string
    accessor: keyof TData
    /** Optional formatter, e.g. `(v) => formatPrice(v, currency)`. */
    format?: (value: number) => string
    /** Text alignment. Default: 'right'. */
    align?: 'left' | 'right' | 'center'
    className?: string
    enableSorting?: boolean
    id?: string
}

export function numberColumn<TData>(opts: NumberColumnOptions<TData>): ColumnDef<TData> {
    const alignClass =
        opts.align === 'left' ? 'text-left' : opts.align === 'center' ? 'text-center' : 'text-right'

    return {
        id: opts.id ?? String(opts.accessor),
        header: opts.header,
        accessorKey: opts.accessor as string,
        enableSorting: opts.enableSorting ?? true,
        meta: { className: cn(alignClass, opts.className) },
        cell: ({ getValue }: CellContext<TData, unknown>) => {
            const raw = getValue() as number
            return (
                <span className={cn('font-medium tabular-nums', alignClass)}>
                    {opts.format ? opts.format(raw) : String(raw ?? '—')}
                </span>
            )
        },
    }
}

// ─── 3. Avatar Column ─────────────────────────────────────────────────────────

interface AvatarColumnOptions<TData> {
    header: string
    /** Accessor for the image src URL. */
    imageAccessor: keyof TData
    /** Accessor for the primary (bold) text line. */
    titleAccessor: keyof TData
    /** Accessor for the secondary (muted) text line. */
    subtitleAccessor?: keyof TData
    /** If provided, wraps the title in a `<Link>` to this href. */
    href?: (row: TData) => string
    className?: string
    enableSorting?: boolean
    id?: string
}

export function avatarColumn<TData>(opts: AvatarColumnOptions<TData>): ColumnDef<TData> {
    return {
        id: opts.id ?? String(opts.titleAccessor),
        header: opts.header,
        enableSorting: opts.enableSorting ?? false,
        meta: { className: opts.className },
        accessorFn: (row) => get(row, opts.titleAccessor),
        cell: ({ row }) => {
            const original = row.original
            const image = get(original, opts.imageAccessor) as string
            const title = get(original, opts.titleAccessor) as string
            const subtitle = opts.subtitleAccessor
                ? (get(original, opts.subtitleAccessor) as string)
                : undefined
            const href = opts.href?.(original)

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0 rounded-md">
                        <AvatarImage src={image} alt={title} />
                        <AvatarFallback className="rounded-md">{title ? title.charAt(0) : '?'}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        {href ? (
                            <Link
                                to={href}
                                className="block truncate font-medium hover:text-primary hover:underline"
                            >
                                {title}
                            </Link>
                        ) : (
                            <span className="block truncate font-medium">{title}</span>
                        )}
                        {subtitle && (
                            <span className="block truncate text-sm text-muted-foreground">
                                {subtitle}
                            </span>
                        )}
                    </div>
                </div>
            )
        },
    }
}

// ─── 4. Badge Column ──────────────────────────────────────────────────────────

interface BadgeColumnOptions<TData> {
    header: string
    accessor: keyof TData
    /**
     * Static variant applied to every badge, or a function that returns a
     * variant based on the cell value.
     */
    variant?: BadgeProps['variant'] | ((value: unknown) => BadgeProps['variant'])
    className?: string
    enableSorting?: boolean
    id?: string
}

export function badgeColumn<TData>(opts: BadgeColumnOptions<TData>): ColumnDef<TData> {
    return {
        id: opts.id ?? String(opts.accessor),
        header: opts.header,
        accessorKey: opts.accessor as string,
        enableSorting: opts.enableSorting ?? false,
        meta: { className: opts.className },
        cell: ({ getValue }: CellContext<TData, unknown>) => {
            const value = getValue()
            if (value === null || value === undefined || value === '') {
                return <span className="text-muted-foreground">—</span>
            }

            const resolvedVariant =
                typeof opts.variant === 'function' ? opts.variant(value) : opts.variant

            // Support array of values (multi-badge)
            const values = Array.isArray(value) ? value : [value]

            return (
                <div className="flex flex-wrap gap-1">
                    {values.map((v, i) => (
                        <Badge key={i} variant={resolvedVariant ?? 'secondary'}>
                            {String(v)}
                        </Badge>
                    ))}
                </div>
            )
        },
    }
}

// ─── 5. Action Column ─────────────────────────────────────────────────────────

export interface ActionItem<TData> {
    label: string
    icon?: LucideIcon
    /** Called with the original row data when the item is clicked. */
    onClick: (row: TData) => void
    /** 'destructive' renders the item in the destructive colour. */
    variant?: 'default' | 'destructive'
}

/** Minimal self-contained dropdown — no external dropdown library required. */
function ActionMenu<TData>({ row, items }: { row: TData; items: ActionItem<TData>[] }) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        function onClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [open])

    return (
        <div ref={ref} className="relative flex justify-end">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen((v) => !v)
                }}
                aria-label="Row actions"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>

            {open && (
                <div
                    className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                >
                    {items.map((item) => {
                        const Icon = item.icon
                        return (
                            <button
                                key={item.label}
                                type="button"
                                className={cn(
                                    'flex w-full items-center gap-2 rounded-sm px-3 py-1.5 text-sm transition-colors',
                                    item.variant === 'destructive'
                                        ? 'text-destructive hover:bg-destructive/10'
                                        : 'text-foreground hover:bg-accent'
                                )}
                                onClick={() => {
                                    item.onClick(row)
                                    setOpen(false)
                                }}
                            >
                                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                                {item.label}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export function actionColumn<TData>(items: ActionItem<TData>[]): ColumnDef<TData> {
    return {
        id: '__actions__',
        header: '',
        enableSorting: false,
        meta: { className: 'w-12 text-right' },
        cell: ({ row }) => <ActionMenu row={row.original} items={items} />,
    }
}

// ─── 6. Selection Column ──────────────────────────────────────────────────────

/**
 * Checkbox column wired to TanStack row selection.
 * Pass `enableRowSelection` to `DataTable` to activate it.
 */
export function selectionColumn<TData>(): ColumnDef<TData> {
    return {
        id: '__select__',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                ref={(el) => {
                    if (el) el.indeterminate = table.getIsSomePageRowsSelected()
                }}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
                aria-label="Select all rows"
            />
        ),
        meta: { className: 'w-10' },
        enableSorting: false,
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
                onClick={(e) => e.stopPropagation()}
                aria-label="Select row"
            />
        ),
    }
}
