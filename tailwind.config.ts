import { type Config } from 'tailwindcss'

export default {
    darkMode: ['class', '[data-mode="dark"]'],
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                card: 'oklch(var(--card))',
                'card-foreground': 'oklch(var(--card-foreground))',
                primary: 'oklch(var(--primary))',
                'primary-foreground': 'oklch(var(--primary-foreground))',
                secondary: 'oklch(var(--secondary))',
                'secondary-foreground': 'oklch(var(--secondary-foreground))',
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring))',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
            },
            transitionDuration: {
                fast: '100ms',
                base: '150ms',
            },
            fontFamily: {
                sans: 'var(--font-sans)',
            },
            fontSize: {
                sm: 'var(--font-size-sm)',
                md: 'var(--font-size-md)',
                lg: 'var(--font-size-lg)',
                xl: 'var(--font-size-xl)',
            },
            lineHeight: {
                sm: 'var(--line-height-sm)',
                md: 'var(--line-height-md)',
                lg: 'var(--line-height-lg)',
            },
            spacing: {
                xs: 'var(--space-xs)',
                sm: 'var(--space-sm)',
                md: 'var(--space-md)',
                lg: 'var(--space-lg)',
                xl: 'var(--space-xl)',
            },
        },
    },
} satisfies Config
