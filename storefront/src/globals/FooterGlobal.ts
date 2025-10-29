import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'getInTouch',
      type: 'group',
      label: 'Get in Touch Section',
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          required: true,
          defaultValue: 'PO Box 249 Nerang QLD 4211',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
          required: true,
          defaultValue: 'saunasworld.au@gmail.com',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          required: true,
          defaultValue: '+61 422-062-294',
        },
        {
          name: 'businessHours',
          type: 'text',
          label: 'Business Hours',
          required: true,
          defaultValue: 'Mon-Sat by appointment only',
        },
      ],
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Categories Links',
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Category Link',
        plural: 'Category Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'aboutLinks',
      type: 'array',
      label: 'About Links',
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'About Link',
        plural: 'About Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
        },
      ],
    },
  ],
}

