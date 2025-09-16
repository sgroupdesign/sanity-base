import { stegaClean } from "next-sanity";
import { FaUser } from "react-icons/fa6";

import type { Testimonials } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type InfoProps = {
  block: Testimonials;
  index: number;
};

export default function Testimonials({ block }: InfoProps) {
  return (
    <section
      className="relative py-6 lg:p-20 bg-background text-foreground"
      data-theme={stegaClean(block.theme)}
    >
      <div className="container">
        <Carousel className="my-6">
          <CarouselContent>
            {block.testimonials?.map((testimonial: any, key: any) => (
              <CarouselItem key={key} className="">
                <div className="" key={key}>
                  <div className="flex gap-x-20 items-end">
                    <div className="basis-3/4 flex flex-col gap-y-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500 w-40"
                        viewBox="0 0 576 576"
                      >
                        <path
                          fill="currentColor"
                          d="M518.3 121.2C505.7 83.4 464.7 63.2 427 75.7C416.6 79.2 406.9 84 398.1 88.9C383.3 97.1 364.1 109.9 345 129.1C316.9 157.2 290.8 197.1 278.1 251C273.6 245.1 268.5 239.6 263.1 234.5C278.8 220.9 287.9 201 287.9 180.1L287.9 144.1C287.9 136.6 286.7 128.9 284.2 121.3C271.6 83.5 230.6 63.3 192.9 75.8C182.5 79.3 172.8 84.1 164 89C149.2 97.2 130 110 110.9 129.2C71.3 168.8 35.8 231.8 35.8 324.1L35.8 369.1C35.8 443.7 96.2 504.1 170.8 504.1C220.8 504.1 264.5 476.9 287.8 436.5C311.1 476.9 354.8 504.1 404.8 504.1C479.4 504.1 539.8 443.7 539.8 369.1L539.8 333.1C539.8 294.2 523.3 259.1 497 234.5C512.7 220.9 521.8 201 521.8 180.1L521.8 144.1C521.8 136.5 520.6 128.9 518.1 121.3zM370.5 154.5C386.8 138.2 403.1 127.3 415.6 120.4C423.4 116.1 430.9 112.4 438.5 109.9C457.4 103.6 477.9 113.8 484.1 132.6C490.3 151.3 480.4 171.5 461.8 178C446 183.5 431.5 195.1 420 206.8C415.5 211.4 413.8 218.1 415.6 224.3C417.4 230.5 422.3 235.3 428.6 236.8C471.8 247.4 503.9 286.5 503.9 332.9C503.9 387.6 459.6 431.9 404.9 431.9C350.2 431.9 305.9 387.6 305.9 332.9L305.9 323.9C305.9 241.7 337.1 187.7 370.4 154.4zM270 333C270 387.7 225.7 432 171 432C116.3 432 72 387.7 72 333L72 324C72 241.8 103.2 187.8 136.5 154.5C152.8 138.2 169.1 127.3 181.6 120.4C189.4 116.1 196.9 112.4 204.5 109.9C223.4 103.6 243.9 113.8 250.1 132.6C256.3 151.3 246.4 171.5 227.8 178C212 183.5 197.5 195.1 186 206.8C181.5 211.4 179.8 218.1 181.6 224.3C183.4 230.5 188.3 235.3 194.6 236.8C237.9 247.5 270 286.5 270 333z"
                        />
                      </svg>
                      <p className="text-5xl font-normal leading-tight">
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="basis-1/4">
                      <div className="flex gap-x-2 items-center">
                        <div className="w-1/4">
                          <div className="w-20 h-20 rounded-full overflow-hidden flex flex-col items-center justify-center bg-gray-200">
                            {testimonial.picture ? (
                              <Image
                                alt={testimonial?.caption ?? "image"}
                                className="w-full h-full"
                                width={80}
                                height={80}
                                src={
                                  urlForImage(testimonial.picture)
                                    ?.width(80)
                                    .height(80)
                                    .fit("crop")
                                    .url() as string
                                }
                              />
                            ) : (
                              <FaUser size={"2rem"} className="text-gray-500" />
                            )}
                          </div>
                        </div>
                        <div className="w-3/4">
                          <p>{testimonial.name}</p>
                          <p>{testimonial.jobTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-x-2 mt-8">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
