"use client"

interface OptionSelectorProps {
  title: string
  options: { id: string; label: string; available?: boolean }[]
  value?: string
  onChange: (value: string) => void
  className?: string
}

export function OptionSelector({ title, options, value, onChange, className = "" }: OptionSelectorProps) {
  return (
    <div className={className}>
      <h3 className="mb-2 text-base font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            disabled={option.available === false}
            className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
              value === option.id
                ? "border-[#C5AF71] bg-[#C5AF71]/10 text-[#C5AF71]"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

