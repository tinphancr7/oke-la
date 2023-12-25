import logo from "@/assets/images/logo.svg";
import Avatar from "@/components/avatar";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconHandCoin from "@/components/icons/HandCoin";
import IconLiveStream from "@/components/icons/LiveStream";
import IconSetting from "@/components/icons/Setting";
import IconStar from "@/components/icons/Star";
import {AuthContext} from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import Auth from "../Auth";

import IconBinoculars from "@/components/icons/Binoculars";
import IconMedal from "@/components/icons/Medal";
import IconScale from "@/components/icons/Scale";
import IconSchedule from "@/components/icons/Schedule";
import {HeaderMobileMenu} from "./HeaderMobileMenu";
import {usePathname} from "next/navigation";
import {HiCash} from "react-icons/hi";
import {AiOutlineUserAdd} from "react-icons/ai";
import PreLoader from "@/components/loading/PreLoader";
export const menus = [
	// {
	//   id: 1,
	//   name: "Tỷ lệ kèo",
	//   icon: (color: string) => {
	//     return <IconScale color={color} />;
	//   },
	//   link: "/ty-le-keo",
	// },
	// {
	//   id: 2,
	//   name: "Lịch thi đấu",
	//   icon: (color: string) => {
	//     return <IconSchedule color={color} className="w-6 h-6" />;
	//   },
	//   link: "/lich-thi-dau",
	// },
	{
		id: 3,
		name: "Bảng xếp hạng",
		icon: (color: string) => {
			return <IconMedal color={color} />;
		},
		link: "/bang-tinh-diem",
	},
	{
		id: 4,
		name: "Lịch sử Tip",
		icon: (color: string) => {
			return <IconMedal color={color} />;
		},
		link: `/tips`,
		mobile: true,
	},
	{
		id: 5,
		name: "Cài đặt",
		icon: (color: string) => {
			return <IconMedal color={color} />;
		},
		link: "/",
		mobile: true,
	},
];

function Header() {
	const [itemSelected, setItemSelected] = useState(0);
	const [itemHovered, setItemHovered] = useState(0);
	const {user, isOpen, setIsLogin, isLogin, setIsOpen} =
		useContext(AuthContext);

	const [openMenu, setOpenMenu] = useState(false);
	const pathname = usePathname();

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-gray-200 md:bg-white">
			<div
				className=" hidden md:flex "
				style={{
					boxShadow: `0px 2px 3px 0px rgba(0, 0, 0, 0.25)`,
				}}
			>
				<div className="container mx-auto h-[78px] md:px-4 xl:px-2 items-center flex justify-between">
					<div className="flex items-center gap-x-8">
						<Link
							href={"/"}
							onClick={() => setItemSelected(0)}
							className="w-20 h-20 relative"
						>
							<Image
								src="/images/logo-banhgio.png"
								alt="Logo"
								fill
								className="object-contain"
							/>
						</Link>
					</div>
					<div className="gap-x-6 flex items-center h-full">
						{/* <div className="flex items-center bg-white px-4 py-2 rounded-lg gap-x-4">
              <IconSearch />

              <input
                placeholder="Tìm kiếm trận đấu"
                className="focus:border-0 focus:outline-0"
              />
            </div> */}
						<div className="flex items-center  h-full">
							{menus
								?.filter((e) => !e?.mobile)
								.map((menu, index) => (
									<Link
										key={index}
										href={menu.link}
										className={`w-full h-full flex items-center cursor-pointer  hover:bg-white px-4 hover:text-secondary hover:font-semibold ${
											pathname === menu?.link
												? "text-secondary bg-white"
												: "text-black"
										} flex items-center gap-2`}
										onMouseMove={() => setItemHovered(menu.id)}
										onMouseLeave={() => setItemHovered(0)}
									>
										{menu.icon(
											`${
												itemHovered === menu.id || pathname === menu?.link
													? "#FF9B00"
													: "#000000"
											}`
										)}
										<span className="text-sm whitespace-nowrap">
											{menu.name}
										</span>
									</Link>
								))}
						</div>
						<Link href={"/truc-tiep"} onClick={() => setItemSelected(0)}>
							<button className="bg-brand-red px-4 py-2 rounded-lg gap-x-2 flex items-center shadow-brand-red h-full">
								<IconLiveStream />
								<span className="text-white font-semibold hidden xl:block">
									Livestream
								</span>
							</button>
						</Link>
						<Link href={"/tips"} onClick={() => setItemSelected(0)}>
							<button className="bg-[#FE790E] p-2 rounded-lg gap-x-2 flex items-center ">
								<IconHandCoin />
								<span className="text-white text-sm font-semibold hidden xl:block">
									Tip
								</span>
							</button>
						</Link>
						<Link
							target="_blank"
							href={"https://bk16.short.gy/JYDO8N/"}
							className="col-span-3"
						>
							<button
								style={{
									background:
										"linear-gradient(-161deg, #DDFA00 0%, #eea41c 100%)",
								}}
								className="text-black px-4 py-2 rounded-lg gap-x-2 flex items-center h-full w-full  justify-center"
							>
								<HiCash />
								<span className="text-black text-sm font-semibold">
									Khuyến mãi
								</span>
							</button>
						</Link>
						{!user?._id && (
							<div
								onClick={() => {
									setIsLogin(false);
									setIsOpen(true);
								}}
								className="col-span-3"
							>
								<button className="bg-[#fe790e] text-white px-4 py-2 rounded-lg gap-x-2 flex items-center h-full w-full  justify-center">
									<AiOutlineUserAdd />
									<span className="text-white text-sm font-semibold">
										Đăng ký
									</span>
								</button>
							</div>
						)}
					</div>

					<div className="flex items-center gap-x-2">
						{user?._id && (
							<>
								<Link href="/ho-so" className="flex items-center gap-x-2">
									<Avatar src={user?.avatar} shape="circle" className="ml-1" />
									<span className="text-black font-semibold hidden xl:block">
										{user?.full_name}
									</span>
								</Link>

								<Link href={`/thanh-vien/${user?.username}`}>
									<ButtonOnlyIcon
										wrapperClassName="bg-white p-2 rounded-lg hidden md:block"
										wrapperStyle={{border: "1px solid #7D7D7D"}}
									>
										<IconStar color="#000000" />
									</ButtonOnlyIcon>
								</Link>

								<Link href="/ho-so">
									<ButtonOnlyIcon
										wrapperClassName="bg-white p-2 rounded-lg hidden md:block"
										wrapperStyle={{border: "1px solid #7D7D7D"}}
									>
										<IconSetting color="#000000" />
									</ButtonOnlyIcon>
								</Link>
							</>
						)}
						{!user?._id && <Auth />}
					</div>
				</div>
			</div>

			<HeaderMobileMenu
				menus={menus}
				className="md:hidden"
				openMenu={openMenu}
				setOpenMenu={setOpenMenu}
				user={user}
			/>
		</header>
	);
}

export default Header;
