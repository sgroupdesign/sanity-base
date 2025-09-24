import {PiBuildingOfficeDuotone} from 'react-icons/pi'

import {defineArrayMember, defineField, defineType} from 'sanity'
import imageBlock from '../fragments/image-block'

export const project = defineType({
  name: 'project',
  title: 'Project',
  icon: PiBuildingOfficeDuotone,
  type: 'document',
  groups: [{name: 'content', default: true}, {name: 'pageHeader'}, {name: 'seo', title: 'SEO'}],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'pageHeaderImage',
      title: 'Page Header image',
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
      group: 'pageHeader',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      group: 'pageHeader',
    }),
    defineField({
      name: 'theme',
      type: 'string',
      options: {
        list: ['light', 'dark', 'muted'],
        layout: 'radio',
      },
      initialValue: 'light',
      group: 'pageHeader',
    }),
    defineField({
      name: 'overlay',
      type: 'string',
      options: {
        list: ['0', '20', '40', '60'],
        layout: 'radio',
      },
      initialValue: '0',
      description: 'Darkern your image, the higher the number the darker the overlay',
      group: 'pageHeader',
    }),
    defineField({
      name: 'projectInfo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
            }),
            defineField({
              name: 'text',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, imageBlock],
      group: 'content',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'caption',
            },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'image',
    },
    prepare: ({title, slug, media}) => ({
      title: [title].filter(Boolean).join(' '),
      media,
    }),
  },
})
