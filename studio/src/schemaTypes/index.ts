import {form} from './documents/form'
import {navigation} from './documents/navigation'
import {page} from './documents/page'
import {person} from './documents/person'
import {post} from './documents/post'
import {project} from './documents/project'
import {redirect} from './documents/redirect'
import {testimonial} from './documents/testimonial'
import accordion from './objects/accordion'
import {blockContent} from './objects/blockContent'
import {callToAction} from './objects/callToAction'
import {card} from './objects/card'
import cards from './objects/cards'
import {formReference} from './objects/formReference'
import gallery from './objects/gallery'
import hero from './objects/hero'
import heroSplit from './objects/heroSplit'
import {infoSection} from './objects/infoSection'
import {link} from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import {portableTextSimpleType as portableTextSimple} from './objects/portableTextSimpleType'
import testimonials from './objects/testimonials'
import {settings} from './singletons/settings'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Document
  page,
  project,
  post,
  person,
  form,
  navigation,
  redirect,
  testimonial,
  // Objects
  accordion,
  blockContent,
  infoSection,
  callToAction,
  formReference,
  portableTextSimple,
  gallery,
  link,
  linkList,
  heroSplit,
  metadata,
  testimonials,
  hero,
  card,
  cards,
]
