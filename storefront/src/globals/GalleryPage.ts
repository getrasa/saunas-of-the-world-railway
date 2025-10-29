import type { GlobalConfig } from 'payload'

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  label: 'Gallery Page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Main',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Gallery Sections',
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID',
          required: true,
          admin: {
            description: 'URL-safe ID for navigation (e.g., "custom-built-saunas", "ice-baths"). Used in ?category=ID',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Section Description',
          required: true,
        },
        {
          name: 'imageGroups',
          type: 'array',
          label: 'Image Groups',
          minRows: 1,
          maxRows: 20,
          labels: {
            singular: 'Image Group',
            plural: 'Image Groups',
          },
          admin: {
            description: 'Each image group creates a tab in the gallery',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Group Name',
              required: true,
              admin: {
                description: 'Tab label (e.g., "Majestic Sauna Mansion", "Ice Baths")',
              },
            },
            {
              name: 'photos',
              type: 'array',
              label: 'Photos',
              minRows: 1,
              maxRows: 50,
              labels: {
                singular: 'Photo',
                plural: 'Photos',
              },
              admin: {
                description: 'Upload and drag to reorder photos for this gallery group',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Image',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

