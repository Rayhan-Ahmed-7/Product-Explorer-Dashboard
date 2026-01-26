export type Currency = 'USD' | 'GBP' | 'EUR'

export const currencyRates: Record<Currency, number> = {
    USD: 1,
    GBP: 0.8,
    EUR: 0.92,
}

export const currencySymbols: Record<Currency, string> = {
    USD: '$',
    GBP: '£',
    EUR: '€',
}

export function formatPrice(price: number, currency: Currency): string {
    const rate = currencyRates[currency]
    const convertedPrice = price * rate

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(convertedPrice)
}
