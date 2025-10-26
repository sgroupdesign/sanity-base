/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";

import ResolvedLink from "@/app/components/ResolvedLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import {
  Accordion as AccordionType,
  Features,
  Form,
  Gallery,
} from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";
import AddForm from "./Form";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
    types: {
      image: ({ value }) => (
        <div className="my-8">
          <Image
            alt={value?.alt}
            className="w-full"
            height={450}
            width={800}
            src={
              urlForImage(value)
                ?.width(800)
                .height(450)
                .fit("crop")
                .url() as string
            }
          />
        </div>
      ),
      accordion: ({ value }: { value: AccordionType }) => {
        return (
          <div className="mt-4 [&+p]:mt-4 not-prose text-left">
            <Accordion type="single" collapsible className="accordion">
              {value.items?.map((item, index) => (
                <AccordionItem value={"item-" + index} key={item._key}>
                  <AccordionTrigger>{item.summary}</AccordionTrigger>
                  <AccordionContent>
                    <PortableText value={item.content as PortableTextBlock[]} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );
      },
      gallery: ({ value }: { value: Gallery }) => {
        return (
          <Carousel className="my-6">
            <CarouselContent>
              {value.images?.map((item) => (
                <CarouselItem key={item._key} className="">
                  <Image
                    alt={item?.caption ?? "image"}
                    className="w-full"
                    width={800}
                    height={450}
                    src={
                      urlForImage(item.image)
                        ?.width(800)
                        .height(450)
                        .fit("crop")
                        .url() as string
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-3 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        );
      },
      formReference: ({ value }: { value: Form }) => {
        return <AddForm form={value} />;
      },
      features: ({ value }: { value: Features }) => {
        return (
          <div className="my-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12 block-features">
            {value.items?.map((item) => (
              <div className="" key={item._key}>
                <h3 className="h3">{item.heading}</h3>
                <div className="text-sm">
                  <PortableText value={item.content as PortableTextBlock[]} />
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
  };

  return (
    <div className={["", className].filter(Boolean).join(" ")}>
      <PortableText components={components} value={value} />
    </div>
  );
}
