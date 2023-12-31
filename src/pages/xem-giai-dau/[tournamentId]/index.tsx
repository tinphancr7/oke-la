import Button from "@/components/button/Button";
import Image from "next/image";
import {useCallback, useEffect, useRef, useState} from "react";
import {RiArrowDownSFill} from "react-icons/ri";
import Heading from "@/components/heading/Heading";
import Pagination from "@/components/pagination/Pagination";
import scheduleApi from "@/apis/schedule.api";
import {formatDate} from "@/utils/common";
import {useRouter} from "next/router";
import Link from "next/link";
import RankTable from "@/components/rankTable";
import Breadcrumb from "@/components/Breadcrumb";
import ListMatchLeagueRound from "@/containers/Schedule/ListMatchLeagueRound";
import {getLeagueById} from "@/apis/league";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import {useQuery} from "@tanstack/react-query";
import TopScore from "@/components/topScore/TopScore";
import TableTeam from "@/components/table/TableTeam";
import LeagueOtherHome from "@/containers/Home/LeagueOtherHome";
import slugify from "slugify";

const tabs = [
	{
		id: 1,
		name: "Tổng quan",
	},
	{
		id: 2,
		name: "Lịch thi đấu",
		nameEn: "schedule",
	},
	{
		id: 3,
		name: "Bảng xếp hạng",
		nameEn: "rank",
	},
	{
		id: 4,
		name: "vua phá lưới",
		nameEn: "list-goal",
	},
	{
		id: 5,
		name: "CLB",
		nameEn: "team",
	},
];
const Tournament = () => {
	const router = useRouter();
	const [tab, setTab] = useState(Number(router.query?.tab) || 1);
	const [round, setRound] = useState(1);

	const leagueId = router.query?.leagueId?.toString() || "";

	const sliderRef = useRef<any>(null);
	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);

	const {data: leagueProfileData} = useQuery({
		queryKey: ["leagueProfile", leagueId],
		queryFn: () => getLeagueById(leagueId),
		enabled: !!leagueId,
	});
	const leagueProfile = leagueProfileData?.data;

	const {data: schedules} = useQuery({
		queryKey: ["schedules", leagueId, round],
		queryFn: () => scheduleApi.getSchedulesById(leagueId, round.toString()),
		enabled: !!leagueId,
	});
	const schedulesData = schedules?.data;
	useEffect(() => {
		setTab(Number(router.query?.tab));
	}, [router.query?.tab]);
	useEffect(() => {
		setRound(leagueProfile?.currentRound);
	}, [leagueProfile?.currentRound]);

	const renderTab = () => {
		switch (tab) {
			case 1:
				return (
					<div>
						<h2 className="uppercase font-bold text-red-500 pb-4 text-lg">
							{leagueProfile?.name} - TỔNG QUAN
						</h2>
						{/* bg-[#F1F1F1] */}
						<div className="rounded-xl shadow bg-gray-50 border border-[#E4E4E4] p-4 mb-6">
							<Heading className=" ">Vòng</Heading>

							<div className="league-detail-round mb-4 relative px-[35px]">
								{leagueProfile?.currentRound && (
									<Swiper
										// @ts-ignore
										ref={sliderRef}
										slidesPerView={7}
										spaceBetween={10}
										initialSlide={leagueProfile?.currentRound - 4}
									>
										{new Array(leagueProfile?.totalRound)
											.fill(leagueProfile?.totalRound)
											.map((item, index) => (
												<SwiperSlide key={index}>
													<div
														onClick={() => setRound(index + 1)}
														className={`${
															round == index + 1
																? `bg-secondary text-white`
																: "bg-light text-gray9D"
														} text-center py-2  rounded-lg cursor-pointer text-sm lg:text-md`}
													>
														{index + 1}
													</div>
												</SwiperSlide>
											))}
									</Swiper>
								)}
								<ButtonOnlyIcon
									onClick={handlePrev}
									wrapperClassName="rounded-full"
									wrapperStyle={{
										position: "absolute",
										top: "50%",
										left: "0",
										zIndex: "1000",
										transform: "translateY(-50%)",
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											opacity="0.2"
											d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.387 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
											fill="#A95E01"
										/>
										<path
											d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM14.0306 8.78063L10.8103 12L14.0306 15.2194C14.1003 15.2891 14.1556 15.3718 14.1933 15.4628C14.231 15.5539 14.2504 15.6515 14.2504 15.75C14.2504 15.8485 14.231 15.9461 14.1933 16.0372C14.1556 16.1282 14.1003 16.2109 14.0306 16.2806C13.9609 16.3503 13.8782 16.4056 13.7872 16.4433C13.6961 16.481 13.5986 16.5004 13.5 16.5004C13.4015 16.5004 13.3039 16.481 13.2128 16.4433C13.1218 16.4056 13.0391 16.3503 12.9694 16.2806L9.21938 12.5306C9.14965 12.461 9.09433 12.3783 9.05658 12.2872C9.01884 12.1962 8.99941 12.0986 8.99941 12C8.99941 11.9014 9.01884 11.8038 9.05658 11.7128C9.09433 11.6217 9.14965 11.539 9.21938 11.4694L12.9694 7.71937C13.0391 7.64969 13.1218 7.59442 13.2128 7.5567C13.3039 7.51899 13.4015 7.49958 13.5 7.49958C13.5986 7.49958 13.6961 7.51899 13.7872 7.5567C13.8782 7.59442 13.9609 7.64969 14.0306 7.71937C14.1003 7.78906 14.1556 7.87178 14.1933 7.96283C14.231 8.05387 14.2504 8.15145 14.2504 8.25C14.2504 8.34855 14.231 8.44613 14.1933 8.53717C14.1556 8.62822 14.1003 8.71094 14.0306 8.78063Z"
											fill="#A95E01"
										/>
									</svg>
								</ButtonOnlyIcon>
								<ButtonOnlyIcon
									onClick={handleNext}
									wrapperClassName="rounded-full"
									wrapperStyle={{
										position: "absolute",
										top: "50%",
										right: "0",
										zIndex: "1000",
										transform: "translateY(-50%)",
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											opacity="0.2"
											d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.387 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
											fill="#A95E01"
										/>
										<path
											d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM14.7806 11.4694C14.8504 11.539 14.9057 11.6217 14.9434 11.7128C14.9812 11.8038 15.0006 11.9014 15.0006 12C15.0006 12.0986 14.9812 12.1962 14.9434 12.2872C14.9057 12.3783 14.8504 12.461 14.7806 12.5306L11.0306 16.2806C10.9609 16.3503 10.8782 16.4056 10.7872 16.4433C10.6961 16.481 10.5986 16.5004 10.5 16.5004C10.4015 16.5004 10.3039 16.481 10.2128 16.4433C10.1218 16.4056 10.0391 16.3503 9.96938 16.2806C9.8997 16.2109 9.84442 16.1282 9.80671 16.0372C9.769 15.9461 9.74959 15.8485 9.74959 15.75C9.74959 15.6515 9.769 15.5539 9.80671 15.4628C9.84442 15.3718 9.8997 15.2891 9.96938 15.2194L13.1897 12L9.96938 8.78063C9.82865 8.63989 9.74959 8.44902 9.74959 8.25C9.74959 8.05098 9.82865 7.86011 9.96938 7.71937C10.1101 7.57864 10.301 7.49958 10.5 7.49958C10.699 7.49958 10.8899 7.57864 11.0306 7.71937L14.7806 11.4694Z"
											fill="#A95E01"
										/>
									</svg>
								</ButtonOnlyIcon>
							</div>

							<div>
								<Heading className="">Trận cầu vòng {round}</Heading>
								<div>
									{schedulesData?.length === 0 ? (
										<div className="flex items-center justify-center text-red-500 font-semibold text-base uppercase">
											không có dữ liệu
										</div>
									) : (
										schedulesData?.map((schedule: any, index: number) => (
											<div key={index} className="bg-white w-full border-b">
												<div className="flex items-center p-4 ">
													<div className="text-xs text-black11 w-[20%] flex items-center flex-col lg:flex-row gap-1">
														{formatDate(schedule?.matchTime)}
													</div>
													<div className="flex md:items-center justify-center text-xs font-normal text-black11 w-[60%] gap-4 flex-col lg:flex-row">
														<div className="flex  items-center gap-2 w-full justify-between lg:w-[45%] lg:justify-end">
															<div className="flex  gap-2 flex-row-reverse lg:flex-row items-center">
																<span className=" text-sm font-semibold whitespace-nowrap ">
																	{schedule?.homeName}
																</span>
																<div className="w-7 h-7 bg-[#F4F5F6] rounded-full flex items-center justify-center">
																	<div className="w-6 h-6 relative flex-shrink-0">
																		<Image
																			src={schedule?.homeIcon}
																			fill
																			className="w-full h-full object-fill"
																			alt=""
																		/>
																	</div>
																</div>
															</div>
															<div className="md:hidden">
																{schedule?.status === 0
																	? "?"
																	: schedule?.homeScore}
															</div>
														</div>
														<div className="hidden lg:flex gap-1 items-center justify-center w-[10%] text-sm font-semibold">
															<span>
																{schedule?.status === 0
																	? "?"
																	: schedule?.homeScore}
															</span>
															<span>-</span>
															<span>
																{schedule?.status === 0
																	? "?"
																	: schedule?.awayScore}
															</span>
														</div>
														<div className="flex items-center gap-2 justify-between w-full lg:w-[45%] ">
															<div className="flex  items-center gap-2">
																<div className="w-7 h-7 bg-[#F4F5F6] rounded-full flex items-center justify-center">
																	<div className="w-6 h-6 relative flex-shrink-0">
																		<Image
																			src={schedule?.awayIcon}
																			fill
																			className="w-full h-full object-fill"
																			alt=""
																		/>
																	</div>
																</div>
																<span className="text-sm font-semibold whitespace-nowrap">
																	{schedule?.awayName}
																</span>
															</div>
															<div className="md:hidden">
																{schedule?.status === 0
																	? "?"
																	: schedule?.awayScore}
															</div>
														</div>
													</div>
													<div className="w-[20%] flex items-center justify-end">
														<Link
															href={`/truc-tiep/${schedule?.matchId}`}
															className="text-black00 text-xs font-bold border-b inline-flex border-black00 "
														>
															Chi tiết
														</Link>
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>
						<RankTable leagueId={leagueId} />
					</div>
				);
			case 2:
				return (
					<div>
						<h2 className="uppercase font-bold text-red-500 pb-4 text-lg">
							{leagueProfile?.name} - Lịch thi đấu
						</h2>
						<div className="league-detail-round mt-10 relative px-[35px]">
							<Swiper
								// @ts-ignore
								ref={sliderRef}
								slidesPerView={7}
								spaceBetween={10}
								initialSlide={round - 4}
							>
								{new Array(leagueProfile?.totalRound)
									.fill(leagueProfile?.totalRound)
									.map((item, index) => (
										<SwiperSlide key={index}>
											<div
												onClick={() => setRound(index + 1)}
												className={`${
													round == index + 1
														? `bg-secondary text-white`
														: "bg-light text-gray9D"
												} text-center py-2  rounded-lg cursor-pointer text-sm lg:text-md`}
											>
												{index + 1}
											</div>
										</SwiperSlide>
									))}
							</Swiper>
							<ButtonOnlyIcon
								onClick={handlePrev}
								wrapperClassName="rounded-full"
								wrapperStyle={{
									position: "absolute",
									top: "50%",
									left: "0",
									zIndex: "1000",
									transform: "translateY(-50%)",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										opacity="0.2"
										d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.387 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
										fill="#A95E01"
									/>
									<path
										d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM14.0306 8.78063L10.8103 12L14.0306 15.2194C14.1003 15.2891 14.1556 15.3718 14.1933 15.4628C14.231 15.5539 14.2504 15.6515 14.2504 15.75C14.2504 15.8485 14.231 15.9461 14.1933 16.0372C14.1556 16.1282 14.1003 16.2109 14.0306 16.2806C13.9609 16.3503 13.8782 16.4056 13.7872 16.4433C13.6961 16.481 13.5986 16.5004 13.5 16.5004C13.4015 16.5004 13.3039 16.481 13.2128 16.4433C13.1218 16.4056 13.0391 16.3503 12.9694 16.2806L9.21938 12.5306C9.14965 12.461 9.09433 12.3783 9.05658 12.2872C9.01884 12.1962 8.99941 12.0986 8.99941 12C8.99941 11.9014 9.01884 11.8038 9.05658 11.7128C9.09433 11.6217 9.14965 11.539 9.21938 11.4694L12.9694 7.71937C13.0391 7.64969 13.1218 7.59442 13.2128 7.5567C13.3039 7.51899 13.4015 7.49958 13.5 7.49958C13.5986 7.49958 13.6961 7.51899 13.7872 7.5567C13.8782 7.59442 13.9609 7.64969 14.0306 7.71937C14.1003 7.78906 14.1556 7.87178 14.1933 7.96283C14.231 8.05387 14.2504 8.15145 14.2504 8.25C14.2504 8.34855 14.231 8.44613 14.1933 8.53717C14.1556 8.62822 14.1003 8.71094 14.0306 8.78063Z"
										fill="#A95E01"
									/>
								</svg>
							</ButtonOnlyIcon>
							<ButtonOnlyIcon
								onClick={handleNext}
								wrapperClassName="rounded-full"
								wrapperStyle={{
									position: "absolute",
									top: "50%",
									right: "0",
									zIndex: "1000",
									transform: "translateY(-50%)",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										opacity="0.2"
										d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.387 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
										fill="#A95E01"
									/>
									<path
										d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM14.7806 11.4694C14.8504 11.539 14.9057 11.6217 14.9434 11.7128C14.9812 11.8038 15.0006 11.9014 15.0006 12C15.0006 12.0986 14.9812 12.1962 14.9434 12.2872C14.9057 12.3783 14.8504 12.461 14.7806 12.5306L11.0306 16.2806C10.9609 16.3503 10.8782 16.4056 10.7872 16.4433C10.6961 16.481 10.5986 16.5004 10.5 16.5004C10.4015 16.5004 10.3039 16.481 10.2128 16.4433C10.1218 16.4056 10.0391 16.3503 9.96938 16.2806C9.8997 16.2109 9.84442 16.1282 9.80671 16.0372C9.769 15.9461 9.74959 15.8485 9.74959 15.75C9.74959 15.6515 9.769 15.5539 9.80671 15.4628C9.84442 15.3718 9.8997 15.2891 9.96938 15.2194L13.1897 12L9.96938 8.78063C9.82865 8.63989 9.74959 8.44902 9.74959 8.25C9.74959 8.05098 9.82865 7.86011 9.96938 7.71937C10.1101 7.57864 10.301 7.49958 10.5 7.49958C10.699 7.49958 10.8899 7.57864 11.0306 7.71937L14.7806 11.4694Z"
										fill="#A95E01"
									/>
								</svg>
							</ButtonOnlyIcon>
						</div>
						<ListMatchLeagueRound
							league={leagueId}
							leagueProfile={leagueProfile}
							round={round}
							matchThesport={[]}
						/>
					</div>
				);
			case 3:
				return (
					<div>
						<h2 className="uppercase font-bold text-red-500 pb-4 text-lg">
							{leagueProfile?.name} - BẢNG XẾP HẠNG
						</h2>
						<RankTable leagueId={leagueId} />
					</div>
				);
			case 4:
				return (
					<div>
						<h2 className="uppercase font-bold text-red-500 pb-4 text-lg">
							{leagueProfile?.name} - VUA PHÁ LƯỚI
						</h2>
						<TopScore
							leagueId={leagueId}
							currentSeason={leagueProfile?.currentSeason}
						/>
					</div>
				);

			case 5:
				return (
					<div className="">
						<h2 className="uppercase font-bold text-red-500 pb-4 text-lg">
							{leagueProfile?.name} - DANH SÁCH CÂU LẠC BỘ
						</h2>
						<TableTeam leagueId={leagueId} />
					</div>
				);
			default:
				return <div>default</div>;
		}
	};

	return (
		<div className="xl:container mx-auto pt-8 md:px-4 xl:px-2 mb-4">
			<div className="py-6 px-4 hidden md:block">
				<Breadcrumb
					backLink="/"
					breadCrumb={[
						{title: "Trang chủ", url: "/"},
						{
							title: leagueProfile?.name,
							url: `/xem-giai-dau/${slugify(
								leagueProfile?.name || ""
							).toLowerCase()}?leagueId=${leagueId}&tab=${1}`,
						},
					]}
				/>
			</div>
			<div className="flex overflow-x-scroll lg:overflow-hidden  lg:inline-flex items-center gap-10 border-b  mb-4 mx-4">
				{tabs.map((item, index) => (
					<div
						key={index}
						onClick={() => setTab(item.id)}
						className={` text-base capitalize whitespace-nowrap  pb-1  cursor-pointer transition ${
							tab === index + 1
								? "text-secondary  border-b-2 border-secondary font-bold"
								: "text-[#BBBBBB]"
						}`}
					>
						{item.name}
					</div>
				))}
			</div>

			<div>
				<div className="grid grid-cols-12 gap-5 mt-4">
					<div className="col-span-12 lg:col-span-3">
						<div className="mb-4">
							<div className="w-full p-4 flex-col  h-fit bg-[#f1f1f1] border-[#E4E4E4] border rounded-lg shadow">
								<div className="flex items-center gap-2 pb-6">
									<div className="w-[80px] h-[80px] relative flex-shrink-0">
										<Image
											src={leagueProfile?.logo}
											fill
											className="w-full h-full object-fill rounded-full"
											alt=""
										/>
									</div>
									<h3 className="text-2xl font-bold text-[#000]">
										{leagueProfile?.name}
									</h3>
								</div>
								<div className="text-base font-normal">
									<div className="flex items-center justify-between pb-2">
										<span>Quốc gia:</span>
										<div className="flex items-center gap-2">
											<div className="w-6 h-6 relative flex-shrink-0">
												<Image
													src={leagueProfile?.countryLogo}
													fill
													className="w-full h-full object-contain rounded-full"
													alt=""
												/>
											</div>
											<span className="capitalize">
												{leagueProfile?.country}
											</span>
										</div>
									</div>
									<div className="flex items-center justify-between pb-2">
										<span>Mùa giải</span>
										<Button
											type="button"
											className="bg-primary text-white font-normal px-[10px] py-1"
											icon={RiArrowDownSFill}
										>
											{leagueProfile?.currentSeason.split("-")[0]}{" "}
											{leagueProfile?.currentSeason.split("-")[1]}
										</Button>
									</div>
									<div className="flex items-center justify-between pb-2">
										<span>Cầu thủ</span>
										<span>702</span>
									</div>
									<div className="flex items-center justify-between pb-2">
										<span>Cầu thủ ngoại</span>
										<span>265</span>
									</div>
									<div className="flex items-center justify-between pb-2">
										<span>Số lượng đội</span>
										<span>702</span>
									</div>
									<div className="flex items-center justify-between pb-2">
										<span>Giá trị thị trường ($)</span>
										<span>10.45125 B</span>
									</div>
								</div>
							</div>
						</div>
						<LeagueOtherHome />
					</div>
					<div className="col-span-12 lg:col-span-9">{renderTab()}</div>
				</div>
			</div>
		</div>
	);
};

export default Tournament;
