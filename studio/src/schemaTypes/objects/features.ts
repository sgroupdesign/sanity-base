import {VscQuestion} from 'react-icons/vsc'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'features',
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
              name: 'heading',
              type: 'string',
            }),
            defineField({
              name: 'content',
              type: 'array',
              of: [{type: 'block'}],
            }),
          ],
          preview: {
            select: {
              title: 'heading',
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
      title: 'Features',
    }),
  },
})
