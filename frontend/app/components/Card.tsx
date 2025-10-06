import { cn } from "@/lib/utils";
import { MdArrowOutward } from "react-icons/md";
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
    <div
      className={cn(
        "basis-full md:basis-1/2 lg:basis-1/3 pl-10 pb-10 relative",
        link && "group"
      )}
    >
      {link && (
        <ResolvedLink link={link} className="absolute inset-0 z-10">
          <span className="hidden">{title}</span>
        </ResolvedLink>
      )}

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
            className="w-full absolute inset-0 group-hover:scale-110 transition ease-in-out duration-500"
            width={600}
            height={600}
          />
        </div>
      )}
      <div className="flex flex-col gap-0 py-4">
        {title && (
          <div className="">
            {subTitle && (
              <p className="text-gray-500 text-base uppercase">{subTitle}</p>
            )}

            <div className="flex gap-2 justify-between items-start group-hover:text-gray-500 ease-in-out transition duration-300">
              <h3 className="h3">{title}</h3>
              <MdArrowOutward
                size={"1.4rem"}
                className="text-gray-500 group-hover:animate-pulse"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
