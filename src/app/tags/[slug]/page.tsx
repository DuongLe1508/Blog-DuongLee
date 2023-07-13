import React from "react";
import Card from "../../Card";
import { getTagPosts, getAllTags, getSingleTag } from "../../ghost-client";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import type { PostsOrPages, Tag, Tags } from "@tryghost/content-api";

// SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metaData: Tag | any = await getSingleTag(params?.slug);

  return {
    title: metaData?.name,
    description: metaData?.description,
  };
}

// generate Static Params
export async function generateStaticParams() {
  const allTags: Tags | any = await getAllTags();

  let allTagsItem: { slug: string }[] = [];

  allTags?.map((item: any) => {
    allTagsItem.push({
      slug: item.slug,
    });
  });

  return allTagsItem;
}

// component

async function Tag({ params }: { params: { slug: string } }) {
  let tagPosts: PostsOrPages | any = await getTagPosts(params.slug);

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <aside
      aria-label="Related articles"
      className="py-8 lg:py-24 dark:bg-gray-800"
    >
      <div className="max-w-screen-xl px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          More articles from {params.slug.split("-").join(" ")}
        </h2>

        <div className="container grid grid-cols-1 gap-12 mx-auto my-12 md:gap-12 lg:gap-12 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 ">
          {tagPosts.map((item: any) => (
            <Card key={item.uuid} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Tag;
