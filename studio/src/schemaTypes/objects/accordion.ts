import {VscQuestion} from 'react-icons/vsc'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  icon: VscQuestion,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          icon: VscQuestion,
          fields: [
            defineField({
              name: 'summary',
              type: 'string',
            }),
            defineField({
              name: 'content',
              type: 'array',
              of: [{type: 'block'}],
            }),
            defineField({
              name: 'open',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'summary',
            },
            prepare: ({title}) => ({
              title,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Accordion',
    }),
  },
})
