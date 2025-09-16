import Logo from "@/app/components/Logo";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import ResolvedLink from "./ResolvedLink";

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg border-b border-gray-100">
      <div className="container py-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <Logo type="light" />
          </Link>
          {settings?.headerMenu && (
            <nav className="flex items-center gap-x-6">
              {settings?.headerMenu?.items?.map((item: any, key: any) => {
                switch (item._type) {
                  case "link":
                    return (
                      <ResolvedLink
                        link={item}
                        key={key}
                        className="block"
                        data-type={item}
                      >
                        {item.label}
                      </ResolvedLink>
                    );

                  default:
                    return null;
                }
              })}
            </nav>
          )}
          {settings?.callToAction && (
            <div>
              <ResolvedLink link={settings.callToAction.link} className="btn">
                {settings?.callToAction?.link?.label}
              </ResolvedLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
