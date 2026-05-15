// Main component
export { DataTable } from './DataTable'
export type { DataTableProps } from './DataTable'

// Pagination
export { DataTablePagination } from './DataTablePagination'
export type { PaginationState } from './DataTablePagination'

// Column helpers — import these to build column definitions
export {
    textColumn,
    numberColumn,
    avatarColumn,
    badgeColumn,
    actionColumn,
    selectionColumn,
} from './column-helpers'
export type { ColumnDef, ActionItem } from './column-helpers'

// Sub-components — exposed for advanced use cases where you need
// to compose the table manually (e.g. custom header or body layout)
export { DataTableHeader } from './DataTableHeader'
export { DataTableBody } from './DataTableBody'
export { DataTableRow } from './DataTableRow'
export { DataTableSkeletonRows } from './DataTableSkeletonRows'
export { DataTableEmptyState } from './DataTableEmptyState'
export { DataTableToolbar, DataTableToolbarSection } from './DataTableToolbar'
