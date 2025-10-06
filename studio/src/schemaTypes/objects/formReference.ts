import {PiTextAlignCenterFill} from 'react-icons/pi'
import {defineField, defineType} from 'sanity'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const formReference = defineType({
  name: 'formReference',
  type: 'object',
  icon: PiTextAlignCenterFill,
  fields: [
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: {type: 'form'},
    }),
  ],
})
