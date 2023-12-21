import {
  getEvent,
  getLineUpById,
  getMatchAnalysisAll,
  getMatchAnalysisGroupLeague,
  getMatchById,
  getStatsByMatchId,
} from "@/apis/match";
import { getRoomByMatchId } from "@/apis/room";
import Breadcrumb from "@/components/Breadcrumb";
import Commentary from "@/components/DetailMatch/Commentary";
import RankTable from "@/components/rankTable";
import { LOGO_DEFAULT } from "@/constant";
import H2H from "@/containers/H2H";
import LineUp from "@/containers/LiveStream/LineUp";
import { AuthContext } from "@/context/AuthContext";
import { SocketContext } from "@/context/SocketContext";
import findMatchData from "@/helper/matchAnalyticsHelper";
import { IHotMatch, IMessage, IVote } from "@/interfaces";
import {
  converToTheSportId,
  generateMatchTime,
  isPlayingMatches,
} from "@/utils";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useMemo, useState } from "react";
import "react-dropdown/style.css";
import { useIdleTimer } from "react-idle-timer/legacy";
import translate from "translate";
import Image from "next/image";
import ImageWithFallback from "@/components/imageWithFallback";
import { getVoteByMatchId, unVote, vote as voteMatch } from "@/apis/vote";
import { toast } from "react-toastify";
import LiveMatchTip from "@/components/liveMatchTip";
import ListTipsMatch from "@/components/DetailMatch/ListTipsMatch";

export type matchType =
  | "main"
  | "odd"
  | "lineup"
  | "h2h"
  | "rank"
  | "tips";

