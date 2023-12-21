import ImageWithFallback from "@/components/imageWithFallback";
import { AuthContext } from "@/context/AuthContext";
import { IGroup } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const GroupCard = ({ group }: { group: IGroup }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full justify-between items-center  inline-flex">
      <div className="pb-px justify-start items-center gap-2 flex">
        <ImageWithFallback
          className="w-8 h-8 rounded-full"
          src={group?.groupAvatar}
        />
        <div className="flex-col justify-start items-start gap-1 inline-flex">
          <Link
            href={`/${group?._id}/tips`}
            className="text-yellow-700 text- font-bold"
          >
            {group?.groupName}
          </Link>
          <div className="justify-start items-start gap-4 inline-flex">
            <div className="justify-start items-end gap-0.5 flex">
              <div className="w-4 h-4 justify-center items-center flex">
                <div className="w-4 h-4 relative">
                  <Image
                    src="/images/Users.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[18px] text-gray-400 text-[10px] font-medium leading-[15px]">
                {group?.member.length}
              </div>
            </div>
            <div className="justify-start items-start gap-0.5 flex">
              <div className="w-4 h-4 justify-center items-center flex">
                <div className="w-4 h-4 relative">
                  <Image src="/images/Pen2.svg" width={16} height={16} alt="" />
                </div>
              </div>
              <div className="w-[18px] text-gray-400 text-[10px] font-medium leading-[15px]">
                {group?.tip}
              </div>
            </div>
          </div>
        </div>
      </div>
      {group?.member.includes(user?._id) ? (
        <button className="p-2 py-1 rounded-sm border border-orange-600  text-orange-600 hover:bg-orange-500 hover:text-white  text-[11px] font-medium">
          Rời khỏi nhóm
        </button>
      ) : (
        <button className="p-2 py-1 rounded-sm border border-amber-500 hover:bg-amber-500 hover:text-white  text-amber-500 text-[11px] font-medium">
          Tham gia
        </button>
      )}
    </div>
  );
};

export default GroupCard;
