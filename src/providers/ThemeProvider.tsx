import { useLayoutEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme, mode } = useThemeStore()

    useLayoutEffect(() => {
        const root = document.documentElement
        // Apply theme
        root.setAttribute('data-theme', theme)

        // Apply mode (handling system preference)
        if (mode === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            root.setAttribute('data-mode', systemTheme)

            // Listener for system changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = (e: MediaQueryListEvent) => {
                root.setAttribute('data-mode', e.matches ? 'dark' : 'light')
            }
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        } else {
            root.setAttribute('data-mode', mode)
        }
    }, [theme, mode])

    return <>{children}</>
}
