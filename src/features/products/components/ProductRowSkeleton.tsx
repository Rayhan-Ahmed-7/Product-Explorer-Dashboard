import { TableCell, TableRow } from "@/components/ui/Table"
import { Skeleton } from "@/components/ui/Skeleton"

export function ProductRowSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Skeleton className="h-5 w-24 rounded-full" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
                <Skeleton className="h-5 w-12 rounded-full ml-auto" />
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-8" />
                </div>
            </TableCell>
        </TableRow>
    )
}
