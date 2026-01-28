import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star } from 'lucide-react'
import type { ProductReview } from '../../types/product'

interface ReviewsListProps {
    reviews: ProductReview[]
    maxReviews?: number
}

export function ReviewsList({ reviews, maxReviews = 3 }: ReviewsListProps) {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-card-foreground">Recent Customer Reviews</h3>
                <Button variant="ghost" size="sm" className="text-xs">
                    VIEW ALL FEEDBACKS
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Showing latest {maxReviews} verified transactions</p>
            <div className="space-y-6">
                {reviews.slice(0, maxReviews).map((review, idx) => (
                    <div key={idx} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                        {/* Mobile Layout: Stacked with grouping */}
                        <div className="md:hidden space-y-3">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                        <span className="text-sm font-semibold text-primary">
                                            {review.reviewerName.split(' ').map((n: string) => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-card-foreground truncate">{review.reviewerName}</p>
                                        <p className="text-[10px] text-muted-foreground truncate">{review.reviewerEmail}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[10px] text-muted-foreground uppercase font-medium">Date</p>
                                    <p className="text-xs font-semibold text-card-foreground">
                                        {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-accent/30 px-3 py-2 rounded-lg border border-border/50">
                                <span className="text-[10px] text-muted-foreground uppercase font-bold">Rating</span>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold ml-1">{review.rating.toFixed(1)}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Comment</p>
                                <p className="text-sm text-card-foreground leading-relaxed italic border-l-2 border-primary/20 pl-3">
                                    "{review.comment}"
                                </p>
                            </div>
                        </div>

                        {/* Desktop Layout: Table-like grid */}
                        <div className="hidden md:grid md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-semibold text-primary">
                                            {review.reviewerName.split(' ').map((n: string) => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-card-foreground truncate">{review.reviewerName}</p>
                                        <p className="text-[10px] text-muted-foreground truncate">{review.reviewerEmail}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-[10px] text-muted-foreground uppercase mb-1">Rating</p>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium ml-1">{review.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="md:col-span-5">
                                <p className="text-[10px] text-muted-foreground uppercase mb-1">Comment</p>
                                <p className="text-sm text-card-foreground line-clamp-2">{review.comment}</p>
                            </div>
                            <div className="md:col-span-2 text-right">
                                <p className="text-[10px] text-muted-foreground uppercase mb-1">Date</p>
                                <p className="text-xs font-medium text-card-foreground">
                                    {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
