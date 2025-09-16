import {
  PiBoxArrowDownDuotone,
  PiCheckSquareLight,
  PiEnvelopeSimpleLight,
  PiNumberCircleSeven,
  PiPhoneFill,
  PiRadioButtonFill,
  PiTextAaDuotone,
  PiTextAlignCenterFill,
  PiTextAlignLeftLight,
} from 'react-icons/pi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const form = defineType({
  name: 'form',
  title: 'Forms',
  icon: PiTextAlignCenterFill,
  type: 'document',
  groups: [{name: 'content', default: true}, {name: 'options'}],
  fields: [
    defineField({
      name: 'formName',
      title: 'Form Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'fields',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'textField',
          title: 'Text Field',
          type: 'object',
          icon: PiTextAaDuotone,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
        defineArrayMember({
          name: 'numberField',
          title: 'Number Field',
          type: 'object',
          icon: PiNumberCircleSeven,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
        defineArrayMember({
          name: 'selectField',
          title: 'Select Field',
          type: 'object',
          icon: PiBoxArrowDownDuotone,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                defineArrayMember({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
        defineArrayMember({
          name: 'emailField',
          title: 'Email Field',
          type: 'object',
          icon: PiEnvelopeSimpleLight,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
        defineArrayMember({
          name: 'telField',
          title: 'Telephone Field',
          type: 'object',
          icon: PiPhoneFill,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
        defineArrayMember({
          name: 'textareaField',
          title: 'Textarea Field',
          type: 'object',
          icon: PiTextAlignLeftLight,
          fields: [
            defineField({
              name: 'label',
              title: 'label',
              type: 'string',
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
        defineArrayMember({
          name: 'checkboxField',
          title: 'Checkbox Field',
          type: 'object',
          icon: PiCheckSquareLight,
          fields: [
            defineField({
              name: 'label',
              title: 'label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                defineArrayMember({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
        defineArrayMember({
          name: 'radioField',
          title: 'Radio Field',
          type: 'object',
          icon: PiRadioButtonFill,
          fields: [
            defineField({
              name: 'label',
              title: 'label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                defineArrayMember({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'recipient',
      title: 'Recipient',
      type: 'email',
      description: 'Who should receive this email notification.',
      group: 'options',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cc',
      title: 'CC',
      type: 'email',
      description: 'Add a CC email notification.',
      group: 'options',
    }),
    defineField({
      name: 'confirmationPage',
      title: 'Confirmation Page',
      type: 'reference',
      description: 'Set the URL for the thank you page if required',
      group: 'options',
      to: {type: 'page'},
    }),
  ],
  preview: {
    select: {
      title: 'formName',
    },
    prepare: ({title}) => ({
      title,
    }),
  },
})
