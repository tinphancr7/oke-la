import { LOGO_DEFAULT, URL_IFRAME_THESPORTS, matchStatus } from "@/constant";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IHotMatch } from "@/interfaces";
import { isPlayingMatches } from "@/utils";
import { axiosInstanceISport } from "@/apis";
import { SocketContext } from "@/context/SocketContext";
import { AuthContext } from "@/context/AuthContext";

const NoteItem = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={item?.image}
        className="lg:w-[24px] lg:h-[24px]"
        width={20}
        height={20}
        alt=""
      />
      <p>{item?.name}</p>
    </div>
  );
};

const notes = [
  {
    image: "/football-note/goal.svg",
    name: "Bàn thắng",
  },
  {
    image: "/football-note/owner-goal.svg",
    name: "Phản lưới nhà",
  },
  {
    image: "/football-note/yellow-card.svg",
    name: "Thẻ vàng",
  },
  {
    image: "/football-note/red-card.svg",
    name: "Thẻ đỏ",
  },
  {
    image: "/football-note/penalty.svg",
    name: "Phạt đền",
  },
  {
    image: "/football-note/fail-penalty.png",
    name: "Hỏng phạt đền",
  },
  {
    image: "/football-note/second-yellow-card.svg",
    name: "Thẻ vàng thứ 2",
  },
  {
    image: "/football-note/assist.png",
    name: "Kiến tạo",
  },
  {
    image: "/football-note/subtitute.png",
    name: "Thay người",
  },
];

