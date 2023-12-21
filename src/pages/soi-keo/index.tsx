import { getPagingNews } from "@/apis/news";
import { getSeoByLink } from "@/apis/seo";
import Breadcrumb from "@/components/Breadcrumb";
import CardWager from "@/components/cardWager/CardWager";
import Heading from "@/components/heading/Heading";
import SidebarWager from "@/components/sidebarWager/SidebarWager";
import { INews } from "@/interfaces";
import moment from "moment";
import Head from "next/head";
import React from "react";
import parse from "html-react-parser";

const Wager = ({ news, tags }: { news: INews[]; tags: string[] }) => {
  return (
    <>
      <Head>
        {tags?.map((tag, index) => (
          <React.Fragment key={index}>{parse(tag)}</React.Fragment>
        ))}
      </Head>
      <div className="xl:container mx-auto md:px-4 xl:px-2">
        <div className="py-6">
          <Breadcrumb
            backLink="/"
            breadCrumb={[
              { title: "Trang chủ", url: "/" },
              { title: "Soi kèo", url: "/soi-keo" },
            ]}
          />
        </div>
        <Heading>Đang và sắp diễn ra</Heading>
        <div className="grid lg:grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-12 gap-5">
              {news?.map((item, index) => (
                <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <CardWager
                    title={item?.title}
                    thumbnail={item?.thumbnail}
                    time={item?.updatedAt}
                    slug={item?.slug}
                    classNameImg=" h-[250px] sm:h-[350px] md:h-[300px] lg:h-[200px]"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <SidebarWager />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const [news, seo] = await Promise.all([
      getPagingNews(1, 20),
      getSeoByLink("/soi-keo"),
    ]);
    return {
      props: {
        news: news?.data?.result.result,
        tags: seo?.data?.result?.tags || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}

export default Wager;
