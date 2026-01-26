import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebarStore } from "@/store/useSidebarStore"
import { Button } from "@/components/ui/Button"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"

// --- Sidebar Provider ---
// Handles mobile detection and CSS variables for width
export function SidebarProvider({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    const { setMobile, toggleSidebar } = useSidebarStore()

    React.useEffect(() => {
        const checkMobile = () => {
            setMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggleSidebar()
            }
        }
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("resize", checkMobile)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [setMobile, toggleSidebar])

    return (
        <div
            style={
                {
                    "--sidebar-width": SIDEBAR_WIDTH,
                    "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
                    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                } as React.CSSProperties
            }
            className={cn(
                "group/sidebar-wrapper flex min-h-screen w-full has-[[data-variant=inset]]:bg-sidebar",
                className
            )}
        >
            {children}
        </div>
    )
}

// --- Sidebar Main Container ---
export function Sidebar({
    className,
    children,
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
}: {
    className?: string
    children?: React.ReactNode
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
}) {
    const { state, openMobile, isMobile, setOpenMobile } = useSidebarStore()

    if (collapsible === "none") {
        return (
            <div
                className={cn(
                    "flex h-full w-[--sidebar-width] flex-col bg-card text-card-foreground",
                    className
                )}
            >
                {children}
            </div>
        )
    }

    if (isMobile) {
        return (
            <>
                {/* Overlay */}
                {openMobile && (
                    <div
                        className="fixed inset-0 z-50 bg-black/80 lg:hidden"
                        onClick={() => setOpenMobile(false)}
                    />
                )}
                {/* Drawer */}
                <div
                    className={cn(
                        "fixed inset-y-0 z-50 h-full w-(--sidebar-width-mobile) transition-transform duration-300 ease-in-out bg-card border-r border-border text-card-foreground",
                        side === "left"
                            ? "left-0 data-[state=closed]:-translate-x-full"
                            : "right-0 data-[state=closed]:translate-x-full",
                        className
                    )}
                    data-state={openMobile ? "open" : "closed"}
                >
                    <div className="flex h-full w-full flex-col">{children}</div>
                </div>
            </>
        )
    }

    return (
        <div
            className="group peer hidden md:block text-card-foreground flex-none"
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
        >
            {/* Sidebar Gap for Layout */}
            <div
                className={cn(
                    "relative h-svh w-(--sidebar-width) transition-[width] duration-300 ease-in-out",
                    "group-data-[collapsible=offcanvas]:w-0",
                    "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                    "group-data-[collapsible=none]:w-(--sidebar-width)"
                )}
            />
            {/* Fixed Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[width] duration-300 ease-in-out md:flex",
                    side === "left"
                        ? "left-0 border-r border-border"
                        : "right-0 border-l border-border",
                    "group-data-[collapsible=offcanvas]:w-0 group-data-[collapsible=offcanvas]:border-none",
                    "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                    "group-data-[collapsible=none]:w-(--sidebar-width)",
                    className
                )}
            >
                <div
                    className="flex h-full w-full flex-col bg-card group-data-[collapsible=icon]:items-center overflow-hidden"
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

// ... sections ...

// --- Sidebar Content Sections ---

export function SidebarHeader({ className, children }: { className?: string; children?: React.ReactNode }) {
    return (
        <div className={cn("flex flex-col p-4", className)}>
            {children}
        </div>
    )
}

export function SidebarContent({ className, children }: { className?: string; children?: React.ReactNode }) {
    return (
        <div className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)}>
            {children}
        </div>
    )
}

export function SidebarFooter({ className, children }: { className?: string; children?: React.ReactNode }) {
    return (
        <div className={cn("flex flex-col p-4", className)}>
            {children}
        </div>
    )
}

// --- Sidebar Trigger ---
export function SidebarTrigger({ className }: { className?: string }) {
    const { toggleSidebar } = useSidebarStore()

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", className)}
            onClick={toggleSidebar}
        >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}

// --- Sidebar Menu ---
export function SidebarMenu({ className, children }: { className?: string; children?: React.ReactNode }) {
    return (
        <ul className={cn("flex w-full min-w-0 flex-col gap-1 p-2", className)}>
            {children}
        </ul>
    )
}

export function SidebarMenuItem({ className, children }: { className?: string; children?: React.ReactNode }) {
    return (
        <li className={cn("group/menu-item relative", className)}>
            {children}
        </li>
    )
}

export function SidebarMenuButton({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    className,
    children,
    ...props
}: {
    asChild?: boolean
    isActive?: boolean
    children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof sidebarMenuButtonVariants>) {
    // If asChild is true, we just render the child with the classes merged.
    // However, for a simple implementation without Slot, we will default to rendering a button.
    // If exact Slot behavior is needed, we would clone the child, but for now strict "no lib" means simple wrapper.
    const Comp = "button"
    const { state } = useSidebarStore()

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            className: cn(
                sidebarMenuButtonVariants({ variant, size }),
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                className,
                (children.props as any).className
            ),
            "data-active": isActive,
            "data-state": state === "expanded" ? "expanded" : "collapsed",
            ...props
        })
    }

    return (
        <Comp
            className={cn(
                sidebarMenuButtonVariants({ variant, size }),
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                className
            )}
            data-active={isActive}
            data-state={state === "expanded" ? "expanded" : "collapsed"}
            {...props}
        >
            {children}
        </Comp>
    )
}

const sidebarMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-muted hover:text-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                outline:
                    "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
            },
            size: {
                default: "h-8 text-sm",
                sm: "h-7 text-xs",
                lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

// --- Sidebar Inset (Main Content Wrapper) ---
export function SidebarInset({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <main
            className={cn(
                "relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
                className
            )}
            {...props}
        >
            {children}
        </main>
    )
}
