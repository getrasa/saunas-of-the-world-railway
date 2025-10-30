'use client'

import { useEffect, useState, useCallback } from 'react'
import { useField, useFormFields, ReactSelect, type ReactSelectOption } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

interface HeaterOption {
  id: string
  title: string
  handle: string
  thumbnail: string
}

/**
 * Custom field component for selecting Medusa heater products
 * Provides a searchable dropdown with product thumbnails
 */
export const MedusaProductSelector: TextFieldClientComponent = (props) => {
  const { path } = props

  // Get the value and setValue for the medusaProductId field
  const { value, setValue } = useField<string>({ path })

  // Get access to other form fields to update productName
  const productNameField = useFormFields(([fields]) => {
    return fields?.productName
  })

  const [heaters, setHeaters] = useState<HeaterOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch heater products from API on mount
  useEffect(() => {
    async function fetchHeaters() {
      try {
        setLoading(true)
        const response = await fetch('/api/medusa/heaters')

        if (!response.ok) {
          throw new Error('Failed to fetch heaters')
        }

        const data = await response.json()
        setHeaters(data.heaters || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching heaters:', err)
        setError('Failed to load heater products. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchHeaters()
  }, [])

  // Convert heaters to select options with custom rendering
  const options: ReactSelectOption[] = heaters.map((heater) => ({
    label: heater.title,
    value: heater.id,
  }))

  // Find the currently selected heater
  const selectedHeater = heaters.find((h) => h.id === value)
  const selectedOption: ReactSelectOption | undefined = selectedHeater
    ? { label: selectedHeater.title, value: selectedHeater.id }
    : undefined

  // Handle selection change
  const handleChange = useCallback(
    (option: ReactSelectOption | ReactSelectOption[]) => {
      // Handle single option (not array)
      if (option && !Array.isArray(option) && typeof option === 'object' && 'value' in option) {
        // Set the product ID
        setValue(option.value as string)

        // Auto-populate the product name field
        const heater = heaters.find((h) => h.id === option.value)
        if (heater && productNameField) {
          productNameField.value = heater.title
        }
      } else {
        // Clear selection
        setValue('')
        if (productNameField) {
          productNameField.value = ''
        }
      }
    },
    [setValue, heaters, productNameField]
  )

  if (loading) {
    return (
      <div className="field-type text">
        <label className="field-label">
          Medusa Product ID
          <span className="required">*</span>
        </label>
        <div className="text-gray-500 text-sm">Loading heater products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="field-type text">
        <label className="field-label">
          Medusa Product ID
          <span className="required">*</span>
        </label>
        <div className="text-red-500 text-sm">{error}</div>
        <div className="text-gray-500 text-sm mt-2">
          You can still manually enter a product ID below:
        </div>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          className="input"
          placeholder="prod_01HXXX..."
        />
      </div>
    )
  }

  return (
    <div className="field-type text">
      <label className="field-label">
        Medusa Product
        <span className="required">*</span>
      </label>
      <div className="input-wrapper">
        <ReactSelect
          value={selectedOption}
          onChange={handleChange}
          options={options}
          isClearable
          isSearchable
          placeholder="Search for a heater product..."
          noOptionsMessage={() => 'No heater products found'}
          className="react-select-container"
        />
      </div>
      {selectedHeater && (
        <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
          {selectedHeater.thumbnail && (
            <img
              src={selectedHeater.thumbnail}
              alt={selectedHeater.title}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <div className="font-medium text-sm">{selectedHeater.title}</div>
            <div className="text-xs text-gray-500 font-mono mt-1">
              ID: {selectedHeater.id}
            </div>
          </div>
        </div>
      )}
      <div className="field-description mt-2">
        Select a heater product from Medusa. The product name will be auto-populated.
      </div>
    </div>
  )
}
