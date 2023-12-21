import { getNewBySlug } from "@/apis/news";
import Breadcrumb from "@/components/Breadcrumb";
import Banner from "@/components/banner/Banner";
import Button from "@/components/button/Button";
import CardWager from "@/components/cardWager/CardWager";
import Heading from "@/components/heading/Heading";
import SidebarWager from "@/components/sidebarWager/SidebarWager";
import { INews } from "@/interfaces";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import React from "react";
import { AiOutlineLike, AiOutlineMessage } from "react-icons/ai";

const DetailWager = ({ data }: { data: INews }) => {
  return (
    <div className="xl:container mx-auto md:px-4 xl:px-2">
      <div className="py-4">
        <Breadcrumb
          backLink="/"
          breadCrumb={[
            { title: "Trang chủ", url: "/" },
            { title: "TIPS Bóng đá", url: "/tips" },
          ]}
        />
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-9">
          <Heading className="text-3xl capitalize pb-2">{data?.title}</Heading>
          <div
            className="mt-6 text-justify"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          {/* <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-gray9D">27/07/2023</span>
            <div className="flex items-center gap-1">
              <span className="text-gray9D font-normal text-xs ">
                Giải đấu:{" "}
              </span>
              <span className="text-secondary font-bold text-xs ">
                Ngoại Hạng Anh
              </span>
            </div>
          </div>
          <div className="w-full rounded-lg bg-grayE4 shadow-xl p-2.5 my-6">
            <div className="flex items-center w-full gap-6">
              <div className="w-[45%]  flex items-center justify-end">
                <div className="flex items-center justify-center gap-2 lg:gap-4  flex-col-reverse lg:flex-row">
                  <div className="flex items-center gap-2">
                    <span className="text-lg lg:text-2xl font-bold text-black11">
                      Chelsea
                    </span>
                    <span className="text-[#9DA5AC] text-lg lg:text-2xl font-normal">
                      (CHE)
                    </span>
                  </div>
                  <div className="w-12 h-12 lg:w-[64px] lg:h-[64px] bg-white rounded-full flex items-center justify-center">
                    <div className="lg:w-12 lg:h-12 w-9 h-9 relative">
                      <Image
                        src="/images/Arsenal.png"
                        fill
                        className="w-full h-full object-fill rounded-full"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="[w-10%]">
                <div className="w-full flex justify-center items-center flex-col gap-1">
                  <Button className="text-xs font-semibold bg-secondary text-white px-3 py-1 rounded">
                    22:00
                  </Button>
                  <div className="text-xs font-semibold text-[#2C3882]">
                    26/07/2023
                  </div>
                </div>
              </div>
              <div className="w-[45%] flex items-center ">
                <div className="flex items-center justify-center gap-2 lg:gap-4  flex-col lg:flex-row">
                  <div className="w-12 h-12 lg:w-[64px] lg:h-[64px] bg-white rounded-full flex items-center justify-center">
                    <div className="lg:w-12 lg:h-12 w-9 h-9 relative">
                      <Image
                        src="/images/Arsenal.png"
                        fill
                        className="w-full h-full object-fill rounded-full"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg lg:text-2xl font-bold text-black11">
                      Chelsea
                    </span>
                    <span className="text-[#9DA5AC] text-lg lg:text-2xl font-normal">
                      (CHE)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur a, quae veritatis consequuntur illum eveniet adipisci
              quis sed sapiente ratione cupiditate repellendus qui similique
              molestias commodi ea ipsa expedita placeat voluptatem recusandae,
              illo numquam distinctio aliquam quisquam? Laboriosam aut a odit
              dolore fugit sequi, officiis magni harum unde porro iusto nemo.
              Nesciunt doloribus commodi quos fugiat iste totam dolor!
              Perferendis et eveniet nam. Voluptatum dolor, eveniet error nobis
              eaque necessitatibus amet nulla. Nobis numquam a rem amet
              voluptate eveniet rerum ex perferendis quis accusamus, fugiat
              doloribus nulla molestias id temporibus dolorem labore nostrum
              omnis iusto assumenda reprehenderit possimus laudantium aliquid!
            </p>
            <div className="flex items-center gap-6 justify-end my-6 ">
              <div className="flex items-center gap-1 text-gray9D">
                <AiOutlineLike size={24} />
                <span>1.4K</span>
              </div>
              <div className="flex items-center gap-1 text-gray9D">
                <AiOutlineMessage size={24} />
                <span>1.4K</span>
              </div>
            </div>
          </div> */}
          <div className="mt-10">
            <Heading>Đang và sắp diễn ra</Heading>
            <div className="grid grid-cols-12 gap-5">
              {new Array(9).fill(0).map((item, index) => (
                <div key={index} className="col-span-4">
                  <CardWager />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="pb-8">
            <SidebarWager />
          </div>
          <Banner />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(props: GetServerSidePropsContext) {
  try {
    const news = await getNewBySlug(props?.params?.wagerId);
    
    return {
      props: {
        data: news?.data?.result,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}

export default DetailWager;
