import type { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

import CoverImage from "@/app/components/CoverImage";
import PageHeader from "@/app/components/PageHeader";
import PortableText from "@/app/components/PortableText";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { getProjectQuery, projectPagesSlugs } from "@/sanity/lib/queries";
import { type PortableTextBlock } from "next-sanity";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectPagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: project } = await sanityFetch({
    query: getProjectQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: project?.metadata?.title ?? project?.title,
    description: project?.metadata?.description ?? project?.heading,
    robots: {
      index: !project?.metadata?.noIndex,
    },
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: project }] = await Promise.all([
    sanityFetch({ query: getProjectQuery, params }),
  ]);

  const rows = [2, 3, 4, 7, 8, 9];

  if (!project) notFound();

  return (
    <div className="">
      <Head>
        <title>{project?.heading}</title>
      </Head>
      <PageHeader
        content={""}
        ctas={""}
        eyebrow="Projects"
        heading={project?.heading ?? project?.title ?? ""}
        subHeading=""
        theme={project?.theme ?? "light"}
        image={project?.pageHeaderImage ?? ""}
        projectInfo={project?.projectInfo}
        overlay={project?.overlay}
      />
      <div className="container py-12 lg:py-24">
        <div className="max-w-5xl richtext">
          {project.body && (
            <PortableText value={project.body as PortableTextBlock[]} />
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {project.images?.map((item: any, key: number) => (
            <div
              className={cn(
                "group relative",
                rows.includes(key) ? "aspect-video col-span-2" : "aspect-square"
              )}
              key={key}
            >
              <CoverImage
                image={item.image}
                width={2000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
                data-key={key}
              />
              {item.caption && (
                <div
                  className={cn(
                    "absolute bottom-4 left-4 m-0 bg-black/80 px-4 py-2 text-white"
                  )}
                >
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
