import {ListIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'link.list',
  title: 'Link list',
  icon: ListIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      type: 'link',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{type: 'link'}],
    }),
  ],
  preview: {
    select: {
      link: 'link',
      links: 'links',
    },
    prepare: ({link, links}) => ({
      title: link.label || link.internal?.title,
    }),
  },
})
