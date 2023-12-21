import {IHotMatch} from "@/interfaces";
import {isPlayingMatches, renderStatus} from "@/utils";
import Image from "next/image";
import {useCallback, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {EffectCoverflow, Navigation, Pagination} from "swiper";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import ButtonOnlyIcon from "../button/ButtonOnlyIcon";
import Link from "next/link";
import {LOGO_DEFAULT, matchStatus} from "@/constant";
import LiveMatchTime from "../renderLiveMatchTime";

SwiperCore.use([EffectCoverflow, Navigation, Pagination]);
const HotMatch = ({matches}: {matches: IHotMatch[]}) => {
	const sliderRef = useRef<any>(null);

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);
	const [matchId, setMatchId] = useState(matches[1]?.matchId);
	const indexMiddle = 1;
	return (
		<>
			<div className="matches-list hidden lg:block" id="matches-list">
				{matches.length > 0 && (
					<Swiper
						//@ts-ignore
						ref={sliderRef}
						effect={"coverflow"}
						grabCursor
						loop
						centeredSlides
						slidesPerView={"auto"}
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 3.4,
							slideShadows: true,
						}}
						spaceBetween={3}
						initialSlide={3}
						roundLengths={true}
						navigation={false}
					>
						{matches?.map((match, index) => (
							<SwiperSlide key={index}>
								<Link href={`/truc-tiep/${match?.matchId}`}>
									<div
										className={`relative match-list-card ${
											matchId == match.matchId ? "match-list-card-main" : ""
										} ${
											index > indexMiddle
												? "match-list-card-pre"
												: index < indexMiddle
												? "match-list-card-next"
												: ""
										}`}
									>
										<div className="match-card">
											<p className="text-center text-[20px] font-bold uppercase match-list-card-title">
												{matchStatus[match.status.toString()]}
											</p>
											<p className="text-center mt-4 text-[12px]">
												<span className="text-white mt-2 p-2 bg-[rgba(0,0,0,0.40)] rounded uppercase">
													{match.leagueName}
												</span>
											</p>
											<div className="flex mt-4 justify-center gap-8 match-list-card-container">
												<div className="flex-1 flex items-center match-list-card-wrapper">
													<div>
														<div className="w-20 h-20 relative bg-white shadow-lg p-2 rounded-full ">
															<Image
																src={match?.homeIcon || LOGO_DEFAULT}
																alt="home-name"
																fill
																className="object-cover "
															/>
														</div>
														<p className="text-center mt-2 text-truncate">
															{match.homeName}
														</p>
													</div>
													<p className="text-secondary font-bold text-[20px]">
														{isPlayingMatches(match.status)
															? match.homeScore
															: ""}
													</p>
												</div>
												<div className="flex-1 flex justify-center items-center flex-col">
													<div className="w-[70px] h-[70px] relative">
														<Image
															className="object-cover"
															alt="icon-play"
															fill
															src={"/images/icon-play2.png"}
														/>
													</div>
													<p className="text-time-red mt-2 text-[18px]">
														{isPlayingMatches(match.status) ? "40'" : ""}
													</p>
												</div>
												<div className="flex-1  flex items-center gap-4">
													<p className="text-secondary font-bold text-[20px]">
														{isPlayingMatches(match.status)
															? match.awayScore
															: ""}
													</p>
													<div>
														<div className="w-20 h-20 relative bg-white shadow-lg p-2 rounded-full ">
															<Image
																src={match.awayIcon || LOGO_DEFAULT}
																alt="home-name"
																fill
																className="object-cover "
															/>
														</div>
														<p className="text-center  mt-2">
															{match.awayName}
														</p>
													</div>
												</div>
											</div>
											<div className="shadow-3xl px-2 py-[3px] rounded-xl bg-white absolute justify-center items-center flex left-0 top-[95%] text-[12px] match-list-card-eyes">
												<Image
													width={24}
													height={24}
													src={"/icons/eyes.svg"}
													alt="eyes-icon"
												/>
												<p className="text-secondary mx-1">25K</p>
											</div>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				)}
				{matches.length > 0 && (
					<ButtonOnlyIcon
						onClick={handlePrev}
						wrapperClassName="rounded-full"
						wrapperStyle={{
							position: "absolute",
							top: "40%",
							left: "40px",
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
				)}

				{matches.length > 0 && (
					<ButtonOnlyIcon
						onClick={handleNext}
						wrapperClassName="rounded-full"
						wrapperStyle={{
							position: "absolute",
							top: "40%",
							right: "35px",
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
				)}
			</div>
			<div className="block lg:hidden">
				{matches.length > 0 && (
					<Swiper
						//@ts-ignore
						loop
						slidesPerView={2}
						centeredSlides
						grabCursor
						roundLengths={true}
						navigation={false}
						spaceBetween={3}
						className="live-matches"
						pagination
						effect={"coverflow"}
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 3.4,
							slideShadows: true,
						}}
					>
						{matches?.map((match, index) => (
							<SwiperSlide key={index}>
								<Link href={`/truc-tiep/${match?.matchId}`}>
									<div className="">
										<div
											className="w-full live-match py-8 border rounded-[12px] live-match-wrapper px-4"
											style={{
												backgroundImage: `url(/images/bg-live-match.png)`,
												backgroundSize: "300% 800%",
												backgroundPosition: "center",
												backgroundRepeat: "no-repeat",
												backgroundColor: "#ddd",
												backgroundBlendMode: "luminosity",
												boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.25)`,
											}}
										>
											<div className="uppercase text-secondary font-bold text-center text-[20px] live-match-name">
												sắp diễn ra
											</div>
											<div className="text-[16px] uppercase font-semibold text-center live-match-name flex items-center justify-center">
												<div className="text-center bg-[#E3E3E3] px-4 text-sm font-semibold rounded-[4px] py-1 live-match-score">
													{match?.leagueName}
												</div>
											</div>

											<div className="flex items-center justify-center gap-8 mt-4">
												<div className="flex flex-col items-center w-[40%]">
													<Image
														width={60}
														height={60}
														src={match.homeIcon || LOGO_DEFAULT}
														alt={match?.homeName}
													/>
													<div className="text-xs font-semibold live-match-name live-match-team-name text-center">
														{match?.homeName}
													</div>
												</div>
												<div className="flex items-center flex-col gap-1 font-semibold text-sm w-[20%] live-match-score">
													<div className="live-match-opacity">
														{match?.homeScore} - {match?.awayScore}
													</div>
													<div className="w-[70px] h-[70px] relative">
														<Image
															src="/images/icon-play2.png"
															alt="play"
															fill
															className="object-cover"
														/>
													</div>
												</div>
												<div className="flex flex-col items-center w-[40%]">
													<Image
														width={60}
														height={60}
														src={match.awayIcon || LOGO_DEFAULT}
														alt={match?.awayName}
													/>
													<div className="text-xs font-semibold live-match-name live-match-team-name text-center">
														{match?.awayName}
													</div>
												</div>
											</div>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>
		</>
	);
};

export default HotMatch;
