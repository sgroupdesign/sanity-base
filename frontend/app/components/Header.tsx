import Logo from "@/app/components/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import MobileMenu from "./MobileMenu";
import ResolvedLink from "./ResolvedLink";

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <header
      className="fixed z-50 h-24 inset-0 flex items-center backdrop-blur-lg bg-background"
      data-theme="light"
    >
      <div className="w-full p-4 lg:px-8">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <Logo type={"light"} />
          </Link>
          {settings?.headerMenu && (
            <NavigationMenu>
              <NavigationMenuList className="lg:flex items-center gap-x-6 hidden text-foreground">
                {settings?.headerMenu?.items?.map((item: any, key: any) => {
                  switch (item._type) {
                    case "link":
                      return (
                        <NavigationMenuItem key={key}>
                          <NavigationMenuLink asChild>
                            <ResolvedLink
                              link={item}
                              className="block hover:text-gray-400 ease-in-out duration-300 transition"
                              data-type={item}
                            >
                              {item.label ?? item.pageLabel}
                            </ResolvedLink>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );

                    case "link.list":
                      return (
                        <div className="flex flex-col" key={key}>
                          {item.links && (
                            <div className="flex flex-col gap-1">
                              <NavigationMenuItem className="">
                                <NavigationMenuTrigger className="p-0 hover:text-gray-400 ease-in-out duration-300 transition cursor-pointer">
                                  {item.label ?? item.pageLabel}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="w-96 p-6 bg-white">
                                  <ul className="w-96 flex flex-col gap-y-2">
                                    {item?.links.map(
                                      (subItem: any, key: any) => (
                                        <li
                                          className={cn(
                                            "",
                                            key + 1 != item?.links.length &&
                                              "border-b-1 border-gray-200 pb-2"
                                          )}
                                          key={key}
                                        >
                                          <NavigationMenuLink asChild>
                                            <ResolvedLink
                                              link={subItem}
                                              className="text-black ease-in-out duration-300 transition hover:text-gray-500"
                                              data-type={subItem}
                                            >
                                              {subItem.label ??
                                                subItem.pageLabel}
                                            </ResolvedLink>
                                          </NavigationMenuLink>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </NavigationMenuContent>
                              </NavigationMenuItem>
                            </div>
                          )}
                        </div>
                      );
                  }
                })}
              </NavigationMenuList>
            </NavigationMenu>
          )}
          <div className="flex items-center gap-4">
            {settings?.callToAction?.link?.label && (
              <ResolvedLink
                link={settings.callToAction.link}
                className="btn hidden lg:flex items-center gap-1"
              >
                {settings?.callToAction?.link?.label}
                <MdArrowOutward size={"1rem"} className="" />
              </ResolvedLink>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
