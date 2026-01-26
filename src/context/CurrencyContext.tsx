import React, { createContext, useContext, useState } from 'react'
import type { Currency } from '@/lib/currencyUtils'

interface CurrencyContextType {
    currency: Currency
    setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    // Initialize from localStorage or default to USD
    const [currency, setCurrencyState] = useState<Currency>(() => {
        const saved = localStorage.getItem('app_currency')
        return (saved as Currency) || 'USD'
    })

    const setCurrency = (newCurrency: Currency) => {
        setCurrencyState(newCurrency)
        localStorage.setItem('app_currency', newCurrency)
    }

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider')
    }
    return context
}
