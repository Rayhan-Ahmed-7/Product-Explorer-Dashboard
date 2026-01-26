import { useSearchParams } from "react-router"

export default function ProductSearchPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q") || ""

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Search Results</h1>

            </div>

        </div>
    )
}
