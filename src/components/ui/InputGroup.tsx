import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface InputGroupProps {
    children: ReactNode
    className?: string
}

export function InputGroup({ children, className }: InputGroupProps) {
    return (
        <div className={cn("relative", className)}>
            {children}
        </div>
    )
}

interface InputSlotProps {
    children: ReactNode
    side: 'left' | 'right'
    className?: string
}

export function InputSlot({ children, side, className }: InputSlotProps) {
    return (
        <div
            className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center text-muted-foreground",
                side === 'left' ? "left-3" : "right-3",
                className
            )}
        >
            {children}
        </div>
    )
}

// Convenience exports
export function InputLeftSlot({ children, className }: { children: ReactNode; className?: string }) {
    return <InputSlot side="left" className={className}>{children}</InputSlot>
}

export function InputRightSlot({ children, className }: { children: ReactNode; className?: string }) {
    return <InputSlot side="right" className={className}>{children}</InputSlot>
}
