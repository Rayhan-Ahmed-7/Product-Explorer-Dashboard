import { DataTableSkeletonRows } from '@/components/ui/DataTable'
import { Table, TableHeader, TableRow, TableHead } from '@/components/ui/Table'
import { ProductCardSkeleton } from '../shared/ProductCardSkeleton'

export function ProductListSkeleton() {
    return (
        <div className="space-y-4">
            {/* Desktop View (Table) — uses generic skeleton that mirrors column count */}
            <div className="hidden md:block rounded-lg border border-border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-16">ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                            <TableHead className="text-right">Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <DataTableSkeletonRows rowCount={20} columnCount={7} />
                </Table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {[...Array(6)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
