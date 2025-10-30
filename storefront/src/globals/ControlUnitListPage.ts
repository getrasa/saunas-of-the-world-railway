import type { GlobalConfig } from 'payload'

export const ControlUnitListPage: GlobalConfig = {
  slug: 'control-unit-list-page',
  label: 'Control Unit List Page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Store',
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
          defaultValue: 'Control Units',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          required: true,
          defaultValue: 'Precision Temperature Control',
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
          defaultValue: 'EXPLORE NOW',
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'CTA Button Link',
          defaultValue: '#products',
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
  ],
}
