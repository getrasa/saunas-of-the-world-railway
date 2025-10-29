import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
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
          defaultValue: 'Services',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
          required: true,
        },
      ],
    },
    {
      name: 'products',
      type: 'array',
      label: 'Services',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Service',
        plural: 'Services',
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
          name: 'stretchHorizontally',
          type: 'checkbox',
          label: 'Stretch Image Horizontally',
          defaultValue: false,
          admin: {
            description: 'Enable for wider landscape images',
          },
        },
        {
          name: 'showButton',
          type: 'checkbox',
          label: 'Show Button',
          defaultValue: false,
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

