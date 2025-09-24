import type {Cards} from '@/sanity.types'
import {stegaClean} from 'next-sanity'
import Card from './Card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

type CardsProps = {
  block: Cards
  index: number
}

export default function Cards({block, index}: CardsProps) {
  return (
    <section
      className="relative py-6 lg:p-20 bg-background text-foreground"
      data-theme={stegaClean(block.theme)}
    >
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div className="basis-1/2">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}

            {block.heading && <h2 className="h2">{block.heading}</h2>}
          </div>
        </div>

        {block.layout == 'grid' ? (
          <div className="flex flex-wrap -ml-10">
            {block.source == 'static' &&
              block.cards?.map((card: any, key: any) => (
                <Card
                  image={card.image}
                  key={key}
                  title={card.title}
                  subTitle={card._type}
                  link={card.link}
                  index={key}
                />
              ))}
            {block.source == 'dynamic' &&
              block.dynamicCards?.map((card: any, key: any) => (
                <Card
                  image={card.metadata?.image ?? ''}
                  key={key}
                  title={card.name ?? card.title}
                  subTitle={card._type}
                  index={key}
                  link={card.link ?? ''}
                />
              ))}
          </div>
        ) : (
          <Carousel className="">
            <div className="flex gap-x-2 basis-1/2 items-end justify-end -mt-10 mb-6">
              <CarouselPrevious />
              <CarouselNext />
            </div>
            <CarouselContent className="-ml-10">
              {block.source == 'static' &&
                block.cards?.map((card: any, key: any) => (
                  <CarouselItem key={key} className="basis-full md:basis-1/2 lg:basis-1/3 p-0">
                    <Card
                      image={card.image}
                      title={card.title}
                      subTitle={card._type}
                      link={card.link}
                      index={key}
                    />
                  </CarouselItem>
                ))}
              {block.source == 'dynamic' &&
                block.dynamicCards?.map((card: any, key: any) => (
                  <CarouselItem key={key} className="basis-full md:basis-1/2 lg:basis-1/3 p-0">
                    <Card
                      image={card.metadata?.image ?? ''}
                      title={card.name ?? card.title}
                      subTitle={card._type == 'project' || card._type == 'post' ? card._type : ''}
                      index={key}
                      link={card.link ?? ''}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  )
}
