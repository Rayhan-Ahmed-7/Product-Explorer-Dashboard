import { Card } from '@/components/ui/Card'
import { Truck } from 'lucide-react'

interface LogisticsInfoProps {
    dimensions: {
        width: number
        height: number
        depth: number
    }
    weight: number
    shippingInformation: string
}

export function LogisticsInfo({ dimensions, weight, shippingInformation }: LogisticsInfoProps) {
    return (
        <Card>
            <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-card-foreground">Logistics Info</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <p className="text-xs text-muted-foreground uppercase mb-2">Dimensions</p>
                    <p className="text-sm font-medium text-card-foreground">
                        {dimensions.width} x {dimensions.height} x {dimensions.depth} cm
                    </p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase mb-2">Weight</p>
                    <p className="text-sm font-medium text-card-foreground">{weight} kg</p>
                </div>
                <div className="col-span-2">
                    <p className="text-xs text-muted-foreground uppercase mb-2">Shipping Class</p>
                    <p className="text-sm font-medium text-card-foreground">{shippingInformation}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-xs text-muted-foreground uppercase mb-2">Handling Notes</p>
                    <p className="text-sm text-muted-foreground italic">
                        Fragile, store in cool environment away from direct sunlight.
                    </p>
                </div>
            </div>
        </Card>
    )
}
