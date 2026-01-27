import * as React from "react"
import { cn } from "@/lib/utils"

// --- Table Container ---
export function Table({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableElement>) {
    return (
        <div className="relative w-full overflow-auto">
            <table
                className={cn(
                    "w-full caption-bottom text-sm text-foreground",
                    className
                )}
                {...props}
            >
                {children}
            </table>
        </div>
    )
}

// --- Table Header ---
export function TableHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <thead
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

// --- Table Body ---
export function TableBody({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tbody
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
export function TableRow({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr
            className={cn(
                "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                className
            )}
            {...props}
        >
            {children}
        </tr>
    )
}

// --- Table Head Cell ---
export function TableHead({
    className,
    children,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th
            className={cn(
                "h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wide",
                className
            )}
            {...props}
        >
            {children}
        </th>
    )
}

// --- Table Cell ---
export function TableCell({
    className,
    children,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td
            className={cn(
                "p-4 align-middle",
                className
            )}
            {...props}
        >
            {children}
        </td>
    )
}

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
