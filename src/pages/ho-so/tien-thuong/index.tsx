import ButtonSelectProfile from "@/components/ButtonSelectProfile";
import Button from "@/components/button/Button";
import IconBIDV from "@/components/icons/BIDV";
import useTabs from "@/hooks/useTabs";
import ProfileLayout from "@/layouts/ProfileLayout";

import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
const tabs = [
  {
    id: 1,
    name: "Rút tiền",
    nameEn: "withdraw",
  },
  {
    id: 2,
    name: "Chi tiết tiền thưởng",
    nameEn: "detailBonus",
  },
];
const MyBonus = () => {
  const { tab, setTab } = useTabs(tabs);
  return (
    <div className="w-full col-span-6">
      <div className="hidden md:inline-flex items-center gap-10 border-b mb-6">
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
      <div className="md:hidden mb-8 w-full gap-4 flex">
        {tabs.map((item, index) => {
          return (
            <ButtonSelectProfile
              key={index}
              label={item.name}
              onClick={() => setTab(item.nameEn)}
              isSelect={tab === item.nameEn}
            />
          );
        })}
      </div>

      {tab === "withdraw" ? (
        <div>
          <div className="mb-10">
            <h5 className="text-sm font-normal pb-1">Tài khoản:</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1 border-secondary border-dashed border flex items-center justify-center gap-2 rounded-lg  text-secondary h-full py-4">
                <AiOutlinePlusCircle size={32} />
                <span className="text-sm">Liên kết thẻ ngân hàng</span>
              </div>
              <div className="col-span-2 md:col-span-1 border-secondary border-dashed border flex-col p-4 justify-between flex gap-2 rounded-lg w-full h-full text-secondary">
                <IconBIDV />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-grayBB ">
                    Số thẻ
                  </span>
                  <span className="text-sm font-medium text-black">
                    **** **** **** 0749
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between pb-2">
              <label htmlFor="" className="text-sm">
                Số lượng rút
              </label>
              <div className="text-sm">
                Số dư khả dụng:{" "}
                <span className="text-secondary text-base">0</span>
              </div>
            </div>
            <input
              type="text "
              className="p-2 rounded-lg  border-2 border-[#eeeeee] w-full"
              placeholder="Tối thiểu: 1000"
            />
          </div>
          <div className="flex flex-col gap-6 items-center md:items-start">
            <div className="flex items-center gap-4">
              <span className="text-sm">Tất cả:</span>
              <span className="text-xl font-bold text-secondary">$6.60</span>
            </div>
            <Button className="w-[236px] py-4 bg-secondary text-white rounded-lg">
              Xác nhận
            </Button>
            <div className="text-sm">
              <p className="text-primary">
                Lưu ý: Chúng tôi sẽ xử lý yêu cầu rút tiền của bạn trong 5 ngày
                làm việc.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center md:gap-10 md:mb-6 justify-between flex-col md:flex-row">
            <div date-rangepicker className="flex items-center md:gap-4 gap-2">
              <span className="inline-block pr-2 text-sm text-grayBB">Từ</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center md:pl-3 pointer-events-none"></div>
                <input
                  name="start"
                  type="date"
                  className="md:gap-20 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:pl-3 py-2.5 px-1  dark:bg-white "
                  placeholder="Select date start"
                />
              </div>
              <span className="mx-2 inline-block text-sm text-grayBB">đến</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center md:pl-3 pointer-events-none"></div>
                <input
                  name="end"
                  type="date"
                  className="md:gap-20 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:pl-3 py-2.5 px-1 dark:bg-white "
                  placeholder="Select date end"
                />
              </div>
            </div>
            <Button className="text-white bg-secondary px-4 py-2 md:mr-4 w-full whitespace-nowrap md:my-0 my-4">
              Tìm kiếm
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 zinc-100:text-gray-400">
              <thead className="text-xs text-[#939FAA] font-normal bg-[#EEEEEE]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Giờ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Loại
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Lịch sử giao dịch
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số dư khả dụng
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b zinc-100:bg-zinc-100 zinc-100:border-gray-700">
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border-b zinc-100:bg-zinc-100 zinc-100:border-gray-700">
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
MyBonus.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;

export default MyBonus;
