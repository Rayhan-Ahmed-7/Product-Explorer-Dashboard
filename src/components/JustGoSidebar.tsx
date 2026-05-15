import { Link } from "react-router"
import {
    Drawer,
    DrawerContent,
    DrawerClose,
} from "@/components/ui/Drawer"
import {
    Heart,
    ShoppingCart,
    Home,
    HelpCircle,
    LogOut,
    User,
    IdCard,
    Star,
    ArrowLeftRight,
    Calendar,
    Users,
    Settings,
    BarChart,
    List,
    AppWindow,
    Languages,
    X
} from "lucide-react"
import { cn } from "@/lib/utils"

const leftRailIcons = [
    { icon: Heart, label: "My Favourites" },
    { icon: ShoppingCart, label: "Cart" },
    { icon: Home, label: "Home" },
    { icon: HelpCircle, label: "Help" },
    { icon: LogOut, label: "Logout" },
]

const favouriteTiles = [
    { title: "Members", icon: User, color: "bg-blue-600 hover:bg-blue-700 text-white" },
    { title: "Licences", icon: IdCard, color: "bg-blue-600 hover:bg-blue-700 text-white" },
    { title: "Clubs", icon: Star, color: "bg-purple-600 hover:bg-purple-700 text-white" },
    { title: "Club Transfers", icon: ArrowLeftRight, color: "bg-purple-600 hover:bg-purple-700 text-white" },
    { title: "AssetHub-Admin", icon: Calendar, color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
    { title: "My Profile (New)", icon: Calendar, color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
    { title: "Class Management", icon: Calendar, color: "bg-teal-700 hover:bg-teal-800 text-white" },
]

const adminTiles = [
    { title: "User and Group", icon: Users, color: "bg-green-600 hover:bg-green-700 text-white" },
    { title: "Repository and Workflow", icon: Settings, color: "bg-green-600 hover:bg-green-700 text-white" },
    { title: "Report Management", icon: BarChart, color: "bg-green-600 hover:bg-green-700 text-white" },
    { title: "Lookups", icon: List, color: "bg-green-600 hover:bg-green-700 text-white" },
    { title: "Workbenches and Forms", icon: AppWindow, color: "bg-green-600 hover:bg-green-700 text-white" },
    { title: "Manage Locale", icon: Languages, color: "bg-green-600 hover:bg-green-700 text-white" },
]

interface JustGoSidebarProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function JustGoSidebar({ open, onOpenChange }: JustGoSidebarProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="left">
            <DrawerContent
                className="w-[100vw] sm:max-w-[600px] p-0 flex flex-col h-full bg-card rounded-none border-r-0"
            >
                {/* Top Header */}
                <div className="flex items-center text-sm font-medium border-b border-border text-muted-foreground h-14 shrink-0 px-4">
                    <DrawerClose asChild>
                        <button className="flex items-center gap-2 hover:text-foreground transition-colors mr-6">
                            <X className="h-5 w-5" />
                            <span>MENU</span>
                        </button>
                    </DrawerClose>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 min-h-0">
                    {/* Left Rail */}
                    <div className="w-14 sm:w-16 bg-muted/50 border-r border-border flex flex-col items-center py-4 gap-6 shrink-0 overflow-y-auto">
                        {leftRailIcons.map((item, i) => (
                            <button
                                key={i}
                                className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                title={item.label}
                            >
                                <item.icon className="h-6 w-6" />
                            </button>
                        ))}
                    </div>

                    {/* Tiles Area */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">

                        {/* Favourites Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4 text-foreground">
                                <Heart className="h-5 w-5 fill-current" />
                                <h2 className="text-xl sm:text-2xl font-semibold">My Favourites</h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                {favouriteTiles.map((tile, i) => (
                                    <Link
                                        key={i}
                                        to="#"
                                        className={cn(
                                            "flex flex-col items-center justify-center p-4 sm:p-6 rounded-md shadow-sm transition-transform active:scale-95",
                                            tile.color
                                        )}
                                    >
                                        <tile.icon className="h-8 w-8 sm:h-10 sm:w-10 mb-3" />
                                        <span className="text-xs sm:text-sm font-medium text-center">{tile.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Admin Section */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">JustGo Admin</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                {adminTiles.map((tile, i) => (
                                    <Link
                                        key={i}
                                        to="#"
                                        className={cn(
                                            "flex flex-col items-center justify-center p-4 sm:p-6 rounded-md shadow-sm transition-transform active:scale-95",
                                            tile.color
                                        )}
                                    >
                                        <tile.icon className="h-8 w-8 sm:h-10 sm:w-10 mb-3" />
                                        <span className="text-xs sm:text-sm font-medium text-center">{tile.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
