import { getDetailGroup, joinGroup, leaveGroup } from "@/apis/tip";
import { IGroup } from "@/interfaces";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import ImageWithFallback from "../imageWithFallback";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

interface Props {
  groupId: string;
}

const DetailGroup = ({ groupId }: Props) => {
  const [group, setGroup] = useState<IGroup>();

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const getGroup = async () => {
    try {
      const res = await getDetailGroup(groupId);
      setGroup(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const res = await leaveGroup(groupId);
      if (res.data?.status === 1) {
        router.push("/");
        toast.success("Rời khỏi nhóm thành công");
      } else {
        toast.error("Rời khỏi nhóm thất bại");
      }
    } catch (error) {
      toast.error("Rời khỏi nhóm thất bại");
    }
  };
  const handleJoinGroup = async (groupId: string) => {
    try {
      if (!user) {
        toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
      } else {
        const res = await joinGroup(groupId);
        if (res.data.status === 1) {
          toast.success("Tham gia nhóm thành công");
          getGroup();
        } else {
          toast.error("Tham gia nhóm thất bại");
        }
      }
    } catch (error) {
      toast.error("Tham gia nhóm thất bại");
    }
  };

  useEffect(() => {
    getGroup();
  }, [groupId]);

  return (
    <div className="md:p-4 md:mt-0 md:mb-4 bg-neutral-100 flex-col justify-start items-center gap-4 inline-flex  p-4">
      <div className="self-stretch h-[117px] flex-col justify-start items-center gap-2 flex">
        <ImageWithFallback
          className="w-20 h-[90px] rounded-full"
          src={group?.groupAvatar}
          alt=""
          width={100}
          height={100}
        />
        <div className="text-black text-lg font-bold">{group?.groupName}</div>
      </div>
      <div className="self-stretch text-neutral-400 text-xs font-medium text-center">
        {group?.groupDesc}
      </div>
      <div className="self-stretch h-[0px] border border-neutral-200"></div>
      <div className="self-stretch justify-start items-start inline-flex">
        <div className="grow shrink basis-0 flex-col justify-center items-center gap-1 inline-flex">
          <div className="text-amber-500 text-base font-bold">{group?.tip}</div>
          <div className="text-neutral-400 text-xs font-medium">Bài viết</div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-center gap-1 inline-flex">
          <div className="text-amber-500 text-base font-bold">
            {group?.member.length}
          </div>
          <div className="text-neutral-400 text-xs font-medium">Thành viên</div>
        </div>
      </div>

      {group && group?.member.includes(user?._id) ? (
        <button
          onClick={handleLeaveGroup}
          className="h-11 p-2 rounded-lg border border-orange-600 flex  justify-center gap-2 w-full cursor-pointer hover:bg-orange-600 text-orange-600 text-sm font-semibold hover:text-white"
        >
          Rời khỏi nhóm
        </button>
      ) : (
        <button
          onClick={() => handleJoinGroup(group?._id as string)}
          className="h-11 p-2 rounded-lg border border-amber-500 flex  justify-center gap-2 w-full cursor-pointer hover:bg-amber-500 text-amber-500 text-sm font-semibold hover:text-white"
        >
          Tham gia
        </button>
      )}
    </div>
  );
};

export default DetailGroup;
