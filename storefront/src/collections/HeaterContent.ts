import type { CollectionConfig } from 'payload'

export const HeaterContent: CollectionConfig = {
  slug: 'heater-content',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'productName',
    defaultColumns: ['productName', 'medusaProductId', 'updatedAt'],
    description: 'Content for individual heater products (advantages, specifications, downloads)',
  },
  fields: [
    {
      name: 'medusaProductId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Medusa Product ID',
      admin: {
        description: 'The product ID from Medusa (e.g., prod_01HXXX...). Find this in the Medusa admin panel.',
      },
    },
    {
      name: 'productName',
      type: 'text',
      required: true,
      label: 'Product Name',
      admin: {
        description: 'The name of the heater product (for reference only, e.g., "BiO-MAX 9kW")',
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
            description: 'e.g., "Electrical connection", "Dimensions H/W/D, in cm"',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Specification Value',
          admin: {
            description: 'e.g., "230V N ~ 50/60 Hz", "50 / 30 / 21,5"',
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
