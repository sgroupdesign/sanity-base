import Logo from '@/app/components/Logo'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import Link from 'next/link'
import {MdArrowOutward} from 'react-icons/md'
import {RiMenu2Line} from 'react-icons/ri'
import ResolvedLink from './ResolvedLink'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header
      className="fixed z-50 h-24 inset-0 flex items-center backdrop-blur-lg bg-background"
      data-theme="light"
    >
      <div className="w-full p-4 lg:px-8">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <Logo type="light" />
          </Link>
          {settings?.headerMenu && (
            <nav className="lg:flex items-center gap-x-6 hidden text-foreground">
              {settings?.headerMenu?.items?.map((item: any, key: any) => {
                switch (item._type) {
                  case 'link':
                    return (
                      <ResolvedLink link={item} key={key} className="block" data-type={item}>
                        {item.label}
                      </ResolvedLink>
                    )

                  default:
                    return null
                }
              })}
            </nav>
          )}
          <div className="flex items-center gap-4">
            {settings?.callToAction && (
              <div>
                <ResolvedLink
                  link={settings.callToAction.link}
                  className="btn flex items-center gap-1"
                >
                  {settings?.callToAction?.link?.label}
                  <MdArrowOutward size={'1rem'} className="" />
                </ResolvedLink>
              </div>
            )}
            <div className="flex flex-col items-center gap-0 lg:hidden text-foreground">
              <RiMenu2Line size={'2rem'} className="" />
              <span className="text-[8px] uppercase">MENU</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
