import { Outlet } from "react-router"
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset
} from "@/components/ui/Sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemePicker } from "@/components/ThemePicker"

export default function MainLayout() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 items-center justify-between border-b bg-card px-6">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                    </div>
                    <ThemePicker />
                </header>
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
