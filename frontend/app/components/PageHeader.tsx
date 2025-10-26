import { cn } from "@/lib/utils";
import { stegaClean } from "next-sanity";
import { MdArrowOutward } from "react-icons/md";
import CoverImage from "./CoverImage";
import ResolvedLink from "./ResolvedLink";

interface PageHeaderProps {
  theme?: string;
  image?: any;
  content?: string;
  eyebrow?: string;
  heading: string;
  subHeading?: string;
  ctas?: any;
  projectInfo?: any;
  overlay?: any;
}

export default function PageHeader({
  theme,
  image,
  content,
  eyebrow,
  heading,
  subHeading,
  ctas,
  projectInfo,
  overlay,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative flex flex-col text-foreground overflow-hidden",
        image ? "h-[80vh]" : "bg-gray-100 h-[30vh]"
      )}
      data-theme={stegaClean(theme)}
    >
      {image && (
        <>
          <CoverImage
            image={image}
            className="absolute object-cover w-screen h-screen"
            width={2000}
            height={2000}
            priority={true}
          />
          <div
            className={cn(
              "absolute inset-0 ",
              overlay && "bg-black/" + stegaClean(overlay)
            )}
          ></div>
        </>
      )}

      <div className="container relative h-full flex flex-col justify-center">
        <div className="relative flex flex-col gap-6 w-full py-16 lg:max-w-4/6 mx-auto text-center">
          <div className="flex gap-6 flex-col w-full">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}

            {heading && <h1 className="h1">{heading}</h1>}
            {subHeading && <p className="text-2xl">{subHeading}</p>}
          </div>

          <div className="flex flex-col gap-6">
            {content && <p className="text-lg">{content}</p>}

            {ctas && (
              <div className="flex gap-4 justify-center">
                {ctas?.map((cta: any, key: any) => (
                  <ResolvedLink
                    className={cn(
                      "btn flex items-center gap-1 ",
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
            )}

            {projectInfo && (
              <ul className="flex w-full lg:mt-10 flex-wrap gap-y-8">
                {projectInfo.map((item: any, key: number) => (
                  <li
                    key={key}
                    className="basis-1/2 lg:basis-1/3 flex flex-col gap-0"
                  >
                    <p className="eyebrow text-gray-200">{item.heading}</p>
                    <p className="text-foreground">{item.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
