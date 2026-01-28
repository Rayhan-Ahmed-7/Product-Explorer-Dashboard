import { Card } from '@/components/ui/Card'
import { ShieldCheck } from 'lucide-react'

interface PoliciesSectionProps {
    returnPolicy: string
    warrantyInformation: string
}

export function PoliciesSection({ returnPolicy, warrantyInformation }: PoliciesSectionProps) {
    return (
        <Card>
            <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-success" />
                <h3 className="text-sm font-semibold text-card-foreground">Policies</h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Return Window</p>
                        <p className="text-sm font-medium text-card-foreground">{returnPolicy}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Warranty Info</p>
                        <p className="text-sm font-medium text-card-foreground">{warrantyInformation}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
