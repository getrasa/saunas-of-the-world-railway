import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mission',
      type: 'group',
      label: 'Mission Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: 'Our mission is your well-being.',
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Content',
          required: true,
        },
      ],
    },
    {
      name: 'teamPhoto',
      type: 'group',
      label: 'Team Photo Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: 'This is us: Mario & Magda',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Team Photo',
          required: true,
        },
      ],
    },
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Team Member',
        plural: 'Team Members',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
          admin: {
            description: 'Full name (e.g., "Mario (Mariusz)")',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Biography',
          required: true,
        },
      ],
    },
    {
      name: 'footerText',
      type: 'text',
      label: 'Footer Text',
      required: true,
      defaultValue: "We're proud to have a small yet highly skilled team of installers working alongside us, dedicated to ensuring our clients' satisfaction.",
    },
  ],
}

