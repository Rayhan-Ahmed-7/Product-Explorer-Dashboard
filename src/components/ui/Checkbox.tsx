import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, onCheckedChange, ...props }, ref) => {
        const internalRef = React.useRef<HTMLInputElement>(null)
        const combinedRef = (ref as React.RefObject<HTMLInputElement>) || internalRef

        return (
            <div className="relative inline-flex items-center justify-center h-4 w-4 shrink-0">
                <input
                    type="checkbox"
                    className={cn(
                        "peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-primary bg-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary indeterminate:bg-primary indeterminate:border-primary",
                        className
                    )}
                    ref={combinedRef}
                    onChange={(e) => {
                        onCheckedChange?.(e.target.checked)
                    }}
                    {...props}
                />
                <Check 
                    className="pointer-events-none absolute h-3 w-3 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100 peer-indeterminate:hidden" 
                    strokeWidth={4} 
                />
                <div className="pointer-events-none absolute h-0.5 w-2 bg-primary-foreground opacity-0 transition-opacity peer-indeterminate:opacity-100 peer-checked:hidden" />
            </div>
        )
    }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
