import { getGroupByUsers } from "@/apis/user";
import Avatar from "@/components/avatar";
import ProfileLayout from "@/layouts/ProfileLayout";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { PiPencilSimpleBold, PiUserCirclePlusLight } from "react-icons/pi";

const MyGroup = () => {
  const [groups, setGroups] = useState<any>([]);

  const getGroups = async () => {
    try {
      const result = await getGroupByUsers();

      setGroups(result?.data?.result || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  return (
    <div className="col-span-8">
      <h5 className="text-lg font-bold text-black pb-6">Nhóm</h5>
      <div className="grid md:grid-cols-2 gap-5 ">
        {groups?.map((item: any, index: number) => (
          <div key={index} className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-full">
                  <Avatar
                    src={item?.avatar}
                    className="w-full h-full object-fill rounded-full"
                    alt="Logo"
                  />
                </div>
                <div>
                  <h5 className="text-secondary font-bold text-lg">
                    {item?.groupName}
                  </h5>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 ">
                      <PiPencilSimpleBold size={16} fill="#9DA5AC" />
                      <span className="text-[10px] text-[#9DA5AC] font-medium">
                        {item?.member?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold text-secondary">
                Thành viên
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
MyGroup.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;

export default MyGroup;
