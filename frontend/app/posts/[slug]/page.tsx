import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'

import Avatar from '@/app/components/Avatar'
import CoverImage from '@/app/components/CoverImage'
import PortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {type PortableTextBlock} from 'next-sanity'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.image)

  return {
    authors: post?.author?.name ? [{name: `${post.author.name}`}] : [],
    title: post?.metadata?.title ?? post?.title,
    description: post?.metadata?.description,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [{data: post}] = await Promise.all([sanityFetch({query: postQuery, params})])

  if (!post?._id) {
    return notFound()
  }

  return (
    <>
      <section className="relative py-6 lg:p-20 bg-background text-foreground" data-theme="muted">
        <div className="container relative grid grid-cols-1 gap-8 lg:gap-x-20 lg:grid-cols-2 items-center">
          <div className="lg:order-1">
            {post.image && (
              <CoverImage
                image={post.image}
                loading={'lazy'}
                className=""
                width={1500}
                height={1500}
              />
            )}
          </div>

          <div className="relative mx-auto flex w-full flex-col">
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-0">
                  <p className="eyebrow">Design</p>

                  {post.title && <h1 className="h1">{post.title}</h1>}
                </div>

                {post.author && <Avatar person={post.author} date={post.date} key={post._id} />}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container my-12 lg:my-24">
        <article className="richtext max-w-5xl">
          {post.content?.length && <PortableText value={post.content as PortableTextBlock[]} />}
        </article>
      </div>
    </>
  )
}
