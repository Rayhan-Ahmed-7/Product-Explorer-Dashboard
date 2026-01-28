import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { LucideIcon } from 'lucide-react'

interface InfoCardProps {
    icon: LucideIcon
    label: string
    value: string | number
    badge?: {
        text: string
        variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
    }
    subtext?: string
}

export function InfoCard({ icon: Icon, label, value, badge, subtext }: InfoCardProps) {
    return (
        <Card padding="sm">
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{label}</p>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-card-foreground">{value}</p>
                        {badge && (
                            <Badge variant={badge.variant} className="text-xs">
                                {badge.text}
                            </Badge>
                        )}
                        {subtext && (
                            <span className="text-xs text-muted-foreground">{subtext}</span>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
