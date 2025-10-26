import { urlForImage } from "@/sanity/lib/utils";
import { getImageDimensions } from "@sanity/asset-utils";
import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";

interface CoverImageProps {
  image: any;
  priority?: boolean;
  className?: string;
  width: number;
  height?: number;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority, className, width, height } = props;
  const image = source?.asset?._ref ? (
    <div className="">
      <Image
        className={className}
        width={width ?? getImageDimensions(source).width}
        height={height ?? getImageDimensions(source).height}
        alt={stegaClean(source?.alt) || ""}
        src={urlForImage(source)?.url() as string}
        priority={priority}
        style={{
          objectPosition: `${(source.hotspot?.x || 0.5) * 100}% ${
            (source.hotspot?.y || 0.5) * 100
          }%`,
        }}
      />
    </div>
  ) : null;
  return <>{image}</>;
}
