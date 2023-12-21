//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useRouter } from "next/router";

export const BigSicOddEven = ({ matchAnalysis, matche }) => {
  const router = useRouter();
  const [homeOdd, setHomeOdd] = useState([]);
  const [awayOdd, setAwayOdd] = useState([]);

  const columns = [
    {
      render: (value) => <div className="text-xs md:text-base" style={{ color: "black" }}>{value?.name}</div>,
    },
    {
      title: "Tài",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsOver} ({value?.oddsOverRate})
        </div>
      ),
    },
    {
      title: "Xỉu",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsUnder} ({value?.oddsUnderRate})
        </div>
      ),
    },
    {
      title: "Hòa",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsVoid} (0.0%)
        </div>
      ),
    },
    {
      title: "Lẻ",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsOver} ({value?.oddsOverRate})
        </div>
      ),
    },
    {
      title: "Chẵn",
      width: "15%",

      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsUnder} ({value?.oddsUnderRate})
        </div>
      ),
    },
  ];

  const columns1 = [
    {
      render: (value) => <div className="text-xs md:text-base" style={{ color: "black" }}>{value?.name}</div>,
    },
    {
      title: "Tài",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsOver} ({value?.oddsOverRate})
        </div>
      ),
    },
    {
      title: "Xỉu",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsUnder} ({value?.oddsUnderRate})
        </div>
      ),
    },
    {
      title: "Hòa",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsVoid} (0.0%)
        </div>
      ),
    },
    {
      title: "Lẻ",
      width: "15%",
      render: (value) => (
        <div style={{ color: "black" }} className="text-xs md:text-base">
          {value?.oddsOver} ({value?.oddsOverRate})
        </div>
      ),
    },
    // {
    //   title: "Chẵn",
    //   width: "15%",

    //   render: (value) => (
    //     <div style={{ color: "black" }} className="text-xs md:text-base">
    //       {value?.oddsUnder} ({value?.oddsUnderRate})
    //     </div>
    //   ),
    // },
  ];

  const getMatcheOdd = async () => {
    // const response = await axios.get(
    //   `${ip}/website/matches/teamData/${router.query?.pid}`
    // );

    let dataHomeOddTotal = matchAnalysis?.homeOdds?.total;
    if (dataHomeOddTotal) {
      dataHomeOddTotal.name = "Tổng";
    }

    let dataHomeOddHome = matchAnalysis?.homeOdds?.home;
    if (dataHomeOddHome) {
      dataHomeOddHome.name = "Nhà";
    }

    let dataHomeOddAway = matchAnalysis?.homeOdds?.away;
    if (dataHomeOddAway) {
      dataHomeOddAway.name = "Khách";
    }

    let dataHome = [dataHomeOddTotal, dataHomeOddHome, dataHomeOddAway];
    setHomeOdd(dataHome);

    let dataAwayOddTotal = matchAnalysis?.awayOdds?.total;
    if (dataAwayOddTotal) {
      dataAwayOddTotal.name = "Tổng";
    }

    let dataAwayOddHome = matchAnalysis?.awayOdds?.home;
    if (dataAwayOddHome) {
      dataAwayOddHome.name = "Nhà";
    }

    let dataAwayOddAway = matchAnalysis?.awayOdds?.away;
    if (dataAwayOddAway) {
      dataAwayOddAway.name = "Khách";
    }

    let dataAway = [dataAwayOddTotal, dataAwayOddHome, dataAwayOddAway];
    setAwayOdd(dataAway);
  };

  useEffect(() => {
    if (router.query?.pid) getMatcheOdd();
  }, [router.asPath]);

  return (
    <div className="container w-full !mx-auto compare-odds">
      <h2 className="team-table-title text-sm sm:text-[25px]">
        Tài Xỉu/Lẻ Chẵn
      </h2>
      <div className="text-center">
        <div className="flex flex-col items-center justify-around gap-3 md:flex-row ">
          <div className="w-full md:flex-1 team-table-home">
            <a className="vv">{matche?.team_home_name}</a>
            <div className="table_active_reponsive">
            <Table
              columns={columns}
              
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={homeOdd}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
            </div>
            <div className="table_active_reponsive1">
            <Table
              columns={columns1}
              
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={homeOdd}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
            </div>
          </div>
          <div className="w-full md:flex-1 team-table-guest">
            <a className="vv">{matche?.team_away_name}</a>
            <div className="table_active_reponsive">
            <Table
              columns={columns}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={awayOdd}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
            </div>
            <div className="table_active_reponsive1">
            <Table
              columns={columns1}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={awayOdd}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
