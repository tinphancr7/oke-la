import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {TimeToScoreGoals} from "../analysis/TimeToScoreGoals";
import {useQuery} from "@tanstack/react-query";
import {getMatchAnalysisAll} from "@/apis/match";
import findMatchData from "@/helper/matchAnalyticsHelper";

ChartJS.register(ArcElement, Tooltip, Legend);

const Commentary = ({matchId, match}: any) => {
	const {data} = useQuery({
		queryKey: ["commentary"],
		queryFn: () => getMatchAnalysisAll(matchId.toString()),
		enabled: !!matchId,
	});

	const commentaryData = data?.data[0];
	const matchAnalysis = findMatchData(commentaryData, match);

	const dataHome = {
		labels: [
			"1-10",
			"10-20",
			"20-30",
			"30-40",
			"40-45+",
			"46-50",
			"50-60",
			"60-70",
			"70-80",
			"80-90+",
		],
		datasets: [
			{
				label: "Số bàn thắng",
				data: [
					matchAnalysis?.homeShootTime?.total?.to10,
					matchAnalysis?.homeShootTime?.total?.to20,
					matchAnalysis?.homeShootTime?.total?.to30,
					matchAnalysis?.homeShootTime?.total?.to40,
					matchAnalysis?.homeShootTime?.total?.to45,
					matchAnalysis?.homeShootTime?.total?.to50,
					matchAnalysis?.homeShootTime?.total?.to60,
					matchAnalysis?.homeShootTime?.total?.to70,
					matchAnalysis?.homeShootTime?.total?.to80,
					matchAnalysis?.homeShootTime?.total?.to90,
				],
				backgroundColor: [
					"rgba(255, 99, 132, .6)",
					"rgba(54, 162, 235,.6 )",
					"rgba(255, 206, 86, .6)",
					"rgba(75, 192, 192, .6)",
					"rgba(153, 102, 255, .6)",
					"rgba(255, 40, 64, .6)",
					"rgba(28, 159, 64, .6)",
					"rgba(108, 203, 64, .6)",
					"rgba(71, 71, 64, .6)",
					"rgba(255, 159, 64, .6)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235,1)",
					"rgba(255, 206, 86,1)",
					"rgba(75, 192, 192,1)",
					"rgba(153, 102, 255,1)",
					"rgba(255, 40, 64,1)",
					"rgba(28, 159, 64,1)",
					"rgba(108, 203, 64,1)",
					"rgba(71, 71, 64,1)",
					"rgba(255, 159, 64,1)",
				],
				borderWidth: 1,
			},
		],
	};

	const dataAway = {
		labels: [
			"1-10",
			"10-20",
			"20-30",
			"30-40",
			"40-45+",
			"46-50",
			"50-60",
			"60-70",
			"70-80",
			"80-90+",
		],
		datasets: [
			{
				label: "Số bàn thắng",
				data: [
					matchAnalysis?.awayShootTime?.total?.to10,
					matchAnalysis?.awayShootTime?.total?.to20,
					matchAnalysis?.awayShootTime?.total?.to30,
					matchAnalysis?.awayShootTime?.total?.to40,
					matchAnalysis?.awayShootTime?.total?.to45,
					matchAnalysis?.awayShootTime?.total?.to50,
					matchAnalysis?.awayShootTime?.total?.to60,
					matchAnalysis?.awayShootTime?.total?.to70,
					matchAnalysis?.awayShootTime?.total?.to80,
					matchAnalysis?.awayShootTime?.total?.to90,
				],
				backgroundColor: [
					"rgba(255, 99, 132, .6)",
					"rgba(54, 162, 235,.6 )",
					"rgba(255, 206, 86, .6)",
					"rgba(75, 192, 192, .6)",
					"rgba(153, 102, 255, .6)",
					"rgba(255, 40, 64, .6)",
					"rgba(28, 159, 64, .6)",
					"rgba(108, 203, 64, .6)",
					"rgba(71, 71, 64, .6)",
					"rgba(255, 159, 64, .6)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235,1)",
					"rgba(255, 206, 86,1)",
					"rgba(75, 192, 192,1)",
					"rgba(153, 102, 255,1)",
					"rgba(255, 40, 64,1)",
					"rgba(28, 159, 64,1)",
					"rgba(108, 203, 64,1)",
					"rgba(71, 71, 64,1)",
					"rgba(255, 159, 64,1)",
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div>
			<div className="flex justify-between md:flex-row flex-col">
				<div>
					<p className="text-center my-6 text-[24px] font-bold">
						{match?.homeName}
					</p>
					<Doughnut style={{width: "400px", height: "400px"}} data={dataHome} />
				</div>
				<div>
					<p className="text-center my-6 text-[24px] font-bold">
						{match?.awayName}
					</p>
					<Doughnut style={{width: "400px", height: "400px"}} data={dataAway} />
				</div>
			</div>
			<div className="mt-6">
				<TimeToScoreGoals matchAnalysis={matchAnalysis} matche={match} />
			</div>
		</div>
	);
};

export default Commentary;
