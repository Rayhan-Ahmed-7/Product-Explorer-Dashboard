import { Outlet } from "react-router"
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset
} from "@/components/ui/Sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function MainLayout() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
                    <SidebarTrigger />
                </header>
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
