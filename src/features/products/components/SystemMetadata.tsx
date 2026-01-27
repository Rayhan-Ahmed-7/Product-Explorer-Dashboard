import { Card } from '@/components/ui/Card'
import { Database } from 'lucide-react'

interface SystemMetadataProps {
    meta: {
        barcode: string
        createdAt: string
        updatedAt: string
    }
}

export function SystemMetadata({ meta }: SystemMetadataProps) {
    return (
        <Card>
            <div className="flex items-center gap-2 mb-4">
                <Database className="h-5 w-5 text-info" />
                <h3 className="text-sm font-semibold text-card-foreground">System Metadata</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <p className="text-xs text-muted-foreground uppercase mb-2">Barcode (UPC/EAN)</p>
                    <p className="text-sm font-mono text-card-foreground">{meta.barcode}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase mb-2">Date Created</p>
                    <p className="text-sm font-medium text-card-foreground">
                        {new Date(meta.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(meta.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase mb-2">Last Updated</p>
                    <p className="text-sm font-medium text-card-foreground">
                        {new Date(meta.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(meta.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        </Card>
    )
}
