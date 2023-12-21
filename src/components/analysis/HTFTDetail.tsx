//@ts-nocheck

import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import { useRouter } from "next/router";

export const HTFTDetail = ({ matchAnalysis, matche }) => {
  const router = useRouter();
  const [homeHT, setHomeHT] = useState([]);
  const [awayHT, setAwayHT] = useState([]);

  const columns = [
    {
      title: "HT",
      children: [
        {
          title: "FT",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.name}</div>
          ),
        },
      ],
    },
    {
      title: "T",
      children: [
        {
          title: "T",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfWinFullWin}</div>
          ),
        },
      ],
    },
    {
      title: "T",
      children: [
        {
          title: "H",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfWinFullDraw}</div>
          ),
        },
      ],
    },
    {
      title: "T",
      children: [
        {
          title: "B",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfWinFullLose}</div>
          ),
        },
      ],
    },
    {
      title: "H",
      children: [
        {
          title: "T",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfDrawFullWin}</div>
          ),
        },
      ],
    },
    {
      title: "H",
      children: [
        {
          title: "H",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfDrawFullDraw}</div>
          ),
        },
      ],
    },
    {
      title: "H",
      children: [
        {
          title: "B",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfDrawFullLose}</div>
          ),
        },
      ],
    },
    {
      title: "B",
      children: [
        {
          title: "T",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfLoseFullWin}</div>
          ),
        },
      ],
    },
    {
      title: "B",
      children: [
        {
          title: "H",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfLoseFullDraw}</div>
          ),
        },
      ],
    },
    {
      title: "B",
      children: [
        {
          title: "B",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.halfLoseFullLose}</div>
          ),
        },
      ],
    },
  ];

  const getMatchesHTFT = async () => {
    // const response = await axios.get(
    //   `${ip}/website/matches/teamData/${router.query?.pid}`
    // );

    let dataHomeHTTotal = matchAnalysis?.homeHT?.total;
    if (dataHomeHTTotal) {
      dataHomeHTTotal.name = "Tổng";
    }

    let dataHomeHTHome = matchAnalysis?.homeHT?.home;
    if (dataHomeHTHome) {
      dataHomeHTHome.name = "Nhà";
    }

    let dataHomeHTAway = matchAnalysis?.homeHT?.away;
    if (dataHomeHTAway) {
      dataHomeHTAway.name = "Khách";
    }

    let dataHome = [dataHomeHTTotal, dataHomeHTHome, dataHomeHTAway];
    setHomeHT(dataHome);

    let dataAwayHTTotal = matchAnalysis?.awayHT?.total;
    if (dataAwayHTTotal) {
      dataAwayHTTotal.name = "Tổng";
    }

    let dataAwayHTHome = matchAnalysis?.awayHT?.home;
    if (dataAwayHTHome) {
      dataAwayHTHome.name = "Nhà";
    }

    let dataAwayHTAway = matchAnalysis?.awayHT?.away;
    if (dataAwayHTAway) {
      dataAwayHTAway.name = "Khách";
    }

    let dataAway = [dataAwayHTTotal, dataAwayHTHome, dataAwayHTAway];
    setAwayHT(dataAway);
  };

  useEffect(() => {
    if (router.query?.pid) getMatchesHTFT();
  }, [router.asPath]);

  return (
    <div className="container compare-odds w-full !mx-auto compare-odds">
      <h2
        className="team-table-title  text-sm sm:text-[25px]"
      >
        Chi tiết về HT/FT
      </h2>
      <div className="text-center team-div">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} className="team-table-custom">
            <a className="vv">{matche?.team_home_name}</a>
            <Table
              columns={columns}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
        
              dataSource={homeHT}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <a className="vv">{matche?.team_away_name}</a>
            <Table
              columns={columns}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={awayHT}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
