import {TfiLayoutMediaLeft} from 'react-icons/tfi'
import {defineField, defineType} from 'sanity'
import {alignItems, alignmentFieldset, textAlign} from '../fragments/fields/alignment'

export default defineType({
  name: 'heroSplit',
  title: 'Hero(split)',
  icon: TfiLayoutMediaLeft,
  type: 'object',
  groups: [{name: 'content', default: true}, {name: 'media'}, {name: 'options'}],
  fieldsets: [alignmentFieldset],
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
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
        defineField({
          name: 'onRight',
          type: 'boolean',
          description: 'Display to the right of the content on desktop',
          initialValue: false,
        }),
        defineField({
          name: 'loading',
          type: 'string',
          options: {
            list: ['lazy', 'eager'],
            layout: 'radio',
          },
          initialValue: 'lazy',
        }),
      ],
      group: 'media',
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
      ...textAlign,
      fieldset: 'alignment',
    }),
    defineField({
      ...alignItems,
      fieldset: 'alignment',
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
      title: 'heading',
      media: 'image.asset',
    },
    prepare: ({title, media}) => ({
      title: title,
      subtitle: 'Hero (split)',
      media,
    }),
  },
})
