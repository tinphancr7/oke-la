import {getHotMatch, getPlayingMatches} from "@/apis/match";
import Heading from "@/components/heading/Heading";
import HotMatch from "@/components/hotMatch";
import {IHotMatch, IMatch} from "@/interfaces";
import {GetServerSidePropsContext} from "next";
import Image from "next/image";
import {LOGO_DEFAULT, matchStatus} from "../../constant";
import moment from "moment";
import Link from "next/link";
import {generateMatchTime, isPlayingMatches} from "@/utils";
import {getSeoByLink} from "@/apis/seo";
import Head from "next/head";
import React, {useMemo, useState} from "react";
import parse from "html-react-parser";
import {useDebounce} from "@/utils/useDebounce";

const Live = ({
	matches,
	playingMatches,
	tags,
}: {
	matches: IMatch[];
	playingMatches: IMatch[];
	tags: string[];
}) => {
	const [allMatches, setAllMatches] = useState(playingMatches);
	const [searchMatch, setSearchMatch] = useState("");
	const searchValue = useDebounce(searchMatch, 500);

	const data = useMemo(() => {
		if (searchValue) {
			return playingMatches
				?.filter(
					(item) =>
						item?.homeName
							?.toLowerCase()
							.includes(searchValue?.toLowerCase()) ||
						item?.awayName?.toLowerCase().includes(searchValue?.toLowerCase())
				)
				?.sort((a, b) => {
					const hotA = a?.isHot ? 2 : 1;
					const hotB = b?.isHot ? 2 : 1;
					const liveA = [1, 2, 3, 4].includes(a?.status) ? 3 : 1;
					const liveB = [1, 2, 3, 4].includes(b?.status) ? 3 : 1;
					const timeA = a?.matchTime < b?.matchTime ? 1 : 0;
					const timeB = b?.matchTime < a?.matchTime ? 1 : 0;
					return hotB + liveB - timeB - (hotA + liveA + timeA);
				});
		}
		return playingMatches?.sort((a, b) => {
			const hotA = a?.isHot ? 2 : 1;
			const hotB = b?.isHot ? 2 : 1;
			const liveA = [1, 2, 3, 4].includes(a?.status) ? 3 : 1;
			const liveB = [1, 2, 3, 4].includes(b?.status) ? 3 : 1;
			const timeA = a?.matchTime < b?.matchTime ? 1 : 0;
			const timeB = b?.matchTime < a?.matchTime ? 1 : 0;
			return hotB + liveB - timeB - (hotA + liveA + timeA);
		});
	}, [playingMatches, searchValue]);

	return (
		<>
			<Head>
				{tags?.map((tag, index) => (
					<React.Fragment key={index}>{parse(tag)}</React.Fragment>
				))}
			</Head>
			<div className="mt-6 xl:container mx-auto md:px-4 xl:px-2">
				<h1 className="text-secondary text-3xl font-bold text-bigger uppercase text-center">
					Trận cầu đáng xem
				</h1>
				<div className="mt-6">
					<HotMatch matches={(matches as any) || []} />
				</div>
				<div className="flex flex-col items-center mt-8 pb-5 justify-between">
					<div className="text-center w-full">
						<Heading className="text-secondary pb-0 !text-3xl uppercase">
							Các trận cầu trực tiếp khác
						</Heading>
					</div>

					<div className="flex items-center bg-light px-2 py-2 rounded-lg gap-x-4 mt-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="19"
							height="18"
							viewBox="0 0 19 18"
							fill="none"
						>
							<path
								opacity="0.2"
								d="M14 7.875C14 8.98752 13.6701 10.0751 13.052 11.0001C12.4339 11.9251 11.5554 12.6461 10.5276 13.0718C9.49976 13.4976 8.36876 13.609 7.27762 13.3919C6.18648 13.1749 5.1842 12.6391 4.39753 11.8525C3.61086 11.0658 3.07513 10.0635 2.85809 8.97238C2.64104 7.88124 2.75244 6.75024 3.17818 5.72241C3.60392 4.69457 4.32489 3.81607 5.24992 3.19798C6.17495 2.5799 7.26248 2.25 8.375 2.25C9.11369 2.25 9.84514 2.39549 10.5276 2.67818C11.2101 2.96086 11.8301 3.37519 12.3525 3.89752C12.8748 4.41985 13.2891 5.03995 13.5718 5.72241C13.8545 6.40486 14 7.13631 14 7.875Z"
								fill="#A95E01"
							/>
							<path
								d="M16.6478 15.3522L13.128 11.8324C14.1502 10.6064 14.6604 9.03357 14.5524 7.44103C14.4445 5.84849 13.7267 4.35887 12.5484 3.28207C11.3702 2.20528 9.82209 1.62421 8.22629 1.65974C6.63049 1.69528 5.10983 2.34469 3.98065 3.47287C2.85147 4.60105 2.20072 6.12114 2.16377 7.71691C2.12683 9.31268 2.70653 10.8613 3.78229 12.0405C4.85804 13.2197 6.34702 13.9388 7.93947 14.0482C9.53191 14.1575 11.1052 13.6487 12.3321 12.6276L15.8519 16.1482C15.9042 16.2004 15.9662 16.2419 16.0345 16.2702C16.1028 16.2984 16.176 16.313 16.2499 16.313C16.3238 16.313 16.397 16.2984 16.4653 16.2702C16.5335 16.2419 16.5956 16.2004 16.6478 16.1482C16.7001 16.0959 16.7416 16.0338 16.7698 15.9656C16.7981 15.8973 16.8127 15.8241 16.8127 15.7502C16.8127 15.6763 16.7981 15.6031 16.7698 15.5348C16.7416 15.4665 16.7001 15.4045 16.6478 15.3522ZM3.31238 7.87518C3.31238 6.87391 3.60929 5.89513 4.16556 5.06261C4.72184 4.23008 5.51249 3.58121 6.43754 3.19804C7.36259 2.81487 8.38049 2.71462 9.36252 2.90996C10.3446 3.10529 11.2466 3.58745 11.9546 4.29545C12.6626 5.00346 13.1448 5.90551 13.3401 6.88754C13.5354 7.86957 13.4352 8.88747 13.052 9.81252C12.6688 10.7376 12.02 11.5282 11.1875 12.0845C10.3549 12.6408 9.37614 12.9377 8.37488 12.9377C7.03267 12.9362 5.74587 12.4023 4.79679 11.4533C3.84771 10.5042 3.31387 9.21738 3.31238 7.87518Z"
								fill="#A95E01"
							/>
						</svg>

						<input
							placeholder="Tìm kiếm trận đấu"
							className="focus:border-0 focus:outline-0 bg-transparent text-xs lg:text-sm w-[300px]"
							onChange={(e) => setSearchMatch(e.target.value)}
						/>
					</div>
				</div>
				{data?.length ? (
					<div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-5">
						{data?.map((item: any, index) => (
							<div key={index} className="col-span-4">
								<Link href={`/truc-tiep/${item.matchId}`}>
									<div
										className="w-full h-fit p-2 bg-grayF4 shadow-lg  rounded-lg relative"
										style={{
											boxShadow:
												"0px 5px 16px 0px #c5c8d9, 0 8px 0px 0px #fc9905",
										}}
									>
										<div className=" flex items-center justify-center   text-center mb-4 rounded-[4px] py-2">
											<h4 className="uppercase text-[13px] p-2 rounded-lg   font-semibold bg-[#999999] text-white  text-center">
												{item?.leagueName}
											</h4>
										</div>
										<div className="flex items-center pb-2">
											<div className="w-[40%] ">
												<div className="flex flex-col gap-2 justify-center items-center ">
													<div className="!bg-white shadow-lg p-2.5 rounded-full">
														<div className="w-10 h-10 rounded-full relative shadow-lg  ">
															<Image
																src={item.homeIcon || LOGO_DEFAULT}
																className=" object-cover "
																fill
																alt="Arsenal"
															/>
														</div>
													</div>
													<span className="text-xs md:text-[14px] font-semibold text-black text-center">
														{item.homeName}
													</span>
												</div>
											</div>
											<div className="w-[20%]">
												{!isPlayingMatches(item?.status) ? (
													<div className="flex flex-col items-center justify-center ">
														<span className="inline-block text-center text-redE6 text-[13px] font-semibold uppercase">
															{matchStatus[item.status?.toString()]}
														</span>
														<span className="text-black text-center font-semibold text-[12px]">
															{moment(
																new Date(
																	new Date().setTime(item.matchTime * 1000)
																)
															).format("HH:mm A")}
														</span>
														<span className="text-black text-center font-semibold text-[12px]">
															{moment(
																new Date(
																	new Date().setTime(item.matchTime * 1000)
																)
															).format("DD-MM-YYYY")}
														</span>
													</div>
												) : (
													<>
														<div className="text-center font-bold text-[20px]">
															{item?.homeScore} - {item?.awayScore}
														</div>
														<div className="w-full flex items-center justify-center">
															<div className="w-[50px] h-[50px] relative">
																<Image
																	className="object-cover"
																	alt="icon-play"
																	fill
																	src={"/images/icon-play2.png"}
																/>
															</div>
														</div>

														<div className="text-center text-secondary mt-1">
															{item?.status == 2
																? "HT"
																: generateMatchTime(
																		item?.matchTime,
																		item?.status,
																		item?.halfStartTime
																  )}
															{item?.status !== 2 && (
																<span className="blink-minute">'</span>
															)}
														</div>
													</>
												)}
											</div>
											<div className="w-[40%]">
												<div className="flex flex-col gap-2 justify-center items-center">
													<div className="!bg-white shadow-lg p-2.5 rounded-full">
														<div className="w-10 h-10 rounded-full relative shadow-lg  ">
															<Image
																src={item.awayIcon || LOGO_DEFAULT}
																className=" object-cover "
																fill
																alt="Arsenal"
															/>
														</div>
													</div>
													<span className="text-xs md:text-[14px] font-semibold text-black text-center">
														{item.awayName}
													</span>
												</div>
											</div>
										</div>
										{/* <div className="button-footer flex justify-end gap-2 border-t-2 p-2">
                      <Link href={`/truc-tiep/${item?.matchId}`}>
                        <div
                          className="py-1 px-2 bg-white text-black rounded-lg shadow-md text-[15px]"
                          style={{ border: "1px solid rgb(14,116,144)" }}
                        >
                          Trực tiếp
                        </div>
                      </Link>
                      <Link href={`/truc-tiep/${item?.matchId}`}>
                        <div className="py-1 px-2 bg-secondary text-white rounded-lg  text-[15px]">
                          Cược ngay
                        </div>
                      </Link>
                    </div> */}

										{/* <div className="px-4 py-2 bg-white">
                  <div className="flex items-start">
                    <div className="w-[45%]">
                      <div className="text-xs flex flex-col">
                        <h4 className="text-secondary text-xs font-semibold text-center pb-2">
                          Cược chấp
                        </h4>
                        <div className="flex items-center justify-between bg-[#EDEDED] p-1 mb-1.5">
                          <span className="font-normal">
                            H{" "}
                            {convertToOdd(
                              convertStringOddToArray(item?.handicap)?.[5]
                            )}
                          </span>
                          <span className="font-semibold">
                            {" "}
                            {convertStringOddToArray(item?.handicap)?.[6]
                              ? convertStringOddToArray(item?.handicap)?.[6]
                              : "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-[#EDEDED] p-1">
                          <span className="font-normal">A </span>
                          <span className="font-semibold">
                            {convertStringOddToArray(item?.handicap)?.[7]
                              ? convertStringOddToArray(item?.handicap)?.[7]
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[10%] px-4">
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 relative flex-shrink-0">
                          <Image
                            src="/images/play.png"
                            className="w-full h-full object-fill"
                            fill
                            alt="play"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <div className="text-xs flex flex-col text-center">
                        <h4 className="text-secondary text-xs font-semibold pb-2">
                          Tài xỉu
                        </h4>
                        <div className="flex items-center justify-between bg-[#EDEDED] p-1 mb-1.5">
                          <span className="font-normal">
                            o{" "}
                            {convertToOdd(
                              convertStringOddToArray(item?.overUnder)?.[5]
                            )}
                          </span>
                          <span className="font-semibold">
                            {" "}
                            {convertStringOddToArray(item?.overUnder)?.[6]
                              ? convertStringOddToArray(item?.overUnder)?.[6]
                              : "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-[#EDEDED] p-1">
                          <span className="font-normal">
                            u{" "}
                            {convertToOdd(
                              convertStringOddToArray(item?.overUnder)?.[5]
                            )}
                          </span>
                          <span className="font-semibold">
                            {" "}
                            {convertStringOddToArray(item?.overUnder)?.[7]
                              ? convertStringOddToArray(item?.overUnder)?.[7]
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
									</div>
								</Link>
							</div>
						))}
					</div>
				) : (
					<div className="text-sm md:text-xl lg:text-2xl font-bold text-center text-secondary mt-4">
						Không tìm thấy trận đấu
					</div>
				)}
			</div>
		</>
	);
};

export default Live;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	try {
		const pageSize = ctx.query?.pageSize ? Number(ctx.query?.pageSize) : 500;
		const pageIndex = ctx.query?.pageIndex ? Number(ctx.query?.pageIndex) : 1;

		const result = await getHotMatch();
		const resultPlaying = await getPlayingMatches(pageSize, pageIndex);
		const seo = await getSeoByLink("/truc-tiep");

		return {
			props: {
				matches: result.data?.result || [],
				playingMatches: resultPlaying.data.result || [],
				tags: seo?.data?.result?.tags || [],
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				matches: [],
				playingMatches: [],
				tags: [],
			},
		};
	}
}
