/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import { PortableText, type PortableTextComponents } from "next-sanity";

import ResolvedLink from "@/app/components/ResolvedLink";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: any;
}) {
  const components: PortableTextComponents = {
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
  };

  return (
    <div className={["richtext", className].filter(Boolean).join(" ")}>
      <PortableText value={value} />
    </div>
  );
}
