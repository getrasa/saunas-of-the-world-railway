import type { GlobalConfig } from 'payload'

export const EquipmentPage: GlobalConfig = {
  slug: 'equipment-page',
  label: 'Equipment Page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Main',
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
          label: 'Hero Title',
          required: true,
          defaultValue: 'Sauna & Steam Room Equipment',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
          required: true,
        },
        {
          name: 'brightness',
          type: 'number',
          label: 'Image Brightness',
          defaultValue: 70,
          min: 0,
          max: 100,
          admin: {
            description: 'Image brightness filter (0-100, where 100 is original brightness)',
          },
        },
      ],
    },
    {
      name: 'products',
      type: 'array',
      label: 'Products',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Product',
        plural: 'Products',
      },
      fields: [
        {
          name: 'variant',
          type: 'select',
          label: 'Image Position',
          required: true,
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
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
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'showButton',
          type: 'checkbox',
          label: 'Show Button',
          defaultValue: true,
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Explore',
          admin: {
            condition: (data, siblingData) => siblingData.showButton === true,
          },
        },
        {
          name: 'buttonHref',
          type: 'text',
          label: 'Button Link',
          admin: {
            condition: (data, siblingData) => siblingData.showButton === true,
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open Link in New Tab',
          defaultValue: false,
          admin: {
            condition: (data, siblingData) => siblingData.showButton === true,
          },
        },
      ],
    },
  ],
}

