import { Card, CardContent } from "@/components/ui/Card"
import { Info } from "lucide-react"
import { SettingsSection } from "../components/SettingsSection"
import { CurrencyRadioGroup } from "../components/CurrencyRadioGroup"

export default function SettingsPage() {
    return (
        <div className="space-y-8 p-4 md:p-8 max-w-6xl mx-auto">
            <header className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Settings</h1>
                <p className="text-lg text-muted-foreground">
                    Manage your global display settings and currency localization.
                </p>
            </header>

            <section className="space-y-6">
                <h2 className="text-lg md:text-xl font-bold border-b pb-2">Preferences</h2>

                <Card className="border-none shadow-sm bg-card/50 overflow-hidden">
                    <CardContent className="p-4 md:p-8 space-y-8">
                        <SettingsSection
                            title="Global Currency"
                            description="Choose the default currency for price displays across the Product Explorer and Inventory modules."
                        >
                            <CurrencyRadioGroup />
                        </SettingsSection>

                        <footer className="flex flex-col sm:flex-row gap-3 rounded-lg bg-muted/30 p-4 border border-muted/50">
                            <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground leading-snug">
                                <span className="font-medium text-foreground/80">Note:</span>
                                Changing currency will update all inventory prices based on current exchange rates stored in the system.
                            </p>
                        </footer>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}

