import IconCaretDown from "@/components/icons/CaretDown";
import IconSoccerBall from "@/components/icons/SoccerBall";
import React, {
  useRef,
  useCallback,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import logo from "@/assets/images/premier-league.svg";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";

import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import { IMatch } from "@/interfaces";
import moment from "moment";
import { convertToOdd, renderStatus } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { topLeague } from "@/constant";

interface IMatchWithOdds extends IMatch {
  handicap: string;
  overUnder: string;
}

type Props = {
  sliderMatches: IMatchWithOdds[];
  setSearchMatch: Dispatch<SetStateAction<string>>;
  setleague: Dispatch<SetStateAction<string>>;
};

function SlideListMatchesHome({
  sliderMatches,
  setSearchMatch,
  setleague,
}: Props) {
  const sliderRefLG = useRef<any>(null);
  const sliderRefMD = useRef<any>(null);

  const responsiveSlider = [
    {
      slidesPerView: 2,
      className: "lg:hidden md:hidden block",
      isHiddenButton: true,
    },
    {
      slidesPerView: 3,
      className: "hidden md:block lg:hidden",
      ref: sliderRefMD,
    },
    {
      slidesPerView: 3,
      className: "hidden lg:block",
      ref: sliderRefLG,
    },
  ];

  useEffect(() => {
    function handleScroll() {
      const myDiv = document.getElementById("matches-home");
      if (myDiv) {
        const rect = myDiv.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const data = useMemo(() => {
    return sliderMatches?.sort((a, b) => {
      return a?.matchTime - b?.matchTime;
    });
  }, [sliderMatches]);

  const handlePrev = useCallback(() => {
    if (!sliderRefLG.current || !sliderRefMD.current) return;
    sliderRefLG.current.swiper.slidePrev();
    sliderRefMD.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRefLG.current || !sliderRefMD.current) return;
    sliderRefLG.current.swiper.slideNext();
    sliderRefMD.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    const autoPlay = () => {
      handleNext();
    };

    const timeOutAutoPlay = setInterval(() => {
      autoPlay();
    }, 2000);

    return () => {
      clearTimeout(timeOutAutoPlay);
    };
  }, []);

  const convertStringOddToArray = (str: string) => {
    return str.split(",");
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="flex items-center justify-between lg:justify-start w-full gap-x-4">
          <div className="flex items-center gap-x-2">
            <IconSoccerBall />
            <h4 className="text-md lg:text-lg font-bold whitespace-nowrap">
              Trận cầu tâm điểm
            </h4>
          </div>

          {/* <button
            className="items-center p-2 bg-light justify-between text-sm hidden lg:flex"
            style={{ width: "150px" }}
          >
            <span>Tất cả</span>
            <IconCaretDown />
          </button> */}

          <div className="hidden items-center bg-light px-2 py-2 rounded-lg gap-x-4">
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
          </div>
        </div>
        {/* <div className="flex justify-between lg:justify-end items-center gap-x-2 mt-5 lg:mt-0 w-full">
          <select
            className="p-2 bg-light justify-between text-xs lg:text-sm outline-none"
            placeholder="Bộ lọc trận đấu"
            defaultValue={""}
            onChange={(e) => {
              setleague(e.target.value);
            }}
          >
            <option value={""}>Tất cả giải đấu</option>
            {topLeague.map((league, index) => (
              <option value={league.leagueId} key={index}>{league.name}</option>
            ))}
          </select>
        </div> */}
      </div>

      {responsiveSlider?.map((item, index) => (
        <div
          className={`mt-4 slider-list-matches-home ${item.className} ${
            item?.isHiddenButton ? "hidden-button" : ""
          }`}
          key={index}
        >
          <Swiper
            //@ts-ignore
            ref={item?.ref}
            slidesPerView={item?.slidesPerView}
            spaceBetween={8}
            className="mySwiper"
            autoplay={{
              delay: 1000,
            }}
            loop={data?.length > item?.slidesPerView}
            navigation={false}
          >
            {data
              ?.filter((item) => item?.homeIcon && item.awayIcon)
              ?.map((match) => (
                <SwiperSlide key={match?._id}>
                  <div
                    // href={`/truc-tiep/${match?.matchId}`}
                    style={{ minHeight: "100%" }}
                    className="w-full bg-light p-4 flex flex-col gap-y-2 items-center"
                  >
                    <div
                      className="text-secondary-light text-xs font-semibold truncate max-w-full"
                      title={match?.leagueName}
                    >
                      {match?.leagueName}
                    </div>

                    <div
                      className="text-xs font-bold flex items-center justify-between w-full py-2 border-t border-b border-dashed"
                      style={{ borderColor: "#A5A5A5" }}
                    >
                      <div className="text-brand-red">TRỰC TIẾP</div>
                      <div className="">
                        {moment(match?.matchTime * 1000).format("HH:mm A")}
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between">
                      <div className="w-full gap-x-2 flex-1">
                        <img
                          src={
                            match?.homeIcon || "/images/no-image-logo-team.png"
                          }
                          width={30}
                          height={30}
                          alt={match?.homeName}
                          className="mx-auto"
                        />

                        <div className="font-semibold text-sm h-8 text-center mt-3">
                          {match?.homeName}
                        </div>
                      </div>

                      <div className="w-full gap-x-2  flex-1">
                        <img
                          src={
                            match?.awayIcon || "/images/no-image-logo-team.png"
                          }
                          width={30}
                          height={30}
                          alt={match?.awayName}
                          className="mx-auto"
                        />

                        <div className="font-semibold text-sm h-8 text-center mt-3">
                          {match?.awayName}
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3">
                      <div className="flex gap-2 relative">
                        <Link
                          className="flex-1"
                          href={`/truc-tiep/${match?.matchId}`}
                        >
                          <div className="w-full flex justify-center text-[11px] p-1 gap-2 shadow bg-white">
                            <Image
                              src={"/icons/livestream.svg"}
                              width={20}
                              height={20}
                              alt="okchoi"
                            />
                            Livestream
                          </div>
                        </Link>
                        <Link
                          className="flex-1"
                          target="_blank"
                          href={`https://okchoi2.com/link.html`}
                        >
                          <div className="w-full justify-center flex text-[11px] p-1 shadow bg-secondary text-white">
                            Đặt cược
                          </div>
                        </Link>
                      </div>
                    </div>
                    {/* '' */}
                    {/* <div className="px-4 py-2 bg-white w-full flex items-center justify-between gap-y-3 flex-col">
                      <div className="flex flex-1 flex-col items-center gap-y-2 w-full">
                        <div className="text-sm text-primary font-semibold">
                          Cược chấp
                        </div>
                        <div className="bg-light w-full py-1 px-2 flex items-center justify-between text-sm">
                          <div>
                            H{" "}
                            {convertToOdd(
                              convertStringOddToArray(match?.handicap)?.[5]
                            )}
                          </div>
                          <div className="font-bold">
                            {" "}
                            {convertStringOddToArray(match?.handicap)?.[3]
                              ? convertStringOddToArray(match?.handicap)?.[3]
                              : "-"}
                          </div>
                        </div>

                        <div className="bg-light w-full py-1 px-2 flex items-center justify-between text-sm">
                          <div>A </div>
                          <div className="font-bold">
                            {" "}
                            {convertStringOddToArray(match?.handicap)?.[4]
                              ? convertStringOddToArray(match?.handicap)?.[4]
                              : "-"}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col items-center gap-y-2 w-full">
                        <div className="text-sm text-primary font-semibold">
                          Tài xỉu
                        </div>
                        <div className="bg-light w-full py-1 px-2 flex items-center justify-between text-sm">
                          <div>
                            o{" "}
                            {convertToOdd(
                              convertStringOddToArray(match?.overUnder)?.[5]
                            )}
                          </div>
                          <div className="font-bold">
                            {" "}
                            {convertStringOddToArray(match?.overUnder)?.[3]
                              ? convertStringOddToArray(match?.overUnder)?.[3]
                              : "-"}
                          </div>
                        </div>

                        <div className="bg-light w-full py-1 px-2 flex items-center justify-between text-sm">
                          <div>u</div>
                          <div className="font-bold">
                            {" "}
                            {convertStringOddToArray(match?.overUnder)?.[4]
                              ? convertStringOddToArray(match?.overUnder)?.[4]
                              : "-"}
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          {!item?.isHiddenButton && (
            <>
              <ButtonOnlyIcon
                onClick={handlePrev}
                wrapperClassName="rounded-full"
                wrapperStyle={{
                  position: "absolute",
                  top: "50%",
                  left: "4px",
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
                  right: "4px",
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default React.memo(SlideListMatchesHome);
