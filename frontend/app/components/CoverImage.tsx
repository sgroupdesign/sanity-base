import { urlForImage } from "@/sanity/lib/utils";
import { getImageDimensions } from "@sanity/asset-utils";
import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";

interface CoverImageProps {
  image: any;
  priority?: boolean;
  className: string;
  width: number;
  height: number;
  loading: any;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority, className, loading, width, height } = props;
  const image = source?.asset?._ref ? (
    <Image
      className={className}
      width={width ?? getImageDimensions(source).width}
      height={height ?? getImageDimensions(source).height}
      alt={stegaClean(source?.alt) || ""}
      src={urlForImage(source)?.url() as string}
      priority={priority}
      loading={loading}
    />
  ) : null;

  return <>{image}</>;
}
