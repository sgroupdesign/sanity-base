import React from "react";

import Cards from "@/app/components/Cards";
import Hero from "@/app/components/Hero";
import HeroSplit from "@/app/components/HeroSplit";
import Info from "@/app/components/InfoSection";
import Testimonials from "@/app/components/Testimonials";
import { cn } from "@/lib/utils";
import { dataAttr } from "@/sanity/lib/utils";

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _key: string;
  enabled: boolean;
  theme: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
};

const Blocks: BlocksType = {
  infoSection: Info,
  heroSplit: HeroSplit,
  hero: Hero,
  testimonials: Testimonials,
  cards: Cards,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
}: BlockProps) {
  if (!block.enabled) {
    return;
  }

  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return (
      <div
        key={block._key}
        data-type={block._type}
        data-theme={block.theme}
        className={cn(
          "relative  bg-background text-foreground",
          block._type != "hero" && "py-6 lg:p-20",
          "theme-" + block.theme,
          "[&+.theme-" + block.theme + "]:-mt-20"
        )}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key }
  );
}
