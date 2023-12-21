import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import ListIcon from "@/components/icons/List";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import IconLiveStream from "@/components/icons/LiveStream";
import IconHandCoin from "@/components/icons/HandCoin";
import { AuthContext } from "@/context/AuthContext";
import CloseIcon from "@/components/icons/ClostIcon";
import { useRouter } from "next/router";
import HouseIcon from "@/components/icons/HouseIcon";
import { AiFillHome } from "react-icons/ai";
import { HiCash } from "react-icons/hi";
import Avatar from "@/components/avatar";
import Auth from "@/layouts/Auth";

export const HeaderMobileMenu = ({
  menus,
  className,
  user,
  openMenu,
  setOpenMenu,
}: {
  menus?: Array<any>;
  className?: string;
  user?: any;
  openMenu?: boolean;
  setOpenMenu: (open: boolean) => void;
}) => {
  const router = useRouter();

  const { logOutUser } = useContext(AuthContext);

  const handleLogOut = () => {
    logOutUser();
    router.push("/");
    setOpenMenu(false);
  };

  const iconMenuWithLogo = () => {
    return (
      <div className="flex items-center">
        <ButtonOnlyIcon
          wrapperClassName="w-8 h-8"
          onClick={() => setOpenMenu(openMenu ? false : true)}
        >
          {openMenu ? <CloseIcon /> : <ListIcon />}
        </ButtonOnlyIcon>
      </div>
    );
  };
  return (
    <div
      style={{
        boxShadow: `0px 1px 2px 0px rgba(0, 0, 0, 0.25)`,
      }}
      className={`${className} w-full h-full bg-white  px-4 pb-4  items-center justify-between rounded-b-[16px]`}
    >
      <div className="flex justify-between">
        <Link
          href={"/"}
          className="ml-4 w-20 h-20 relative"
          onClick={() => setOpenMenu(false)}
        >
          <Image
            src={"/images/logo-banhgio.png"}
            alt="Logo"
            className="object-contain "
            fill
          />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-4 float-right">
            {user?._id && (
              <>
                <Link href={`/thanh-vien/${user?.username}`}>
                  <ButtonOnlyIcon
                    wrapperClassName="bg-white p-2 rounded-lg "
                    wrapperStyle={{ border: "1px solid #7D7D7D" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M18.6875 8.10063C18.6118 7.86733 18.4692 7.66146 18.2773 7.50865C18.0855 7.35584 17.8529 7.26285 17.6086 7.24125L12.9688 6.84125L11.15 2.51625C11.0553 2.28931 10.8956 2.09546 10.691 1.95911C10.4863 1.82276 10.2459 1.75 10 1.75C9.75411 1.75 9.51371 1.82276 9.30907 1.95911C9.10443 2.09546 8.94471 2.28931 8.85002 2.51625L7.03674 6.84125L2.39142 7.24359C2.14614 7.26421 1.9124 7.35678 1.71952 7.5097C1.52663 7.66262 1.38319 7.86909 1.30718 8.10321C1.23117 8.33733 1.22598 8.58868 1.29225 8.82574C1.35852 9.0628 1.49331 9.27502 1.6797 9.43578L5.20392 12.5155L4.14767 17.0889C4.09182 17.3282 4.10776 17.5787 4.19349 17.809C4.27923 18.0394 4.43095 18.2393 4.6297 18.3839C4.82845 18.5284 5.0654 18.6112 5.31093 18.6218C5.55647 18.6324 5.79968 18.5704 6.01017 18.4436L9.99455 16.0217L13.9875 18.4436C14.198 18.5704 14.4412 18.6324 14.6868 18.6218C14.9323 18.6112 15.1692 18.5284 15.368 18.3839C15.5667 18.2393 15.7185 18.0394 15.8042 17.809C15.8899 17.5787 15.9059 17.3282 15.85 17.0889L14.7945 12.5108L18.318 9.43578C18.5044 9.27446 18.6389 9.06164 18.7046 8.82408C18.7704 8.58651 18.7644 8.33481 18.6875 8.10063ZM17.4985 8.49125L13.975 11.5662C13.8035 11.7154 13.676 11.9085 13.606 12.1248C13.5361 12.341 13.5265 12.5723 13.5781 12.7936L14.6367 17.3748L10.6469 14.953C10.4522 14.8344 10.2287 14.7717 10.0008 14.7717C9.77288 14.7717 9.54936 14.8344 9.3547 14.953L5.37033 17.3748L6.42189 12.7967C6.47357 12.5754 6.46393 12.3442 6.394 12.1279C6.32407 11.9116 6.1965 11.7185 6.02502 11.5694L2.50002 8.49594C2.49973 8.4936 2.49973 8.49124 2.50002 8.48891L7.14377 8.08734C7.37049 8.06736 7.58745 7.98585 7.77125 7.85162C7.95505 7.71738 8.09871 7.53551 8.18674 7.32563L10 3.00609L11.8125 7.32563C11.9005 7.53551 12.0442 7.71738 12.228 7.85162C12.4118 7.98585 12.6288 8.06736 12.8555 8.08734L17.5 8.48891C17.5 8.48891 17.5 8.49359 17.5 8.49438L17.4985 8.49125Z"
                        fill="#111111"
                      />
                    </svg>
                  </ButtonOnlyIcon>
                </Link>
              </>
            )}
            {!user?._id && <Auth />}
          </div>
          {iconMenuWithLogo()}
        </div>
      </div>

      <div className="grid grid-flow-row grid-cols-6 gap-[12px] mt-4">
        <Link href={"/truc-tiep"} className="col-span-3">
          <button className="bg-light-red px-4 py-2 rounded-lg gap-x-4 flex items-center shadow-brand-red h-full w-full justify-center">
            <IconLiveStream />
            <span className="text-white font-semibold">Trực tiếp</span>
          </button>
        </Link>
        <Link href={"/tips"} className="col-span-3">
          <button className="bg-secondary px-4 py-2 rounded-lg gap-x-2.5 flex items-center h-full w-full  justify-center">
            <IconHandCoin />
            <span className="text-white text-sm font-semibold ">Tip</span>
          </button>
        </Link>
        {/* <Link
          target="_blank"
          href={"https://okchoi2.com/dang-ky.html"}
          className="col-span-3"
        >
          <button
            style={{
              background: "linear-gradient(-161deg, #DDFA00 0%, #eea41c 100%)",
            }}
            className="text-black px-4 py-2 rounded-lg gap-x-2.5 flex items-center h-full w-full  justify-center"
          >
            <HiCash />
            <span className="text-black text-sm font-semibold">Khuyến mãi</span>
          </button>
        </Link> */}
      </div>
      <Transition
        show={openMenu ? openMenu : false}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={"bottom-0"}
      >
        <div className="fixed w-full bg-white top-0 left-0 z-50 bottom-0 h-full">
          <div className="pt-[43px] px-4 pb-4 flex items-center justify-between">
            <Link
              href={"/"}
              className="ml-4"
              onClick={() => setOpenMenu(false)}
            >
              <img src={"/images/logo-small2.png"} alt="Logo" />
            </Link>
            <div className="flex items-center gap-4">{iconMenuWithLogo()}</div>
          </div>

          {user?._id && (
            <div>
              <Link
                href="/ho-so"
                className="flex items-center flex-col gap-x-2"
              >
                <Avatar
                  src={user?.avatar}
                  shape="circle"
                  className="ml-1"
                  size="60px"
                />
                <span className="text-black font-semibold text-sm">
                  {user?.full_name}
                </span>
              </Link>
            </div>
          )}

          <div className="flex flex-col py-4 px-2">
            <Link
              href={"/"}
              onClick={() => setOpenMenu(false)}
              className={`py-2 flex cursor-pointer px-4 transition-all hover:font-semibold gap-4 mt-4 float-left w-full align-middle items-center ${
                router.pathname === "/" ? "bg-white text-secondary" : "#fff"
              }`}
            >
              <AiFillHome
                className="w-6 h-6"
                color={`${router.pathname === "/" ? "#a95e01" : "#707070"}`}
              />

              <span
                className={`text-xl whitespace-nowrap  ${
                  router.pathname === "/" ? "text-secondary" : "text-[#707070]"
                }`}
              >
                Trang chủ
              </span>
            </Link>

            {menus?.map((menu, index) => (
              <Link
                key={index}
                href={menu.link}
                onClick={() => setOpenMenu(false)}
                className={`py-2 flex cursor-pointer px-4 transition-all hover:font-semibold gap-4 float-left w-full align-middle items-center border-t ${
                  router.pathname === menu.link
                    ? "bg-white text-secondary"
                    : "#fff"
                }`}
              >
                {menu.icon(
                  `${router.pathname === menu.link ? "#a95e01" : "#707070"}`
                )}
                <span
                  className={`text-xl whitespace-nowrap  ${
                    router.pathname === menu.link
                      ? "text-secondary"
                      : "text-[#707070]"
                  }`}
                >
                  {menu.name}
                </span>
              </Link>
            ))}

            {user?._id ? (
              <div className="absolute bottom-[40px] text-center w-full">
                <button
                  onClick={handleLogOut}
                  className="rounded-[8px] text-white font-semibold bg-[#A6A6A6] py-2 w-fit px-8"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="mt-[40px] text-center w-full">
                <div>
                  <Auth />
                </div>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
};
