import { Outlet } from "react-router"
import { Menu, Bell, ShoppingCart, ChevronDown } from "lucide-react"
import { InputGroup, InputRightSlot } from "@/components/ui/InputGroup"
import { Input } from "@/components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { ThemePicker } from "@/components/ThemePicker"
import { useState } from "react"
import { JustGoSidebar } from "@/components/JustGoSidebar"
import { AppLogo } from "@/components/AppLogo"

export function JustGoLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-muted/40">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 flex h-auto py-3 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
                {/* Left: Menu & Logo */}
                <div className="flex items-center gap-4 w-1/4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <AppLogo className="h-8" />
                    </div>
                </div>

                {/* Center: Global Search */}
                <div className="flex-1 max-w-2xl px-4 hidden md:block">
                    <InputGroup>
                        <Input
                            placeholder="Search or jump to..."
                            className="bg-background rounded-md h-10 pr-8"
                        />
                        <InputRightSlot className="right-2">
                            <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground bg-muted">/</span>
                        </InputRightSlot>
                    </InputGroup>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center justify-end gap-3 w-1/4">
                    <ThemePicker />
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>
                    </Button>

                    <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                    <Button variant="ghost" className="gap-2 px-2 hidden sm:flex">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://i.pravatar.cc/150?u=systemadmin" />
                            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">SA</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-sm font-medium">System Admin</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 min-h-0">
                <Outlet />
            </main>

            {/* Mega Menu Overlay */}
            <JustGoSidebar open={isMenuOpen} onOpenChange={setIsMenuOpen} />
        </div>
    )
}
