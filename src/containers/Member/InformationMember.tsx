import Avatar from "@/components/avatar";
import IconStar from "@/components/icons/Star";
import { AuthContext } from "@/context/AuthContext";
import { IUser } from "@/interfaces";
import React, { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiSolidShareAlt } from "react-icons/bi";
import { ImPower } from "react-icons/im";

function InformationMember({ user }: { user: IUser }) {
  const { user: userCurrent } = useContext(AuthContext);

  return (
    <div className="col-span-12 lg:col-span-3 shadow h-full order-1 border">
      <div className="bg-secondary border-l-[20px] border-primary p-1 text-md font-bold text-white rounded-t-[4px]">
        THÔNG TIN
      </div>

      <div className="py-4 flex flex-col items-center">
        <Avatar src={user?.avatar || ""} shape="circle" size="64px" />
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <AiFillStar className="text-primary text-[22px]" key={item} />
          ))}
        </div>
        <div className="text-secondary mt-1 font-bold">{user?.full_name}</div>

        <div className="flex items-center gap-x-2 mt-4">
          {user?._id === userCurrent?._id ? null : user?.follower?.includes(
              userCurrent?._id
            ) ? (
            <button className="px-4 rounded-[6px] h-[30px] bg-[#f3f4f4] flex items-center text-black gap-x-1">
              <AiFillStar className="text-primary" />
              <span className="text-sm font-semibold">Bỏ Theo dõi</span>
            </button>
          ) : (
            <button className="px-4 rounded-[6px] h-[30px] bg-[#f3f4f4] flex items-center text-black gap-x-1">
              <AiFillStar className="text-black" />
              <span className="text-sm font-semibold">Theo dõi</span>
            </button>
          )}

          <button className="px-4 rounded-[6px] h-[30px] bg-[#f3f4f4]  flex items-center text-black gap-x-1">
            <AiFillStar className="w-[18px] h-[18px] text-primary" />
            <span className="text-sm font-semibold">Chia sẻ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InformationMember;
