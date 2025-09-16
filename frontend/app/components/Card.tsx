import { cn } from "@/lib/utils";
import CoverImage from "./CoverImage";
import ResolvedLink from "./ResolvedLink";

interface CardProps {
  image: any;
  title: string;
  subTitle: string;
  link: any;
  index: number;
}

export default function Card(props: CardProps) {
  const { image, title, subTitle, link, index } = props;

  return (
    <div className="basis-1/2 lg:basis-1/3 pl-10 pb-10 group">
      {image && (
        <div
          className={cn(
            "aspect-4/3 relative overflow-hidden",
            index === 1 ? "rounded-tr-4xl" : "rounded-br-4xl"
          )}
        >
          <CoverImage
            image={image}
            loading={image.loading}
            className="w-full h-full absolute inset-0"
            width={600}
            height={600}
          />
        </div>
      )}
      <div className="flex flex-col gap-0 py-4 uppercase">
        {title && (
          <div className="">
            {subTitle && <p className="text-gray-500 text-base">{subTitle}</p>}

            {link && link.linkType != 'person' ? (
              <h4 className="h4">
                <ResolvedLink link={link}>{title}</ResolvedLink>
              </h4>
            ) : (
              <h4 className="h4">{title}</h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
