import { Search, X } from 'lucide-react'
import { Select } from '@/components/ui/Select'
import { InputGroup, InputLeftSlot, InputRightSlot } from '@/components/ui/InputGroup'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface ProductFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    category: string
    setCategory: (category: string) => void
    sortBy: string
    setSortBy: (sortBy: string) => void
    sortOrder: 'asc' | 'desc'
    setSortOrder: (order: 'asc' | 'desc') => void
    categoryList: string[]
    showSearch?: boolean
    showFilters?: boolean
}

export function ProductFilters({
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    categoryList,
    showSearch = true,
    showFilters = true
}: ProductFiltersProps) {

    // Prepare category options
    const categoryOptions = [
        { value: '', label: 'All Categories' },
        ...(categoryList?.map((cat) => ({
            value: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')
        })) ?? [])
    ]

    // Prepare sort options
    const sortOptions = [
        { value: '', label: 'Sort By' },
        { value: 'price', label: 'Price' },
        { value: 'title', label: 'Title' },
        { value: 'rating', label: 'Rating' },
    ]

    // Prepare sort order options
    const sortOrderOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ]

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {showSearch && (
                <InputGroup className="w-full md:w-72">
                    <InputLeftSlot>
                        <Search className="h-4 w-4" />
                    </InputLeftSlot>
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="pl-10 pr-10"
                    />
                    {searchTerm && (
                        <InputRightSlot>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchTerm('')}
                                className="h-auto p-0 hover:bg-transparent"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </InputRightSlot>
                    )}
                </InputGroup>
            )}

            {showFilters && (
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {/* Category Filter */}
                    <Select
                        options={categoryOptions}
                        value={category}
                        onChange={setCategory}
                        placeholder="All Categories"
                        className="w-full md:w-48"
                    />

                    {/* Sort By */}
                    <Select
                        options={sortOptions}
                        value={sortBy}
                        onChange={setSortBy}
                        placeholder="Sort By"
                        className="w-full md:w-40"
                    />

                    {/* Sort Order */}
                    {sortBy && (
                        <Select
                            options={sortOrderOptions}
                            value={sortOrder}
                            onChange={(value) => setSortOrder(value as 'asc' | 'desc')}
                            className="w-full md:w-36"
                        />
                    )}
                </div>
            )}
        </div>
    )
}
