import Sosanhkeo from "@/components/Sosanhkeo";
import ChiTietKeo from "@/components/Sosanhkeo";
import ChatRankHome from "@/containers/Home/ChatRankHome";
import HotLeagueHome from "@/containers/Home/HotLeagueHome";
import ListMatchesHome from "@/containers/Home/ListMatchesHome";
import SlideListMatchesHome from "@/containers/Home/SlideListMatchesHome";
import TipsHome from "@/containers/Home/TipsHome";
import React from "react";

function MatchDetailPage() {
  return (
    <div className="container mx-auto mt-7 md:px-4 xl:px-2">
      {/* <div className="grid xl:grid-cols-4 gap-x-5">
        <div className="col-span-1 bg-danger">
          <ChatRankHome />

          <TipsHome />

          <HotLeagueHome />
        </div>
        <div className="col-span-3">
          <Sosanhkeo />
        </div>
      </div> */}
      <div className="grid xl:grid-cols-1 gap-x-5 p-5">
          <Sosanhkeo />
      </div>
    </div>
  );
}

export default MatchDetailPage;
