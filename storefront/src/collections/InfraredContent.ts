import type { CollectionConfig } from 'payload'

export const InfraredContent: CollectionConfig = {
  slug: 'infrared-content',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'productName',
    defaultColumns: ['productName', 'medusaProductId', 'updatedAt'],
    description: 'Content for individual infrared sauna products (advantages, specifications, downloads)',
  },
  fields: [
    {
      name: 'medusaProductId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Medusa Product',
      admin: {
        description: 'Select an infrared sauna product from Medusa. The product name will be auto-populated.',
        components: {
          Field: '/components/payload/MedusaProductSelector#MedusaProductSelector',
        },
      },
    },
    {
      name: 'productName',
      type: 'text',
      required: true,
      label: 'Product Name',
      admin: {
        readOnly: true,
        description: 'Auto-populated from the selected Medusa product',
      },
    },
    {
      name: 'advantages',
      type: 'array',
      label: 'Your Advantages',
      admin: {
        description: 'List of product advantages/benefits displayed as bullet points',
      },
      fields: [
        {
          name: 'advantage',
          type: 'text',
          required: true,
          label: 'Advantage',
        },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      label: 'Technical Specifications',
      admin: {
        description: 'Technical specifications displayed as a table (label and value pairs)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Specification Label',
          admin: {
            description: 'e.g., "Capacity", "Dimensions (L x W x H)"',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Specification Value',
          admin: {
            description: 'e.g., "1-2 persons", "180 x 80 x 70 cm"',
          },
        },
      ],
    },
    {
      name: 'downloads',
      type: 'array',
      label: 'PDF Downloads',
      admin: {
        description: 'Downloadable PDF files (installation manuals, datasheets, etc.)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Download Label',
          admin: {
            description: 'e.g., "Technical data sheet", "Installation and operating instruction"',
          },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'PDF File',
          filterOptions: {
            mimeType: { contains: 'pdf' },
          },
        },
      ],
    },
  ],
}
