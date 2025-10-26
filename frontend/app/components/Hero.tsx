import { cn } from "@/lib/utils";
import type { Hero } from "@/sanity.types";
import { stegaClean } from "next-sanity";
import CoverImage from "./CoverImage";
import ResolvedLink from "./ResolvedLink";

type InfoProps = {
  block: Hero;
  index: number;
};

export default function Hero({ block, index }: InfoProps) {
  return (
    <section
      className={cn(
        "relative flex flex-col",
        block.layout == "stacked" ? "h-auto" : "h-[80vh]"
      )}
      data-theme={stegaClean(block.theme)}
    >
      {block.bgImage && (
        <CoverImage
          image={block.bgImage}
          className={cn(
            "",
            block.layout == "stacked"
              ? "w-full order-1"
              : "absolute inset-0 object-cover w-full h-full"
          )}
          width={2000}
          height={2000}
        />
      )}
      {block.overlayOpacity && block.layout == "floated" && (
        <div
          className={cn("absolute inset-0", {
            "bg-transparent": stegaClean(block.overlayOpacity) === "0",
            "bg-black/20": stegaClean(block.overlayOpacity) === "20",
            "bg-black/40": stegaClean(block.overlayOpacity) === "40",
            "bg-black/60": stegaClean(block.overlayOpacity) === "60",
            "bg-black/80": stegaClean(block.overlayOpacity) === "80",
          })}
        ></div>
      )}
      <div
        className={cn(
          "container relative h-full flex flex-col",
          stegaClean(block.alignItems) == "start" && "items-start",
          stegaClean(block.alignItems) == "end" && "justify-end",
          stegaClean(block.alignItems) == "center" && "justify-center"
        )}
      >
        <div
          className={cn(
            "relative flex gap-6 w-full py-16 lg:max-w-4/6",
            block.textAlign == "center" && "mx-auto text-center",
            stegaClean(block.alignItems) == "justify" &&
              "h-full justify-between",

            stegaClean(block.layout) == "stacked" &&
              stegaClean(block.alignItems) == "justify"
              ? "lg:max-w-full gap-20 items-end"
              : "flex-col"
          )}
        >
          <div className="flex gap-6 flex-col">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}

            {block.heading && <h2 className="h2">{block.heading}</h2>}
            {block.subHeading && <p className="text-2xl">{block.subHeading}</p>}
          </div>

          <div className="flex flex-col gap-6">
            {block.content && <p className="text-lg">{block.content}</p>}

            <div
              className={cn(
                "flex gap-4",
                block.textAlign == "center" && "justify-center"
              )}
            >
              {block.ctas?.map((cta: any, key: any) => (
                <ResolvedLink
                  className={cn("btn", key === 1 && "secondary")}
                  link={cta.link}
                  key={key}
                >
                  {cta.link.label}
                </ResolvedLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
