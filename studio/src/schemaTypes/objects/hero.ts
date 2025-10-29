import {TfiLayoutCtaCenter} from 'react-icons/tfi'
import {defineField, defineType} from 'sanity'
import {alignItems, alignmentFieldset, textAlign} from '../fragments/fields/alignment'

export default defineType({
  name: 'hero',
  title: 'Hero',
  icon: TfiLayoutCtaCenter,
  type: 'object',
  groups: [{name: 'content', default: true}, {name: 'image'}, {name: 'options'}],
  fieldsets: [alignmentFieldset, {name: 'image', options: {columns: 1}}],
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
      name: 'subHeading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-actions',
      type: 'array',
      of: [{type: 'callToAction'}],
      group: 'content',
    }),
    defineField({
      name: 'bgImage',
      title: 'Background image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
      ],
      group: 'image',
      fieldset: 'image',
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
      name: 'layout',
      type: 'string',
      options: {
        list: ['stacked', 'floated'],
        layout: 'radio',
      },
      initialValue: 'floated',
      group: 'options',
    }),
    defineField({
      name: 'overlayOpacity',
      type: 'string',
      options: {
        list: [
          {title: '0%', value: '0'},
          {title: '20%', value: '20'},
          {title: '40%', value: '40'},
          {title: '60%', value: '60'},
          {title: '80%', value: '80'},
          {title: '100%', value: '100'},
        ],
      },
      group: 'options',
    }),
    defineField({
      ...textAlign,
      fieldset: 'alignment',
    }),
    defineField({
      ...alignItems,
      fieldset: 'alignment',
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
      title: 'heading',
      media: 'bgImage',
    },
    prepare: ({title, media}) => ({
      title: title,
      subtitle: 'Hero',
      media,
    }),
  },
})
