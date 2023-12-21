//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import { useRouter } from "next/router";

export const GoalTotal = ({ matchAnalysis, matche }) => {
  const router = useRouter();
  const [homeGoals, setHomeGoals] = useState([]);
  const [awayGoals, setAwayGoals] = useState([]);

  const columns = [
    {
      render: (value) => <div style={{ color: "black" }}>{value?.name}</div>,
    },
    {
      title: "0",
      render: (value) => <div style={{ color: "black" }}>{value?.noGoals}</div>,
    },
    {
      title: "1",
      render: (value) => (
        <div style={{ color: "black" }}>{value?.oneGoals}</div>
      ),
    },
    {
      title: "2",
      render: (value) => (
        <div style={{ color: "black" }}>{value?.twoGoals}</div>
      ),
    },
    {
      title: "3",
      render: (value) => (
        <div style={{ color: "black" }}>{value?.threeGoals}</div>
      ),
    },
    {
      title: "4+",
      render: (value) => (
        <div style={{ color: "black" }}>{value?.fourAndMoreGoals}</div>
      ),
    },
    {
      title: "Hiệp 1",
      render: (value) => (
        <div style={{ color: "black" }}>{value?.firstHalf}</div>
      ),
    },
    {
      title: "Hiệp 2",
      render: (value) => (
        <div style={{ color: "black" }}>{value?.secondHalf}</div>
      ),
    },
  ];

  const getMatcheGoals = async () => {
    // const response = await axios.get(
    //   `${ip}/website/matches/teamData/${router.query?.pid}`
    // );

    let dataHomeGoalTotal = matchAnalysis?.homeGoals?.total;

    if (dataHomeGoalTotal) {
      dataHomeGoalTotal.name = "Tổng";
    }

    let dataHomeGoalHome = matchAnalysis?.homeGoals?.home;
    if (dataHomeGoalHome) {
      dataHomeGoalHome.name = "Nhà";
    }

    let dataHomeGoalAway = matchAnalysis?.homeGoals?.away;
    if (dataHomeGoalAway) {
      dataHomeGoalAway.name = "Khách";
    }

    let dataHome = [dataHomeGoalTotal, dataHomeGoalHome, dataHomeGoalAway];
    setHomeGoals(dataHome);

    let dataAwayGoalTotal = matchAnalysis?.awayGoals?.total;
    if (dataAwayGoalTotal) {
      dataAwayGoalTotal.name = "Tổng";
    }

    let dataAwayGoalHome = matchAnalysis?.awayGoals?.home;
    if (dataAwayGoalHome) {
      dataAwayGoalHome.name = "Nhà";
    }

    let dataAwayGoalAway = matchAnalysis?.awayGoals?.away;
    if (dataAwayGoalAway) {
      dataAwayGoalAway.name = "Khách";
    }

    let dataAway = [dataAwayGoalTotal, dataAwayGoalHome, dataAwayGoalAway];
    setAwayGoals(dataAway);
  };

  useEffect(() => {
    if (router.query?.pid) getMatcheGoals();
  }, [router.asPath]);

  return (
    <div className="compare-odds ">
      <h2 className="team-table-title  text-sm sm:text-[25px]">
        Tổng số ghi bàn thắng/Số bàn thắng trong H1&H2
      </h2>
      <div className="team-div">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            {/* <div className="team-table-home"> */}
            <a className="vv">{matche?.team_home_name}</a>
            <Table
              columns={columns}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={homeGoals}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
            {/* </div> */}
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            {/* <div className="team-table-guest"> */}
            <a className="vv">{matche?.team_away_name}</a>
            <Table
              columns={columns}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={awayGoals}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
            {/* </div> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};
