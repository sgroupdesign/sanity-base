import { Image } from "next-sanity/image";

import DateComponent from "@/app/components/Date";
import { urlForImage } from "@/sanity/lib/utils";

type Props = {
  person: {
    name: string | null;
    image?: any;
  };
  date?: string;
};

export default function Avatar({ person, date }: Props) {
  const { name, image } = person;

  return (
    <div className="flex items-center">
      {image?.asset?._ref ? (
        <div className="h-12 w-12 mr-2">
          <Image
            alt={image?.alt ?? name}
            className="h-full rounded-full object-cover"
            height={52}
            width={52}
            src={
              urlForImage(image)
                ?.height(96)
                .width(96)
                .fit("crop")
                .url() as string
            }
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {name && <div className="font-semibold">{name}</div>}
        <div className="text-gray-500">
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  );
}
