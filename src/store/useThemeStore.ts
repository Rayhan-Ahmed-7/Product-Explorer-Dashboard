import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'blue' | 'orange' | 'violet'
export type Mode = 'light' | 'dark' | 'system'

interface ThemeState {
    theme: Theme
    mode: Mode
    setTheme: (theme: Theme) => void
    setMode: (mode: Mode) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'blue',
            mode: 'system',
            setTheme: (theme) => set({ theme }),
            setMode: (mode) => set({ mode }),
        }),
        {
            name: 'theme-storage',
        }
    )
)
