import GiftIcon from "@/components/icons/Gift";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	isMobile?: boolean;
};

function GetPromotion({isMobile = false}: Props) {
	return (
		<div className={`mb-3 ${isMobile ? "block lg:hidden" : "hidden lg:block"}`}>
			<div className="relative">
				<div className="w-full h-[220px] relative">
					<Image
						src={"/images/BANHGIO-HPNY.gif"}
						alt="Nhận khuyến mãi"
						fill
						className="object-cover"
					/>
					{/* <div className="absolute top-[50%] right-5 -translate-y-[50%] ">
						<div className="w-20 h-20 relative">
							<Image
								src="/images/logo-banhgio.webp"
								alt="Logo"
								fill
								className="object-contain"
							/>
						</div>
					</div> */}
				</div>

				<Link href={"/khuyen-mai"}>
					<button className="absolute bottom-0 right-0 px-4 py-2 flex items-center gap-x-2 rounded-tl-2xl  border-l-2 border-t-2 border-[#fff] bg-light-red">
						<GiftIcon />
						<span className="font-semibold text-white text-sm">
							NHẬN KHUYẾN MÃI
						</span>
					</button>
				</Link>
			</div>
		</div>
	);
}

export default GetPromotion;
