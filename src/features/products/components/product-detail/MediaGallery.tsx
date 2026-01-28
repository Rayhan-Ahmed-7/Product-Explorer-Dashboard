import { useState } from 'react'
import { Card } from '@/components/ui/Card'

interface MediaGalleryProps {
    images: string[]
    thumbnail: string
    title: string
}

export function MediaGallery({ images, thumbnail, title }: MediaGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <Card>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Media Gallery</h3>
            <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                        src={images[selectedImage] || thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {images.slice(0, 4).map((image, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-primary' : 'border-border'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${title} ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </Card>
    )
}
