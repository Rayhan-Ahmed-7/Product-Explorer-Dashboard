import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/Table'
import { CategoryRowSkeleton } from './CategoryRowSkeleton'

export function CategoryListSkeleton() {
    return (
        <div className="rounded-lg border">
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
    )
}
