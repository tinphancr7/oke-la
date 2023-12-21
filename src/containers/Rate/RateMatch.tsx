import LiveMatchTime from "@/components/renderLiveMatchTime";
import {LOGO_DEFAULT} from "@/constant";
import {convertStringOddToArray, convertToOdd, isPlayingMatches} from "@/utils";
import moment from "moment";
import React from "react";

function RateMatch({league}: {league: any}) {
	return (
		<div className="w-full hidden lg:flex bg-white font-bold text-sm border border-b-0 last:border-b border-[#F1F1F1]">
			<div className="w-[40%] px-4 flex items-center gap-x-6">
				<div className="font-semibold  min-w-[70px] text-center">
					{league?.status == 2
						? "HT"
						: league?.status == -1
						? "FT"
						: moment(league?.matchTime * 1000)?.format("HH:mm A")}
					{isPlayingMatches(league?.status) && <LiveMatchTime match={league} />}
				</div>
				<div className="py-2">
					<div className="flex items-center gap-x-2">
						<img
							width={20}
							height={20}
							src={league?.homeIcon || LOGO_DEFAULT}
							alt=""
						/>

						<div className="text-sm">{league?.homeName}</div>
					</div>
					<div className="flex items-center gap-x-2 my-2">
						<img
							width={20}
							height={20}
							src={league?.awayIcon || LOGO_DEFAULT}
							alt=""
						/>

						<div className="text-sm">{league?.awayName}</div>
					</div>
					<div>Hòa</div>
				</div>
			</div>
			{/* cả trận */}
			<div className="w-[30%] flex [&>div]:border-l [&>div]:border-[#F1F1F1]">
				<div className="w-[40%] text-center py-2 px-2">
					<div className="flex items-center justify-between">
						<div className="text-primary">
							{Number(convertStringOddToArray(league?.handicap)?.[5]) >= 0
								? convertToOdd(convertStringOddToArray(league?.handicap)?.[5])
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.handicap)?.[6]}</div>
					</div>
					<div className="flex items-center justify-between my-2">
						<div className="text-primary">
							{Number(convertStringOddToArray(league?.handicap)?.[5]) < 0
								? convertToOdd(convertStringOddToArray(league?.handicap)?.[5])
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.handicap)?.[7]}</div>
					</div>
					<div></div>
				</div>
				<div className="w-[40%] text-center py-2 px-2">
					<div className="flex items-center justify-between">
						<div className="text-primary">
							{Number(convertStringOddToArray(league?.overUnder)?.[5]) >= 0
								? convertToOdd(convertStringOddToArray(league?.overUnder)?.[5])
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.overUnder)?.[6]}</div>
					</div>
					<div className="flex items-center justify-between my-2">
						<div className="text-primary">
							{Number(convertStringOddToArray(league?.overUnder)?.[5]) < 0
								? convertToOdd(convertStringOddToArray(league?.overUnder)?.[5])
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.overUnder)?.[7]}</div>
					</div>
					<div></div>
				</div>
				<div className="w-[20%] text-center py-2">
					<div>{convertStringOddToArray(league?.europeOdds)?.[5]}</div>
					<div className="my-2">
						{convertStringOddToArray(league?.europeOdds)?.[6]}
					</div>
					<div>{convertStringOddToArray(league?.europeOdds)?.[7]}</div>
				</div>
			</div>
			{/* Hiệp 1 */}
			<div className="w-[30%] flex [&>div]:border-l [&>div]:border-[#F1F1F1]">
				<div className="w-[50%] text-center py-2 px-2">
					<div className="flex items-center justify-between">
						<div className="text-primary">
							{Number(convertStringOddToArray(league?.handicapHalf)?.[5]) >= 0
								? convertToOdd(
										convertStringOddToArray(league?.handicapHalf)?.[5]
								  )
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.handicapHalf)?.[6]}</div>
					</div>
					<div className="flex items-center justify-between my-2">
						<div className="text-primary">
							{Number(convertStringOddToArray(league?.handicapHalf)?.[5]) < 0
								? convertToOdd(
										convertStringOddToArray(league?.handicapHalf)?.[5]
								  )
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.handicapHalf)?.[7]}</div>
					</div>
					<div></div>
				</div>
				<div className="w-[50%] text-center py-2 px-2">
					<div className="flex items-center justify-between">
						<div className="text-primary">
							{" "}
							{Number(convertStringOddToArray(league?.overUnderHalf)?.[5]) >= 0
								? convertToOdd(
										convertStringOddToArray(league?.overUnderHalf)?.[5]
								  )
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.overUnderHalf)?.[6]}</div>
					</div>
					<div className="flex items-center justify-between my-2">
						<div className="text-primary">
							{" "}
							{Number(convertStringOddToArray(league?.overUnderHalf)?.[5]) < 0
								? convertToOdd(
										convertStringOddToArray(league?.overUnderHalf)?.[5]
								  )
								: ""}
						</div>
						<div>{convertStringOddToArray(league?.overUnderHalf)?.[7]}</div>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default RateMatch;
