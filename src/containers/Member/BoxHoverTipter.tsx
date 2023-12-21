import { getUserInfo } from "@/apis/user";
import Avatar from "@/components/avatar";
import LoadingSmall from "@/components/loading/LoadingSmall";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaAdjust, FaAward, FaLightbulb } from "react-icons/fa";

type Props = {
  show: boolean;
  item: any;
};

function BoxHoverTipter({ item, show }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  let totalTime = 0;
  user?.watched?.forEach((item: any) => {
    totalTime += Number(item?.total || 0);
  });

  const getInfo = async () => {
    try {
      setIsLoading(true);
      const result = await getUserInfo(item?.username);

      setUser(result.data?.result || {});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      getInfo();
    }
  }, [show, item]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`box-hover-tipter shadow ${show ? "show" : ""}`}
    >
      {isLoading ? (
        <div className="bg-light py-8 text-center">
          <LoadingSmall />
        </div>
      ) : (
        <>
          <div className="bg-light px-2 py-1 flex items-center gap-x-4">
            <Avatar src="" alt="" size="42px" />

            <div>
              <div className="font-bold text-sm line-clamp-1">
                {item?.full_name}
              </div>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <AiFillStar className="text-primary text-[14px]" key={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-grayE4 p-2 rounded-b-[4px] flex flex-col items-center">
            <div className="">
              <button className="px-3 rounded-[6px] h-[28px] bg-[#f3f4f4] flex items-center text-black gap-x-1">
                <AiFillStar color="#000" size={12} />
                <span className="text-xs font-semibold">Theo dõi</span>
              </button>
            </div>

            <div className="shadow flex-1 w-full mt-2 bg-white rounded-[4px]">
              <div className="p-2 border-b flex items-center justify-between">
                <div className="text-center">
                  <div className="font-bold text-sm">
                    {user?.watched?.length || 0}
                  </div>
                  <div className="text-[#888] text-[10px]">TRẬN ĐÃ XEM</div>
                </div>

                <div className="text-center">
                  <div className="font-bold text-sm">{totalTime || 0} phút</div>
                  <div className="text-[#888] text-[10px]">
                    THỜI GIAN ĐÃ XEM
                  </div>
                </div>
              </div>

              <div className="p-2 border-b flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <FaLightbulb size={14} className="text-[#333]" />

                  <div className="text-center">
                    <div className="font-bold text-sm">
                      {user?.countTips || 0}
                    </div>
                    <div className="text-[#888] text-[11px]">Tips</div>
                  </div>
                </div>
              </div>

              <div className="p-2 flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <FaAward size={14} className="text-[#333]" />

                  <div className="text-center">
                    <div className="font-bold text-sm">
                      {user?.follower?.length || 0}
                    </div>
                    <div className="text-[#888] text-[10px]">
                      Số người theo dõi
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-x-2">
                  <FaAdjust size={14} className="text-[#333]" />

                  <div className="text-center">
                    <div className="font-bold text-sm">
                      {user?.following?.length || 0}
                    </div>
                    <div className="text-[#888] text-[10px]">
                      Số người đang theo dỗi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BoxHoverTipter;
