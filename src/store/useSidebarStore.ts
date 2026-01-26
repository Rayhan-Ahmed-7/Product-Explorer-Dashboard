import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
    state: "expanded" | "collapsed"
    openMobile: boolean
    isMobile: boolean
    setMobile: (mobile: boolean) => void
    toggleSidebar: () => void
    setOpenMobile: (open: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set, get) => ({
            state: "expanded",
            openMobile: false,
            isMobile: false,
            setMobile: (mobile) => set({ isMobile: mobile }),
            toggleSidebar: () => {
                const { isMobile, state, openMobile } = get()
                if (isMobile) {
                    set({ openMobile: !openMobile })
                } else {
                    set({ state: state === "expanded" ? "collapsed" : "expanded" })
                }
            },
            setOpenMobile: (open) => set({ openMobile: open }),
        }),
        {
            name: 'sidebar-storage',
            partialize: (state) => ({ state: state.state }), // Only persist desktop state
        }
    )
)
