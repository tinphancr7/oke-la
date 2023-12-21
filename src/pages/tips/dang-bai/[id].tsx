import Breadcrumb from "@/components/Breadcrumb";
import RankHomeItem from "@/containers/Home/RankHomeItem";
import TipHomeItem from "@/containers/Home/TipHomeItem";
import React, {useEffect, useState} from "react";
import {getPagingTips} from "@/apis/tip";
import {ITip, IUser} from "@/interfaces";
import Link from "next/link";
import {getHotMatches} from "@/apis/match";
import ImageWithFallback from "@/components/imageWithFallback";
import moment from "moment";
import CreateTipsWrapper from "@/components/CreateTipsWrapper";
import DetailGroup from "@/components/DetailGroup";
import HotMember from "@/components/HotMember";
import DifferentGroup from "@/components/DiffGroup";
import {useRouter} from "next/router";
import scheduleApi from "@/apis/schedule.api";

type Props = {
	tips: ITip[];
	hotMatches: any[];
};
const tabs = [
	{
		id: 1,
		title: "HOT",
	},
	{
		id: 2,
		title: "Trận đấu",
	},
	{
		id: 3,
		title: "Theo dõi",
	},
];
const rankTabs = [
	{
		id: 1,
		title: "Thành viên",
	},
	{
		id: 2,
		title: "Chuyên gia",
	},
	{
		id: 3,
		title: "Nhóm",
	},
];
const Tips = ({tips, hotMatches}: Props) => {
	const [listMatchLeague, setListMatchLeague] = useState([]);

	const router = useRouter();

	const handleCreateTips = (value: any) => {
		const dataReq = value;
	};

	const getMatch = async () => {
		try {
			const res = await scheduleApi.getScheduleAndResultGroupBy(10, 1);
			console.log("res", res?.data);
			setListMatchLeague(res.data?.result);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMatch();
	}, [router]);

	return (
		<div className="match-list-detail mt-4 xl:container mx-auto md:px-4 xl:px-2">
			<div className="match-list-detail-header">
				<Breadcrumb
					backLink="/"
					breadCrumb={[
						{title: "Trang chủ", url: "/truc-tiep"},
						{title: "TIPS Bóng đá", url: "/truc-tiep"},
					]}
				/>
			</div>

			<div className="flex flex-col-reverse md:grid md:grid-cols-4 gap-x-5 mt-4 w-full">
				<div className="col-span-1 flex flex-col">
					<DetailGroup groupId={router.query?.id as string} />
					<HotMember groupId={router.query?.id as string} />
					<DifferentGroup groupId={router.query?.id as string} />
				</div>
				<div className="md:col-span-3 w-full">
					<CreateTipsWrapper
						onCreate={handleCreateTips}
						listMatchLeague={listMatchLeague}
					/>
				</div>
			</div>
		</div>
	);
};

export default Tips;

export async function getServerSideProps() {
	try {
		return {
			props: {},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
}
