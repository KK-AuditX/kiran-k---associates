// Sanity schema: Service
export const serviceSchema = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Key',
      type: 'string',
      description: 'Icon identifier: shield, search, brain, trending, building, calculator, clipboard, coins, lightbulb',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
