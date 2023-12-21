import Image from "next/image";
import Link from "next/link";
import React, {useContext} from "react";
import premierleague from "@/assets/images/premier-league.svg";
import {schedules} from "@/constant";
import slugify from "slugify";
import {AuthContext} from "@/context/AuthContext";

function MyFavouriteLeagues() {
	const {favouriteLeagues} = useContext(AuthContext);

	if (favouriteLeagues?.length === 0) return null;

	return (
		<div className="hidden lg:block">
			<div className="font-bold text-lg bg-secondary text-white py-2 pl-6 border-l-[12px] border-light-red rounded-tl-[8px]">
				Giải đấu yêu thích
			</div>

			<div className="bg-white px-4 rounded-b-[8px]">
				{favouriteLeagues?.map((item) => (
					<div key={item?.leagueId} className="py-2 border-b last:border-none">
						<Link
							href={`/xem-giai-dau/${slugify(item?.name).toLowerCase()}-${
								item?.leagueId
							}`}
						>
							<div className="flex items-center gap-x-4">
								<Image src={`${item?.logo}`} width={22} height={22} alt="" />

								<div className="text-md leading-normal">{item?.name}</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default MyFavouriteLeagues;
