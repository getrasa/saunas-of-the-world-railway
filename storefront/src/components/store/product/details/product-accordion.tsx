"use client"

import { createContext, useContext, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AccordionContextValue {
  expandedItems: Set<string>
  toggleItem: (id: string) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion sub-components must be used within ProductAccordion")
  }
  return context
}

interface ProductAccordionProps {
  children: React.ReactNode
  className?: string
  defaultExpanded?: string[]
}

export function ProductAccordion({ 
  children, 
  className = "",
  defaultExpanded = []
}: ProductAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(defaultExpanded)
  )

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem }}>
      <div className={`flex flex-col ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  id?: string
  title: string
  children: React.ReactNode
  className?: string
}

function AccordionItem({ id, title, children, className = "" }: AccordionItemProps) {
  const itemId = id || title
  const { expandedItems, toggleItem } = useAccordion()
  const isExpanded = expandedItems.has(itemId)

  return (
    <div className={`border-t border-black ${className}`}>
      <button
        onClick={() => toggleItem(itemId)}
        className="flex w-full items-center justify-between px-3 py-6 text-left transition-colors hover:bg-gray-50"
      >
        <span className="text-base font-semibold">{title}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isExpanded && (
        <div className="px-3 pb-6">{children}</div>
      )}
    </div>
  )
}

ProductAccordion.Item = AccordionItem

