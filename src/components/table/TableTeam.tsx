"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";
import LoadingSmall from "../loading/LoadingSmall";

import {useQuery} from "@tanstack/react-query";
import {getTeamsByLeagueId} from "@/apis/team";

type Props = {
	leagueId: string;
};

const TableTeam = ({leagueId}: Props) => {
	const {data: teams, isLoading} = useQuery({
		queryKey: ["teams", leagueId],
		queryFn: () => getTeamsByLeagueId(leagueId),
		enabled: !!leagueId,
	});
	const teamsData = teams?.data;

	return (
		<div>
			<div className="rounded-t-lg p-4 bg-secondary">
				<div className="flex items-center w-full  text-xs lg:text-sm font-normal text-white">
					<div className="w-[20%] flex items-center">STT</div>
					<div className="w-[20%]  flex items-center">LOGO</div>
					<div className="w-[60%]  flex items-center">Tên CLB</div>
				</div>
			</div>
			<>
				{isLoading ? (
					<div className="mt-10">
						<LoadingSmall />
					</div>
				) : (
					<div>
						{teamsData?.length > 0 &&
							teamsData?.map((team: any, index: number) => {
								return (
									<div
										key={team?.teamId}
										className="even:bg-white odd:bg-slate-50 px-4 py-2 border-b"
									>
										<Link
											href={`/livescores/team/${slugify(team?.name, {
												lower: true,
												replacement: "-",
												locale: "vi",
												trim: true,
											})}/${team.teamId}`}
											className="flex items-center w-full  text-xs font-normal "
										>
											<div className="w-[20%] flex items-center  ">
												{index + 1}
											</div>
											<div className="w-[20%]  flex items-center ">
												<div className="w-10 h-10  relative flex-shrink-0">
													<Image
														src={team?.logo}
														fill
														className="w-full h-full object-fill"
														alt=""
													/>
												</div>
											</div>
											<div className="w-[60%]  flex items-center text-blue26 font-semibold">
												{team?.name}
											</div>
										</Link>
									</div>
								);
							})}
					</div>
				)}
			</>
		</div>
	);
};

export default TableTeam;
