import dynamic from "next/dynamic";
import React from "react";
import { ITip } from "@/interfaces";

const NewestTipItem = dynamic(() => import("./NewestTipItem"), {
  ssr: false,
});

function NewestTip({ tips }: { tips: any }) {
  return (
    <div className="col-span-12 lg:col-span-5 shadow h-fit order-4 lg:order-5 mt-4">
      <div className="bg-secondary border-l-[20px] border-primary p-1 text-md font-bold text-white rounded-t-[4px] flex items-center justify-between">
        <div>TIPS MỚI NHẤT</div>

        {/* <select className="w-[130px] border border-white bg-secondary text-[11px] h-[25px] rounded-[4px] font-semibold pl-1 outline-0">
          <option>Thắng/ Hòa/ Thua</option>
          <option>Thắng</option>
          <option>Thua</option>
        </select> */}
      </div>

      <div>
        {tips?.length === 0 ? (
          <div className="text-center py-4 text-sm lg:text-lg font-semibold">
            Hiện tại chưa có tip
          </div>
        ) : (
          <>
            {tips?.map((item: ITip, index: number) => (
              <NewestTipItem index={index} item={item} key={item?._id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default NewestTip;
