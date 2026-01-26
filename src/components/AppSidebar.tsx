import { NavLink } from "react-router"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/Sidebar"
import { Package, Settings, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
    { title: "Products", to: "/products", icon: Package, end: true },
    { title: "Categories", to: "/products/categories", icon: Layers },
    { title: "Settings", to: "/settings", icon: Settings },
]

export function AppSidebar() {
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
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.to}>
                            <SidebarMenuButton asChild>
                                <NavLink to={item.to} end={item.end}>
                                    {({ isActive }) => (
                                        <>
                                            <item.icon className={isActive ? "text-primary" : ""} />
                                            <span className={cn(
                                                isActive ? "font-bold text-primary" : "",
                                                "group-data-[collapsible=icon]:hidden"
                                            )}>
                                                {item.title}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
