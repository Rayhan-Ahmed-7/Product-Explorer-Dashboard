import { Button } from "@/components/ui/Button"
import { AlertCircle, RotateCcw, Home, Terminal } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background transition-colors duration-300">
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-border shadow-lg">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                            <AlertCircle className="h-6 w-6 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            Something went wrong
                        </CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                            An unexpected error occurred while rendering this page.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-4">
                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                                <Terminal className="h-3.5 w-3.5" />
                                <span>Error Log</span>
                            </div>
                            <p className="font-mono text-xs text-foreground/90 leading-relaxed break-all">
                                {error.message}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 py-6">
                        <Button
                            variant="default"
                            size="lg"
                            onClick={resetErrorBoundary}
                            className="w-full gap-2 font-medium"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Try Recovery
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.location.href = '/'}
                            className="w-full gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-4 w-4" />
                            Return to Dashboard
                        </Button>
                    </CardFooter>
                </Card>

                <p className="mt-6 text-center text-[10px] text-muted-foreground/50">
                    Error reference: {Math.random().toString(36).substring(7).toUpperCase()}
                </p>
            </div>
        </div>
    )
}

