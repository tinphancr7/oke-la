import { LOGO_DEFAULT, matchStatus } from "@/constant";
import { IHotMatch } from "@/interfaces";
import { isPlayingMatches } from "@/utils";
import Image from "next/image";

const LiveEvent = ({ match, event }: { match: IHotMatch; event: any }) => {
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
  return (
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
          <p className="font-bold text-md lg:text-[18px]">{match.homeName}</p>
        </div>
        <div className="match-live-video-event-team-away flex items-center gap-4">
          <p className="text-md lg:text-[18px] font-bold">{match.awayName}</p>
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
    </div>
  );
};

export default LiveEvent;
