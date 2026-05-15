import { cn } from "@/lib/utils"

export interface AppLogoProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function AppLogo({ className, ...props }: AppLogoProps) {
    return (
        <div className={cn("flex items-center justify-center", className)} {...props}>
            <img 
                src="/logo/justgo-dark-mono.svg" 
                alt="JustGo Logo" 
                className="app-logo-dark h-full w-auto object-contain" 
            />
            <img 
                src="/logo/justgo-white-mono.svg" 
                alt="JustGo Logo" 
                className="app-logo-white h-full w-auto object-contain" 
            />
        </div>
    )
}
