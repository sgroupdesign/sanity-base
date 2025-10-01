import {ListIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'link.list',
  title: 'Link list',
  icon: ListIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
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
      label: 'label',
    },
    prepare: ({link, label}) => ({
      title: label || link.internal?.name,
    }),
  },
})
