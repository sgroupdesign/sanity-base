import { stegaClean, type PortableTextBlock } from "next-sanity";

import PortableText from "@/app/components/PortableText";
import { cn } from "@/lib/utils";
import { InfoSection } from "@/sanity.types";
import ResolvedLink from "./ResolvedLink";

type InfoProps = {
  block: InfoSection;
  index: number;
};

export default function CTA({ block }: InfoProps) {
  return (
    <section
      className="relative py-6 lg:p-20 bg-background text-foreground"
      data-theme={stegaClean(block.theme)}
    >
      <div
        className={cn(
          "container",
          stegaClean(block.textAlign) == "center"
            ? "items-center"
            : "items-start"
        )}
      >
        <div
          className={cn(
            "relative flex w-full flex-col",
            stegaClean(block.textAlign) == "center" && "mx-auto text-center",
            stegaClean(block.layout) == "stacked" && "lg:max-w-5/6"
          )}
        >
          <div
            className={cn(
              "flex gap-6",
              stegaClean(block.layout) == "floated"
                ? "justify-between h-full w-full gap-20 items-end"
                : "items-start flex-col"
            )}
          >
            <div className="flex flex-col gap-6 flex-1">
              {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}

              {block.heading && <h2 className="h2">{block.heading}</h2>}

              {block.subHeading && (
                <p className="text-2xl">{block.subHeading}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-6 flex-1">
              {block.content && (
                <PortableText
                  className=""
                  value={block.content as PortableTextBlock[]}
                />
              )}

              <div className="flex gap-4">
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
      </div>
    </section>
  );
}
