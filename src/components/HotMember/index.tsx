import Image from "next/image";
import RankUser from "../rank";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces";
import { getMemberGroup } from "@/apis/tip";
import ImageWithFallback from "../imageWithFallback";

const HotMember = ({ groupId }: { groupId: string }) => {
  const [member, setMember] = useState<IUser[]>([]);

  const getMember = async () => {
    try {
      const res = await getMemberGroup(groupId);
      setMember(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMember();
  }, [groupId]);

  return (
    <div className="w-full my-[20px] px-4 py-4 bg-neutral-100 flex-col justify-start items-start gap-2 inline-flex">
      <div className="self-stretch justify-between items-center gap-4 inline-flex">
        <div className="text-black text-lg font-bold">Thành viên hot</div>
        <div className="text-center text-yellow-700 text-sm font-semibold">
          Xem tất cả
        </div>
      </div>
      {member?.map((item) => {
        return (
          <div
            className="self-stretch justify-between items-center gap-2 inline-flex"
            key={item._id}
          >
            <div className="justify-start items-center gap-2 flex">
              <ImageWithFallback
                className="w-8 h-8 rounded-full"
                src={item?.avatar}
                width={8}
                height={8}
                alt="user"
              />
              <div className="flex-col justify-start items-start gap-1 inline-flex">
                <div className="text-black text-xs font-semibold">
                  {item?.full_name}
                </div>
                <RankUser rank={item?.level} />
              </div>
            </div>
            <div className="text-black text-xs font-normal leading-[15px]">
              Đóng góp {item?.tip}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotMember;
