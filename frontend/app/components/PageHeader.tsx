import { cn } from "@/lib/utils";
import { stegaClean } from "next-sanity";
import CoverImage from "./CoverImage";
import ResolvedLink from "./ResolvedLink";

interface PageHeaderProps {
  theme: string;
  image: any;
  content: string;
  eyebrow: string;
  heading: string;
  subHeading: string;
  ctas: any;
}

export default function PageHeader({
  theme,
  image,
  content,
  eyebrow,
  heading,
  subHeading,
  ctas,
}: PageHeaderProps) {
  return (
    <section
      className="relative flex flex-col text-foreground h-[80vh]"
      data-theme={stegaClean(theme)}
    >
      {image && (
        <CoverImage
          image={image}
          className="absolute inset-0 object-cover w-full h-full"
          loading={"eager"}
          width={2000}
          height={2000}
          priority={true}
        />
      )}

      <div className="container relative h-full flex flex-col justify-center">
        <div className="relative flex flex-col gap-6 w-full py-16 lg:max-w-4/6 mx-auto text-center">
          <div className="flex gap-6 flex-col w-full">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}

            {heading && <h2 className="h2">{heading}</h2>}
            {subHeading && <p className="text-2xl">{subHeading}</p>}
          </div>

          <div className="flex flex-col gap-6">
            {content && <p className="text-lg">{content}</p>}

            {ctas && (
              <div className="flex gap-4 justify-center">
                {ctas?.map((cta: any, key: any) => (
                  <ResolvedLink
                    className={cn("btn", key === 1 && "secondary")}
                    link={cta.link}
                    key={key}
                  >
                    {cta.link.label}
                  </ResolvedLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
