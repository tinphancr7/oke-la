import { getFollowingUsers } from "@/apis/user";
import Avatar from "@/components/avatar";
import Button from "@/components/button/Button";
import IconSearchFollow from "@/components/icons/SearchFollow";
import ProfileLayout from "@/layouts/ProfileLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { PiPencilSimpleBold, PiUserCirclePlusLight } from "react-icons/pi";

const MyFollow = () => {
  const [user, setUser] = useState<any>();

  const getFollowingUser = async () => {
    try {
      const result = await getFollowingUsers();

      setUser(result.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowingUser();
  }, []);
  return (
    <div className="col-span-8">
      <div className="flex items-center  justify-between pb-6">
        <h5 className="text-lg font-bold text-black ">Theo dõi của tôi</h5>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {user?.following?.map((item: any, index: number) => (
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
                    {item?.name}
                  </h5>
                </div>
              </div>
              <Button className="text-[10px] font-semibold text-secondary rounded border border-secondary px-4 py-1">
                Đã theo dõi
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
MyFollow.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;
export default MyFollow;
