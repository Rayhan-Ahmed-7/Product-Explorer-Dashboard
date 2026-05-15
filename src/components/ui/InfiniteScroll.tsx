import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

interface InfiniteScrollProps {
    /** Callback triggered when the sentinel becomes visible */
    onIntersect: () => void
    /** Whether there is more data to load */
    hasMore: boolean
    /** Whether data is currently being fetched */
    isLoading?: boolean
    /** The scrollable container that acts as the root for intersection */
    root?: React.RefObject<HTMLElement | null>
    /** Margin around the root. Default is "100px" */
    rootMargin?: string
    /** Threshold for intersection. Default is 0.1 */
    threshold?: number | number[]
    /** Optional className for the container */
    className?: string
}

/**
 * A reusable Infinite Scroll component using Intersection Observer.
 */
export function InfiniteScroll({
    onIntersect,
    hasMore,
    isLoading,
    root,
    rootMargin = '100px',
    threshold = 0.1,
    className,
}: InfiniteScrollProps) {
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!hasMore || isLoading) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onIntersect()
                }
            },
            {
                root: root?.current || null,
                rootMargin,
                threshold,
            }
        )

        const currentSentinel = sentinelRef.current
        if (currentSentinel) {
            observer.observe(currentSentinel)
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel)
            }
        }
    }, [hasMore, isLoading, onIntersect, root, rootMargin, threshold])

    return (
        <div 
            ref={sentinelRef} 
            className={cn('h-px w-full pointer-events-none opacity-0', className)} 
            aria-hidden="true" 
        />
    )
}
