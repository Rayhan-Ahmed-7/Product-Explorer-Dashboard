import { useParams } from "react-router"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"

export default function ProductDetailPage() {
    const { id } = useParams()

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Product Details</h1>
            </div>
        </div>
    )
}
