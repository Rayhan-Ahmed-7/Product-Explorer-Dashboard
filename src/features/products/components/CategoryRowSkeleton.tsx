import { TableCell, TableRow } from "@/components/ui/Table"
import { Skeleton } from "@/components/ui/Skeleton"

export function CategoryRowSkeleton() {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <Skeleton className="h-5 w-40" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-5 w-24 rounded font-mono" />
            </TableCell>
            <TableCell className="text-right">
                <Skeleton className="h-8 w-32 ml-auto rounded-md" />
            </TableCell>
        </TableRow>
    )
}
