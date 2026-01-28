import { useCurrency } from "@/context/CurrencyContext"
import { Check, Banknote, DollarSign, PoundSterling, Euro } from "lucide-react"
import type { Currency } from "@/lib/currencyUtils"
import { cn } from "@/lib/utils"

const currencies: { id: Currency; name: string; symbol: string; icon: any }[] = [
    { id: 'USD', name: 'US Dollar', symbol: '$', icon: DollarSign },
    { id: 'GBP', name: 'British Pound', symbol: '£', icon: PoundSterling },
    { id: 'EUR', name: 'Euro', symbol: '€', icon: Euro },
]

export function CurrencyRadioGroup() {
    const { currency, setCurrency } = useCurrency()

    return (
        <div className="space-y-4">
            {currencies.map((item) => {
                const isSelected = currency === item.id
                return (
                    <label
                        key={item.id}
                        className={cn(
                            "relative flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer",
                            isSelected
                                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                : "border-muted bg-background hover:border-muted-foreground/30 hover:bg-muted/5"
                        )}
                    >
                        <div className="flex items-center justify-center">
                            <input
                                type="radio"
                                name="currency"
                                value={item.id}
                                checked={isSelected}
                                onChange={() => setCurrency(item.id)}
                                className="h-5 w-5 cursor-pointer accent-primary"
                            />
                        </div>

                        <div className={cn(
                            "rounded-lg p-2 transition-colors",
                            isSelected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                            {item.id === 'USD' ? (
                                <Banknote className="h-5 w-5" />
                            ) : (
                                <item.icon className="h-5 w-5" />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="font-bold text-base">{item.name}</div>
                            <div className="text-xs text-muted-foreground font-medium">
                                {item.id} ({item.symbol})
                            </div>
                        </div>

                        {isSelected && (
                            <div className="rounded-full bg-primary p-0.5 text-primary-foreground">
                                <Check className="h-3 w-3" />
                            </div>
                        )}
                    </label>
                )
            })}
        </div>
    )
}
