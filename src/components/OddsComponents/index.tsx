//@ts-nocheck
import {Tabs} from "antd";
import TabPane from "antd/lib/tabs/TabPane";
import moment from "moment";
// import "moment/locale/vi"; // without this line it didn't work
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";
import RatioOneTimesTwo from "./tilemotnhanhai";
import ThreeInOneRatio from "./tilebatrongmot";
import RateOfFortune from "./tiletaixiu";
import AsiaRatio from "./tilechaua";
import scheduleApi from "@/apis/schedule.api";

// moment.locale("vi");

export default function OddsComponents(props) {
	const [match, setMatch] = useState();

	useEffect(() => {
		if (props?.match)
			scheduleApi
				.getPrematchAndInplayOddByMatchId(props?.match?.matchId)
				.then((res) => setMatch(res.data?.[0]));
	}, [props?.match]);

	const router = useRouter();
	function callback(key) {}

	const onNhaCaiChange = (e) => {
		setCompanyId(e);
		getAllOdds(e);
	};
	const columns = [
		{
			title: "Công ty",
			dataIndex: "company",
			key: "company",
			width: 100,
			fixed: "center",
			render: (value) => <div style={{color: "black"}}>{value}</div>,
		},
		{
			title: "Tỷ lệ Châu Á",
			children: [
				{
					title: "Chủ",
					width: 150,
					dataIndex: "handicap",
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialHome}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialHome,
								value?.[0]?.instantHome
							)}
						</div>
					),
				},
				{
					title: "HDP",
					dataIndex: "handicap",
					key: "HDP",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialHandicap}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialHandicap,
								value?.[0]?.instantHandicap
							)}
						</div>
					),
				},
				{
					title: "Khách",
					dataIndex: "handicap",
					key: "guest",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialAway}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialAway,
								value?.[0]?.instantAway
							)}
						</div>
					),
				},
			],
		},
		{
			title: "1X2",
			children: [
				{
					title: "Chủ",
					dataIndex: "europeOdds",
					key: "europeOdds",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialHome}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialHome,
								value?.[0]?.instantHome
							)}
						</div>
					),
				},
				{
					title: "Hòa",
					dataIndex: "europeOdds",
					key: "europeOdds",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialDraw}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialDraw,
								value?.[0]?.instantDraw
							)}
						</div>
					),
				},
				{
					title: "Khách",
					dataIndex: "europeOdds",
					key: "europeOdds",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialAway}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialAway,
								value?.[0]?.instantAway
							)}
						</div>
					),
				},
			],
		},
		{
			title: "Tỉ lệ tài xỉu",
			children: [
				{
					title: "Tài",
					dataIndex: "overUnder",
					key: "overUnder",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialOver}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialOver,
								value?.[0]?.instantOver
							)}
						</div>
					),
				},
				{
					title: "Kèo đấu",
					dataIndex: "overUnder",
					key: "overUnder",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialHandicap}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialHandicap,
								value?.[0]?.instantHandicap
							)}
						</div>
					),
				},
				{
					title: "Xỉu",
					dataIndex: "overUnder",
					key: "overUnder",
					width: 150,
					render: (value) => (
						<div style={{color: "black"}}>
							{value?.[0]?.initialUnder}
							<br />
							{compareStringFloatOdds(
								value?.[0]?.initialUnder,
								value?.[0]?.instantUnder
							)}
						</div>
					),
				},
			],
		},
		// {
		//   title: "Số Liệu",
		//   width: 200,
		//   render: () => (
		//     <span style={{ fontSize: "13px", color: "black" }}>Run Xem thêm</span>
		//   ),
		// },
	];
	const companyList = [
		{id: 1, name: "Macauslot"},
		{id: 3, name: "Crown"},
		{id: 8, name: "Bet365"},
		{id: 12, name: "Easybets"},
		{id: 17, name: "Mansion88"},
		{id: 22, name: "10BET"},
		{id: 23, name: "188bet"},
		{id: 24, name: "12bet"},
		{id: 31, name: "Sbobet"},
		{id: 35, name: "Wewbet"},
		{id: 42, name: "18bet"},
		{id: 47, name: "Pinnacle"},
	];

	const getAllOdds = async (e) => {
		let id = router.query.pid;
		setId(id);
		// let odds = response && response.data;
		let time = new Date(Date.now()).toLocaleString();
		setDateTime(time);
	};
	const compareStringFloatOdds = (initial, instant) => {
		if (initial !== undefined) {
			let a = parseFloat(initial).toFixed(2);
			let b = parseFloat(instant).toFixed(2);
			if (a > b) {
				return (
					<div className="oddDowns">
						{instant}
						<AiOutlineArrowDown fill="red" style={{verticalAlign: "center"}} />
					</div>
				);
			} else if (a == b) {
				return <>{instant}</>;
			} else {
				return (
					<div className="oddUps">
						{instant}
						<AiOutlineArrowUp fill="green" style={{verticalAlign: "center"}} />
					</div>
				);
			}
		}
	};
	useEffect(() => {
		if (router.query.pid) {
			onNhaCaiChange(router.query.pid);
		}
	}, [router.asPath]);

	return (
		<div className="container !mx-auto compare-odds">
			<Tabs
				defaultActiveKey="1"
				onChange={callback}
				style={{textAlign: "center"}}
				tabBarGutter={16}
			>
				<TabPane tab="Tỷ lệ châu Á" key="1">
					<AsiaRatio oddList={match?.handicap} />
				</TabPane>
				<TabPane tab="Tỷ lệ tài xỉu" key="2">
					<RateOfFortune oddList={match?.overUnder} />
				</TabPane>
				<TabPane tab="1x2" key="4">
					<RatioOneTimesTwo match={props?.match} />
				</TabPane>
			</Tabs>
			{/* <div className="live-record">
        <LiveRecord
          liveRecord={liveRecord}
          matchTime={props?.match?.matchTime}
          onNhaCaiChange={onNhaCaiChange}
        />
      </div> */}
		</div>
	);
}
