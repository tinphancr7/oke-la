import Avatar from "@/components/avatar";
import RankUser from "@/components/rank";
import Link from "next/link";
import React from "react";

type Props = {
  user: User;
  index: number;
  border?: boolean;
};
interface User {
  level: number;
  username: string;
  _id: string;
  tips: number;
  avatar: string;
  full_name: string;
}

function RankHomeItem({ user, index, border = true }: Props) {
  return (
    <Link href={`/thanh-vien/${user?.username}`}>
      <div
        className={`w-full flex items-center gap-x-2 py-2 ${
          border ? "border-b last:border-b-0" : ""
        }`}
      >
        <div className="w-6">
          {index < 4 ? (
            <img
              src={`/images/hang-${index}.png`}
              style={{ height: "auto", width: "1.5rem" }}
            />
          ) : (
            <div className="text-sm font-bold text-center">{index}</div>
          )}
        </div>

        <Avatar
          src={
            user?.avatar
              ? user.avatar
              : "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg"
          }
          alt=""
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-sm font-semibold mb-1">{user?.full_name}</div>
            <RankUser rank={user?.level} />
          </div>

          <div className="text-xs">Đóng góp {user?.tips}</div>
        </div>
      </div>
    </Link>
  );
}

export default RankHomeItem;
