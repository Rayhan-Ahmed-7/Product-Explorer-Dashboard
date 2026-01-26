import * as React from "react"
import { Check, ChevronDown, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchSelectOption {
    value: string
    label: string
    disabled?: boolean
}

export interface SearchSelectProps {
    options: SearchSelectOption[]
    value?: string
    onChange?: (value: string) => void
    onSearchChange?: (query: string) => void
    placeholder?: string
    searchPlaceholder?: string
    className?: string
    disabled?: boolean
    loading?: boolean
    emptyMessage?: string
}

/**
 * SearchSelect Component (Searchable Select)
 * For dynamic, API-driven selection with search
 * Parent component handles search logic and provides filtered options
 */
export function SearchSelect({
    options,
    value,
    onChange,
    onSearchChange,
    placeholder = "Select an option",
    searchPlaceholder = "Search...",
    className,
    disabled = false,
    loading = false,
    emptyMessage = "No results found",
}: SearchSelectProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    // Get selected option
    const selectedOption = options.find((opt: SearchSelectOption) => opt.value === value)

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchQuery("")
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Focus search input when dropdown opens
    React.useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isOpen])

    // Reset highlighted index when options change
    React.useEffect(() => {
        setHighlightedIndex(0)
    }, [options])

    // Notify parent of search changes
    React.useEffect(() => {
        if (isOpen) {
            onSearchChange?.(searchQuery)
        }
    }, [searchQuery, isOpen, onSearchChange])

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return

        switch (e.key) {
            case "Enter":
                e.preventDefault()
                if (isOpen && options[highlightedIndex] && !options[highlightedIndex].disabled) {
                    handleSelect(options[highlightedIndex].value)
                } else if (!isOpen) {
                    setIsOpen(true)
                }
                break
            case "Escape":
                e.preventDefault()
                setIsOpen(false)
                setSearchQuery("")
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
        setSearchQuery("")
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
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
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
                        "absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg",
                        "animate-in fade-in-0 zoom-in-95"
                    )}
                >
                    {/* Search Input */}
                    <div className="border-b border-border p-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={searchPlaceholder}
                                className={cn(
                                    "w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
                                    "placeholder:text-muted-foreground"
                                )}
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="max-h-60 overflow-auto p-1">
                        {loading ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                    Loading...
                                </div>
                            </div>
                        ) : options.length === 0 ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                {emptyMessage}
                            </div>
                        ) : (
                            options.map((option: SearchSelectOption, index: number) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => !option.disabled && handleSelect(option.value)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    disabled={option.disabled}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
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
