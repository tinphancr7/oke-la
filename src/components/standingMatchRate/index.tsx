import { IMatch } from "@/interfaces";
import React, { useMemo } from "react";

const HeaderRate = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#F1F1F1] w-full flex">
      <div className="w-[19%] text-xs text-[#BBB] py-1 text-center">
        {title}
      </div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">Trận</div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">Thắng</div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">Hòa</div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">Thua</div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">Ghi</div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">Mất</div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">Điểm</div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
        Xếp hạng
      </div>
      <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">T%</div>
    </div>
  );
};

const ContentRankRate = ({ data }: any) => {
  return (
    <>
      {Object.entries(data)?.map(([key, item]: any[], index) => (
        <div className=" w-full flex" key={index}>
          {key === "total" ? (
            <div className="w-[19%] text-xs py-1 text-center">
              Tổng
            </div>
          ) : key === "home" ? (
            <div className="w-[19%] text-xs text-secondary py-1 text-center">
              Sân nhà
            </div>
          ) : (
            <div className="w-[19%] text-xs text-[#2D87D1] py-1 text-center">
              Sân khách
            </div>
          )}
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.totalCount || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.winCount || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.drawCount || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.loseCount || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.getScore || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.loseScore || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.integral || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.rank || 0}
          </div>
          <div className="w-[9%] text-xs text-[#BBB] py-1 text-center">
            {item?.winRate || 0}%
          </div>
        </div>
      ))}
    </>
  );
};

type Props = {
  standing: any;
  match: IMatch;
};

function StandingMatchRate({ standing, match }: Props) {
  const data = useMemo(() => {
    if (!standing || !match) return null;
    const result = {
      home: {
        ft: {
          total: standing?.totalStandings?.find(
            (e: any) => e?.teamId === match?.homeId
          ),
          home: standing?.homeStandings?.find(
            (e: any) => e?.teamId === match?.homeId
          ),
          away: standing?.awayStandings?.find(
            (e: any) => e?.teamId === match?.homeId
          ),
        },
        ht: {
          total: standing?.halfStandings?.find(
            (e: any) => e?.teamId === match?.homeId
          ),
          home: standing?.homeHalfStandings?.find(
            (e: any) => e?.teamId === match?.homeId
          ),
          away: standing?.awayHalfStandings?.find(
            (e: any) => e?.teamId === match?.homeId
          ),
        },
      },
      away: {
        ft: {
          total: standing?.totalStandings?.find(
            (e: any) => e?.teamId === match?.awayId
          ),
          home: standing?.homeStandings?.find(
            (e: any) => e?.teamId === match?.awayId
          ),
          away: standing?.awayStandings?.find(
            (e: any) => e?.teamId === match?.awayId
          ),
        },
        ht: {
          total: standing?.halfStandings?.find(
            (e: any) => e?.teamId === match?.awayId
          ),
          home: standing?.homeHalfStandings?.find(
            (e: any) => e?.teamId === match?.awayId
          ),
          away: standing?.awayHalfStandings?.find(
            (e: any) => e?.teamId === match?.awayId
          ),
        },
      },
    };

    return result;
  }, [standing, match]);

  if (!data) return null;

  return (
    <div className="mt-12">
      <div className="text-[20px] font-bold mb-4 text-center">
        Bảng xếp hạng
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4">
        <div className="col-span-1">
          <div className="bg-secondary w-full text-sm font-semibold text-white py-1 text-center">
            {match?.homeName}
          </div>
          <HeaderRate title="FT" />
          <ContentRankRate data={data?.home?.ft} />
          <HeaderRate title="HT" />
          <ContentRankRate data={data?.home?.ht} />
        </div>

        <div className="col-span-1">
          <div className="bg-[#2D87D1] w-full text-sm font-semibold text-white py-1 text-center">
            {match?.awayName}
          </div>
          <HeaderRate title="FT" />
          <ContentRankRate data={data?.away?.ft} />
          <HeaderRate title="HT" />
          <ContentRankRate data={data?.away?.ht} />
        </div>
      </div>
    </div>
  );
}

export default StandingMatchRate;
