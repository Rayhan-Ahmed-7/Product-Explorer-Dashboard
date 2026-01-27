import { Link, useLocation } from "react-router"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/Sidebar"
import { Package, Settings, LayoutGrid, Shapes } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
    { title: "Products", to: "/products", icon: LayoutGrid, end: true },
    { title: "Categories", to: "/products/categories", icon: Shapes },
    { title: "Settings", to: "/settings", icon: Settings },
]

export function AppSidebar() {
    const location = useLocation()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Package className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold truncate group-data-[collapsible=icon]:hidden">
                        ProdExplorer
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => {
                        const isActive = item.end
                            ? location.pathname === item.to
                            : location.pathname.startsWith(item.to)

                        return (
                            <SidebarMenuItem key={item.to}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-medium"
                                    )}
                                >
                                    <Link to={item.to} aria-current={isActive ? 'page' : undefined}>
                                        <item.icon />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
