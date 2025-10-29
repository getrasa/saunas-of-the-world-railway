import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: "Home Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Hero Slides',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Hero Image',
        },
        {
          name: 'imageAlt',
          type: 'text',
          required: true,
          label: 'Image Alt Text',
        },
        {
          name: 'priority',
          type: 'checkbox',
          label: 'Priority Loading',
          defaultValue: false,
          admin: {
            description: 'Enable priority loading for this image (recommended for first slide only)',
          },
        },
        {
          name: 'brightness',
          type: 'number',
          label: 'Image Brightness',
          defaultValue: 75,
          min: 0,
          max: 100,
          admin: {
            description: 'Image brightness filter (0-100, where 100 is original brightness)',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          required: true,
          label: 'Tagline',
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          label: 'Headline',
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
          defaultValue: 'EXPLORE NOW',
          admin: {
            condition: (data, siblingData) => siblingData.showButton === true,
          },
        },
        {
          name: 'buttonPath',
          type: 'text',
          label: 'Button Path',
          required: true,
          admin: {
            description: 'Example: /products/saunas',
            condition: (data, siblingData) => siblingData.showButton === true,
          },
        },
      ],
    },
    {
      name: 'whyUsSection',
      type: 'group',
      label: 'Why Us Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
          defaultValue: 'WHY CHOOSE US',
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Content',
          required: true,
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          label: 'Video',
          required: true,
          admin: {
            description: 'Upload a .mp4 or .webm video file',
          },
        },
        {
          name: 'videoPoster',
          type: 'upload',
          relationTo: 'media',
          label: 'Video Poster Image',
          admin: {
            description: 'Optional: Thumbnail image shown before video plays',
          },
        },
      ],
    },
    {
      name: 'ourOfferingSection',
      type: 'group',
      label: 'Our Offering Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
          defaultValue: 'OUR OFFERING',
        },
        {
          name: 'tiles',
          type: 'array',
          label: 'Offering Tiles',
          minRows: 1,
          maxRows: 10,
          labels: {
            singular: 'Tile',
            plural: 'Tiles',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Tile Label',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Tile Image',
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
                description: 'Image brightness filter (0-100)',
              },
            },
            {
              name: 'href',
              type: 'text',
              label: 'Link Path',
              required: true,
              admin: {
                description: 'Example: /products/saunas',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'indulgeSection',
      type: 'group',
      label: 'Indulge Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
          admin: {
            description: 'Use **text** to make text bold. Example: "Indulge in **Serenity** and **Luxury**"',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Content',
          required: true,
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
  ],
}

