import {MenuIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  icon: MenuIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'link'}, {type: 'link.list'}],
      validation: (Rule) => Rule.max(6).warning('You can only have a maximum of 6 menu items.'), // Sets a maximum of 6 items
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare: ({title, items}) => ({
      title,
    }),
  },
})
