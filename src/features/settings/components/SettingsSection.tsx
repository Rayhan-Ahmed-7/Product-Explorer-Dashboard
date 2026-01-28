import React from 'react'

interface SettingsSectionProps {
    title: string
    description: string
    children: React.ReactNode
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Description Side */}
            <div className="lg:w-1/3 space-y-2 md:space-y-3">
                <h3 className="text-base md:text-lg font-bold">{title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Content Side */}
            <div className="lg:w-2/3">
                {children}
            </div>
        </div>
    )
}
