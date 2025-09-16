import {defineQuery} from 'next-sanity'

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  image,
  "date": coalesce(date, _updatedAt),
  "author": author->{name, image},
  metadata,
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const testimonialReference = /* groq */ `
  _type == "testimonial" => {
    testimonial->{
      name,
      jobTitle,
      content,
      picture,
    }
  }
`

export const linkQuery = /* groq */ `
	...,
	internal->{ _type, title, slug }
`

const linkFields = /* groq */ `
  link {
    ...,
    ${linkReference}
    }
`

const navigationQuery = /* groq */ `
	title,
	items[]{
    ...,
		${linkReference},
		links[]{ 
      ...,
      ${linkReference} }
	}
`

export const settingsQuery = defineQuery(`
*[_type == "settings"][0]{
  companyName,
  description,
  ogImage,
  address,
  email,
  phone,
  callToAction{ ${linkFields} },
  headerMenu->{ ${navigationQuery} },
  footerMenu->{ ${navigationQuery} },
  social->{ ${navigationQuery} },
}`)

export const pageBuilerQuery = /* groq */ `
  "pageBuilder": pageBuilder[]{
    ...,
    _type == "callToAction" => {
      ${linkReference},
    },
    _type == "hero" => {
      ...,
      ctas[]{
        ${linkFields} 
      },
    },
    _type == "heroSplit" => {
      ...,
      ctas[]{
        ${linkFields} 
      },
    },
    _type == "infoSection" => {
      ...,
      ctas[]{
        ${linkFields} 
      },
    },
    _type == 'testimonials' => { testimonials[]->{
      name,
      jobTitle,
      content,
      picture,
    }},
    _type == 'cards' => { 
      cards[]{
        title,
        name,
        description,
        image,
        pageHeaderImage,
        _type,
        ${linkFields},
      },
      dynamicCards[]->{
        title,
        name,
        description,
        image,
        _type,
        metadata,
        'link': {
          'linkType': _type,
          "page": slug.current,
          "post": slug.current
        },
      },
    },
    _type == "infoSection" => {
      content[]{
        ...,
        markDefs[]{
          ...,
          ${linkReference}
        }
      },
    },
  },
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' &&
			slug.current == $slug &&
			!(slug.current in ['index', 'posts/*', 'people/*', '404'])
		][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subHeading,
    pageHeaderImage,
    eyebrow,
    content,
    theme,
    ctas[]{
      ${linkFields} 
    },
    metadata,
    ${pageBuilerQuery}
  }
`)

export const getHomePageQuery = defineQuery(`
  *[_type == 'page' && slug.current == 'index'][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subHeading,
    pageHeaderImage,
    eyebrow,
    content,
    theme,
    ctas[]{
      ${linkFields} 
    },
    metadata,
    ${pageBuilerQuery}
  }
`)

export const get404PageQuery = defineQuery(`
  *[_type == 'page' && slug.current == '404'][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subHeading,
    pageHeaderImage,
    eyebrow,
    content,
    theme,
    ctas[]{
      ${linkFields} 
    },
    metadata,
    ${pageBuilerQuery}
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)
