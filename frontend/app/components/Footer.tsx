import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import Logo from "./Logo";
import ResolvedLink from "./ResolvedLink";
import Social from "./Social";

export default async function Footer() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });
  return (
    <div>
      <footer className="bg-black text-white">
        <div className="container lg:py-16">
          {settings?.footerMenu && (
            <nav className="flex gap-8 items-start justify-center">
              <div className="flex flex-col gap-8 basis-1/2">
                <Link className="flex items-center gap-2" href="/">
                  <Logo type="dark" />
                </Link>
                <div className="flex flex-col gap-2 text-sm">
                  {settings?.address && (
                    <div className="flex items-center gap-3 ">
                      <FaLocationDot size={"1.2rem"} className="text-white" />
                      <p className="text-gray-200">{settings.address}</p>
                    </div>
                  )}
                  {settings?.email && (
                    <div className="flex items-center gap-3 ">
                      <AiOutlineMail size={"1.2rem"} className="text-white" />
                      <a
                        href={"mailto:" + settings.email}
                        className="transition duration-300 ease-in-out text-gray-200 hover:text-white"
                      >
                        {settings.email}
                      </a>
                    </div>
                  )}
                  {settings?.phone && (
                    <div className="flex items-center gap-3">
                      <AiFillPhone size={"1.2rem"} className="text-white" />
                      <a
                        href={"tel:" + settings.phone}
                        className="transition duration-300 text-gray-200 ease-in-out hover:text-white"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="h4">Follow us</h4>
                  <Social />
                </div>
              </div>
              {settings?.footerMenu?.items?.map((item: any, key: any) => {
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
                  case "link.list":
                    return (
                      <div className="flex flex-col gap-4 basis-1/4" key={key}>
                        <h4 className="h4">{item.link.label}</h4>
                        {item.links && (
                          <div className="flex flex-col gap-1">
                            {item?.links.map((item: any, key: any) => (
                              <ResolvedLink
                                link={item}
                                key={key}
                                className="text-gray-200 ease-in-out duration-300 transition text-sm"
                                data-type={item}
                              >
                                {item.label}
                              </ResolvedLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                }
              })}
            </nav>
          )}
        </div>
      </footer>
      <div className="bg-gray-100">
        <div className="container py-4 text-center">
          <p>
            &copy; {settings?.companyName} {new Date().getFullYear()}. All
            rights reserved. Website by{"  "}
            <a
              href="https://sgroup.com.au"
              target="_blank"
              className="border-b-1 pb-0.5 border-black text-black duration-500 ease-in-out hover:border-transparent"
            >
              S. Group
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
