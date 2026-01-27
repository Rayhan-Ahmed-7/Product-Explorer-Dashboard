import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/Table'
import { ProductRowSkeleton } from './ProductRowSkeleton'

export function ProductListSkeleton() {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-16">ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right">Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(20)].map((_, i) => (
                        <ProductRowSkeleton key={i} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
