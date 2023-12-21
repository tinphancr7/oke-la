import React, { useContext } from "react";
import IconDiamond from "../icons/Diamond";
import IconWallet from "../icons/Wallet";
import IconIdentificationBadge from "../icons/IdentificationBadge";
import IconFileText from "../icons/FileText";
import IconUserCirclePlus from "../icons/UserCirclePlus";
import IconUsersFour from "../icons/UsersFour";
import IconMessengerLogo from "../icons/MessengerLogo";
import IconChatText from "../icons/ChatText";
import IconSignOut from "../icons/SignOut";
import Link from "next/link";
import SidebarMobileProfile from "./SidebarMobileProfile";
import IconHandCoin from "../icons/HandCoin";
import { AuthContext } from "@/context/AuthContext";

interface ISidebarProfile {
  setItemSelected: (id: number) => void;
  itemSelected: number;
  setItemHovered: (id: number) => void;
  itemHovered: number;
  onLogout: () => void;
}
export const linksProfile = {
  diamond: "/nap-kim-cuong",
  bonus: "tien-thuong",
  user: "/",
  post: "/bai-viet",
  follow: "/theo-doi",
  tip: "tip-da-dat",
  group: "/nhom",
  message: "/tin-nhan",
  reply: "/phan-hoi",
};

const SidebarProfile: React.FC<ISidebarProfile> = ({
  setItemSelected,
  itemSelected,
  setItemHovered,
  itemHovered,
  onLogout,
}) => {
  const { user } = useContext(AuthContext);

  const sidebars = [
    // {
    //   id: 1,
    //   name: "Kim cương của tôi",
    //   icon: (color: string) => {
    //     return <IconDiamond color={color} />;
    //   },
    //   link: "nap-kim-cuong",
    // },
    // {
    //   id: 2,
    //   name: "Tiền thưởng của tôi",
    //   icon: (color: string) => {
    //     return <IconWallet color={color} />;
    //   },
    //   link: "tien-thuong",
    // },
    {
      id: 3,
      name: "Thông tin cá nhân",
      icon: (color: string) => {
        return <IconIdentificationBadge color={color} />;
      },
      link: "/",
    },
    {
      id: 4,
      name: "Bài viết",
      icon: (color: string) => {
        return <IconFileText color={color} />;
      },
      link: "bai-viet",
    },
    {
      id: 5,
      name: "Theo dõi của tôi",
      icon: (color: string) => {
        return <IconUserCirclePlus color={color} />;
      },
      link: "theo-doi",
    },
    // {
    //   id: 6,
    //   name: "Tips đặt mua",
    //   icon: (color: string) => {
    //     return <IconWallet color={color} />;
    //   },
    //   link: "tip-dat-mua",
    // },
    {
      id: 7,
      name: "Nhóm",
      icon: (color: string) => {
        return <IconUsersFour color={color} />;
      },
      link: "nhom",
    },
    {
      id: 8,
      name: "Tips",
      icon: (color: string) => {
        return <IconHandCoin color={color} />;
      },
      link: "/thanh-vien/" + user?.username,
      isRedirect: true,
    },
    // {
    //   id: 8,
    //   name: "Tin nhắn",
    //   icon: (color: string) => {
    //     return <IconMessengerLogo color={color} />;
    //   },
    //   link: "tin-nhan",
    // },
    // {
    //   id: 9,
    //   name: "Phản hồi",
    //   icon: (color: string) => {
    //     return <IconChatText color={color} />;
    //   },
    //   link: "phan-hoi",
    // },
    // {
    //   id: 10,
    //   name: "Đăng xuất",
    //   icon: (color: string) => {
    //     return <IconSignOut color={color} />;
    //   },
    //   onClick: () => {
    //     console.log('asdsadasd')
    //   },
    //   link: "dang-xuat",
    // },
  ];

  return (
    <>
      <div className="w-full bg-grayF4 p-4 hidden md:block">
        {sidebars.map((item, index) => (
          <Link
            href={item?.isRedirect ? item?.link : `/ho-so/${item.link}`}
            onClick={() => {
              setItemSelected(item.id);
            }}
            key={index}
            className={`flex items-center gap-2 p-4 border-b cursor-pointer transition-all last:mt-4 hover:bg-orangeFF hover:text-secondary  hover:border-l-2 hover:border-l-secondary ${
              itemSelected === item.id
                ? "bg-orangeFF text-secondary  border-l-2 border-l-secondary"
                : "bg-white"
            }`}
            onMouseMove={() => setItemHovered(item.id)}
            onMouseLeave={() => setItemHovered(0)}
          >
            {item.icon(
              itemSelected === item.id || itemHovered === item.id
                ? "#A95E01"
                : "#6C6C6C"
            )}
            <span className="text-sm font-normal">{item.name}</span>
          </Link>
        ))}
        <div
          className={`flex items-center gap-2 p-4 border-b cursor-pointer transition-all last:mt-4 hover:bg-orangeFF hover:text-secondary  hover:border-l-2 hover:border-l-secondary bg-white`}
          onMouseMove={() => setItemHovered(10)}
          onMouseLeave={() => setItemHovered(0)}
          onClick={onLogout}
        >
          <IconSignOut color={itemHovered === 10 ? "#A95E01" : "#6C6C6C"} />{" "}
          Đăng xuất
        </div>
      </div>
      <SidebarMobileProfile
        menu={sidebars}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />
    </>
  );
};

export default SidebarProfile;
