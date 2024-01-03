//@ts-nocheck
import {Tabs} from "antd";
import TabPane from "antd/lib/tabs/TabPane";
import moment from "moment";
// import "moment/locale/vi"; // without this line it didn't work
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";
import RatioOneTimesTwo from "./tilemotnhanhai";
import ThreeInOneRatio from "./tilebatrongmot";
import RateOfFortune from "./tiletaixiu";
import AsiaRatio from "./tilechaua";
import scheduleApi from "@/apis/schedule.api";
import {ButtonTabPane} from "./ButtonTabPane";
import CornerOdds from "./keophatgoc";
import CorrectScoreOdd from "./keotiso";
import ThreeInOneOdd from "./threeinone";

// moment.locale("vi");

export default function CompareOdds(props) {
	const [match, setMatch] = useState();
	const [cornerOddsPreMatch, setCornerOddsPreMatch] = useState([]);
	const [cornerOddsInPlay, setCornerOddsInPlay] = useState([]);
	const [scoreOddsPreMatch, setScoreOddsPreMatch] = useState([]);
	const [scoreHalfTimeOddsPreMatch, setScoreHalfTimeOddsPreMatch] = useState(
		[]
	);
	const [type, setType] = useState<"ft" | "ht">("ft");
	console.log("match", match);

	useEffect(() => {
		if (props?.match) {
			scheduleApi
				.getPrematchAndInplayOddByMatchId(props?.match?.matchId)
				.then((res) => setMatch(res.data));

			scheduleApi.getCornerOddsPreMatch(props?.match?.matchId).then((res) => {
				setCornerOddsPreMatch(res.data || []);
			});

			scheduleApi.getCornerOddsInPlay(props?.match?.matchId).then((res) => {
				setCornerOddsInPlay(res.data || []);
			});

			scheduleApi.getScoreOddsPreMatch(props?.match?.matchId).then((res) => {
				setScoreOddsPreMatch(res.data || []);
			});

			scheduleApi
				.getScoreHalfTimeOddsPreMatch(props?.match?.matchId)
				.then((res) => {
					setScoreHalfTimeOddsPreMatch(res.data || []);
				});
		}
	}, [props?.match]);

	const router = useRouter();

	const onNhaCaiChange = (e) => {
		setCompanyId(e);
		getAllOdds(e);
	};

	const getAllOdds = async (e) => {
		let id = router.query.pid;
		setId(id);
		// let odds = response && response.data;
		let time = new Date(Date.now()).toLocaleString();
		setDateTime(time);
	};

	useEffect(() => {
		if (router.query.pid) {
			onNhaCaiChange(router.query.pid);
		}
	}, [router.asPath]);

	const [tab, setTab] = useState(0);
	const buttonProps = [
		{
			label: "3 in 1",
			index: 0,
			render: () => {
				return <ThreeInOneOdd match={match} type={type} />;
			},
		},
		{
			label: "Tỷ lệ Châu Á",
			index: 1,
			render: () => {
				return (
					<AsiaRatio
						oddList={type === "ft" ? match?.handicap : match?.handicapHalf}
					/>
				);
			},
		},
		{
			label: "Tỷ lệ tài xỉu",
			index: 2,
			render: () => {
				return (
					<RateOfFortune
						oddList={type === "ft" ? match?.overUnder : match?.overUnderHalf}
					/>
				);
			},
		},
		{
			label: "1x2",
			index: 3,
			render: () => {
				return <RatioOneTimesTwo match={props?.match} />;
			},
		},
		{
			label: "Kèo phạt góc T/X",
			index: 4,
			render: () => {
				return (
					<CornerOdds
						listOddsPreMatch={cornerOddsPreMatch}
						listOddsInPlay={cornerOddsInPlay}
					/>
				);
			},
		},
		{
			label: "Điểm số chính xác",
			index: 5,
			render: () => {
				return (
					<CorrectScoreOdd
						listOddsPreMatch={scoreOddsPreMatch}
						listHalfTimeOddsPreMatch={scoreHalfTimeOddsPreMatch}
						type={type}
					/>
				);
			},
		},
	];

	return (
		<div className="container !mx-auto compare-odds">
			<div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
				<div className="gap-2 flex flex-nowrap overflow-x-auto max-w-full">
					{buttonProps?.map((item) => {
						return (
							<ButtonTabPane
								key={item?.index}
								label={item?.label}
								onClick={() => {
									setTab(item?.index);
									setType("ft");
								}}
								isActive={tab === item.index}
							/>
						);
					})}
				</div>

				{[0, 1, 2, 5]?.includes(tab) && (
					<div className="flex items-center gap-2 mt-4 lg:mt-0">
						{[
							{label: "FT", value: "ft"},
							{label: "HT", value: "ht"},
						].map((item) => (
							<ButtonTabPane
								key={item?.value}
								label={item?.label}
								onClick={() => setType(item?.value)}
								isActive={type === item.value}
							/>
						))}
					</div>
				)}
			</div>

			<div className="mt-4">{buttonProps[tab].render()}</div>

			{/* <Tabs
        defaultActiveKey="1"
        onChange={callback}
        style={{ textAlign: "center" }}
        tabBarGutter={16}
      >
        <TabPane tab="Tỷ lệ châu Á" key="1"></TabPane>
        <TabPane tab="Tỷ lệ tài xỉu" key="2"></TabPane>
        <TabPane tab="1x2" key="4"></TabPane>
      </Tabs> */}
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
