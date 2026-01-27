import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

export interface SelectProps {
    options: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

/**
 * Simple Select Component
 * For static lists of options (typically ≤ 10 items)
 */
export function Select({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    className,
    disabled = false,
}: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Get selected option
    const selectedOption = options.find((opt) => opt.value === value)

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Reset highlighted index when dropdown opens
    React.useEffect(() => {
        if (isOpen) {
            const currentIndex = options.findIndex((opt) => opt.value === value)
            setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0)
        }
    }, [isOpen, options, value])

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault()
                if (isOpen && options[highlightedIndex]) {
                    handleSelect(options[highlightedIndex].value)
                } else {
                    setIsOpen(true)
                }
                break
            case "Escape":
                e.preventDefault()
                setIsOpen(false)
                break
            case "ArrowDown":
                e.preventDefault()
                if (!isOpen) {
                    setIsOpen(true)
                } else {
                    setHighlightedIndex((prev) =>
                        prev < options.length - 1 ? prev + 1 : prev
                    )
                }
                break
            case "ArrowUp":
                e.preventDefault()
                if (isOpen) {
                    setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
                }
                break
        }
    }

    const handleSelect = (optionValue: string) => {
        onChange?.(optionValue)
        setIsOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.("")
    }

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "hover:bg-muted/50 transition-colors",
                    isOpen && "ring-2 ring-ring ring-offset-2"
                )}
            >
                <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <div className="flex items-center gap-1">
                    {selectedOption && !disabled && (
                        <X
                            className="h-4 w-4 text-muted-foreground hover:text-foreground"
                            onClick={handleClear}
                        />
                    )}
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                        )}
                    />
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className={cn(
                        "absolute z-50 mt-1 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-lg",
                        "animate-in fade-in-0 zoom-in-95"
                    )}
                >
                    <div className="max-h-60 overflow-auto p-1">
                        {options.length === 0 ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No options available
                            </div>
                        ) : (
                            options.map((option, index) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => !option.disabled && handleSelect(option.value)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    disabled={option.disabled}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm text-foreground outline-none transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        "disabled:pointer-events-none disabled:opacity-50",
                                        highlightedIndex === index && "bg-accent text-accent-foreground",
                                        option.value === value && "font-medium"
                                    )}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {option.value === value && (
                                        <Check className="h-4 w-4 text-primary" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
