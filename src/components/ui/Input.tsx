import { cva, type VariantProps } from 'class-variance-authority'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const inputVariants = cva(
    'flex w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'border-input',
                filled: 'border-transparent bg-muted focus-visible:bg-background',
                error: 'border-destructive focus-visible:ring-destructive',
                danger: 'border-destructive focus-visible:ring-destructive',
                success: 'border-success focus-visible:ring-success',
                warning: 'border-warning focus-visible:ring-warning',
                info: 'border-info focus-visible:ring-info',
            },
            inputSize: {
                sm: 'h-8 text-xs',
                default: 'h-10',
                lg: 'h-12 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            inputSize: 'default',
        },
    }
)

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, inputSize, type = 'text', ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({ variant, inputSize, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input, inputVariants }
