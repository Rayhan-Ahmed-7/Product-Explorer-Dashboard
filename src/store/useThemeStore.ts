import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'blue' | 'orange' | 'violet'
export type Mode = 'light' | 'dark' | 'system'

export interface ThemeMetadata {
    id: Theme
    name: string
    description: string
    colorClass: string
}

export const THEMES: ThemeMetadata[] = [
    {
        id: 'blue',
        name: 'Ocean',
        description: 'Blue theme for focused work',
        colorClass: 'bg-blue-500'
    },
    {
        id: 'orange',
        name: 'Sunset Vibes',
        description: 'Warm and vibrant orange accents',
        colorClass: 'bg-orange-500'
    },
    {
        id: 'violet',
        name: 'Amethyst Night',
        description: 'Elegant royal purple aesthetics',
        colorClass: 'bg-violet-500'
    }
]

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
