import {cn} from '@/lib/utils'
import {MdArrowOutward} from 'react-icons/md'
import CoverImage from './CoverImage'
import ResolvedLink from './ResolvedLink'

interface CardProps {
  image: any
  title: string
  subTitle: string
  link: any
  index: number
}

export default function Card(props: CardProps) {
  const {image, title, subTitle, link, index} = props

  return (
    <div className="basis-1/2 lg:basis-1/3 pl-10 pb-10 group">
      {image && (
        <div
          className={cn(
            'aspect-4/3 relative overflow-hidden',
            index === 1 ? 'rounded-tr-4xl rounded-bl-4xl' : 'rounded-br-4xl rounded-tl-4xl',
          )}
        >
          <CoverImage
            image={image}
            loading={image.loading}
            className="w-full h-full absolute inset-0"
            width={600}
            height={600}
          />
        </div>
      )}
      <div className="flex flex-col gap-0 py-4">
        {title && (
          <div className="">
            {subTitle && <p className="text-gray-500 text-base uppercase">{subTitle}</p>}

            <div className="flex gap-2 justify-between items-start">
              {link && link.linkType != 'person' ? (
                <h3 className="h3">
                  <ResolvedLink link={link}>{title}</ResolvedLink>
                </h3>
              ) : (
                <h3 className="h3">{title}</h3>
              )}
              <MdArrowOutward size={'1.4rem'} className="text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
