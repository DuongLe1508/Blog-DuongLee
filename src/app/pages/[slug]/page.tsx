import { getSinglePage, getAllPages } from "../../ghost-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import "../../cards.min.css";

// SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<any> {
  const metaData = await getSinglePage(params.slug);

  if (metaData) {
    let tags = metaData?.tags?.map((item) => item.name);
    return {
      title: metaData?.title,
      description: metaData?.excerpt,
      keywords: tags,
      openGraph: {
        title: metaData?.title,
        description: metaData.excerpt,
        url: metaData.url,
        keywords: tags,
        images: [
          {
            url: metaData.feature_image,
          },
        ],

        type: "website",
      },
    };
  }
}

// generate Static Params

export async function generateStaticParams() {
  const pages: PostsOrPages | any = await getAllPages();

  return pages.map((post: any) => ({
    slug: post.slug,
  }));
}

// Component
async function Pages({ params }: { params: { slug: string } }) {
  const getPage: PostOrPage | any = await getSinglePage(params.slug);

  // Handling 404
  // if (getPage) {
  //   notFound()
  // }

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
        <div className="flex justify-between max-w-screen-xl px-4 mx-auto ">
          <article className="w-full max-w-3xl mx-auto prose prose-xl prose-p:text-gray-800 dark:prose-p:text-gray-100 sm:prose-base prose-a:no-underline prose-blue dark:prose-invert">
            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 mb-14 lg:mb-6 lg:text-4xl dark:text-white">
              {getPage?.title}
            </h1>

            <div dangerouslySetInnerHTML={{ __html: getPage?.html }}></div>
          </article>
        </div>
      </main>
    </>
  );
}
export default Pages;
