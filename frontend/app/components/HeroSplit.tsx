import { cn } from "@/lib/utils";
import type { HeroSplit } from "@/sanity.types";
import { stegaClean } from "next-sanity";
import { MdArrowOutward } from "react-icons/md";
import CoverImage from "./CoverImage";
import CustomPortableText from "./PortableTextSimple";
import ResolvedLink from "./ResolvedLink";

type InfoProps = {
  block: HeroSplit;
  index: number;
};

export default function HeroSplit({ block, index }: InfoProps) {
  return (
    <div
      className={cn(
        "container relative grid grid-cols-1 gap-8 lg:gap-x-20 lg:grid-cols-2",
        stegaClean(block.alignItems) == "start" && "items-start",
        stegaClean(block.alignItems) == "end" && "items-end",
        stegaClean(block.alignItems) == "center" && "items-center"
      )}
    >
      <div className={cn("", block.image?.onRight && "lg:order-1")}>
        {block.image && (
          <CoverImage
            image={block.image}
            className="w-full"
            width={1200}
            height={1200}
          />
        )}
      </div>

      <div className={cn("relative mx-auto flex w-full flex-col")}>
        <div
          className={cn(
            "flex flex-col gap-6",
            stegaClean(block.alignItems) == "justify"
              ? "justify-between h-full"
              : "items-center"
          )}
        >
          <div className="flex flex-col gap-6 w-full">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}

            {block.heading && <h2 className="h2">{block.heading}</h2>}

            {block.subHeading && <p className="text-2xl">{block.subHeading}</p>}
          </div>

          <div className="flex flex-col gap-6">
            {block.content && <CustomPortableText value={block.content} />}

            <div className="flex gap-4">
              {block.ctas?.map((cta: any, key: any) => (
                <ResolvedLink
                  className={cn(
                    "btn flex items-center gap-1",
                    key === 1 && "secondary"
                  )}
                  link={cta.link}
                  key={key}
                >
                  {cta.link.label}
                  <MdArrowOutward size={"1rem"} className="" />
                </ResolvedLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
