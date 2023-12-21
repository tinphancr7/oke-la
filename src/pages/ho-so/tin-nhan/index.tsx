import IconLetter from "@/components/icons/Letter";
import useTabs from "@/hooks/useTabs";
import ProfileLayout from "@/layouts/ProfileLayout";

import React, { useState } from "react";

const tabs = [
  {
    id: 1,
    name: "Tất cả",
    nameEn: "all",
  },
  {
    id: 2,
    name: "Thông báo",
    nameEn: "info",
  },
  {
    id: 3,
    name: "Trả lời",
    nameEn: "reply",
  },
  {
    id: 4,
    name: "Theo dõi",
    nameEn: "follow",
  },
  {
    id: 5,
    name: "Like",
    nameEn: "like",
  },
];
const MyMessage = () => {
  const { tab, setTab } = useTabs(tabs);
  return (
    <div className="w-full col-span-7">
      <h5 className="text-lg font-bold text-black pb-6 hidden md:block">Tin nhắn</h5>
      <div className="hidden md:inline-flex items-center gap-10 border-b mb-4">
        {tabs.map((item, index) => (
          <div
            key={index}
            onClick={() => setTab(item.nameEn)}
            className={` text-base  pb-1  cursor-pointer transition ${
              tab === item.nameEn
                ? "text-secondary  border-b-2 border-secondary font-bold"
                : "text-[#BBBBBB]"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div>
        {new Array(10).fill(0).map((item, index) => (
          <div key={index} className="border-b py-4">
            <div className="flex items-center gap-2 pb-4">
              <div className="bg-grayF4 p-2 rounded-full flex items-center justify-center">
                <IconLetter />
              </div>
              <div className="flex justify-center gap-1 flex-col">
                <span className="text-base font-bold text-secondary">
                  Tin nhắn
                </span>
                <span className=" font-normal text-xs text-[#9DA5AC]">
                  27/07/2023
                </span>
              </div>
            </div>
            <p className="text-gray9D text-sm font-medium leading-6">
              Hoạt Động Dự Đoán World Cup Nữ 2023 Trúng Quà🎁| Kỳ 11 đã bắt
              đầu!!!
              <br />
              Tham gia ngay ➡➡https://tips.okchoi.com/article/705748
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
MyMessage.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;

export default MyMessage;
