import type { GlobalConfig } from 'payload'

export const StoreRangePage: GlobalConfig = {
  slug: 'store-range-page',
  label: 'Store Range Page',
  access: {
    read: () => true,
  },
  admin: {
    group: "Store",
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: 'Premium Sauna & Wellness Products',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          required: true,
          defaultValue: 'Official EOS Partner & Distributor',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          required: true,
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'CTA Button Text',
          defaultValue: 'EXPLORE PRODUCTS',
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'CTA Button Link',
          defaultValue: '#categories',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features Banner',
          minRows: 1,
          maxRows: 10,
          labels: {
            singular: 'Feature',
            plural: 'Features',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Feature Text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Product Categories',
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'Category ID',
          required: true,
          admin: {
            description: 'Internal ID (e.g., "finnish-sauna-heaters")',
          },
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Category',
          defaultValue: false,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Text',
          admin: {
            description: 'Optional badge (e.g., "Bestseller", "New")',
          },
        },
      ],
    },
    {
      name: 'eosPartnership',
      type: 'group',
      label: 'EOS Partnership Section',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Text',
          defaultValue: 'Official EOS Partner',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: 'German Engineering Excellence',
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Content',
          required: true,
          admin: {
            description: 'Main content paragraphs',
          },
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          minRows: 1,
          maxRows: 10,
          labels: {
            singular: 'Stat',
            plural: 'Stats',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              required: true,
              admin: {
                description: 'e.g., "80+", "5", "100%"',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              admin: {
                description: 'e.g., "Years of Excellence", "Year Warranty"',
              },
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Section Image',
          required: true,
        },
      ],
    },
    {
      name: 'whyChooseUs',
      type: 'group',
      label: 'Why Choose Us Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
          defaultValue: 'Why Choose Saunas of the World?',
        },
        {
          name: 'cards',
          type: 'array',
          label: 'Cards',
          minRows: 1,
          maxRows: 10,
          labels: {
            singular: 'Card',
            plural: 'Cards',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