const MatchDetail = ({
  match,
  matchIdLive,
  events,
  matchAnalysis,
  lineup,
  room,
  originalMatchAnalysis,
  stats,
}: {
  match: IHotMatch;
  matchIdLive: string;
  events: any[];
  matchAnalysis: any;
  lineup: any;
  room: {
    room: any;
    messages: IMessage[];
  };
  originalMatchAnalysis: any;
  stats: any;
}) => {
  const { user } = useContext(AuthContext);
  const socket: any = useContext(SocketContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [tab, setTab] = useState<matchType>("main");
  const [matchWeather, setMatchWeather] = useState("Không rõ");
  const [vote, setVote] = useState<IVote>();
  const options = [
    { value: "Bet 365", label: "Bet 365" },
    { value: "Macao", label: "Macao" },
  ];

  useEffect(() => {
    if (socket && match?.matchId) {
      socket.emit("join_room", {
        matchId: match?.matchId,
      });

      socket.on("receive_message", (data: any) => {
        setMessages((prevState) => {
          return [data, ...prevState];
        });
      });
    }
    return () => {
      socket?.emit("leave_room", {
        matchId: match?.matchId,
      });
    };
  }, [match, socket]);

  useEffect(() => {
    setMessages(room?.messages);
  }, [room]);

  const returnMatchAnalysis = findMatchData(matchAnalysis, match);

  const statsObject = useMemo(() => {
    const attackStats = stats?.find((stat: any) => stat.type == 43);
    const dangerousAttack = stats?.find((stat: any) => stat.type == 44);
    const possesion = stats?.find((stat: any) => stat.type == 14);
    const yellowCard = stats?.find((stat: any) => stat.type == 11);
    const redCard = stats?.find((stat: any) => stat.type == 13);
    const shotOffTarGet = stats?.find((stat: any) => stat.type == 34);
    const shotOnTarGet = stats?.find((stat: any) => stat.type == 4);
    const corner = stats?.find((stat: any) => stat.type == 6);

    return {
      attackStats,
      dangerousAttack,
      possesion,
      yellowCard,
      redCard,
      shotOffTarGet,
      shotOnTarGet,
      corner,
    };
  }, [stats, match]);

  const renderTab = (tab: matchType) => {
    switch (tab) {
      case "main":
        return (
          <LiveMatchTip
            match={match}
            matchIdLive={match?.matchId}
            event={events}
            stats={statsObject}
          />
        );
      case "h2h":
        return <H2H match={match} matchAnalysis={originalMatchAnalysis} />;
      case "lineup":
        return <LineUp match={match} lineup={lineup} />;
      case "rank":
        return <RankTable leagueId={match?.leagueId || ""} leagueType={match?.leagueType}  />;
        case "tips":
          return <ListTipsMatch match={match as any} matchAnalysis={originalMatchAnalysis} />
    }
  };
  const defaultOption = options[0];

  //handle timer
  const [stopCount, setStopCount] = useState<boolean>(false);

  const onAction = (data: any) => {
    if (data?.type === "visibilitychange") {
      setStopCount(true);
    } else {
      setStopCount(false);
    }
  };

  useIdleTimer({
    onAction,
    disabled: user?._id ? false : true,
  });

  const addTimeWatch = () => {
    if (!stopCount) {
      socket.emit("add_time_watched", {
        matchId: match?.matchId,
        userId: user?._id,
        time: moment().unix(),
      });
    }
  };

  const translateMatchWeather = async () => {
    try {
      const weather = await translate(match?.weather || "", "vi");
      setMatchWeather(weather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      let reload = 120;
      if (!reload) {
        return;
      }
      const autoRefresh = setInterval(() => {
        addTimeWatch();
      }, reload * 1000);
      return () => {
        // Clear previous timeout
        clearInterval(autoRefresh);
      };
    }
  }, [user?._id]);

  const handleVote = async (matchId: string, voteType: string) => {
    try {
      if (!user) {
        toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
      } else {
        const res = await voteMatch({ matchId, voteType });
        if (res.data?.status === 1) {
          toast.success("Bình chọn thành công");
          getVote();
        } else {
          toast.error("Bình chọn thất bại");
        }
      }
    } catch (error) {
      toast.error("Bình chọn thất bại");
    }
  };
  const handleUnVote = async (matchId: string) => {
    try {
      const res = await unVote(matchId);
      if (res.data?.status === 1) {
        toast.success("Bỏ Bình chọn thành công");
        getVote();
      } else {
        toast.error("Bỏ bình chọn thất bại");
      }
    } catch (error) {
      toast.error("Bỏ bình chọn thất bại");
    }
  };

  const getVote = async () => {
    try {
      const res = await getVoteByMatchId(match?.matchId);

      if (res.data?.status === 1) {
        setVote(res.data?.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getVote();
  }, [match]);

  useEffect(() => {
    translateMatchWeather();
  }, [match]);

  return (
    <div className="match-list-detail mt-6 xl:container mx-auto md:px-4 xl:px-2">
      <div className="match-list-detail-header ">
        <Breadcrumb
          backLink="/truc-tiep"
          breadCrumb={[
            { title: "Bóng đá trực tiếp", url: "/truc-tiep" },
            { title: `Giải bóng đá ${match?.leagueName}`, url: "/truc-tiep" },
          ]}
        />
      </div>
      <div className="match-list-detail-nav mt-8 py-2 px-4 relative">
        <div className="bg-[url('/tips-tag.svg')] text-white text-center bg-no-repeat bg-center bg-cover absolute min-w-[300px] top-0 left-[50%] translate-x-[-50%] truncate">
          {match?.leagueName}
        </div>
        <div className="match-list-detail-team flex items-center gap-4 justify-between lg:gap-12 mt-12">
          <div className="match-list-detail-team-home flex-1 flex  justify-end items-center gap-4 lg:gap-8">
            <p className="match-list-detail-team-home-name text-sm lg:text-[24px]">
              <span className="font-bold">{match?.homeName}</span>
              <span className="text-[#9DA5AC] ml-2"></span>
            </p>
            <img
              src={match?.homeIcon || LOGO_DEFAULT}
              className="h-[32px] w-[32px] lg:h-[48px] lg:w-[48px]"
              alt="logo"
            />
          </div>
          <div className="match-list-detail-score">
            <div className="match-list-detail-score">
              <p className=" text-[#9DA5AC] text-sm lg:text-[24px] text-center">
                {isPlayingMatches(match?.status) || match.status == -1
                  ? `${match.homeScore} - ${match.awayScore}`
                  : "? - ?"}
              </p>
              <p className="text-time-red text-center">
                {isPlayingMatches(match?.status)
                  ? generateMatchTime(
                      match.matchTime,
                      match.status,
                      match.halfStartTime
                    )
                  : ""}
                {isPlayingMatches(match?.status) && match?.status != 0 && (
                  <span className="blink-minute">{`'`}</span>
                )}
              </p>
            </div>
          </div>
          <div className="match-list-detail-team-away flex-1 flex items-center gap-4 lg:gap-8">
            <img
              src={match?.awayIcon || LOGO_DEFAULT}
              className="h-[32px] w-[32px] lg:h-[48px] lg:w-[48px]"
              alt="logo"
            />
            <p className="match-list-detail-team-away-name text-sm lg:text-[24px]">
              <span className="font-bold">{match?.awayName}</span>
              <span className="text-[#9DA5AC] ml-2"></span>
            </p>
          </div>
        </div>
        <div className="flex justify-center  items-center mt-12">
          <div className="flex gap-1 flex-1 items-center justify-end">
            <div>
              <img className="w-[27px] h-auto" src="/icons/stadium.png" />
            </div>
            <p className="text-black text-[14px]">
              {match?.location || "Không rõ"}
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="p-1 px-3 bg-[#E3E3E3] text-[12px] text-black rounded-md">
              {moment(new Date(match?.matchTime * 1000)).format("HH:mm")}
            </span>
            <p className="text-center text-blue-700 text-[13px] mt-2">
              {moment(match?.matchTime * 1000).format("DD/MM/YYYY")}
            </p>
          </div>
          <div className="flex-1 flex justify-start">
            <p className="flex items-center gap-1">
              <img src="/icons/cloud.png" width={25} />
              {matchWeather}
            </p>
          </div>
        </div>
        <div className="match-live-video-event p-4 mt-12">
          <h2 className="mb-3 text-2xl font-semibold leadi text-center">
            Bình chọn
          </h2>
          <div className="flex justify-center p-3">
            <div className="flex flex-col md:flex-row gap-4">
              {vote?.home.includes(user?._id) ? (
                <button
                  onClick={() => handleUnVote(match?.matchId)}
                  className="py-[1px] px-28 text-[#15C071] font-bold bg-amber-500 rounded-lg ml-3"
                >
                  Chủ
                </button>
              ) : (
                <button
                  onClick={() => handleVote(match?.matchId, "home")}
                  className="py-[1px] px-28 text-[#15C071] font-bold bg-slate-200 rounded-lg ml-3"
                >
                  Chủ
                </button>
              )}
              {vote?.draw.includes(user?._id) ? (
                <button
                  onClick={() => handleUnVote(match?.matchId)}
                  className="py-[1px] px-28 bg-amber-500 font-bold rounded-lg ml-3"
                >
                  Hòa
                </button>
              ) : (
                <button
                  onClick={() => handleVote(match?.matchId, "draw")}
                  className="py-[1px] px-28 bg-slate-200 font-bold rounded-lg ml-3"
                >
                  Hòa
                </button>
              )}
              {vote?.away.includes(user?._id) ? (
                <button
                  onClick={() => handleUnVote(match?.matchId)}
                  className="py-[1px] px-28 bg-amber-500 text-red-500 font-bold rounded-lg ml-3"
                >
                  Khách
                </button>
              ) : (
                <button
                  onClick={() => handleVote(match?.matchId, "away")}
                  className="py-[1px] px-28  text-red-500 font-bold  bg-slate-200 rounded-lg ml-3"
                >
                  Khách
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="match-detail-menu mt-12">
          <ul className="text-xs sm:text-[16px] font-semibold">
            <li
              className={`${tab == "main" ? "match-detail-menu-selected" : ""}`}
              onClick={() => setTab("main")}
            >
              Tổng quan
            </li>

            <li
              className={`${
                tab == "lineup" ? "match-detail-menu-selected" : ""
              }`}
              onClick={() => setTab("lineup")}
            >
              Đội hình
            </li>
            <li
              className={`${tab == "h2h" ? "match-detail-menu-selected" : ""}`}
              onClick={() => setTab("h2h")}
            >
              H2H
            </li>
            <li
              className={`${tab == "rank" ? "match-detail-menu-selected" : ""}`}
              onClick={() => setTab("rank")}
            >
              Bảng tích điểm
            </li>
            <li
              className={`${
                tab == "tips" ? "match-detail-menu-selected" : ""
              }`}
              onClick={() => setTab("tips")}
            >
              Tips
            </li>
          </ul>
        </div>
        <div className="match-detail-layout w-full">
          <div className="match-detail-tab">{renderTab(tab)}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const matchId = ctx.query.matchId;
    if (matchId) {
      const [result, lineup, event, matchAnalyze, originalMatchAnalyze, stats] =
        await Promise.all([
          getMatchById(matchId.toString()),
          getLineUpById(matchId as string),
          getEvent(matchId.toString()),
          getMatchAnalysisAll(matchId.toString()),
          getMatchAnalysisGroupLeague(matchId.toString()),
          getStatsByMatchId(matchId.toString()),
        ]);
      const match = result.data?.match?.[0];
      const theSportId = converToTheSportId(match?.matchId as string);
      let room: any = {};
      if (match) {
        room = await getRoomByMatchId(match?.matchId);
      }
      console.log(matchId, stats)
      return {
        props: {
          match: result.data?.match?.[0],
          matchIdLive:
            result.data?.matchThesport?.find(
              (item: any) => item.match_id == theSportId
            )?.thesports_uuid || "",
          events: event.data?.[0]?.events || [],
          matchAnalysis: matchAnalyze.data?.[0] || {},
          lineup: lineup.data || {},
          room: room.data?.result || {},
          originalMatchAnalysis: originalMatchAnalyze.data || [],
          stats: stats?.stats || [],
        },
      };
    }
    return {
      props: {
        match: {},
        matchIdLive: "",
        events: [],
        matchAnalysis: {},
        lineup: {},
        room: {},
        originalMatchAnalysis: [],
        stats: [],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        match: {},
        matchIdLive: "",
        events: [],
        matchAnalysis: {},
        lineup: {},
        room: {},
        originalMatchAnalysis: [],
        stats: [],
      },
    };
  }
}
