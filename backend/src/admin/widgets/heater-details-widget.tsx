import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Input, Label, Button, toast } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { HttpTypes } from "@medusajs/types"
import { ProductMultiSelect } from "../components/product-multi-select"
import { useUpdateProductMetadata } from "../hooks/use-update-product-metadata"
import { 
  DetailWidgetProps, 
  AdminProduct,
} from "@medusajs/framework/types"

// Widget props interface matching DetailWidgetProps pattern
interface HeaterWidgetProps {
  data: HttpTypes.AdminProduct
}

// Schema for heater metadata
const HeaterMetadataSchema = z.object({
  peb: z.array(z.string()).optional().default([]),
  size_from: z.coerce.number().optional(), // Allows floats like 4.5
  size_to: z.coerce.number().optional(), // Allows floats like 4.5
  rock_boxes: z.coerce.number().int().optional(), // Integer only
  controllers: z.array(z.string()).optional().default([]),
})

type HeaterMetadata = z.infer<typeof HeaterMetadataSchema>

const HeaterWidget = ({ data: product }: HeaterWidgetProps) => {
  // Check if product is in the Heaters category
  const isHeaterProduct = product.categories?.some(
    (cat) => cat.handle === "heaters" || cat.handle === "/heaters" || cat.handle?.endsWith("/heaters")
  )

  // Don't render widget if not a heater product
  if (!isHeaterProduct) {
    return null
  }

  // Initialize form with existing metadata
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HeaterMetadata>({
    resolver: zodResolver(HeaterMetadataSchema),
    defaultValues: {
      peb: (product.metadata?.peb as string[]) || [],
      size_from: (product.metadata?.size_from as number) || undefined,
      size_to: (product.metadata?.size_to as number) || undefined,
      rock_boxes: (product.metadata?.rock_boxes as number) || undefined,
      controllers: (product.metadata?.controllers as string[]) || [],
    },
  })

  const { mutateAsync, isPending } = useUpdateProductMetadata(product.id)

  // Watch multiselect values
  const pebValue = watch("peb") || []
  const controllersValue = watch("controllers") || []

  const onSubmit = async (values: HeaterMetadata) => {
    try {
      await mutateAsync({
        ...product.metadata,
        peb: values.peb,
        size_from: values.size_from,
        size_to: values.size_to,
        rock_boxes: values.rock_boxes,
        controllers: values.controllers,
      })
      toast.success("Success", {
        description: "Heater information updated successfully",
      })
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update heater information",
      })
      console.error("Failed to update product metadata:", error)
    }
  }

  return (
    <Container className="p-6">
      <Heading level="h2" className="mb-4">
        Heater Information
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* PEB Multi-select */}
        <ProductMultiSelect
          label="Power Extension Boxes (PEB)"
          categoryHandle="accessories/power-extension-boxes"
          value={pebValue}
          onChange={(value) => setValue("peb", value)}
          placeholder="Search for PEB products..."
        />

        {/* Size From */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="size_from">Size From</Label>
          <Input
            id="size_from"
            type="number"
            step="any"
            placeholder="Enter minimum size (e.g., 4.5)"
            {...register("size_from")}
          />
          {errors.size_from && (
            <span className="text-sm text-red-500">
              {errors.size_from.message}
            </span>
          )}
        </div>

        {/* Size To */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="size_to">Size To</Label>
          <Input
            id="size_to"
            type="number"
            step="any"
            placeholder="Enter maximum size (e.g., 4.5)"
            {...register("size_to")}
          />
          {errors.size_to && (
            <span className="text-sm text-red-500">
              {errors.size_to.message}
            </span>
          )}
        </div>

        {/* Rock Boxes */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="rock_boxes">Rock Boxes</Label>
          <Input
            id="rock_boxes"
            type="number"
            step="1"
            placeholder="Enter number of rock boxes"
            {...register("rock_boxes")}
          />
          {errors.rock_boxes && (
            <span className="text-sm text-red-500">
              {errors.rock_boxes.message}
            </span>
          )}
        </div>

        {/* Controllers Multi-select */}
        <ProductMultiSelect
          label="Controllers"
          categoryHandle="accessories/controllers"
          value={controllersValue}
          onChange={(value) => setValue("controllers", value)}
          placeholder="Search for controller products..."
        />

        {/* Submit Button */}
        <Button type="submit" isLoading={isPending} className="w-fit">
          Save Heater Information
        </Button>
      </form>
    </Container>
  )
}

// Widget configuration
export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default HeaterWidget
