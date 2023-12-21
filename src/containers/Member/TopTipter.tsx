import Avatar from "@/components/avatar";
import IconStar from "@/components/icons/Star";
import { Tooltip } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import BoxHoverTipter from "./BoxHoverTipter";
import Refund from "./Refund";

const TipterItem = ({ item }: { item: any }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        href={`/thanh-vien/${item?.username}`}
        className="border-b p-2 flex items-center gap-x-2 justify-between hover:bg-[#f8f9fa]"
      >
        <Avatar src="" alt="" size="42px" />

        <div className="flex-1">
          <Tooltip title={item?.full_name}>
            <div className="font-bold text-xs line-clamp-1 max-w-[100px]">
              {item?.full_name}
            </div>
          </Tooltip>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <AiFillStar className="text-primary text-[12px]" key={item} />
            ))}
          </div>

          {/* <div className="flex items-center gap-x-[1px] mt-1">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div
            className={`w-[8px] h-[8px] mb-1 rounded-full ${
              item % 2 === 0 ? "bg-secondary" : "bg-[#3051d9]"
            }`}
            key={item}
          ></div>
        ))}
      </div> */}
        </div>

        <div className="bg-[#eee] rounded-[4px] px-2 py-1 text-center">
          <div className="text-xs font-bold">{item?.tips}</div>
          <div className="text-[10px] text-[#888] font-semibold">Tips</div>
        </div>

        <div className="bg-[#eee] rounded-[4px] px-2 py-1 text-center">
          <div className="text-xs font-bold">{item?.level}</div>
          <div className="text-[10px] text-[#888] font-semibold">Level</div>
        </div>

        {/* <div className="bg-[#eee] rounded-[4px] px-2 py-1 text-center">
      <div className="text-xs font-bold text-secondary">188</div>
      <div className="text-[10px] text-[#888] font-semibold">
        Lợi nhuận
      </div>
    </div> */}
      </Link>
      {show && <BoxHoverTipter show={show} item={item} />}
    </div>
  );
};

function TopTipter({ rank }: { rank: any }) {
  return (
    <>
      <div className="col-span-12 lg:col-span-4 h-fit order-6">
        <Refund />
        <div className="shadow">
          <div className="bg-secondary border-l-[20px] border-primary p-1 text-md font-bold text-white rounded-t-[4px] mt-4">
            TOP TIPTER
          </div>

          <div>
            {rank?.map((item: any) => (
              <TipterItem item={item} key={item?._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopTipter;
