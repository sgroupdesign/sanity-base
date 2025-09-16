import type {Metadata} from 'next'
import Head from 'next/head'

import PageBuilderPage from '@/app/components/PageBuilder'
import {Get404PageQueryResult} from '@/sanity.types'
import {sanityFetch} from '@/sanity/lib/live'
import {get404PageQuery, pagesSlugs} from '@/sanity/lib/queries'
import PageHeader from './components/PageHeader'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: get404PageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })

  return {
    title: page?.metadata?.title ?? page?.name,
    description: page?.metadata?.description ?? page?.heading,
    robots: {
      index: false,
    },
  } satisfies Metadata
}

export default async function NotFound(props: Props) {
  const params = await props.params
  const [{data: page}] = await Promise.all([sanityFetch({query: get404PageQuery, params})])

  return (
    <div className="">
      <Head>
        <title>{page?.heading}</title>
      </Head>
      <PageHeader
        content={page?.content ?? ''}
        ctas={page?.ctas ?? ''}
        eyebrow={page?.eyebrow ?? ''}
        heading={page?.heading ?? page?.name ?? ''}
        subHeading={page?.subHeading ?? ''}
        theme={page?.theme ?? 'light'}
        image={page?.pageHeaderImage ?? ''}
      />
      <PageBuilderPage page={page as Get404PageQueryResult} />
    </div>
  )
}
