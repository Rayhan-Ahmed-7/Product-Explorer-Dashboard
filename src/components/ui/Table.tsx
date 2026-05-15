import * as React from "react"
import { cn } from "@/lib/utils"

// --- Table Container ---
export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className, children, style, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <table
                    ref={ref}
                    style={style}
                    className={cn(
                        "w-full caption-bottom text-sm text-foreground border-separate border-spacing-0",
                        className
                    )}
                    {...props}
                >
                    {children}
                </table>
            </div>
        )
    }
)
Table.displayName = "Table"


// --- Table Header ---
export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, children, style, ...props }, ref) => {
        return (
            <thead
                ref={ref}
                style={style}
                className={cn(
                    "border-b border-border",
                    className
                )}
                {...props}
            >
                {children}
            </thead>
        )
    }
)
TableHeader.displayName = "TableHeader"


// --- Table Body ---
export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, children, style, ...props }, ref) => {
        return (
            <tbody
                ref={ref}
                style={style}
                className={cn(
                    "[&_tr:last-child]:border-0",
                    className
                )}
                {...props}
            >
                {children}
            </tbody>
        )
    }
)
TableBody.displayName = "TableBody"


// --- Table Footer ---
export function TableFooter({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tfoot
            className={cn(
                "border-t border-border bg-muted/50 font-medium",
                className
            )}
            {...props}
        >
            {children}
        </tfoot>
    )
}

// --- Table Row ---
export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <tr
                ref={ref}
                className={cn(
                    "bg-background hover:bg-muted data-[state=selected]:bg-muted group",
                    className
                )}
                {...props}
            >
                {children}
            </tr>
        )
    }
)
TableRow.displayName = "TableRow"


// --- Table Head Cell ---
export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <th
                ref={ref}
                className={cn(
                    "h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wide border-r border-b border-border last:border-r-0 bg-inherit",
                    className
                )}
                {...props}
            >
                {children}
            </th>
        )
    }
)
TableHead.displayName = "TableHead"


// --- Table Cell ---
export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <td
                ref={ref}
                className={cn(
                    "p-4 align-middle border-r border-b border-border last:border-r-0 bg-inherit",
                    className
                )}
                {...props}
            >
                {children}
            </td>
        )
    }
)
TableCell.displayName = "TableCell"


// --- Table Caption ---
export function TableCaption({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
    return (
        <caption
            className={cn(
                "mt-4 text-sm text-muted-foreground",
                className
            )}
            {...props}
        >
            {children}
        </caption>
    )
}
