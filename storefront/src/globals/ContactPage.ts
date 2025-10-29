import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: () => true,
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
          defaultValue: 'Contact Us',
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
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information Bar',
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          required: true,
          defaultValue: 'PO Box 249 Nerang QLD 4211',
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
  ],
}

