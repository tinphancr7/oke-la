import {LOGO_DEFAULT} from "@/constant";
import {IHotMatch} from "@/interfaces";
import moment from "moment";
import React, {useMemo, useState} from "react";
import H2HItem from "./H2HItem";
import {countWinLose} from "@/helper";

type Props = {
	matchAnalysis: any;
	match: IHotMatch;
};

const H2H = (props: Props) => {
	console.log(props.matchAnalysis);
	const [radioValue, setRadioValue] = useState(0);
	const [tab, setTab] = useState("H2H");

	const genTabMobile = useMemo(() => {
		return ["H2H", props?.match?.homeName, props?.match?.awayName];
	}, [props.match]);

	const headToHeadCount = countWinLose(props.matchAnalysis?.headToHead);
	console.log("headToHeadCount", headToHeadCount);
	const homeCount = countWinLose(props.matchAnalysis?.homeLastMatches);
	const awayCount = countWinLose(props.matchAnalysis?.awayLastMatches);
	const renderByTab = useMemo(() => {
		if (tab === "H2H")
			return (
				<H2HItem
					title="H2H"
					lastMatches={props.matchAnalysis?.headToHead}
					groupLeague={props.matchAnalysis?.listHeadToHeadGroupLeague}
					indexHomeIcon={34}
					indexAwayIcon={35}
					count={{
						win: headToHeadCount?.home?.win,
						draw: headToHeadCount?.home?.draw,
						lose: headToHeadCount?.home?.lose,
					}}
					checkMatchStatusAttr="homeId"
				/>
			);
		if (tab === props?.match?.homeName)
			return (
				<H2HItem
					title={props.match?.homeName}
					lastMatches={props.matchAnalysis?.homeLastMatches}
					groupLeague={props.matchAnalysis?.listHomeLastMatchesGroupLeague}
					indexHomeIcon={35}
					indexAwayIcon={36}
					count={{
						win: homeCount?.home?.win,
						draw: homeCount?.home?.draw,
						lose: homeCount?.home?.lose,
					}}
					checkMatchStatusAttr="awayId"
				/>
			);

		if (tab === props?.match?.awayName)
			return (
				<H2HItem
					title={props.match?.awayName}
					lastMatches={props.matchAnalysis?.awayLastMatches}
					groupLeague={props.matchAnalysis?.listAwayLastMatchesGroupLeague}
					indexHomeIcon={35}
					indexAwayIcon={36}
					count={{
						win: awayCount?.home?.win,
						draw: awayCount?.home?.draw,
						lose: awayCount?.home?.lose,
					}}
					checkMatchStatusAttr="awayId"
				/>
			);
	}, [tab, props]);

	const checkMatchStatus = (
		firstTeam: number,
		secondTeam: number,
		teamId: number,
		homeNumber: number
	) => {
		console.log(firstTeam, secondTeam, teamId, homeNumber);
		if (firstTeam > secondTeam && teamId == homeNumber) {
			return "W";
		} else if (firstTeam < secondTeam && teamId != homeNumber) {
			return "W";
		} else if (firstTeam == secondTeam) {
			return "D";
		} else {
			return "L";
		}
	};

	return (
		<section>
			<div className="block lg:hidden">
				<div className="flex gap-x-2 mb-2">
					{genTabMobile?.map((item) => (
						<button
							className={`${
								tab === item ? "bg-secondary" : "bg-[#F4F5F6]"
							} min-h-full px-3 py-2 rounded-sm text-sm font-semibold flex flex-col items-center justify-center gap-y-1`}
							key={item}
							onClick={() => setTab(item)}
						>
							<div className={`${tab === item ? "text-white" : ""}`}>
								{item}
							</div>
							{tab === item && (
								<div className="min-w-[10px] min-h-[10px] bg-white rounded-full"></div>
							)}
						</button>
					))}
				</div>

				<div className="mt-4 w-full">{renderByTab}</div>
			</div>

			<div className="flex-1 justify-center p-2 gap-5 hidden lg:flex">
				{/* h2h */}
				<div className="flex flex-1 p-4  rounded-2xl shadow border border-neutral-200 flex-col justify-start items-center">
					<div className="w-full">
						<h2 className=" text-yellow-700 text-2xl font-bold leading-9">
							H2H
						</h2>
						<div className="flex justify-between mt-3">
							<p>Số Trận gần nhất</p>
							<div className="w-12 h-[29px] px-2 py-1 bg-amber-500 rounded-lg shadow border border-neutral-200 justify-center items-center gap-2 inline-flex">
								<div className="text-center text-white text-sm font-normal leading-[21px]">
									{props.matchAnalysis?.headToHead?.length || 0}
								</div>
								<img
									className="w-4 h-4 relative"
									src="/images/arrow-down.svg"
									alt=""
								/>
							</div>
						</div>
						<div className="flex justify-between  mt-3">
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-emerald-500 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											W
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{headToHeadCount.home.win}
									</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-gray-400  rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											D
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{headToHeadCount.home.draw}
									</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-red-600 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											L
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{headToHeadCount.home.lose}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-4 flex rounded-2xl shadow border border-neutral-200 flex-col justify-start items-start">
						{Object.keys(props.matchAnalysis?.listHeadToHeadGroupLeague || {})
							.filter(
								(item) =>
									props.matchAnalysis?.listHeadToHeadGroupLeague?.[item]
										?.length > 0
							)
							.map((item: any, index) => (
								<div key={index} className="w-full">
									<div className="flex w-full px-4 py-2 bg-yellow-700 rounded-tl-2xl rounded-tr-2xl border border-neutral-200 flex-col justify-start items-start gap-2.5">
										<div className="self-stretch justify-between items-start flex">
											<div>
												<span className="text-indigo-100 text-sm font-normal leading-[21px]">
													{item}
												</span>
											</div>
											<div className="justify-start items-start gap-8 flex">
												<div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
													FT
												</div>
												<div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
													HT
												</div>
											</div>
										</div>
									</div>
									<div className="self-stretch  flex-col justify-start items-center gap-2 flex">
										{props.matchAnalysis?.listHeadToHeadGroupLeague[item]?.map(
											(match: any, key: number) => (
												<div
													className="w-full flex-col justify-start items-start gap-1 flex first:border-b-2 first:mt-2 pb-4"
													key={key}
												>
													<div className="self-stretch px-4 justify-start items-center gap-4 inline-flex">
														<div className="grow shrink basis-0 h-[72px] flex-col justify-between items-start gap-2 inline-flex">
															<div className="self-stretch justify-between items-center gap-[139px] inline-flex">
																<div className="justify-start items-center gap-4 flex">
																	<img
																		className="w-8 h-8 rounded-full"
																		src={
																			match?.split(",")?.[34] !== "undefined"
																				? match?.split(",")?.[34]
																				: LOGO_DEFAULT
																		}
																		alt=""
																	/>
																	<p className="text-neutral-900 text-sm font-normal leading-[21px]">
																		{match?.split(",")?.[4]}
																	</p>
																</div>
																<div className="justify-start items-start gap-8 flex">
																	<div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																		{match?.split(",")?.[8]}
																	</div>
																	<div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																		{match?.split(",")?.[10]}
																	</div>
																</div>
															</div>
															<div className="self-stretch justify-between items-center gap-28 inline-flex">
																<div className="justify-start items-center gap-4 flex">
																	<img
																		className="w-8 h-8 rounded-full"
																		src={
																			match?.split(",")?.[35] !== "undefined"
																				? match?.split(",")?.[35]
																				: LOGO_DEFAULT
																		}
																		alt=""
																	/>
																	<p className="text-neutral-900 text-sm font-normal leading-[21px]">
																		{match?.split(",")?.[6]}
																	</p>
																</div>
																<div className="justify-start items-start gap-8 flex">
																	<p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																		{match?.split(",")?.[9]}
																	</p>
																	<p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																		{match?.split(",")?.[11]}
																	</p>
																</div>
															</div>
														</div>
													</div>
													<div className="self-stretch px-4 justify-between items-start flex mt-2">
														<p className="text-neutral-900 text-sm font-normal leading-[21px]">
															{moment(
																new Date(match?.split(",")?.[3] * 1000)
															).format("HH:mm A  | DD.MM.YYYY")}
														</p>
														<div className="w-5 h-5 bg-gray-400 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
															<p
																className={`w-5 h-5 ${
																	checkMatchStatus(
																		Number(match?.split(",")?.[8]),
																		Number(match?.split(",")?.[9]),
																		Number(match?.split(",")?.[5]),
																		Number(props.match?.homeId)
																	) == "W"
																		? "bg-emerald-500"
																		: checkMatchStatus(
																				Number(match?.split(",")?.[8]),
																				Number(match?.split(",")?.[9]),
																				Number(match?.split(",")?.[5]),
																				Number(props.match?.homeId)
																		  ) == "L"
																		? "bg-red-600"
																		: "bg-gray-400"
																} rounded-[26px] text-white text-[12px] flex-col justify-center items-center gap-2.5 inline-flex`}
															>
																{checkMatchStatus(
																	Number(match?.split(",")?.[8]),
																	Number(match?.split(",")?.[9]),
																	Number(match?.split(",")?.[5]),
																	Number(props.match?.homeId)
																)}
															</p>
														</div>
													</div>
												</div>
											)
										)}
									</div>
								</div>
							))}
					</div>
				</div>

				{/* home */}
				<div className="flex flex-1 p-4 rounded-2xl shadow border border-neutral-200 flex-col justify-start items-center ">
					<div className="w-full">
						<div className="flex">
							<img
								className="w-8 h-8 rounded-full mr-3"
								src={props.match?.homeIcon || LOGO_DEFAULT}
								alt=""
							/>
							<h2 className=" text-yellow-700 text-2xl font-bold leading-9">
								{props.match?.homeName}
							</h2>
						</div>

						<div className="flex justify-between mt-3">
							<p>Số Trận gần nhất</p>
							<div className="w-12 h-[29px] px-2 py-1 bg-amber-500 rounded-lg shadow border border-neutral-200 justify-center items-center gap-2 inline-flex">
								<div className="text-center text-white text-sm font-normal leading-[21px]">
									{props.matchAnalysis?.homeLastMatches?.length || 0}
								</div>
								<img
									className="w-4 h-4 relative"
									src="/images/arrow-down.svg"
									alt=""
								/>
							</div>
						</div>

						<div className="flex justify-between  mt-3">
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-emerald-500 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											W
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{homeCount.home.win}
									</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-gray-400  rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											D
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{homeCount.home.draw}
									</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-red-600 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											L
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{homeCount.home.lose}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-4 flex rounded-2xl shadow border border-neutral-200 flex-col justify-start items-start">
						{Object.keys(
							props.matchAnalysis?.listHomeLastMatchesGroupLeague || {}
						)
							.filter(
								(item) =>
									props.matchAnalysis?.listHomeLastMatchesGroupLeague?.[item]
										?.length > 0
							)
							.map((item: any, index) => (
								<div key={index} className="w-full">
									<div className="flex w-full px-4 py-2 bg-yellow-700 rounded-tl-2xl rounded-tr-2xl border border-neutral-200 flex-col justify-start items-start gap-2.5">
										<div className="self-stretch justify-between items-start flex">
											<div>
												<span className="text-gray-400 text-sm font-normal leading-[21px] mr-3"></span>
												<span className="text-indigo-100 text-sm font-normal leading-[21px]">
													{item}
												</span>
											</div>
											<div className="justify-start items-start gap-8 flex">
												<div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
													FT
												</div>
												<div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
													HT
												</div>
											</div>
										</div>
									</div>
									<div className="self-stretch  flex-col justify-start items-center gap-2 flex">
										{props.matchAnalysis?.listHomeLastMatchesGroupLeague[
											item
										]?.map((match: any, key: number) => (
											<div
												className="w-full flex-col justify-start items-start gap-1 flex first:border-b-2 first:mt-2 pb-4"
												key={key}
											>
												<div className="self-stretch px-4 justify-start items-center gap-4 inline-flex">
													<div className="grow shrink basis-0 h-[72px] flex-col justify-between items-start gap-2 inline-flex">
														<div className="self-stretch justify-between items-center gap-[139px] inline-flex">
															<div className="justify-start items-center gap-4 flex">
																<img
																	className="w-8 h-8 rounded-full"
																	src={match.split(",")?.[36] || LOGO_DEFAULT}
																	alt=""
																/>
																<p className="text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[4]}
																</p>
															</div>
															<div className="justify-start items-start gap-8 flex">
																<div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[8]}
																</div>
																<div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[10]}
																</div>
															</div>
														</div>
														<div className="self-stretch justify-between items-center gap-28 inline-flex">
															<div className="justify-start items-center gap-4 flex">
																<img
																	className="w-8 h-8 rounded-full"
																	src={
																		match?.split(",")?.[35] !== "undefined"
																			? match?.split(",")?.[35]
																			: LOGO_DEFAULT
																	}
																	alt=""
																/>
																<p className="text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[6]}
																</p>
															</div>
															<div className="justify-start items-start gap-8 flex">
																<p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[9]}
																</p>
																<p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[11]}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="self-stretch px-4 justify-between items-start flex mt-2">
													<p className="text-neutral-900 text-sm font-normal leading-[21px]">
														{moment(
															new Date(match?.split(",")?.[3] * 1000)
														).format("HH:mm A  | DD.MM.YYYY")}
													</p>
													<div className="w-5 h-5 bg-gray-400 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
														<p
															className={`w-5 h-5 ${
																checkMatchStatus(
																	Number(match?.split(",")?.[8]),
																	Number(match?.split(",")?.[9]),
																	Number(match?.split(",")?.[5]),
																	Number(props.match?.homeId)
																) == "W"
																	? "bg-emerald-500"
																	: checkMatchStatus(
																			Number(match?.split(",")?.[8]),
																			Number(match?.split(",")?.[9]),
																			Number(match?.split(",")?.[5]),
																			Number(props.match?.homeId)
																	  ) == "L"
																	? "bg-red-600"
																	: "bg-gray-400"
															} rounded-[26px] text-white flex-col text-[12px] justify-center items-center gap-2.5 inline-flex`}
														>
															{checkMatchStatus(
																Number(match?.split(",")?.[8]),
																Number(match?.split(",")?.[9]),
																Number(match?.split(",")?.[5]),
																Number(props.match?.homeId)
															)}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
					</div>
				</div>

				{/* away */}
				<div className="flex flex-1 p-4  rounded-2xl shadow border border-neutral-200 flex-col justify-start items-center ">
					<div className="w-full">
						<div className="flex">
							<img
								className="w-8 h-8 rounded-full mr-3"
								src={props.match?.awayIcon || LOGO_DEFAULT}
								alt=""
							/>
							<h2 className=" text-yellow-700 text-2xl font-bold leading-9">
								{props.match?.awayName}
							</h2>
						</div>
						<div className="flex justify-between mt-3">
							<p>Số Trận gần nhất</p>
							<div className="w-12 h-[29px] px-2 py-1 bg-amber-500 rounded-lg shadow border border-neutral-200 justify-center items-center gap-2 inline-flex">
								<div className="text-center text-white text-sm font-normal leading-[21px]">
									{props.matchAnalysis?.awayLastMatches?.length || 0}
								</div>
								<img
									className="w-4 h-4 relative"
									src="/images/arrow-down.svg"
									alt=""
								/>
							</div>
						</div>
						<div className="flex justify-between  mt-3">
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-emerald-500 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											W
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{awayCount.home.win}
									</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-gray-400  rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											D
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{awayCount?.home.draw}
									</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex justify-start items-center gap-2 ">
									<div className="w-5 h-5 bg-red-600 rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex">
										<p className="text-center text-neutral-100 text-[10px] font-semibold leading-[15px]">
											L
										</p>
									</div>
									<span className="text-center text-black text-sm font-normal leading-[21px]">
										x{awayCount.home.lose}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-4 flex rounded-2xl shadow border border-neutral-200 flex-col justify-start items-start">
						{Object.keys(
							props.matchAnalysis?.listAwayLastMatchesGroupLeague || {}
						)
							?.filter(
								(item) =>
									props.matchAnalysis?.listAwayLastMatchesGroupLeague?.[item]
										?.length > 0
							)
							.map((item: any, index: number) => (
								<div key={index} className="w-full">
									<div className="flex w-full px-4 py-2 bg-yellow-700 rounded-tl-2xl rounded-tr-2xl border border-neutral-200 flex-col justify-start items-start gap-2.5">
										<div className="self-stretch justify-between items-start flex">
											<div>
												<span className="text-indigo-100 text-sm font-normal leading-[21px]">
													{item}
												</span>
											</div>
											<div className="justify-start items-start gap-8 flex">
												<div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
													FT
												</div>
												<div className="w-5 text-center text-white text-sm font-normal leading-[21px]">
													HT
												</div>
											</div>
										</div>
									</div>
									<div className="self-stretch  flex-col justify-start items-center gap-2 flex">
										{props.matchAnalysis?.listAwayLastMatchesGroupLeague[
											item
										]?.map((match: any, key: number) => (
											<div
												className="w-full flex-col justify-start items-start gap-1 flex first:border-b-2 first:mt-2 pb-4"
												key={key}
											>
												<div className="self-stretch px-4 justify-start items-center gap-4 inline-flex">
													<div className="grow shrink basis-0 h-[72px] flex-col justify-between items-start gap-2 inline-flex">
														<div className="self-stretch justify-between items-center gap-[139px] inline-flex">
															<div className="justify-start items-center gap-4 flex">
																<img
																	className="w-8 h-8 rounded-full"
																	src={match?.split(",")?.[3] || LOGO_DEFAULT}
																	alt=""
																/>
																<p className="text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[4]}
																</p>
															</div>
															<div className="justify-start items-start gap-8 flex">
																<div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[8]}
																</div>
																<div className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[10]}
																</div>
															</div>
														</div>
														<div className="self-stretch justify-between items-center gap-28 inline-flex">
															<div className="justify-start items-center gap-4 flex">
																<img
																	className="w-8 h-8 rounded-full"
																	src={`${
																		match?.split(",")?.[35] !== "undefined"
																			? match?.split(",")?.[35]
																			: LOGO_DEFAULT
																	}`}
																	alt=""
																/>
																<p className="text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[6]}
																</p>
															</div>
															<div className="justify-start items-start gap-8 flex">
																<p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[9]}
																</p>
																<p className="w-5 text-center text-neutral-900 text-sm font-normal leading-[21px]">
																	{match?.split(",")?.[11]}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="self-stretch px-4 justify-between items-start flex mt-2">
													<p className="text-neutral-900 text-sm font-normal leading-[21px]">
														{moment(
															new Date(match?.split(",")?.[3] * 1000)
														).format("HH:mm A  | DD.MM.YYYY")}
													</p>
													<div
														className={`w-5 h-5 ${
															checkMatchStatus(
																Number(match?.split(",")?.[8]),
																Number(match?.split(",")?.[9]),
																Number(match?.split(",")?.[5]),
																Number(props.match?.awayId)
															) == "W"
																? "bg-emerald-500"
																: checkMatchStatus(
																		Number(match?.split(",")?.[8]),
																		Number(match?.split(",")?.[9]),
																		Number(match?.split(",")?.[5]),
																		Number(props.match?.awayId)
																  ) == "L"
																? "bg-red-600"
																: "bg-gray-400"
														} rounded-[26px] flex-col justify-center items-center gap-2.5 inline-flex`}
													>
														<p
															className={`text-center text-white text-[10px] font-semibold leading-[15px]`}
														>
															{checkMatchStatus(
																Number(match?.split(",")?.[8]),
																Number(match?.split(",")?.[9]),
																Number(match?.split(",")?.[5]),
																Number(props.match?.awayId)
															)}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default H2H;
