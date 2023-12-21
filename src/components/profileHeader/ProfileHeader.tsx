import React, { useContext } from "react";
import IconDiamond from "../icons/Diamond";
import Button from "../button/Button";
import IconWallet from "../icons/Wallet";
import { BiLike, BiSolidUser, BiUserPlus } from "react-icons/bi";
import { HiCamera } from "react-icons/hi";
import { AuthContext } from "@/context/AuthContext";
import ArticleIcon from "../icons/Article";
import IconUserPlus from "../icons/UserPlus";
import { uploadAvatar } from "@/apis/user";
import { toast } from "react-toastify";
import config from "@/config";
const ProfileHeader = () => {
  const {
    user,
    uploadAvatar: uploadUserAvatar,
  }: { user: any; uploadAvatar: any } = useContext(AuthContext);
  const postAvatar = async (file: any) => {
    try {
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
      console.log(acceptedImageTypes.includes(file["type"]));
      if (!acceptedImageTypes.includes(file["type"])) {
        toast.success("File không phải là hình ảnh");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const upload = await uploadAvatar(formData);
      uploadUserAvatar(upload.data?.result);
      toast.success("Upload avatar thành công");
    } catch (error) {
      console.log(error);
      toast.error("Upload avatar thất bại");
    }
  };
  return (
    <div className="bg-grayF4 rounded-md p-4 my-5">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col">
        <div className="flex items-center gap-6">
          <input
            onChange={(e) => {
              postAvatar(e.target.files?.[0]);
            }}
            type="file"
            className="hidden"
            id="upload-avatar"
          />
          <label htmlFor="upload-avatar">
            {!user?.avatar ? (
              <div className="bg-orangeFF w-20 h-20 rounded-full flex items-center justify-center relative">
                <BiSolidUser size={40} className="text-secondary" />
                <div className=" w-5 h-5 bg-secondary rounded-full absolute bottom-1 right-1 flex items-center justify-center">
                  <HiCamera size={16} fill="white" />
                </div>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-full w-20 h-20"
                  src={`${config.CDN_URL}/${user?.avatar}`}
                />
              </div>
            )}
          </label>
          <div className="flex flex-col justify-center gap-2">
            <div className="text-xl font-bold text-black">{user?.username}</div>
            <div className=" md:flex items-center gap-[66px]  hidden">
              <div className="items-center gap-1">
                <span className="text-base font-normal text-black">
                  Bài viết:
                </span>
                <span className="text-secondary font-bold text-base">
                  {user?.tips}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base font-normal text-black">
                  Theo dõi:
                </span>
                <span className="text-secondary font-bold text-base">
                  {user?.following?.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base font-normal text-black">
                  Người theo dõi:
                </span>
                <span className="text-secondary font-bold text-base">
                  {user?.follower?.length}
                </span>
              </div>
            </div>
            <div className="items-center md:hidden flex gap-8">
              <div className="items-center gap-1 flex">
                <ArticleIcon />
                <span className="text-gray-400">1.4K</span>
              </div>
              <div className="flex items-center gap-1">
                <BiLike className="text-gray-400" />
                <span className="text-gray-400">1.4K</span>
              </div>
              <div className="flex items-center gap-1">
                <IconUserPlus />
                <span className="text-gray-400">1.4K</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex h-1/2 gap-2 md:align-middle md:items-center flex-col md:flex-row ">
              <span className="text-base font-normal text-black flex gap-2">
                <IconDiamond color="#A95E01" />
                Kim cương của tôi
              </span>
              <span className="text-secondary font-bold text-base">0</span>
            </div>
            <div className="flex h-1/2 gap-2 md:align-middle md:items-center md:flex-row flex-col">
              <span className="text-base font-normal text-black flex gap-2">
                <IconWallet color="#A95E01" />
                Tiền thưởng của tôi
              </span>
              <span className="text-green00 font-bold text-base">0</span>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 gap-4 flex justify-between md:flex-col  ">
            <Button
              type="button"
              className="bg-secondary text-white px-4 py-2 md:w-full mb-2 whitespace-nowrap"
            >
              Nạp kim cương
            </Button>
            <Button
              type="button"
              className="border border-secondary text-secondary px-4 py-2 md:w-full mb-2 whitespace-nowrap"
            >
              Rút tiền thưởng
            </Button>
          </div>
        </div>

        {/* <div className="flex flex-col gap-3">
          <div className="flex item-center gap-20 justify-between">
            <div className="flex items-center gap-2">
              <IconDiamond color="#A95E01" />
              <span className="text-base font-normal text-black">
                Kim cương của tôi
              </span>
              <span className="text-secondary font-bold text-base">0</span>
            </div>
          </div>
          <div className="flex item-center gap-20 justify-between">
            <div className="flex items-center gap-2">
              <IconWallet color="#A95E01" />
              <span className="text-base font-normal text-black">
                Tiền thưởng của tôi
              </span>
              <span className="text-green00 font-bold text-base">0</span>
            </div>
            <Button
              type="button"
              className="border border-secondary text-secondary px-4 py-2"
            >
              Rút tiền thưởng
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
