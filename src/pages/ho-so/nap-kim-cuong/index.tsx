import ButtonSelectProfile from "@/components/ButtonSelectProfile";
import Button from "@/components/button/Button";
import IconCard from "@/components/icons/Card";
import IconCoin from "@/components/icons/Coin";
import IconPerfectDiamond from "@/components/icons/PerfectDiamond";
import ProfileLayout from "@/layouts/ProfileLayout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MyDiamond = () => {
  const [tab, setTab] = useState(true);

  return (
    <div className="w-full col-span-7">
      <div className="items-center gap-10 border-b mb-10 hidden md:inline-flex">
        <div
          onClick={() => setTab(true)}
          className={`text-base pb-1 cursor-pointer transition ${
            tab
              ? "text-secondary  border-b-2 border-secondary font-bold"
              : "text-[#BBBBBB]"
          }`}
        >
          Nạp kim cương
        </div>
        <div
          onClick={() => setTab(false)}
          className={`text-base pb-1 cursor-pointer transition ${
            tab
              ? "text-[#BBBBBB]"
              : "text-secondary  border-b-2 border-secondary font-bold "
          }`}
        >
          Chi tiết kim cương
        </div>
      </div>
      <div className="md:hidden mb-8 w-full gap-4 flex">
        <ButtonSelectProfile
          onClick={() => setTab(true)}
          isSelect={tab}
          label={"Nạp kim cương"}
        />
        <ButtonSelectProfile
          onClick={() => setTab(false)}
          isSelect={!tab}
          label={"Chi tiết kim cương"}
        />
      </div>
      <div className="mb-10">
        <h5 className="text-sm font-normal pb-1">Chọn cách thanh toán:</h5>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <IconCard />
              <span>Credit card</span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <div className="w-[100px] h-[31px] relative">
                <Image
                  src="/images/PayPal.png"
                  className="w-full h-full object-fill"
                  fill
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <IconCoin />
              <span className="text-sm text-black font-normal">Gold</span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <span className="text-sm text-black font-normal">
                Đổi tiền thưởng
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h5 className="text-sm font-normal pb-1">
          Chọn số lượng kim cương{" "}
          <span className="text-[#BEBEBE]">(ít nhất 100)</span>
        </h5>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <IconPerfectDiamond />
              <span>100</span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <IconPerfectDiamond />
              <span>100</span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <IconPerfectDiamond />
              <span>100</span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="border-secondary border p-4 bg-orangeFF flex items-center justify-center gap-2 rounded-lg h-[87px]">
              <IconPerfectDiamond />
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:items-start justify-center items-center">
        <div className="flex items-center gap-4">
          <span className="text-sm">Tất cả:</span>
          <span className="text-xl font-bold text-secondary">$6.60</span>
        </div>
        <Button className="w-1/2 py-4 bg-secondary text-white rounded-lg ">
          Đi thanh toán
        </Button>
        <div className="text-sm text-justify">
          <p>
            1. Kim Cương chỉ được dùng để Mua bài/Đặt mua, không thể rút ra;
          </p>
          <p>2. Một lần ít nhất đổi 100! 100 tiền thưởng bằng 100 kim cương;</p>
          <p>
            3. Không nạp được kim cương?{" "}
            <Link href="/">Click để liên lạc chúng tôi!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
MyDiamond.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;

export default MyDiamond;
