import { useNavigate } from 'react-router'
import { useCategories } from '../hooks/useCategories'
import { useProductsUIStore } from '../stores/useProductsUIStore'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Loader2, ArrowRight } from 'lucide-react'

export default function CategoriesPage() {
    const navigate = useNavigate()
    const { setCategory } = useProductsUIStore()
    const { data: categories, isLoading, isError } = useCategories()

    const handleViewProducts = (slug: string) => {
        setCategory(slug)
        navigate('/products')
    }

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Product Categories</h1>
                <p className="text-muted-foreground mt-1">
                    Browse and manage all available product categories.
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : isError ? (
                <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                    <p className="text-destructive font-medium">Failed to load categories</p>
                </div>
            ) : (
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
                            {categories?.map((category) => (
                                <TableRow key={category.slug}>
                                    <TableCell className="font-medium">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                                            {category.slug}
                                        </code>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-2"
                                            onClick={() => handleViewProducts(category.slug)}
                                        >
                                            View Products
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}
