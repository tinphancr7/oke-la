import {schedules} from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import slugify from "slugify";

function HotLeagueHomeMobile() {
	const [isShow, setIsShow] = useState(false);
	return (
		<div className="p-2 block lg:hidden">
			<div
				className="bg-[#D4D4D4] py-1 flex items-center gap-4 justify-center rounded-[8px] cursor-pointer"
				onClick={() => setIsShow(!isShow)}
			>
				<div className="text-[#FE790E] font-bold text-base">GIẢI ĐẤU</div>
				<svg
					className={`${isShow ? `rotate-180` : "rotate-0"} duration-200`}
					xmlns="http://www.w3.org/2000/svg"
					width="13"
					height="9"
					viewBox="0 0 13 9"
					fill="none"
				>
					<path
						d="M2.20761 1.293L2.20758 1.29297C2.01999 1.10539 1.76557 1 1.50028 1C1.23499 1 0.980564 1.10539 0.792975 1.29297C0.605386 1.48056 0.5 1.73499 0.5 2.00028C0.5 2.26557 0.605386 2.51999 0.792975 2.70758L5.79278 7.70738C5.79284 7.70745 5.79291 7.70752 5.79297 7.70758C5.88581 7.80047 5.99603 7.87416 6.11734 7.92444C6.23874 7.97477 6.36887 8.00067 6.50028 8.00067C6.63169 8.00067 6.76182 7.97477 6.88322 7.92444C7.00453 7.87416 7.11475 7.80047 7.20758 7.70758C7.20765 7.70752 7.20771 7.70745 7.20778 7.70738L12.2076 2.70758C12.3005 2.61469 12.3741 2.50442 12.4244 2.38307C12.4747 2.26171 12.5006 2.13164 12.5006 2.00028C12.5006 1.86892 12.4747 1.73884 12.4244 1.61749C12.3741 1.49613 12.3005 1.38586 12.2076 1.29297C12.1147 1.20009 12.0044 1.12641 11.8831 1.07614C11.7617 1.02587 11.6316 1 11.5003 1C11.3689 1 11.2388 1.02587 11.1175 1.07614C10.9961 1.12641 10.8859 1.20009 10.793 1.29297L10.793 1.293L6.50028 5.58625L2.20761 1.293Z"
						fill="#958C8C"
						stroke="#958C8C"
					/>
				</svg>
			</div>

			<div
				className={`mt-1 bg-white px-4 rounded-[8px] duration-200 ${
					isShow ? "max-h-[500px]" : "max-h-[0px] overflow-hidden"
				}`}
			>
				{schedules?.map((item) => (
					<div key={item?.id} className="py-2 border-b last:border-none">
						<Link
							href={`/xem-giai-dau/${slugify(
								item?.name
							).toLowerCase()}?leagueId=${item?.id}&tab=${1}`}
						>
							<div className="flex items-center gap-x-4">
								<Image
									src={`/images/${item?.logo}`}
									width={22}
									height={22}
									alt=""
								/>

								<div className="text-md leading-normal">{item?.name}</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default HotLeagueHomeMobile;
