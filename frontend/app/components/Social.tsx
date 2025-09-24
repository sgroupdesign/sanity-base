import {cn} from '@/lib/utils'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'

import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSquareFacebook,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import {IoIosLink} from 'react-icons/io'
import ResolvedLink from './ResolvedLink'

export default async function Social({className}: React.ComponentProps<'div'>) {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  if (!settings?.social?.items?.length) return null

  return (
    <nav className={cn('group flex flex-wrap items-center gap-2 text-white', className)}>
      {settings.social.items.map((item: any, key: any) => {
        switch (item._type) {
          case 'link':
            return (
              <ResolvedLink
                link={item}
                key={key}
                className="duration-300 ease-in-out hover:!opacity-100 group-has-[a:hover]:opacity-50"
              >
                <Icon url={item.href} aria-label={item.label} fontSize={'1.6rem'} />
              </ResolvedLink>
            )

          default:
            return null
        }
      })}
    </nav>
  )
}

function Icon({url, ...props}: {url?: string} & React.ComponentProps<'svg'>) {
  if (!url) return null

  return url?.includes('facebook.com') ? (
    <FaSquareFacebook {...props} />
  ) : url?.includes('github.com') ? (
    <FaGithub {...props} />
  ) : url?.includes('instagram.com') ? (
    <FaInstagram {...props} />
  ) : url?.includes('linkedin.com') ? (
    <FaLinkedin {...props} />
  ) : url?.includes('tiktok.com') ? (
    <FaTiktok {...props} />
  ) : url?.includes('twitter.com') || url?.includes('x.com') ? (
    <FaXTwitter {...props} />
  ) : url?.includes('youtube.com') ? (
    <FaYoutube {...props} />
  ) : url?.includes('youtube.com') ? (
    <FaEnvelope {...props} />
  ) : (
    <IoIosLink {...props} />
  )
}
