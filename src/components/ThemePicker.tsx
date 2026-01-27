import * as React from "react"
import { Palette, Check, Maximize2, Moon, Sun, Monitor } from "lucide-react"
import { useThemeStore, THEMES, type Mode } from "@/store/useThemeStore"
import { cn } from "@/lib/utils"

const MODES = [
    { value: 'light' as Mode, icon: Sun, label: 'Light' },
    { value: 'dark' as Mode, icon: Moon, label: 'Dark' },
    { value: 'system' as Mode, icon: Monitor, label: 'System' },
]

export function ThemePicker() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { theme: currentTheme, setTheme, mode, setMode } = useThemeStore()
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="flex items-center gap-3">
            <div ref={containerRef} className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "p-2 rounded-full transition-colors",
                        isOpen ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Palette className="h-5 w-5" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-border flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            <h3 className="font-semibold text-sm">Choose Theme</h3>
                        </div>

                        <div className="p-2 max-h-[400px] overflow-auto">
                            {THEMES.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTheme(t.id)
                                        setIsOpen(false)
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group",
                                        currentTheme === t.id
                                            ? "bg-accent text-accent-foreground"
                                            : "hover:bg-muted/50"
                                    )}
                                >
                                    {/* Palette Indicator Cube */}
                                    <div className={cn(
                                        "h-6 w-6 flex-none rounded-md border border-border/50 shadow-sm transition-transform group-hover:scale-110",
                                        t.colorClass
                                    )} />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm truncate">{t.name}</span>
                                            {currentTheme === t.id && (
                                                <Check className="h-4 w-4 text-primary shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                                            {t.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Mode Switcher Footer */}
                        <div className="p-3 border-t border-border bg-muted/30">
                            <div className="flex items-center justify-between gap-1 bg-background p-1 rounded-full border border-border">
                                {MODES.map((m) => (
                                    <button
                                        key={m.value}
                                        onClick={() => setMode(m.value)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center py-1.5 rounded-full capitalize text-xs gap-2",
                                            mode === m.value
                                                ? "bg-accent text-accent-foreground shadow-sm font-medium"
                                                : "text-muted-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <m.icon className="h-3.5 w-3.5" />
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
