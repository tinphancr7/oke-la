import Image from "next/image";
import Link from "next/link";
import React from "react";

import {LOGO_DEFAULT} from "@/constant";
import slugify from "slugify";
import {getOtherLeagues} from "@/apis/league";
import {useQuery} from "@tanstack/react-query";

function LeagueOtherHome() {
	const {data} = useQuery({
		queryKey: ["leagues"],
		queryFn: () => getOtherLeagues(),
	});
	const leagues = data?.data;

	return (
		<div className="hidden lg:block mt-4">
			<div className="font-semibold text-lg bg-secondary text-white py-2 pl-6 border-l-[12px] border-light-red rounded-tl-[8px] uppercase">
				CÁC GIẢI ĐẤU KHÁC
			</div>

			<div className="bg-white px-4 rounded-b-[8px]">
				{leagues?.map((item: any) => (
					<div key={item?.id} className="py-2 border-b last:border-none">
						<Link
							href={`/xem-giai-dau/${slugify(item?.name).toLowerCase()}-${
								item?.leagueId
							}`}
						>
							<div className="flex items-center gap-x-4">
								<Image
									src={`${item?.logo}` || LOGO_DEFAULT}
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

export default LeagueOtherHome;
