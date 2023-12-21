//@ts-nocheck

import React, { useEffect, useState } from "react";
import { Row, Table, Col } from "antd";
import { useRouter } from "next/router";
import axios from "axios";

export const TimeToScoreGoals = ({ matchAnalysis, matche }) => {
  const router = useRouter();

  const [homeShootTime, setHomeShootTime] = useState([]);
  const [firstHomeShootTime, setFirstHomeShootTime] = useState([]);
  const [awayShootTime, setAwayShootTime] = useState([]);
  const [firstAwayShootTime, setFirstAwayShootTime] = useState([]);

  const columns = [
    {
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.name}</div>,
    },
    {
      title: "1-10",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to10}</div>,
    },
    {
      title: "11-20",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to20}</div>,
    },
    {
      title: "21-30",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to30}</div>,
    },
    {
      title: "31-40",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to40}</div>,
    },
    {
      title: "41-45",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to45}</div>,
    },
    {
      title: "46-70",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to50}</div>,
    },
    {
      title: "51-70",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to60}</div>,
    },
    {
      title: "61-70",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to70}</div>,
    },
    {
      title: "71-80",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to80}</div>,
    },
    {
      title: "81-90+",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to90}</div>,
    },
  ];

  const columns1 = [
    {
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.name}</div>,
    },
    {
      title: "1-20",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to10}</div>,
    },
    // {
    //   title: "11-20",
    //   className: "title-mane-number whitespace-nowrap",
    //   render: (value) => <div style={{ color: "black" }}>{value?.to20}</div>,
    // },
    {
      title: "21-40",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to30}</div>,
    },
    // {
    //   title: "31-40",
    //   className: "title-mane-number whitespace-nowrap",
    //   render: (value) => <div style={{ color: "black" }}>{value?.to40}</div>,
    // },
    {
      title: "41-45",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to45}</div>,
    },
    {
      title: "46-70",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to50}</div>,
    },
    {
      title: "51-70",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to60}</div>,
    },
    {
      title: "61-80",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to70}</div>,
    },
    // {
    //   title: "71-80",
    //   className: "title-mane-number whitespace-nowrap",
    //   render: (value) => <div style={{ color: "black" }}>{value?.to80}</div>,
    // },
    {
      title: "81-90+",
      className: "title-mane-number whitespace-nowrap",
      render: (value) => <div style={{ color: "black" }}>{value?.to90}</div>,
    },
  ];

  const columnsFirst = [
    {
      title: "Thời gian ghi bàn lần đầu tiên",
      colSpan: 12,
      width: 45,
      render: (value) => <div style={{ color: "black" }}>{value?.name}</div>,
    },
    {
      title: "1-10",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to10}</div>,
    },
    {
      title: "11-20",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to20}</div>,
    },
    {
      title: "21-30",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to30}</div>,
    },
    {
      title: "31-40",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to40}</div>,
    },
    {
      title: "41-45",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to45}</div>,
    },
    {
      title: "46-70",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to50}</div>,
    },
    {
      title: "51-70",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to60}</div>,
    },
    {
      title: "61-70",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to70}</div>,
    },
    {
      title: "71-80",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to80}</div>,
    },
    {
      title: "81-90+",
      className: "title-mane-number whitespace-nowrap",
      colSpan: 0,
      width: 55,
      render: (value) => <div style={{ color: "black" }}>{value?.to90}</div>,
    },
  ];

  const getMatcheShootTime = async () => {
    if (Object.keys(matchAnalysis).length !== 0) {
      let dataHomeShootTimeTotal = matchAnalysis.homeShootTime.total;
      dataHomeShootTimeTotal.name = "Tổng";
      let dataHomeShootTimeHome = matchAnalysis?.homeShootTime?.home;
      dataHomeShootTimeHome.name = "Nhà";
      let dataHomeShootTimeAway = matchAnalysis?.homeShootTime?.away;
      dataHomeShootTimeAway.name = "Khách";
      let dataHome = [
        dataHomeShootTimeTotal,
        dataHomeShootTimeHome,
        dataHomeShootTimeAway,
      ];
      setHomeShootTime(dataHome);

      let dataFirstHomeShootTimeTotal =
        matchAnalysis?.homeShootTime?.firstShootTotal;
      dataFirstHomeShootTimeTotal.name = "Tổng";
      let dataFirstHomeShootTimeHome =
        matchAnalysis?.homeShootTime?.firstShootHome;
      dataFirstHomeShootTimeHome.name = "Nhà";
      let dataFirstHomeShootTimeAway =
        matchAnalysis?.homeShootTime?.firstShootAway;
      dataFirstHomeShootTimeAway.name = "Khách";
      let dataFirstHome = [
        dataFirstHomeShootTimeTotal,
        dataFirstHomeShootTimeHome,
        dataFirstHomeShootTimeAway,
      ];
      setFirstHomeShootTime(dataFirstHome);

      let dataAwayShootTimeTotal = matchAnalysis?.awayShootTime?.total;
      dataAwayShootTimeTotal.name = "Tổng";
      let dataAwayShootTimeHome = matchAnalysis?.awayShootTime?.home;
      dataAwayShootTimeHome.name = "Nhà";
      let dataAwayShootTimeAway = matchAnalysis?.awayShootTime?.away;
      dataAwayShootTimeAway.name = "Khách";
      let dataAway = [
        dataAwayShootTimeTotal,
        dataAwayShootTimeHome,
        dataAwayShootTimeAway,
      ];
      setAwayShootTime(dataAway);

      let dataFirstAwayShootTimeTotal =
        matchAnalysis?.awayShootTime?.firstShootTotal;
      dataFirstAwayShootTimeTotal.name = "Tổng";
      let dataFirstAwayShootTimeHome =
        matchAnalysis?.awayShootTime?.firstShootHome;
      dataFirstAwayShootTimeHome.name = "Nhà";
      let dataFirstAwayShootTimeAway =
        matchAnalysis?.awayShootTime?.firstShootAway;
      dataFirstAwayShootTimeAway.name = "Khách";
      let dataFirstAway = [
        dataFirstAwayShootTimeTotal,
        dataFirstAwayShootTimeHome,
        dataFirstAwayShootTimeAway,
      ];
      setFirstAwayShootTime(dataFirstAway);
    }
    // const response = await axios.get(
    //   `${ip}/website/matches/teamData/${router.query?.pid}`
    // );
  };

  useEffect(() => {
    getMatcheShootTime();
  }, [matchAnalysis]);

  return (
    <div className="container compare-odds w-full !mx-auto compare-odds">
      <h2 className="team-table-title text-sm sm:text-[25px] ">
        Thời gian ghi bàn thắng
      </h2>
      <div className="w-full md:overflow-hidden time-score">
        <Row gutter={[16, 16]}>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
            <a className="block w-full mb-0 text-base font-bold border-b-2 border-orange-500 h-[30px]">
              {matche?.team_home_name}
            </a>
            <div className="table_active_reponsive">
              <Table
                columns={columns}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={homeShootTime}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </div>
            <div className="table_active_reponsive">
              <Table
                columns={columns1}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={homeShootTime}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </div>

            <Table
              columns={columnsFirst}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={firstHomeShootTime}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
            <a className="block w-full text-base font-bold border-b-2 border-blue-500 h-[30px]">
              {matche?.team_away_name}
            </a>
            <div className="table_active_reponsive">
              <Table
                columns={columns}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={awayShootTime}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </div>
            <div className="table_active_reponsive">
              <Table
                columns={columns1}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={awayShootTime}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </div>
            <Table
              columns={columnsFirst}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={firstAwayShootTime}
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
