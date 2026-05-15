import { cn } from '@/lib/utils'

interface DataTableOverlayProps {
    className?: string
    message?: string
}

/**
 * A full-table overlay to show during initial loading states.
 * Features the JustGo logo and a loading message with a glassmorphism effect.
 */
export function DataTableOverlay({ className, message = 'Loading...' }: DataTableOverlayProps) {
    return (
        <div className={cn(
            "absolute inset-0 z-[100] flex flex-col items-center justify-center",
            "bg-background/60 backdrop-blur-[2px] transition-all duration-300 animate-in fade-in",
            className
        )}>
            <div className="flex flex-col items-center gap-4">
                {/* JustGo Logo */}
                <div className="relative h-16 w-16 animate-pulse">
                    <img 
                        src="/logo/logo.svg" 
                        alt="JustGo Logo" 
                        className="h-full w-full object-contain"
                    />
                </div>
                
                {/* Loading Text */}
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-foreground tracking-wide uppercase">
                        {message}
                    </span>
                    <div className="h-0.5 w-12 bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-infinite-loading" />
                    </div>
                </div>
            </div>
        </div>
    )
}
