//@ts-nocheck

import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import DetailsRankTable from "./rankTable/DetailsRankTable";
import { getLeagueStanding } from "@/apis/match";

const data = [];
data.push(
  {
    key: 1,
    ft: "Tổng",
    asia: {
      host: "2",
      HDP: "3",
      guest: "3",
    },
    odds1x2: {
      host: "1",
      draw: "2",
      guest: "2",
    },
    handicap: {
      talent: "1",
      odds: "2",
      faint: "1",
    },
  },
  {
    key: 2,
    ft: "Sân nhà",
    asia: {
      host: "1",
      HDP: "1",
      guest: "2",
    },
    odds1x2: {
      host: "1",
      draw: "7.00",
      guest: "1.15",
    },
    handicap: {
      talent: "2",
      odds: "2",
      faint: "2",
    },
  },
  {
    key: 3,
    ft: "Sân Khách",
    asia: {
      host: "1",
      HDP: "1",
      guest: "2",
    },
    odds1x2: {
      host: "1",
      draw: "7.00",
      guest: "1.15",
    },
    handicap: {
      talent: "2",
      odds: "2",
      faint: "2",
    },
  },
  {
    key: 4,
    ft: "6 trận gần",
    asia: {
      host: "1",
      HDP: "1",
      guest: "2",
    },
    odds1x2: {
      host: "11",
      draw: "7.00",
      guest: "1.15",
    },
    handicap: {
      talent: "2",
      odds: "2",
      faint: "2",
    },
  }
);
export const RankTable = ({ match }) => {
  const [dataHome, setDataHome] = useState({});
  const [dataAway, setDataAway] = useState({});
  const handleGetData = async () => {
    getLeagueStanding(match?.leagueId, match?.subLeagueId).then((result) => {
      if (
        result.totalStandings?.length > 0 &&
        result.homeStandings?.length > 0 &&
        result.halfStandings?.length > 0 &&
        result.halfStandings?.length > 0 &&
        result.homeHalfStandings?.length > 0 &&
        result.awayHalfStandings?.length > 0
      ) {
        const home = exportStanding(result, match?.homeId);
        setDataHome(home);
        const away = exportStanding(result, match?.awayId);
        setDataAway(away);
      }
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);
  const exportStanding = (data, teamId) => {
    let dataExport = {};
    dataExport.total = data?.totalStandings?.find(
      (item) => item.teamId === teamId
    );
    dataExport.home = data?.homeStandings?.find(
      (item) => item.teamId === teamId
    );
    dataExport.away = data?.awayStandings?.find(
      (item) => item.teamId === teamId
    );
    dataExport.totalHalf = data?.halfStandings?.find(
      (item) => item.teamId === teamId
    );
    dataExport.homeHalf = data?.homeHalfStandings?.find(
      (item) => item.teamId === teamId
    );
    dataExport.awayHalf = data?.awayHalfStandings?.find(
      (item) => item.teamId === teamId
    );
    return dataExport;
  };

  return (
    <div className="container ">
      {Object.keys(dataHome).length > 0 && Object.keys(dataAway).length > 0 && (
        <>
          <h2 className="team-table-title text-sm sm:text-[25px]">
            Bảng xếp hạng
          </h2>
          <>
            <Row gutter={[16, 16]}>
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                <DetailsRankTable
                  data={dataHome}
                  type="FT"
                  home={true}
                  name={match?.homeName}
                />
                <DetailsRankTable
                  data={dataHome}
                  type="HT"
                  home={true}
                  name={match?.homeName}
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                <DetailsRankTable
                  data={dataAway}
                  type="FT"
                  home={false}
                  name={match?.awayName}
                />
                <DetailsRankTable
                  data={dataAway}
                  type="HT"
                  home={false}
                  name={match?.awayName}
                />
              </Col>
            </Row>
          </>
        </>
      )}
    </div>
  );
};
