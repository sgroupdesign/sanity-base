import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'navigation', title: 'Navigation'},
  ],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'general',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      group: 'general',
      rows: 2,
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'callToAction',
      title: 'Call-to-action (Site-wide)',
      description: 'Add a site-wide CTA to the header.',
      type: 'callToAction',
      group: 'general',
    }),
    defineField({
      name: 'headerMenu',
      type: 'reference',
      to: [{type: 'navigation'}],
      group: 'navigation',
    }),
    defineField({
      name: 'footerMenu',
      type: 'reference',
      to: [{type: 'navigation'}],
      group: 'navigation',
    }),
    defineField({
      name: 'social',
      type: 'reference',
      to: [{type: 'navigation'}],
      group: 'navigation',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
