import { Card, CardContent } from "@/components/ui/Card"
import { useCurrency } from "@/context/CurrencyContext"
import type { Currency } from "@/lib/currencyUtils"
import { Check, Info, Banknote, DollarSign, PoundSterling, Euro } from "lucide-react"
import { cn } from "@/lib/utils"

const currencies: { id: Currency; name: string; symbol: string; icon: any }[] = [
    { id: 'USD', name: 'US Dollar', symbol: '$', icon: DollarSign },
    { id: 'GBP', name: 'British Pound', symbol: '£', icon: PoundSterling },
    { id: 'EUR', name: 'Euro', symbol: '€', icon: Euro },
]

export default function SettingsPage() {
    const { currency, setCurrency } = useCurrency()

    return (
        <div className="space-y-8 p-4 md:p-8 max-w-6xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Settings</h1>
                <p className="text-lg text-muted-foreground">
                    Manage your global display settings and currency localization.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold border-b pb-2">Preferences</h2>

                <Card className="border-none shadow-sm bg-card/50">
                    <CardContent className="p-4 md:p-8">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                            {/* Description Side */}
                            <div className="lg:w-1/3 space-y-2 md:space-y-3">
                                <h3 className="text-base md:text-lg font-bold">Global Currency</h3>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    Choose the default currency for price displays across the Product Explorer and Inventory modules.
                                </p>
                            </div>

                            {/* Options Side */}
                            <div className="lg:w-2/3">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {currencies.map((item) => {
                                        const isSelected = currency === item.id
                                        return (
                                            <div
                                                key={item.id}
                                                className={cn(
                                                    "group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 sm:p-6 transition-all duration-200 cursor-pointer",
                                                    isSelected
                                                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                        : "border-muted bg-background hover:border-muted-foreground/30 hover:bg-muted/5"
                                                )}
                                                onClick={() => setCurrency(item.id)}
                                            >
                                                {/* Selected Indicator */}
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 rounded-full bg-primary p-0.5 text-primary-foreground">
                                                        <Check className="h-4 w-4" />
                                                    </div>
                                                )}

                                                <div className={cn(
                                                    "rounded-lg p-3 transition-colors",
                                                    isSelected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"
                                                )}>
                                                    {item.id === 'USD' ? (
                                                        <Banknote className="h-6 w-6" />
                                                    ) : (
                                                        <item.icon className="h-6 w-6" />
                                                    )}
                                                </div>

                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{item.id} ({item.symbol})</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Note area */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3 rounded-lg bg-muted/30 p-4 border border-muted/50">
                            <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground leading-snug">
                                <span className="font-medium text-foreground/80">Note:</span> Changing currency will update all inventory prices based on current exchange rates stored in the system.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
