import { Card } from '@/components/ui/Card'
import { Database } from 'lucide-react'

interface ProductMetadataProps {
    meta: {
        barcode: string
        createdAt: string
        updatedAt: string
    }
}

export function ProductMetadata({ meta }: ProductMetadataProps) {
    return (
        <Card>
            <div className="flex items-center gap-2 mb-4">
                <Database className="h-5 w-5 text-info" />
                <h3 className="text-sm font-semibold text-card-foreground">Product Metadata</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Barcode (UPC/EAN)</p>
                    <div className="bg-accent/30 p-2 rounded border border-border/50">
                        <p className="text-sm font-mono text-card-foreground break-all">{meta.barcode}</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Date Created</p>
                    <div>
                        <p className="text-sm font-semibold text-card-foreground">
                            {new Date(meta.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(meta.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="space-y-1 sm:col-span-2 md:col-span-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Last Updated</p>
                    <div>
                        <p className="text-sm font-semibold text-card-foreground">
                            {new Date(meta.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(meta.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
