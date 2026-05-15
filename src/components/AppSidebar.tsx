import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/Sidebar";
import {
  LayoutGrid,
  Package,
  PackageSearch,
  Settings,
  Shapes,
} from "lucide-react";

const menuItems = [
  {
    group: "Browse",
    items: [
      { title: "Products", to: "/products", icon: LayoutGrid, end: true },
      {
        title: "Products Search",
        to: "/products/search",
        icon: PackageSearch,
        end: true,
      },
      { title: "Categories", to: "/products/categories", icon: Shapes },
    ],
  },
  {
    group: "Settings",
    items: [{ title: "Settings", to: "/settings", icon: Settings }],
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex h-14 items-center justify-center border-b border-sidebar-border">
        <div className="flex w-full items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold truncate">ProdExplorer</span>
            <span className="text-xs text-sidebar-foreground/60">Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = item.end
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to);

                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        render={
                          <Link
                            to={item.to}
                            aria-current={isActive ? "page" : undefined}
                            className="flex w-full items-center gap-2"
                          />
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
