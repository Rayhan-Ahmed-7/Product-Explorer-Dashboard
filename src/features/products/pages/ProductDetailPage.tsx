import { useParams } from "react-router"
import { useProduct } from '../hooks/useProduct'
import { Button } from "@/components/ui/Button"
import { Card } from '@/components/ui/Card'
import { ArrowLeft, Package, Barcode, TrendingUp, Star } from "lucide-react"
import { useCurrency } from '@/context/CurrencyContext'
import { InfoCard } from '../components/product-detail/InfoCard'
import { MediaGallery } from '../components/product-detail/MediaGallery'
import { ProductDescription } from '../components/product-detail/ProductDescription'
import { CoreSpecifications } from '../components/product-detail/CoreSpecifications'
import { LogisticsInfo } from '../components/product-detail/LogisticsInfo'
import { PoliciesSection } from '../components/product-detail/PoliciesSection'
import { SystemMetadata } from '../components/product-detail/SystemMetadata'
import { ReviewsList } from '../components/product-detail/ReviewsList'
import { ProductDetailSkeleton } from '../components/product-detail/ProductDetailSkeleton'

export default function ProductDetailPage() {
    const { id } = useParams()
    const productId = id ? parseInt(id, 10) : 0
    const { data: product, isLoading, isError } = useProduct(productId)
    const { currency } = useCurrency()

    if (isLoading) {
        return <ProductDetailSkeleton />
    }

    if (isError || !product) {
        return (
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold">Product Details</h1>
                </div>
                <Card className="border-destructive bg-destructive/10 p-6 text-center">
                    <p className="text-destructive font-medium">Failed to load product</p>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold flex-1">
                    Product Details
                </h1>
            </div>

            {/* Top Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <InfoCard
                    icon={Package}
                    label="Product Title"
                    value={product.title}
                />
                <InfoCard
                    icon={Barcode}
                    label="SKU Identification"
                    value={product.sku}
                />
                <InfoCard
                    icon={TrendingUp}
                    label="Stock Availability"
                    value={product.stock}
                    badge={{
                        text: product.stock > 0 ? "LOW STOCK" : "OUT OF STOCK",
                        variant: product.stock > 0 ? "success" : "destructive"
                    }}
                />
                <InfoCard
                    icon={Star}
                    label="Average Rating"
                    value={product.rating.toFixed(2)}
                    subtext={`(${product.reviews.length} reviews)`}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    <MediaGallery
                        images={product.images}
                        thumbnail={product.thumbnail}
                        title={product.title}
                    />

                    <ProductDescription description={product.description} />

                    <CoreSpecifications
                        brand={product.brand}
                        category={product.category}
                        tags={product.tags}
                        price={product.price}
                        currency={currency}
                    />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    <LogisticsInfo
                        dimensions={product.dimensions}
                        weight={product.weight}
                        shippingInformation={product.shippingInformation}
                    />

                    <PoliciesSection
                        returnPolicy={product.returnPolicy}
                        warrantyInformation={product.warrantyInformation}
                    />

                    <SystemMetadata meta={product.meta} />

                    <ReviewsList reviews={product.reviews} />
                </div>
            </div>
        </div>
    )
}
