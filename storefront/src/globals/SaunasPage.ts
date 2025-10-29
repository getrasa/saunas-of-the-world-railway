import type { GlobalConfig } from 'payload'

export const SaunasPage: GlobalConfig = {
  slug: 'saunas-page',
  label: 'Saunas Page',
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
          defaultValue: 'Saunas',
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
      name: 'showcases',
      type: 'array',
      label: 'Product Showcases',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Showcase',
        plural: 'Showcases',
      },
      fields: [
        {
          name: 'variant',
          type: 'select',
          label: 'Image Position',
          required: true,
          defaultValue: 'left',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
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
            description: 'Example: /products/saunas/custom-built-saunas',
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
    {
      name: 'healthWellbeing',
      type: 'group',
      label: 'Health & Wellbeing Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
          defaultValue: 'Saunas offer a range of health and wellness benefits.',
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Health Benefits',
          minRows: 1,
          maxRows: 10,
          labels: {
            singular: 'Benefit',
            plural: 'Benefits',
          },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Benefit Text',
              required: true,
              admin: {
                description: 'Use **text** to make text bold. Example: "They promote **relaxation** by increasing circulation"',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'keyConsiderations',
      type: 'group',
      label: 'Key Considerations Section',
      fields: [
        {
          name: 'introText',
          type: 'text',
          label: 'Introduction Text',
          required: true,
          defaultValue: 'Here are some key considerations for you to take into account when using sauna.',
        },
        {
          name: 'hydration',
          type: 'group',
          label: 'Hydration',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              defaultValue: 'Hydration',
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Content',
              required: true,
              defaultValue: 'Stay well-hydrated before, during, and after your sauna session. Drink water or electrolyte-rich beverages to replenish fluids lost through sweating.',
            },
          ],
        },
        {
          name: 'listenToBody',
          type: 'group',
          label: 'Listen to Your Body',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              defaultValue: 'Listen to Your Body',
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Content',
              required: true,
              defaultValue: 'Pay attention to how your body responds to the heat. If you start to feel dizzy, lightheaded, or uncomfortable, exit the sauna immediately. Always prioritize your comfort and well-being.',
            },
          ],
        },
        {
          name: 'healthConditions',
          type: 'group',
          label: 'Health Conditions',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              defaultValue: 'Health Conditions',
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Content',
              required: true,
              defaultValue: 'If you have underlying health conditions or concerns, consult with a healthcare professional before using a sauna regularly. Sauna use may not be suitable for everyone, especially those with cardiovascular issues, high blood pressure, or certain skin conditions.',
            },
          ],
        },
      ],
    },
  ],
}

