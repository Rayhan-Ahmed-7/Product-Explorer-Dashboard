import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
    const { mode, setMode } = useThemeStore()

    const modes = [
        { value: 'light' as const, icon: Sun, label: 'Light' },
        { value: 'dark' as const, icon: Moon, label: 'Dark' },
        { value: 'system' as const, icon: Monitor, label: 'System' },
    ] as const

    return (
        <div className="flex items-center gap-1 rounded-full border bg-muted/50 p-1">
            {modes.map((m) => (
                <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                        mode === m.value
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    )}
                    title={m.label}
                >
                    <m.icon className="h-4 w-4" />
                    <span className="sr-only">{m.label}</span>
                </button>
            ))}
        </div>
    )
}
