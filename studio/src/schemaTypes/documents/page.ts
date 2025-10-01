import {GrDocument} from 'react-icons/gr'
import {defineField, defineType} from 'sanity'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: GrDocument,
  groups: [
    {name: 'content', default: true},
    {name: 'pageHeader', title: 'Page Header'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
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
      description: 'URL path. Use "index" for the homepage.',
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
      name: 'eyebrow',
      type: 'string',
      group: 'pageHeader',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      group: 'pageHeader',
    }),
    defineField({
      name: 'subHeading',
      type: 'string',
      group: 'pageHeader',
    }),
    defineField({
      name: 'content',
      type: 'text',
      rows: 3,
      group: 'pageHeader',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-actions',
      type: 'array',
      of: [{type: 'callToAction'}],
      group: 'pageHeader',
    }),
    defineField({
      name: 'theme',
      type: 'string',
      options: {
        list: ['light', 'dark'],
        layout: 'radio',
      },
      initialValue: 'light',
      group: 'pageHeader',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [
        {type: 'cards'},
        {type: 'heroSplit'},
        {type: 'hero'},
        {type: 'infoSection'},
        {type: 'testimonials'},
      ],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.png`,
            },
          ],
        },
      },
      group: 'content',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      group: 'seo',
    }),
  ],
})
