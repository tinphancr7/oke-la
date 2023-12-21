import { ITip } from "@/interfaces";
import React from "react";
import { BsFillDatabaseFill } from "react-icons/bs";
import { FaAdjust, FaAward, FaLightbulb } from "react-icons/fa";

function AnalyticMember({ user }: { user: any }) {
  let totalTime = 0;
  user?.watched?.forEach((item: any) => {
    totalTime += Number(item?.total);
  });
  return (
    <div className="col-span-12  lg:col-span-4 shadow h-fit order-2">
      <div className="bg-secondary border-l-[20px] border-primary p-1 text-md font-bold text-white rounded-t-[4px] flex items-center justify-between">
        <div>THỐNG KÊ</div>
        {/* 
        <select className="w-[120px] border border-white bg-secondary text-[11px] h-[25px] rounded-[4px] font-semibold pl-1 outline-0">
          <option>1 tuần gần đây</option>
          <option>1 tháng gần đây</option>
          <option>3 tháng gần đây</option>
          <option>6 tháng gần đây</option>
          <option>1 năm gần đây</option>
          <option>3 năm gần đây</option>
          <option>Tất cả thời gian</option>
        </select> */}
      </div>

      <div className="border">
        <div className="py-4 px-4 border-b flex items-center justify-between">
          <div className="text-center">
            <div className="font-bold text-md">
              {user?.watched?.length || 0}
            </div>
            <div className="text-[#888] text-[11px]">TRẬN ĐÃ XEM</div>
          </div>

          <div className="text-center">
            <div className="font-bold text-md">{totalTime || 0} phút</div>
            <div className="text-[#888] text-[11px]">THỜI GIAN ĐÃ XEM</div>
          </div>
        </div>

        <div className="py-4 px-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <FaLightbulb size={28} className="text-[#333]" />

            <div className="text-center">
              <div className="font-bold text-md">{user?.countTips}</div>
              <div className="text-[#888] text-[11px]">Tips</div>
            </div>
          </div>

          {/* <div className="flex items-center gap-x-2">
            <BsFillDatabaseFill size={28} className="text-[#333]" />

            <div className="text-center">
              <div className="font-bold text-md">10.00</div>
              <div className="text-[#888] text-[11px]">
                Tiền cược trung bình
              </div>
            </div>
          </div> */}
        </div>

        <div className="py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <FaAward size={28} className="text-[#333]" />

            <div className="text-center">
              <div className="font-bold text-md">
                {user?.follower?.length || 0}
              </div>
              <div className="text-[#888] text-[11px]">Số người theo dõi</div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <FaAdjust size={28} className="text-[#333]" />

            <div className="text-center">
              <div className="font-bold text-md">{user?.following?.length}</div>
              <div className="text-[#888] text-[11px]">
                Số người đang theo dỗi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticMember;
