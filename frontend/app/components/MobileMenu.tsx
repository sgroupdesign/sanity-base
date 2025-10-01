import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import {
  MdArrowDownward,
  MdArrowForward,
  MdArrowOutward,
} from "react-icons/md";

import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ResolvedLink from "./ResolvedLink";

export default async function MobileMenu() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-col items-center gap-0 lg:hidden text-foreground">
          <RiMenu3Fill size={"2rem"} className="" />
          <span className="text-[8px] uppercase">MENU</span>
        </div>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col justify-between">
        <SheetHeader className="relative bg-white p-6">
          <SheetTitle className="text-left"></SheetTitle>
          <SheetClose className="text-black">
            <RxCross2 className="absolute right-6 top-6" size="1.6rem" />
          </SheetClose>
        </SheetHeader>
        <div className="flex bg-background h-full w-full flex-col overflow-y-auto text-foreground">
          <div className="p-6 flex flex-col gap-y-8 h-full justify-center">
            {settings?.headerMenu && (
              <nav className="flex flex-col gap-2 text-foreground">
                <SheetClose asChild>
                  <a
                    href="/"
                    className="text-xl font-medium hover:text-gray-400 ease-in-out duration-300 transition flex gap-x-2 justify-between items-center border-b border-gray-100 pb-2"
                  >
                    Home
                    <MdArrowForward size={"1rem"} className="" />
                  </a>
                </SheetClose>
                {settings?.headerMenu?.items?.map((item: any, key: any) => {
                  switch (item._type) {
                    case "link":
                      return (
                        <SheetClose asChild key={key}>
                          <ResolvedLink
                            link={item}
                            className="text-xl font-medium hover:text-gray-400 ease-in-out duration-300 transition flex gap-x-2 justify-between items-center border-b border-gray-100 pb-2"
                            data-type={item}
                          >
                            {item.label}
                            <MdArrowForward size={"1rem"} className="" />
                          </ResolvedLink>
                        </SheetClose>
                      );

                    case "link.list":
                      return (
                        <div
                          className="flex flex-col gap-4 basis-1/4"
                          key={key}
                        >
                          {item.links && (
                            <div className="flex flex-col gap-1">
                              <p className="text-xl font-medium flex gap-x-2 justify-between items-center border-b border-gray-100 pb-2">
                                {item.label}
                                <MdArrowDownward size={"1rem"} className="" />
                              </p>
                              <ul className="flex flex-col gap-y-2 mx-4 my-2">
                                {item?.links.map((item: any, key: any) => (
                                  <li
                                    className="w-full"
                                    key={key}
                                    data-index={key}
                                  >
                                    <SheetClose asChild>
                                      <ResolvedLink
                                        link={item}
                                        className="ease-in-out duration-300 transition hover:text-gray-500 flex gap-x-2 flex-col border-b border-gray-100 pb-2"
                                        data-type={item}
                                      >
                                        {item.label ?? item.pageLabel}
                                      </ResolvedLink>
                                    </SheetClose>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                  }
                })}
              </nav>
            )}
          </div>
        </div>
        <SheetFooter className="p-6">
          {settings?.callToAction && (
            <SheetClose asChild>
              <ResolvedLink
                link={settings.callToAction.link}
                className="btn flex items-center gap-1 justify-between"
              >
                {settings?.callToAction?.link?.label}
                <MdArrowOutward size={"1rem"} className="" />
              </ResolvedLink>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
