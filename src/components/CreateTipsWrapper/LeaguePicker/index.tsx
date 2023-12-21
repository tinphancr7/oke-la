import scheduleApi from "@/apis/schedule.api";
import FilterIcon from "@/components/icons/Filter";
import MagnifyingGlass from "@/components/icons/MagnifyingGlass";
import IconSearch from "@/components/icons/Search";
import moment from "moment";
const handicapKeys = [
  "matchId",
  "companyId",
  "initialHandicap",
  "initialHome",
  "initialAway",
  "instantHandicap",
  "instantHome",
  "instantAway",
  "maintenance",
  "inPlay",
  "changeTime",
  "close",
  "OddsType",
];
const overUnderKeys = [
  "matchId",
  "companyId",
  "initialHandicap",
  "initialOver",
  "initialUnder",
  "instantHandicap",
  "instantOver",
  "instantUnder",
  "changeTime",
  "close",
  "OddsType",
];

const LeaguePicker = ({
  listMatchLeague,
  setMatch,
  match,
}: {
  listMatchLeague: any;
  setMatch: any;
  match: any;
}) => {
  const getDetail = async (match: any) => {
    try {
      const res = await scheduleApi.getPrematchAndInplayOddByMatchId(
        match.matchId
      );

      const data = res.data;
      const newHandicap: {
        [key: string]: any;
      } = {};
      const newOverUnder: {
        [key: string]: any;
      } = {};
      handicapKeys.forEach(
        (item, index) =>
          (newHandicap[item] = data.handicap[0]?.split(",")[index])
      );
      overUnderKeys.forEach(
        (item, index) =>
          (newOverUnder[item] = data.overUnder[0]?.split(",")[index])
      );
      const finalData = {
        ...match,
        ...data,
        handicap: newHandicap,
        overUnder: newOverUnder,
      };

      setMatch(finalData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="w-full px-4 py-3 bg-orange-100 justify-between items-center gap-[26px] inline-flex">
        <div className="justify-start items-center gap-1 flex">
          <div className="px-2 py-1 bg-yellow-700 rounded-[21px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-xs font-semibold">1</div>
          </div>
          <div className="text-black text-base font-semibold">
            Chọn giải đấu
          </div>
        </div>
        <div className="justify-start items-start gap-2 flex">
          <div className="w-6 h-6 relative cursor-pointer">
            <MagnifyingGlass />
          </div>
          <div className="w-6 h-6 relative cursor-pointer">
            <FilterIcon />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto" id="create-tips-matches">
        {listMatchLeague.map((item: any) => {
          return (
            <>
              <div
                className="w-full p-2 bg-orange-100 justify-start items-center gap-2.5 inline-flex "
                key={item?._id.leagueId}
              >
                <div className="text-black text-sm font-semibold">
                  {item?._id?.leagueName}
                </div>
              </div>
              {item?.matchs?.map((matchItem: any) => {
                return (
                  <div
                    className={`w-full px-2 py-3 border border-zinc-100 justify-between items-center gap-4 inline-flex hover:bg-orange-50 cursor-pointer ${
                      matchItem.matchId === match?.matchId ? "bg-orange-50" : "bg-white"
                    }`}
                    key={matchItem.matchId}
                    onClick={() => {
                      if (matchItem.matchId === match?.matchId) {
                        setMatch();
                      } else {
                        getDetail(matchItem);
                      }
                    }}
                  >
                    <div className="row justify-start items-start gap-2 flex">
                      <div className="col-2 justify-start items-center gap-2 inline-flex flex-col">
                        <div className="text-black text-xs font-normal">
                          {moment(matchItem?.matchTime * 1000).format("DD/MM")}
                        </div>
                        <div className="text-black text-xs font-normal">
                          {moment(matchItem?.matchTime * 1000).format("HH:mm")}
                        </div>
                      </div>
                      <div className="border h-[40px] border-neutral-200 inline-flex"></div>

                      <div className="col-9 justify-start items-start gap-2 inline-flex flex-col">
                        <div className="text-black text-xs font-normal">
                          {matchItem?.homeName}
                        </div>
                        <div className="text-black text-xs font-normal">
                          {matchItem?.awayName}
                        </div>
                      </div>
                    </div>
                    <div className="w-6 h-6 relative" />
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default LeaguePicker;
