import {BulbOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'link',
      title: 'Button link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'buttonText',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: 'Call to Action',
      }
    },
  },
})
