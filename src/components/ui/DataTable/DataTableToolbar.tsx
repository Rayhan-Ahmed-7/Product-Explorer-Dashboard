import * as React from "react"
import { cn } from "@/lib/utils"

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function DataTableToolbar({ className, children, ...props }: DataTableToolbarProps) {
    return (
        <div
            className={cn(
                "flex flex-col md:flex-row items-start md:items-center justify-between p-3 border-b border-border gap-4 bg-card",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function DataTableToolbarSection({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex items-center gap-3 w-full md:w-auto", className)} {...props}>
            {children}
        </div>
    )
}