const LiveMatchTip = ({
  matchIdLive,
  match,
  event,
  stats,
}: {
  matchIdLive: string;
  match: IHotMatch;
  event: any[];
  stats: any;
}) => {
  const renderEvent = (
    type: number,
    player: string,
    time: number,
    position: string
  ) => {
    let image = "/football-note/goal.svg";

    switch (type) {
      case 2:
        image = "/football-note/red-card.svg";
        break;
      case 3:
        image = "/football-note/yellow-card.svg";
        break;
      case 7:
        image = "/football-note/penalty.svg";
        break;
      case 8:
        image = "/football-note/owner-goal.svg";
        break;
      case 9:
        image = "/football-note/second-yellow-card.svg";
        break;
      case 11:
        image = "/football-note/subtitute.png";
        break;
      case 13:
        image = "/football-note/fail-penalty.png";
        break;
    }
    return position == "home" ? (
      <div className="flex items-center gap-8 mt-4">
        <div className="flex-1 flex justify-end">
          <div className="flex relative event-item p-2 items-center">
            <Image
              className="lg:w-[24px] lg:h-[24px]"
              src={image}
              width={16}
              height={16}
              alt=""
            />
            <p className="ml-1 text-sm">{player}</p>
          </div>
        </div>
        <p className="p-2 rounded-full event-time text-xs lg:text-md">{time}</p>
        <div className="flex-1"></div>
      </div>
    ) : (
      <div className="flex items-center gap-8 mt-4">
        <div className="flex-1"></div>
        <p className="p-2 rounded-full event-time text-xs lg:text-md">{time}</p>
        <div className="flex-1 flex justify-start">
          <div className="flex relative event-item p-2 items-center">
            <Image
              className="lg:w-[24px] lg:h-[24px]"
              src={image}
              width={16}
              height={16}
              alt=""
            />
            <p className="ml-1">{player}</p>
          </div>
        </div>
      </div>
    );
  };
  const playRef = useRef(null);
  const [isLiveStreamErr, setIsLiveStreamErr] = useState(false);
  const { user, setIsOpen } = useContext(AuthContext);
  const socket: any = useContext(SocketContext);

  const checkLinkExist = async () => {
    try {
      const res = await axiosInstanceISport.get(
        `${URL_IFRAME_THESPORTS}${matchIdLive}/playlist.m3u8`
      );
      setIsLiveStreamErr(false);
    } catch (error) {
      console.log(error);

      setIsLiveStreamErr(true);
    }
  };

  useEffect(() => {
    checkLinkExist();
  }, [matchIdLive]);
  return (
    <>
      <div
        className={`match-live-layout grid lg:grid-cols-4 w-full mb-4 gap-4 mt-4`}
      >
        {/* Tổng quan */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <div className="match-live-video-event min-h-[450px] w-full ">
            <div className="match-live-video-event-header p-2 px-4 text-white bg-secondary rounded-t-xl">
              Tổng quan
            </div>
            <div className="match-live-video-event-team flex py-2 px-4 justify-between bg-[#FFAD01]">
              <div className="match-live-video-event-team-home flex items-center gap-4">
                <Image
                  src={match.homeIcon || LOGO_DEFAULT}
                  alt="logo-home"
                  width={32}
                  height={32}
                  className="lg:w-[56px] lg:h-[56px]"
                />
                <p className="font-bold text-md lg:text-[18px]">
                  {match.homeName}
                </p>
              </div>
              <div className="match-live-video-event-team-away flex items-center gap-4">
                <p className="text-md lg:text-[18px] font-bold">
                  {match.awayName}
                </p>
                <Image
                  src={match.awayIcon || LOGO_DEFAULT}
                  alt="logo-home"
                  width={32}
                  height={32}
                  className="lg:w-[56px] lg:h-[56px]"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex mt-8 justify-center">
                <div className="match-live-video-event-status py-2 px-8">
                  <p className="text-[18px] font-bold text-center">
                    {matchStatus[match.status?.toString()]}
                  </p>
                  <p className="text-[18px] font-bold text-center text-time-red">
                    {isPlayingMatches(match.status) || match.status == -1
                      ? `${match.homeScore} - ${match.awayScore}`
                      : "? - ?"}
                  </p>
                </div>
              </div>
              <div className="relative mb-4">
                <div className="">
                  {event?.map((item: any) => {
                    return renderEvent(
                      item?.type,
                      item?.playerName,
                      item?.minute,
                      item?.homeEvent ? "home" : "away"
                    );
                  })}
                </div>
                <div className="match-live-video-event-tree absolute">
                  <div className="match-live-video-event-tree-list h-full"></div>
                </div>
              </div>
            </div>
            <div className="match-live-video-note-wrapper p-2 mt-4 ">
              <div
                className="match-live-video-note p-2"
                style={{ backgroundColor: "#DFE2E4" }}
              >
                <div className="flex justify-center items-center text-[#7D7D7D] text-[14px] gap-6">
                  <div className="">
                    <p className="text-center">Tấn công</p>
                    <div className="flex items-center  justify-center gap-2 mt-2">
                      <p className="text-[#15C071]">
                        {stats?.attackStats?.home}
                      </p>
                      <img src="/icons/attack-icon.png" width={50} />
                      <p className="text-[#E62F2B]">
                        {stats?.attackStats?.away}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p>Đòn tấn công nguy hiểm</p>
                    <div className="flex items-center gap-2 mt-2 justify-center">
                      <p className="text-[#15C071]">
                        {stats?.dangerousAttack?.home}
                      </p>
                      <img src="/icons/danger-attack-icon.png" width={50} />
                      <p className="text-[#E62F2B]">
                        {stats?.dangerousAttack?.away}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p>Tỉ lệ sở hữu bóng</p>
                    <div className="flex items-center gap-2 mt-2 justify-center">
                      <p className="text-[rgb(21,192,113)]">
                        {stats?.possesion?.home}
                      </p>
                      <img src="/icons/percent-icon.png" width={50} />
                      <p className="text-[#E62F2B]">{stats?.possesion?.away}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center gap-4">
                  <div>
                    <img src="/icons/corner-icon.png" width={25} />
                    <p className="text-center font-bold">
                      {stats?.corner?.home || 0}
                    </p>
                  </div>
                  <div>
                    <img src="/icons/red-card-icon.png" width={25} />
                    <p className="text-center font-bold">
                      {stats?.redCard?.home || 0}
                    </p>
                  </div>
                  <div>
                    <img src="/icons/yellow-card-icon.png" width={25} />
                    <p className="text-center font-bold">
                      {stats?.yellowCard?.home || 0}
                    </p>
                  </div>
                  <div className="shot-stats">
                    <div>
                      <p className="text-center">Sút trúng khung thành</p>
                      <div className="flex items-center justify-center">
                        <div className="flex gap-2 items-center">
                          <p>{stats?.shotOnTarGet?.home}</p>
                          <div className="flex min-w-[340px] mt-2  h-[5px]">
                            <div
                              className={` bg-[rgb(21,192,113)] h-full rounded-l-lg`}
                              style={{
                                width: `${Math.ceil(
                                  (Number(stats.shotOnTarGet?.home) /
                                    (Number(stats.shotOnTarGet?.home) +
                                      Number(stats.shotOnTarGet?.away))) *
                                    340
                                )}px`,
                              }}
                            ></div>
                            <div
                              style={{
                                width: `${Math.ceil(
                                  (Number(stats.shotOnTarGet?.away) /
                                    (Number(stats.shotOnTarGet?.home) +
                                      Number(stats.shotOnTarGet?.away))) *
                                    340
                                )}px`,
                              }}
                              className={`bg-[#E62F2B] h-full rounded-r-lg`}
                            ></div>
                          </div>
                          <p>{stats?.shotOnTarGet?.away}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-center">Sút trượt / bị cản phá</p>
                      <div className="flex gap-2 items-center">
                        <p>{stats?.shotOnTarGet?.home}</p>
                        <div className="flex min-w-[340px] mt-2  h-[5px]">
                          <div
                            className={` bg-[rgb(21,192,113)] h-full rounded-l-lg`}
                            style={{
                              width: `${Math.ceil(
                                (Number(stats.shotOffTarGet?.home) /
                                  (Number(stats.shotOffTarGet?.home) +
                                    Number(stats.shotOffTarGet?.away))) *
                                  340
                              )}px`,
                            }}
                          ></div>
                          <div
                            style={{
                              width: `${Math.ceil(
                                (Number(stats.shotOffTarGet?.away) /
                                  (Number(stats.shotOffTarGet?.home) +
                                    Number(stats.shotOffTarGet?.away))) *
                                  340
                              )}px`,
                            }}
                            className={`bg-[#E62F2B] h-full rounded-r-lg`}
                          ></div>
                        </div>
                        <p>{stats?.shotOffTarGet?.away}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img src="/icons/yellow-card-icon.png" width={25} />
                    <p className="text-center font-bold">
                      {stats?.yellowCard?.away || 0}
                    </p>
                  </div>
                  <div>
                    <img src="/icons/red-card-icon.png" width={25} />
                    <p className="text-center font-bold">
                      {stats?.redCard?.away || 0}
                    </p>
                  </div>
                  <div>
                    <img src="/icons/corner-icon.png" width={25} />
                    <p className="text-center font-bold">
                      {stats?.corner?.away || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="match-live-video-note-wrapper p-2">
              <div className="match-live-video-note p-2">
                <p className="text-secondary font-bold">Ghi chú: </p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm lg:text-md">
                  {notes?.map((item) => (
                    <NoteItem item={item} key={item?.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveMatchTip;
