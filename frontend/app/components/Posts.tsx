import OnBoarding from "@/app/components/Onboarding";
import { AllPostsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery, morePostsQuery } from "@/sanity/lib/queries";
import { createDataAttribute } from "next-sanity";
import Card from "./Card";

const Post = ({ post }: { post: AllPostsQueryResult[number] }) => {
  const { _id, title, image, slug } = post;

  const attr = createDataAttribute({
    id: _id,
    type: "post",
    path: "title",
    image: image,
  });

  return (
    <Card
      image={image}
      key={_id}
      title={title}
      subTitle="Blog"
      link={post.slug}
      index={1}
    />
  );
};

const Posts = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading?: string;
}) => (
  <div className="flex flex-col gap-10 items-center">
    {heading && <h2 className="h2">{heading}</h2>}
    <div className="flex flex-wrap -ml-10 items-center justify-center">
      {children}
    </div>
  </div>
);

export const MorePosts = async ({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Posts heading="More from the blog">
      {data?.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <Posts heading="Related posts">
      {data.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};
