//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import moment from "moment";

const data = [];
data.push({
  key: 1,
  match: "HOL",
  date: "26/04/2022",
  home: "Jong PSV Eindhoven",
  hdp: "0.5/1",
  away: "MVV Maastricht",
  score: "2-2",
  hdpStatus: 1,
});
const AsianOddsStatisticsHistory = ({ matchAnalysis, match }) => {
  const [dataHomeHandicap, setDataHomeHandicap] = useState([]);
  const [dataAwayHandicap, setDataAwayHandicap] = useState([]);
  const [dataHomeOverUnder, setDataHomeOverUnder] = useState([]);
  const [dataAwayOverUnder, setDataAwayOverUnder] = useState([]);
  const getData = () => {
    if (matchAnalysis?.awayLastMatches) {
      let handicap = getHandicapLast5Match(matchAnalysis.awayLastMatches);
      setDataAwayHandicap(handicap);
      let overUnder = getOverUnderLast5Match(matchAnalysis.awayLastMatches);
      setDataAwayOverUnder(overUnder);
    }
    if (matchAnalysis?.homeLastMatches) {
      let handicap = getHandicapLast5Match(matchAnalysis.homeLastMatches);

      setDataHomeHandicap(handicap);
      let overUnder = getOverUnderLast5Match(matchAnalysis.homeLastMatches);
      setDataHomeOverUnder(overUnder);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getHandicapLast5Match = (data) => {
    let dataExport = data?.slice(0, 5)?.map((item, index) => {
      if (item?.isHome) {
        return {
          key: index,
          match: item?.league,
          date: moment.unix(item?.matchTime)?.format("DD/MM/YYYY"),
          home: item?.home?.homeName,
          hdp: Number(item?.instantHandicap),
          away: item?.away?.awayName,
          score: `${item?.home?.scoreHome} - ${item?.away?.scoreAway}`,
          hdpStatus: exportLoseWin(
            item?.instantHandicap,
            item?.home?.scoreHome,
            item?.away?.scoreAway
          ),
        };
      } else {
        return {
          key: index,
          match: item?.league,
          date: moment.unix(item?.matchTime)?.format("DD/MM/YYYY"),
          home: item?.away?.awayName,
          hdp: Number(item?.instantHandicap),
          away: item?.home?.homeName,
          score: `${item?.away?.scoreAway} - ${item?.home?.scoreHome}`,
          hdpStatus: exportLoseWin(
            item?.instantHandicap,
            item?.away?.scoreAway,
            item?.home?.scoreHome
          ),
        };
      }
    });
    return dataExport;
  };
  const getOverUnderLast5Match = (data) => {
    let dataExport = data?.slice(0, 5)?.map((item, index) => {
      if (item?.isHome) {
        return {
          key: index,
          match: item?.league,
          date: moment.unix(item?.matchTime)?.format("DD/MM/YYYY"),
          home: item?.home?.homeName,
          hdp: Number(item?.instantTotal),
          away: item?.away?.awayName,
          score: `${item?.home?.scoreHome} - ${item?.away?.scoreAway}`,
          hdpStatus: exportOverUnder(
            item?.instantTotal,
            item?.home?.scoreHome,
            item?.away?.scoreAway
          ),
        };
      } else {
        return {
          key: index,
          match: item?.league,
          date: moment.unix(item?.matchTime)?.format("DD/MM/YYYY"),
          home: item?.away?.awayName,
          hdp: Number(item?.instantTotal),
          away: item?.home?.homeName,
          score: `${item?.away?.scoreAway} - ${item?.home?.scoreHome}`,
          hdpStatus: exportOverUnder(
            item?.instantTotal,
            item?.away?.scoreAway,
            item?.home?.scoreHome
          ),
        };
      }
    });
    return dataExport;
  };

  const exportLoseWin = (odds, home, away) => {
    let scoreHome = Number(home);
    let scoreAway = Number(away);
    let instantsOdds = Number(odds);
    if (scoreHome - scoreAway > instantsOdds) {
      return 1;
    } else if (scoreHome - scoreAway === instantsOdds) {
      return 0;
    } else {
      return -1;
    }
  };
  const exportOverUnder = (odds, home, away) => {
    let scoreHome = Number(home);
    let scoreAway = Number(away);
    let instantsOdds = Number(odds);
    if (scoreHome + scoreAway > instantsOdds) {
      return 1;
    } else if (scoreHome + scoreAway === instantsOdds) {
      return 0;
    } else {
      return -1;
    }
  };
  const columnsHomeHandicap = [
    {
      title: match?.homeName,
      fixed: "center",
      className: "rank-td-home",
      children: [
        {
          title: "Trận đấu",
          dataIndex: "match",
          key: "match",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          align: "center",
          dataIndex: "hdp",
          key: "hdp",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          align: "center",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>B</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];

  const columnsHomeOverUnder = [
    {
      title: match?.homeName,
      fixed: "center",
      className: "rank-td-home",
      children: [
        {
          title: "Trận đấu",
          dataIndex: "match",
          key: "match",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          align: "center",
          dataIndex: "hdp",
          key: "hdp",
          render: (value) => (
            <div style={{ color: "black", fontSize: "12px" }}>{value}</div>
          ),
        },
        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          align: "center",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>X</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];

  const columnsAwayHandicap = [
    {
      title: match?.awayName,
      fixed: "center",
      className: "rank-td-away",
      children: [
        {
          title: "Trận đấu",
          dataIndex: "match",
          key: "match",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          dataIndex: "hdp",
          key: "hdp",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>B</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];

  const columnsAwayOverUnder = [
    {
      title: match?.awayName,
      fixed: "center",
      className: "rank-td-away",
      children: [
        {
          title: "Trận đấu",
          dataIndex: "match",
          key: "match",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          dataIndex: "hdp",
          key: "hdp",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>X</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];
  const columnsHomeHandicapMobile = [
    {
      title: match?.homeName,
      fixed: "center",
      className: "rank-td-home",
      children: [
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          align: "center",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>B</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];
  const columnsHomeOverUnderMobile = [
    {
      title: match?.homeName,
      fixed: "center",
      className: "rank-td-home",
      children: [
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },

        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          align: "center",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>X</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];
  const columnsAwayHandicapMobile = [
    {
      title: match?.awayName,
      fixed: "center",
      className: "rank-td-away",
      children: [
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },

        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>B</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];
  const columnsAwayOverUnderMobile = [
    {
      title: match?.awayName,
      fixed: "center",
      className: "rank-td-away",
      children: [
        {
          title: "Giờ",
          dataIndex: "date",
          key: "date",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Chủ",
          dataIndex: "home",
          key: "home",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Khách",
          dataIndex: "away",
          key: "away",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "Tỷ số",
          dataIndex: "score",
          key: "score",
          render: (value) => <div style={{ color: "black" }}>{value}</div>,
        },
        {
          title: "HDP",
          dataIndex: "hdpStatus",
          key: "hdpStatus",
          render: (value) => {
            switch (value) {
              case -1:
                return (
                  <div style={{ color: "white", backgroundColor: "red" }}>
                    <span style={{ color: "white" }}>X</span>
                  </div>
                );
              case 1:
                return (
                  <div style={{ color: "white", backgroundColor: "green" }}>
                    <span style={{ color: "white" }}>T</span>
                  </div>
                );
              case 0:
                return (
                  <div style={{ color: "white", backgroundColor: "#348ce2" }}>
                    <span style={{ color: "white" }}>H</span>
                  </div>
                );
              default:
                break;
            }
          },
        },
      ],
    },
  ];
  return (
    <div className="w-full mx-auto compare-odds">
      <h2 className="team-table-title  text-sm sm:text-[25px]">
        Lịch sử kèo châu Á tương đồng
      </h2>
      <div className="w-full ">
        <div className="hidden sm:block">
          <Row gutter={[16, 16]}>
            <Col
              className="gutter-row team-table-custom"
              xs={24}
              sm={24}
              md={12}
              lg={12}
            >
              <Table
                columns={columnsHomeHandicap}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataHomeHandicap}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
                className="team-table-custom"
              />
              <Table
                columns={columnsHomeOverUnder}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataHomeOverUnder}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </Col>
            <Col
              className="gutter-row team-table-custom"
              xs={24}
              sm={24}
              md={12}
              lg={12}
            >
              <Table
                columns={columnsAwayHandicap}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataAwayHandicap}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
              <Table
                columns={columnsAwayOverUnder}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataAwayOverUnder}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </Col>
          </Row>
        </div>

        <div className="block sm:hidden">
          <Row gutter={[16, 16]}>
            <Col
              className="gutter-row team-table-custom"
              xs={24}
              sm={24}
              md={12}
              lg={12}
            >
              <Table
                columns={columnsHomeHandicapMobile}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataHomeHandicap}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
              <Table
                columns={columnsHomeOverUnderMobile}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataHomeOverUnder}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </Col>
            <Col
              className="gutter-row team-table-custom"
              xs={24}
              sm={24}
              md={12}
              lg={12}
            >
              <Table
                columns={columnsAwayHandicapMobile}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataAwayHandicap}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
              <Table
                columns={columnsAwayOverUnderMobile}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                dataSource={dataAwayOverUnder}
                bordered
                style={{ color: "black" }}
                size="small"
                pagination={false}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default AsianOddsStatisticsHistory;
