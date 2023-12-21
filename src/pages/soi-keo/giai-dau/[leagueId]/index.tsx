import Breadcrumb from "@/components/Breadcrumb";
import Banner from "@/components/banner/Banner";
import CardWager from "@/components/cardWager/CardWager";
import Heading from "@/components/heading/Heading";
import React from "react";

const LeagueWager = () => {
  return (
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
      <Heading>Champion League</Heading>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-5 mb-8">
            <div className="col-span-12 lg:col-span-8">
              <CardWager isPrimary isLive={false} classNameImg="h-[340px]" />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <CardWager isLive={false} className="mb-8" />
              <CardWager isLive={false} />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5">
            {new Array(9).fill(0).map((item, index) => (
              <div key={index} className="col-span-12 lg:col-span-4">
                <CardWager isLive={false} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <div className="pb-6">
            <Banner />
          </div>
          <div className="bg-grayF4 rounded-sm p-2">
            <Heading>Đang và sắp diễn ra</Heading>
            <div>
              {new Array(9).fill(0).map((item, index) => (
                <div key={index} className="pb-4">
                  <CardWager type="secondary" isLive={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueWager;
