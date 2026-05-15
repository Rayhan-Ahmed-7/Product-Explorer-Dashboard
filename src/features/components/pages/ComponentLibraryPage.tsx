import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/Avatar"
import { Card } from "@/components/ui/Card"
import { Checkbox } from "@/components/ui/Checkbox"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/Drawer"
import { AlertCircle, Check, ChevronRight, Eye, Zap } from "lucide-react"

export function ComponentLibraryPage() {
    const [selectedSize, setSelectedSize] = useState<"sm" | "default" | "lg">("default")
    const [openDrawer, setOpenDrawer] = useState<"top" | "bottom" | "left" | "right" | null>(null)

    return (
        <div className="min-h-screen bg-muted/40 p-8">
            <div className="mx-auto max-w-6xl space-y-12">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">Component Library</h1>
                    <p className="text-lg text-muted-foreground">Design system showcase for Product Explorer Dashboard</p>
                </div>

                {/* Buttons */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Buttons</h2>
                    <Card className="p-6 space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <Button>Default</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button disabled>Disabled</Button>
                        </div>
                        <div className="border-t pt-4">
                            <p className="text-sm text-muted-foreground mb-3">Sizes:</p>
                            <div className="flex flex-wrap gap-3">
                                <Button size="sm">Small</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">Large</Button>
                                <Button size="icon"><Zap className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Badges */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Badges</h2>
                    <Card className="p-6">
                        <div className="flex flex-wrap gap-3">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge className="bg-emerald-500 text-white">Success</Badge>
                            <Badge className="bg-blue-500 text-white">Info</Badge>
                            <Badge className="bg-amber-500 text-white">Warning</Badge>
                        </div>
                    </Card>
                </section>

                {/* Avatar */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Avatar & Avatar Group</h2>
                    <div className="space-y-4">
                        {/* Size selector */}
                        <Card className="p-4">
                            <p className="text-sm font-medium mb-3">Avatar Sizes:</p>
                            <div className="flex gap-2">
                                {(["sm", "default", "lg"] as const).map((size) => (
                                    <Button
                                        key={size}
                                        size="sm"
                                        variant={selectedSize === size ? "default" : "outline"}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </Card>

                        {/* Single Avatar */}
                        <Card className="p-6 space-y-4">
                            <h3 className="font-semibold">Single Avatar</h3>
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-center gap-2">
                                    <Avatar size={selectedSize}>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>SN</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">With Image</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Avatar size={selectedSize}>
                                        <AvatarFallback>AB</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">Fallback</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Avatar size={selectedSize}>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>SN</AvatarFallback>
                                        <AvatarBadge/>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">With Badge</span>
                                </div>
                            </div>
                        </Card>

                        {/* Avatar Group */}
                        <Card className="p-6 space-y-4">
                            <h3 className="font-semibold">Avatar Group</h3>
                            <AvatarGroup>
                                <Avatar size="default">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>SN</AvatarFallback>
                                </Avatar>
                                <Avatar size="default">
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <Avatar size="default">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>AB</AvatarFallback>
                                </Avatar>
                                <AvatarGroupCount>+2</AvatarGroupCount>
                            </AvatarGroup>
                        </Card>
                    </div>
                </section>

                {/* Form Elements */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Form Elements</h2>
                    <Card className="p-6 space-y-6">
                        {/* Checkboxes */}
                        <div className="space-y-3">
                            <h3 className="font-semibold">Checkboxes</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox defaultChecked id="check1" />
                                    <Label htmlFor="check1">Checked</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="check2" />
                                    <Label htmlFor="check2">Unchecked</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox disabled id="check3" />
                                    <Label htmlFor="check3">Disabled</Label>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold mb-3">Input</h3>
                            <div className="space-y-2">
                                <Input placeholder="Normal input" />
                                <Input placeholder="Placeholder text" />
                                <Input disabled placeholder="Disabled input" />
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Drawer */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Drawer</h2>
                    <Card className="p-6">
                        <div className="flex flex-wrap gap-3">
                            {(["top", "bottom", "left", "right"] as const).map((direction) => (
                                <Drawer key={direction} direction={direction} open={openDrawer === direction} onOpenChange={(open) => {
                                    setOpenDrawer(open ? direction : null)
                                }}>
                                    <DrawerTrigger asChild>
                                        <Button variant="outline">
                                            Open {direction.charAt(0).toUpperCase() + direction.slice(1)}
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>{direction.charAt(0).toUpperCase() + direction.slice(1)} Drawer</DrawerTitle>
                                            <DrawerDescription>This drawer opens from the {direction}.</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="p-4 h-svh">
                                            <p className="text-sm text-muted-foreground">
                                                Drawers are useful for displaying additional content, forms, or navigation without taking up the full page.
                                            </p>
                                        </div>
                                        <DrawerFooter>
                                            <DrawerClose asChild>
                                                <Button variant="outline">Close</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            ))}
                        </div>
                    </Card>
                </section>

                {/* Color Tokens */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Color Tokens</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-background border border-border"></div>
                            <span className="text-xs font-medium">Background</span>
                        </Card>
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-foreground"></div>
                            <span className="text-xs font-medium">Foreground</span>
                        </Card>
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-primary"></div>
                            <span className="text-xs font-medium">Primary</span>
                        </Card>
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-secondary"></div>
                            <span className="text-xs font-medium">Secondary</span>
                        </Card>
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-muted"></div>
                            <span className="text-xs font-medium">Muted</span>
                        </Card>
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-accent"></div>
                            <span className="text-xs font-medium">Accent</span>
                        </Card>
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-destructive"></div>
                            <span className="text-xs font-medium">Destructive</span>
                        </Card>
                        <Card className="p-4 space-y-2">
                            <div className="h-12 rounded bg-card border border-border"></div>
                            <span className="text-xs font-medium">Card</span>
                        </Card>
                    </div>
                </section>

                {/* Icons */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Icons (Lucide React)</h2>
                    <Card className="p-6">
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                            <div className="flex flex-col items-center gap-2">
                                <AlertCircle className="h-8 w-8" />
                                <span className="text-xs text-muted-foreground">AlertCircle</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Check className="h-8 w-8" />
                                <span className="text-xs text-muted-foreground">Check</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <ChevronRight className="h-8 w-8" />
                                <span className="text-xs text-muted-foreground">ChevronRight</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Eye className="h-8 w-8" />
                                <span className="text-xs text-muted-foreground">Eye</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Zap className="h-8 w-8" />
                                <span className="text-xs text-muted-foreground">Zap</span>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    )
}
