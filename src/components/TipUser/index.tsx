import { IUser } from "@/interfaces";
import ImageWithFallback from "../imageWithFallback";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserForTip } from "@/apis/tip";
import { toast } from "react-toastify";
import { fowllow, unFowllow } from "@/apis/user";
import { AuthContext } from "@/context/AuthContext";

type Props = {
  userId: string;
};

const TipUser = ({ userId }: Props) => {
  const { user: authUser } = useContext(AuthContext);

  const [user, setUser] = useState<IUser>();

  const getUser = async () => {
    try {
      const res = await getUserForTip(userId);

      setUser(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleFowllow = async () => {
    try {
      const res = await fowllow(user?._id as string);
      if (res.data?.status === 1) {
        toast.success("Theo dõi người dùng thành công");
        getUser();
      } else {
        toast.error("Theo dõi người dùng thất bại");
      }
    } catch (error) {
      toast.error("Theo dõi người dùng thất bại");
    }
  };
  const handleUnFowllow = async () => {
    try {
      const res = await unFowllow(user?._id as string);
      if (res.data?.status === 1) {
        toast.success("Bỏ theo dõi người dùng thành công");
        getUser();
      } else {
        toast.error("Bỏ theo dõi người dùng thất bại");
      }
    } catch (error) {
      toast.error("Bỏ theo dõi người dùng thất bại");
    }
  };

  return (
    <div className="bg-neutral-100 px-4 py-4">
      <div className="w-full flex flex-col justify-center items-center border-b-2 gap-2 pb-4">
        <ImageWithFallback
          src={user?.avatar}
          alt=""
          className="w-20 h-20 rounded-full"
        />
        <p className="text-black text-lg font-bold">{user?.full_name}</p>
      </div>
      <div className="w-full grid grid-cols-3 justify-center items-center my-4">
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-amber-500 text-base font-bold">{user?.tip}</p>
          <p className="text-neutral-400 text-xs font-medium">Bài viết</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-amber-500 text-base font-bold">{user?.like}</p>
          <p className="text-neutral-400 text-xs font-medium">Lượt thích</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-amber-500 text-base font-bold">
            {user?.follower.length}
          </p>
          <p className="text-neutral-400 text-xs font-medium">Người theo dõi</p>
        </div>
      </div>
      {user?._id !== authUser?._id ? (
        user?.follower.includes(authUser?._id) ? (
          <button
            onClick={handleUnFowllow}
            className="flex w-full rounded-lg border border-orange-500 justify-center items-center gap-2 text-orange-500 text-sm font-semibold py-4"
          >
            Bỏ theo dõi
          </button>
        ) : (
          <button
            onClick={handleFowllow}
            className="flex w-full rounded-lg border border-amber-500 justify-center items-center gap-2 text-amber-500 text-sm font-semibold py-4"
          >
            Theo dõi
          </button>
        )
      ) : null}
    </div>
  );
};

export default TipUser;
