import React, {useMemo, useState} from "react";

import {LOGO_DEFAULT, topLeague} from "@/constant";

import {getLeagueAndSubLeage, getOtherLeagues} from "@/apis/league";
import {useQuery} from "@tanstack/react-query";
import TreeMenu from "react-simple-tree-menu";
import ItemComponent from "@/components/treeMenu/ItemComponent";

function LeagueOtherHome() {
	const {data} = useQuery({
		queryKey: ["other-leagues"],
		queryFn: () =>
			getLeagueAndSubLeage(topLeague.map((item) => item.country).toString()),
	});

	const leagues = data?.data;

	const treeData = useMemo(() => {
		return (
			leagues &&
			Object?.keys(leagues)?.map((league: any) => {
				return {
					key: league,
					label: league,
					bolder: true,
					logo: topLeague.find((item) => item.country == league)?.countryLogo,
					leagueId: topLeague.find((item) => item.country == league)?.leagueId,
					nodes: leagues[league]?.map((item: any) => {
						return {
							key: item?.name,
							label: item?.name,
							logo: item?.logo,
							leagueId: item?.leagueId,
							nodes: [
								{
									key: "overview",
									label: "Tổng quan",
									leagueId: item?.leagueId,
									isSub: true,
									menuKey: 1,
								},
								{
									key: "schedule",
									label: "Lịch thi đấu",
									leagueId: item?.leagueId,
									isSub: true,
									menuKey: 2,
								},
								{
									key: "rank",
									label: "Bảng xếp hạng",
									leagueId: item?.leagueId,
									isSub: true,
									menuKey: 3,
								},
								{
									key: "list-goal",
									label: "Danh sách ghi bàn",
									leagueId: item?.leagueId,
									isSub: true,
									menuKey: 4,
								},
								{
									key: "club",
									label: "Câu lạc bộ",
									leagueId: item?.leagueId,
									isSub: true,
									menuKey: 5,
								},
							],
						};
					}),
				};
			})
		);
	}, [leagues]);

	return (
		<div className="hidden lg:block mt-4">
			<div className="font-semibold text-lg bg-secondary text-white py-2 pl-6 border-l-[12px] border-light-red rounded-tl-[8px] uppercase">
				CÁC GIẢI ĐẤU KHÁC
			</div>

			<div id="tree-menu" className="tree-menu">
				<TreeMenu hasSearch={false} data={treeData}>
					{({search, items}) => (
						<ul>
							{items.map((props) => {
								return (
									<>
										<ItemComponent {...props} level={props.level} />
									</>
								);
							})}
						</ul>
					)}
				</TreeMenu>
			</div>
		</div>
	);
}

export default LeagueOtherHome;
