import React from 'react'
import { ScrollArea } from '@lib/components/ui/scroll-area'
import { cn } from '@lib/lib/utils'

interface ScrollableItemListProps {
  children: React.ReactNode
  variant?: 'shopping-bag' | 'order-summary'
  className?: string
}

export function ScrollableItemList({ 
  children, 
  variant = 'shopping-bag',
  className 
}: ScrollableItemListProps) {
  // Calculate height to show approximately 3 items
  // Shopping bag items are now more compact (~150px each) = ~450px for 3
  // Order summary items are (~170px each) = ~510px for 3
  const height = variant === 'shopping-bag' ? 'h-[450px]' : 'h-[510px]'

  return (
    <ScrollArea className={cn(height, className)}>
      <div className="divide-y divide-silver">
        {children}
      </div>
    </ScrollArea>
  )
}

