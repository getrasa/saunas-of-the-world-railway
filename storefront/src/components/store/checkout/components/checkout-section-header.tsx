import React from 'react'
import { CardHeader, CardTitle } from '@lib/components/ui/card'
import { Separator } from '@lib/components/ui/separator'

interface CheckoutSectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function CheckoutSectionHeader({ 
  title, 
  subtitle, 
  className 
}: CheckoutSectionHeaderProps) {
  return (
    <>
      <CardHeader className={className}>
        <CardTitle className="text-2xl font-semibold">
          {title}
          {subtitle && (
            <span className="font-normal ml-2">{subtitle}</span>
          )}
        </CardTitle>
      </CardHeader>
      <Separator />
    </>
  )
}

