import { useMemo, useState } from "react"
import { type ColumnDef, type SortingState } from "@tanstack/react-table"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ChevronRight, Users, MoreHorizontal, UserPlus, FileText, Download, Building, SlidersHorizontal, RefreshCw, Search, X, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Checkbox } from "@/components/ui/Checkbox"
import { DataTable } from "@/components/ui/DataTable/DataTable"
import { DataTableToolbar, DataTableToolbarSection } from "@/components/ui/DataTable/DataTableToolbar"
import { fetchMembers } from "@/features/members/api/membersApi"
import { type Member } from "@/data/mockMembers"
import { InputGroup, InputLeftSlot, InputRightSlot } from "@/components/ui/InputGroup"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/Drawer"

const PAGE_SIZE = 200

export function MembersPage() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedMember, setSelectedMember] = useState<Member | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [drawerSide, setDrawerSide] = useState<"top" | "bottom" | "left" | "right">("right")

    // Infinite Query for members
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['members', searchTerm],
        queryFn: ({ pageParam }) => fetchMembers(pageParam, PAGE_SIZE),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    })

    const allMembers = useMemo(() => data?.pages.flatMap(page => page.data) ?? [], [data])
    const totalCount = data?.pages[0]?.total ?? 0

    const columns = useMemo<ColumnDef<Member>[]>(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    ref={(el) => {
                        if (el) el.indeterminate = table.getIsSomeRowsSelected()
                    }}
                    onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                    aria-label="Select all rows"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            size: 56,
            meta: { className: "min-w-[56px] pl-4 sticky left-0 bg-inherit z-20" }
        },
        {
            accessorKey: 'member',
            header: 'Members',
            cell: ({ row }) => {
                const member = row.original.member
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="font-medium text-sm text-foreground truncate">{member.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{member.id}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50 shrink-0" />
                    </div>
                )
            },
            size: 280,
            meta: { className: "min-w-[280px] sticky left-[56px] bg-inherit z-20 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]" }
        },
        {
            accessorKey: 'family',
            header: 'Family',
            cell: ({ row }) => {
                if (!row.original.family) return (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
                        <PlusIcon className="h-4 w-4" />
                    </div>
                )
                return (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success relative">
                        <Users className="h-4 w-4" />
                        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-success flex items-center justify-center border-2 border-background">
                            <StarIcon className="h-2 w-2 text-white fill-white" />
                        </div>
                    </div>
                )
            },
            size: 100,
            meta: { className: "min-w-[100px]" }
        },
        {
            accessorKey: 'clubOrganisations',
            header: 'Club Organisations',
            cell: ({ row }) => {
                const club = row.original.clubOrganisations
                if (!club.primary.name || club.primary.name === 'No Organisation') {
                    return (
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted/30">
                                <Building className="h-5 w-5 text-muted-foreground/50" />
                            </div>
                            <span className="text-sm text-muted-foreground">No Organisation</span>
                        </div>
                    )
                }
                return (
                    <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                            <Avatar className="h-10 w-10 rounded-md shadow-sm">
                                <AvatarImage src={club.primary.logo} className="object-contain p-0.5" />
                                <AvatarFallback className="rounded-md bg-primary text-primary-foreground font-bold text-xs">
                                    {club.primary.name.substring(0, 3).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success flex items-center justify-center border-2 border-background">
                                <StarIcon className="h-2.5 w-2.5 text-white fill-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                            <span className="text-sm font-medium">{club.primary.name}</span>
                            {club.extraCount > 0 && (
                                <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-medium bg-muted/50 text-muted-foreground hover:bg-muted/50">
                                    +{club.extraCount} More
                                </Badge>
                            )}
                        </div>
                    </div>
                )
            },
            size: 320,
            meta: { className: "min-w-[320px]" }
        },
        {
            accessorKey: 'roles',
            header: 'Roles',
            cell: ({ row }) => {
                const roles = row.original.roles
                const extra = row.original.extraRolesCount
                if (roles.length === 0) return null
                return (
                    <div className="flex flex-wrap items-center gap-1.5">
                        {roles.map((role: string) => (
                            <Badge key={role} variant="outline" className="font-normal text-xs text-muted-foreground py-0 h-5">
                                {role}
                            </Badge>
                        ))}
                        {extra > 0 && (
                            <Badge variant="outline" className="font-normal text-xs text-muted-foreground py-0 h-5">
                                +{extra} More
                            </Badge>
                        )}
                    </div>
                )
            },
            size: 250,
            meta: { className: "min-w-[250px]" }
        },
        {
            accessorKey: 'clubMemberships',
            header: 'Club Memberships',
            cell: ({ row }) => {
                const mem = row.original.clubMemberships
                if (mem.status === 'none') {
                    return <span className="text-sm text-muted-foreground">{mem.type}</span>
                }

                const statusColor =
                    mem.status === 'valid' ? 'text-success border-success/30 bg-success/5' :
                        mem.status === 'suspended' ? 'text-amber-500 border-amber-500/30 bg-amber-500/5' :
                            'text-destructive border-destructive/30 bg-destructive/5'

                return (
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">{mem.type}</span>
                        <Badge variant="outline" className={cn("font-medium text-[10px] px-1.5 py-0 h-5 border rounded-sm whitespace-nowrap w-max", statusColor)}>
                            {mem.statusText}
                        </Badge>
                    </div>
                )
            },
            size: 220,
            meta: { className: "min-w-[220px]" }
        },
        {
            accessorKey: 'contactInfo',
            header: 'Contact Info',
            cell: ({ row }) => {
                const info = row.original.contactInfo
                if (!info) {
                    const fakePhone = `(555) ${row.original.member.id.substring(0, 3)}-${row.original.member.id.substring(3)}`
                    const fakeEmail = `${row.original.member.name.split(' ')[0].toLowerCase()}@example.com`
                    return (
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{fakePhone}</span>
                            <span className="text-xs text-muted-foreground">{fakeEmail}</span>
                        </div>
                    )
                }
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{info.phone}</span>
                        <span className="text-xs text-muted-foreground">{info.email}</span>
                    </div>
                )
            },
            size: 200,
            meta: { className: "min-w-[200px]" }
        },
        {
            accessorKey: 'joinDate',
            header: 'Join Date',
            cell: ({ row }) => {
                const date = row.original.joinDate || '12 Jan 2023'
                return <span className="text-sm text-muted-foreground">{date}</span>
            },
            size: 150,
            meta: { className: "min-w-[150px]" }
        },
        {
            id: 'actions',
            cell: () => (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            ),
            size: 60,
            meta: { className: "min-w-[60px] pr-4 text-right sticky right-0 bg-inherit z-20 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]" }
        }
    ], [])

    return (
        <div className="flex flex-col h-full overflow-hidden relative bg-muted/40 p-6 min-h-0">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 shrink-0">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-foreground">Members</h1>
                    <p className="text-xs text-muted-foreground">Manage and explore your product members</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Demo Variants */}
                    <div className="flex items-center bg-background border border-border rounded-lg p-1 mr-2 shadow-sm">
                        <span className="text-[10px] font-bold uppercase px-2 text-muted-foreground border-r border-border mr-1">Demo Sides</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-[10px] font-bold hover:bg-primary/10 hover:text-primary"
                            onClick={() => {
                                setDrawerSide("top")
                                if (allMembers.length > 0) { setSelectedMember(allMembers[0]); setIsDrawerOpen(true); }
                            }}
                        >
                            Top
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-[10px] font-bold hover:bg-primary/10 hover:text-primary"
                            onClick={() => {
                                setDrawerSide("bottom")
                                if (allMembers.length > 0) { setSelectedMember(allMembers[0]); setIsDrawerOpen(true); }
                            }}
                        >
                            Bottom
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-[10px] font-bold hover:bg-primary/10 hover:text-primary"
                            onClick={() => {
                                setDrawerSide("left")
                                if (allMembers.length > 0) { setSelectedMember(allMembers[0]); setIsDrawerOpen(true); }
                            }}
                        >
                            Left
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-[10px] font-bold hover:bg-primary/10 hover:text-primary"
                            onClick={() => {
                                setDrawerSide("right")
                                if (allMembers.length > 0) { setSelectedMember(allMembers[0]); setIsDrawerOpen(true); }
                            }}
                        >
                            Right
                        </Button>
                    </div>
                    <div className="flex shadow-sm rounded-md overflow-hidden">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none border-r border-primary/20 px-4 flex items-center gap-2 font-medium">
                            <UserPlus className="h-4 w-4" />
                            Add Member
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-2">
                            <ChevronRight className="h-4 w-4 rotate-90" />
                        </Button>
                    </div>
                    <Button variant="outline" size="icon" className="bg-background border-border shadow-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-background border-border shadow-sm">
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="outline" className="bg-background border-border shadow-sm ml-2 flex items-center gap-2 text-foreground font-medium">
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-[10px] text-primary-foreground font-bold">BG</span>
                        </div>
                        British Gymnastics
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-card border border-border rounded-md shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
                <DataTableToolbar className="bg-card border-b px-4 py-3 shrink-0">
                    <DataTableToolbarSection className="flex-1">
                        <Button variant="outline" size="icon" className="shrink-0 mr-2 text-muted-foreground">
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                        <InputGroup>
                            <InputLeftSlot className="pointer-events-none">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </InputLeftSlot>
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search"
                                aria-label="Search members"
                                className="pl-10 pr-10 bg-transparent"
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
                    </DataTableToolbarSection>

                    <DataTableToolbarSection className="shrink-0 text-sm text-muted-foreground">
                        <Button variant="ghost" className="text-success hover:text-success/90 hover:bg-success/10 font-medium px-2">
                            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                        </Button>
                        <div className="ml-4 font-medium">
                            <span className="text-foreground">1-{allMembers.length}</span> of {totalCount}
                        </div>
                    </DataTableToolbarSection>
                </DataTableToolbar>

                <div className="flex-1 min-h-0">
                    <DataTable
                        data={allMembers}
                        columns={columns}
                        isLoading={isLoading}
                        className="h-full border-0 rounded-none border-t"
                        enableRowSelection={true}
                        rowSelection={rowSelection}
                        onRowSelectionChange={setRowSelection}
                        sorting={sorting}
                        onSortingChange={setSorting}
                        enableVirtualization
                        infiniteScroll={{
                            onLoadMore: fetchNextPage,
                            hasMore: !!hasNextPage,
                            isLoadingMore: isFetchingNextPage
                        }}
                        onRowClick={(member) => {
                            setSelectedMember(member)
                            setIsDrawerOpen(true)
                        }}
                    />
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {Object.keys(rowSelection).length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#222222] text-white pl-8 pr-4 py-3 rounded-xl shadow-2xl flex items-center gap-10 animate-in fade-in slide-in-from-bottom-4 duration-300 border border-white/10">
                    <div className="flex items-center">
                        <span className="text-[#4CAF50] text-[17px] tracking-wide font-medium">
                            {Object.keys(rowSelection).length.toLocaleString()} Members Selected
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" className="flex flex-col items-center justify-center h-auto py-1.5 px-4 hover:bg-white/10 text-white hover:text-white group rounded-md gap-1.5">
                            <div className="relative">
                                <CreditCard className="h-[22px] w-[22px]" strokeWidth={1.5} />
                                <div className="absolute -bottom-1 -right-2 bg-[#222222] rounded-full p-[1.5px]">
                                    <PlusIcon className="h-3 w-3" strokeWidth={3} />
                                </div>
                            </div>
                            <span className="text-[13px] font-normal">Create Payment</span>
                        </Button>

                        <Button variant="ghost" className="flex flex-col items-center justify-center h-auto py-1.5 px-4 hover:bg-white/10 text-white hover:text-white group rounded-md gap-1.5">
                            <RefreshCw className="h-[22px] w-[22px]" strokeWidth={1.5} />
                            <span className="text-[13px] font-normal">Bulk Renew</span>
                        </Button>

                        <div className="h-8 w-[1px] bg-white/20 mx-2" />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#ff4d4f] hover:bg-white/10 hover:text-[#ff7875] transition-colors h-10 w-10 rounded-md shrink-0"
                            onClick={() => setRowSelection({})}
                        >
                            <X className="h-6 w-6" strokeWidth={1.5} />
                        </Button>
                    </div>
                </div>
            )}

            {/* Member Details Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction={drawerSide}>
                <DrawerContent
                className=""
                >
                    <DrawerHeader className="pb-6">
                        <DrawerTitle className="text-2xl font-bold">Member Profile</DrawerTitle>
                        <DrawerDescription>
                            Detailed information for member ID: {selectedMember?.member.id}
                        </DrawerDescription>
                    </DrawerHeader>

                    {selectedMember && (
                        <div className="flex-1 overflow-y-auto py-6 space-y-8">
                            {/* Profile Hero */}
                            <div className="flex flex-col items-center gap-4 text-center px-2">
                                <Avatar className="h-28 w-28 border-4 border-primary/10 shadow-xl">
                                    <AvatarImage src={selectedMember.member.avatar} alt={selectedMember.member.name} />
                                    <AvatarFallback className="text-3xl font-bold bg-primary/5 text-primary">
                                        {selectedMember.member.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground">{selectedMember.member.name}</h3>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <Badge variant={selectedMember.clubMemberships.status === 'valid' ? 'success' : 'warning'} className="rounded-full px-4 py-0.5 text-xs font-bold">
                                            {selectedMember.clubMemberships.status === 'valid' ? 'ACTIVE' : selectedMember.clubMemberships.status.toUpperCase()}
                                        </Badge>
                                        <span className="text-muted-foreground text-sm font-medium">Joined {selectedMember.joinDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Info Card */}
                            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 space-y-6">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70">Membership Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">Membership</label>
                                        <p className="font-bold flex items-center gap-2.5 text-foreground italic">
                                            <Users className="h-4 w-4 text-primary" />
                                            {selectedMember.clubMemberships.type}
                                        </p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">Member ID</label>
                                        <p className="font-mono font-bold text-primary tracking-tight">{selectedMember.member.id}</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">Primary Club</label>
                                        <p className="font-bold flex items-center gap-2.5 text-foreground italic">
                                            <Building className="h-4 w-4 text-primary" />
                                            {selectedMember.clubOrganisations.primary.name}
                                        </p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">Contact Email</label>
                                        <p className="font-semibold text-foreground text-sm truncate">{selectedMember.contactInfo?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status History / Additional Info */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70">Quick Actions</h4>
                                <div className="flex flex-col gap-3">
                                    <Button className="w-full justify-between h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl group">
                                        <span className="flex items-center gap-3 font-bold">
                                            <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
                                            Renew Membership
                                        </span>
                                        <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                    <Button variant="outline" className="w-full justify-between h-14 border-border hover:bg-muted/50 rounded-xl group">
                                        <span className="flex items-center gap-3 font-bold">
                                            <Download className="h-5 w-5 text-primary group-hover:-translate-y-1 transition-transform" />
                                            Export Profile Data
                                        </span>
                                        <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    <DrawerFooter className="border-t">
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                className="w-full"
                            >
                                Close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    )
}
