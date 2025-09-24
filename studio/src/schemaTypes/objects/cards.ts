import {TfiLayoutMediaLeftAlt} from 'react-icons/tfi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'cards',
  title: 'Cards',
  icon: TfiLayoutMediaLeftAlt,
  type: 'object',
  groups: [{name: 'content', default: true}, {name: 'options'}],
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'source',
      type: 'string',
      options: {
        list: ['static', 'dynamic'],
        layout: 'radio',
      },
      description: 'Statically create your cards, or dynamically add these based on page content',
      initialValue: 'static',
      group: 'content',
    }),
    defineField({
      name: 'dynamicCards',
      title: 'Dynamic cards',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'page'}, {type: 'person'}, {type: 'project'}, {type: 'post'}],
        },
      ],
      group: 'content',
      hidden: ({parent}) => parent?.source !== 'dynamic',
    }),
    defineField({
      name: 'cards',
      title: 'Static cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'card',
          name: 'card',
          title: 'Card',
        }),
      ],
      group: 'content',
      hidden: ({parent}) => parent?.source !== 'static',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-actions',
      type: 'array',
      of: [{type: 'callToAction'}],
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
      name: 'centerAligned',
      type: 'boolean',
      description:
        'By default the content field is left aligned, enable this for center alignment if required.',
      initialValue: false,
      group: 'options',
    }),
    defineField({
      name: 'layout',
      type: 'string',
      options: {
        list: ['grid', 'carousel'],
        layout: 'radio',
      },
      initialValue: 'grid',
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
    select: {
      heading: 'heading',
      cards: 'cards',
    },
    prepare: ({heading, cards}) => ({
      title: heading,
      subtitle: 'Cards list',
    }),
  },
})
