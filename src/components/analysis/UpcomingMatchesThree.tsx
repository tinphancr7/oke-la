//@ts-nocheck

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

export const UpcomingMatchesThree = ({ matchAnalysis, matche }) => {
  const router = useRouter();
  const [listUpcomingMatchesHome, setListUpcomingMatchesHome] = useState([]);
  const [listUpcomingMatchesAway, setListUpcomingMatchesAway] = useState([]);

  const columns = [
    {
      title: "Giải đấu",
      render: (value) => <div style={{ color: "black" }}>{value.league}</div>,
    },
    {
      title: "Ngày",
      render: (value) => (
        <div style={{ color: "black" }}>
          {moment.unix(value?.matchTime).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Kiểu",
      render: (value) => <div style={{ color: "black" }}>{"Nhà"}</div>,
    },
    {
      title: "VS",
      render: (value) => (
        <div style={{ color: "black" }}>{`${value.home} - ${value.away}`}</div>
      ),
    },
    {
      title: "Trận đấu đang",
      render: (value) => (
        <div style={{ color: "black" }}>{`${value.day} Ngày`}</div>
      ),
    },
  ];

  const getMatcheUpcoming = async () => {
    // const response = await axios.get(
    //   `${ip}/website/matches/teamData/${router.query?.pid}`
    // );
    let dataHome = matchAnalysis?.homeSchedule;
    let dataAway = matchAnalysis?.awaySchedule;

    setListUpcomingMatchesHome(dataHome);
    setListUpcomingMatchesAway(dataAway);
  };

  useEffect(() => {
    if (router.query?.pid) getMatcheUpcoming();
  }, [router.asPath]);

  return (
    <div className="container !mx-auto compare-odds">
      <h2 className="team-table-title text-sm sm:text-[25px]">
        Trận đấu sắp tới
      </h2>
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:items-start">
        <div className="w-full mx-auto md:flex-1 md:m-0">
          <a className="w-[30px] text-base font-bold border-orange-500 border-b-2 block">
            {matche?.team_home_name}
          </a>
          <Table
            columns={columns}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            dataSource={listUpcomingMatchesHome}
            bordered
            style={{ color: "black" }}
            size="small"
            pagination={false}
          />
        </div>
        <div className="w-full md:flex-1">
          <a className="w-[30px] bg-transparent text-base font-bold border-[#3f9ed8] border-b-2 block">
            {matche?.team_away_name}
          </a>
          <Table
            columns={columns}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            dataSource={listUpcomingMatchesAway}
            bordered
            style={{ color: "black" }}
            size="small"
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};
