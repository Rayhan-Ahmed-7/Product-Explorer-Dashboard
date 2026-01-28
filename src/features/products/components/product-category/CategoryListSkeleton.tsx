import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/Table'
import { CategoryRowSkeleton } from './CategoryRowSkeleton'
import { CategoryCardSkeleton } from './CategoryCardSkeleton'

export function CategoryListSkeleton() {
    return (
        <div className="space-y-4">
            {/* Desktop View (Table) */}
            <div className="hidden md:block rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(10)].map((_, i) => (
                            <CategoryRowSkeleton key={i} />
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
                {[...Array(6)].map((_, i) => (
                    <CategoryCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
