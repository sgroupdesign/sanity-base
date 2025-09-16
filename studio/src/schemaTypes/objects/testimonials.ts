import {GrBlockQuote} from 'react-icons/gr'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  icon: GrBlockQuote,
  type: 'object',
  groups: [{name: 'content', default: true}, {name: 'options'}],
  fields: [
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}],
      group: 'content',
    }),
    defineField({
      name: 'theme',
      type: 'string',
      options: {
        list: ['light', 'dark', 'muted'],
        layout: 'radio',
      },
      initialValue: 'light',
      group: 'options',
    }),
    defineField({
      name: 'enabled',
      type: 'boolean',
      initialValue: true,
      group: 'options',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Testimonial list',
    }),
  },
})
