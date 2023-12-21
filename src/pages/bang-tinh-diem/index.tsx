import { getSeoByLink } from "@/apis/seo";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import SidebarTournament from "@/components/sidebarTournament/SidebarTournament";
import TableTranscript from "@/components/table-transcript/TableTranscript";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import { useState } from "react";
import parse from "html-react-parser";
import RankTable from "@/components/rankTable";

const Transcript = ({ tags }: { tags: string[] }) => {
  const [status, setStatus] = useState("all");
  return (
    <>
      <Head>
        {tags?.map((tag, index) => (
          <React.Fragment key={index}>{parse(tag)}</React.Fragment>
        ))}
      </Head>
      <div className="xl:container mx-auto md:px-4 xl:px-2">
        <div className="mt-6">
          <Breadcrumb
            backLink="/"
            breadCrumb={[
              { title: "Trang chủ", url: "/" },
              { title: "Bảng xếp hạng", url: "/bang-tinh-diem" },
            ]}
          />
        </div>

        {/* <div className="w-full rounded-lg bg-grayE4 shadow-xl p-2.5 mb-8">
        <div className="flex items-center w-full">
          <div className="w-[40%] lg:w-[45%]  flex items-center justify-end">
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
          <div className="w-[20%] lg:[w-10%]">
            <div className="w-full flex justify-center items-center flex-col gap-1">
              <span className="text-[#E62F2B] font-normal text-sm">54’</span>
              <div className="flex items-center gap-2">
                <span className="text-[#9DA5AC] font-bold text-2xl">1</span>
                <span className="text-[#9DA5AC] font-bold text-2xl">-</span>
                <span className="text-[#9DA5AC] font-bold text-2xl">1</span>
              </div>
            </div>
          </div>
          <div className="w-[40%] lg:w-[45%] flex items-center ">
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
      </div> */}
        {/* <div className="lg:inline-flex flex justify-between lg:justify-start  items-center gap-5 border-b-2 text-xs lg:text-base">
        <div className="text-secondary  font-semibold border-b-4 border-secondary pb-2">
          Tổng quan
        </div>
        <div className="text-[#9DA5AC]  font-normal ">Tỷ lệ cược</div>
        <div className="text-[#9DA5AC]  font-normal ">Đội hình</div>
        <div className="text-[#9DA5AC]  font-normal ">H2H</div>
        <div className="text-[#9DA5AC]  font-normal ">Bảng tính điểm</div>
      </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-4 mt-8 gap-5">
          <div className="order-2 lg:order-first col-span-1">
            <SidebarTournament />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-grayE4 rounded-lg p-4 shadow-xl">
              <div className="flex lg:items-center lg:justify-between flex-col lg:flex-row gap-4">
                <Heading className="text-[#A95E01] ">
                  Bảng xếp hạng hiện tại
                </Heading>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    className={`text-sm lg:text-base font-semibold   rounded-lg px-4 py-2 shadow-xl ${
                      status === "all"
                        ? "bg-secondary text-white"
                        : "bg-white text-black11"
                    }`}
                    onClick={() => setStatus("all")}
                  >
                    Tất cả
                  </Button>
                  <Button
                    type="button"
                    className={`text-sm lg:text-base font-semibold text-white  rounded-lg px-4 py-2 shadow-xl ${
                      status === "home"
                        ? "bg-secondary text-white"
                        : "bg-white text-black11"
                    }`}
                    onClick={() => setStatus("home")}
                  >
                    Sân nhà
                  </Button>
                  <Button
                    type="button"
                    className={`text-sm lg:text-base font-semibold   rounded-lg px-4 py-2 shadow-xl ${
                      status === "away"
                        ? "bg-secondary text-white"
                        : "bg-white text-black11"
                    }`}
                    onClick={() => setStatus("away")}
                  >
                    Sân khách
                  </Button>
                </div>
              </div>
              <div className="mt-8">
                {/* <TableTranscript
                  status={status}
                  className="rounded-b-lg bg-grayE4 shadow"
                /> */}
                <RankTable leagueId="1639" status={status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transcript;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const seo = await getSeoByLink("/bang-tinh-diem");

    return {
      props: {
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
