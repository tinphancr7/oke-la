//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Col, Row } from "antd";

const AsianOddsStatistics = ({ matchAnalysis }) => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataTeam = async () => {
      return matchAnalysis;
    };
    if (router.query?.pid) {
      getDataTeam().then((result) => {
        exportData(result);
      });
    }
  }, [matchAnalysis]);
  const exportData = (data) => {
    if (data && Object.keys(data).length > 0) {
      let result = {
        homeName: data.homeLastMatches[0]?.home.homeName,
        awayName: data.awayLastMatches[0]?.home.homeName,
        home: data.homeOdds,
        away: data.awayOdds,
      };
      setData(result);
    }
  };

  return (
    <div className="porletP" id="porletP6">
      {data && Object.keys(data).length > 0 && (
        <>
          <h2 className="team-table-title text-sm sm:text-[25px]">
            Thống kê kèo châu Á
          </h2>
          <br />

          <div className="team-div" style={{ marginBottom: "20px" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <table
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  className="team-table-custom team-table-home"
                >
                  <tbody>
                    <tr className="team-home">
                      <td colSpan={12}>
                        <span>
                          <a href={`/team/${data.homeId}`}>{data?.homeName}</a>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={2}>FT</th>
                      <th colSpan={5} className="ll rl hbg1" width="40%">
                        HDP
                      </th>
                      <th colSpan={5} width="40%">
                        Tài xỉu
                      </th>
                    </tr>
                    <tr>
                      <th width="12%">&nbsp;</th>
                      <th>Trận đấu</th>
                      <th width="10%">T</th>
                      <th>H</th>
                      <th width="10%">B</th>
                      <th>T%</th>
                      <th>T</th>
                      <th width="8%">Tài%</th>
                      <th>X</th>
                      <th width="8%">Xỉu%</th>
                    </tr>
                    <tr>
                      <td height={22}>Tổng</td>
                      <td>{data?.home?.total?.count}</td>
                      <td>{data?.home?.total?.oddsWin}</td>
                      <td>{data?.home?.total?.oddsVoid}</td>
                      <td>{data?.home?.total?.oddsLose}</td>
                      <td>{data?.home?.total?.oddsWinRate}</td>

                      <td>{data?.home?.total?.oddsOver}</td>
                      <td>{data?.home?.total?.oddsOverRate}</td>
                      <td>{data?.home?.total?.oddsUnder}</td>
                      <td>{data?.home?.total?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-home-f">Sân nhà</span>
                      </td>
                      <td>{data?.home?.home?.count}</td>
                      <td>{data?.home?.home?.oddsWin}</td>
                      <td>{data?.home?.home?.oddsVoid}</td>
                      <td>{data?.home?.home?.oddsLose}</td>
                      <td>{data?.home?.home?.oddsWinRate}</td>

                      <td>{data?.home?.home?.oddsOver}</td>
                      <td>{data?.home?.home?.oddsOverRate}</td>
                      <td>{data?.home?.home?.oddsUnder}</td>
                      <td>{data?.home?.home?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-away-f">Sân Khách</span>
                      </td>
                      <td>{data?.home?.away?.count}</td>
                      <td>{data?.home?.away?.oddsWin}</td>
                      <td>{data?.home?.away?.oddsVoid}</td>
                      <td>{data?.home?.away?.oddsLose}</td>
                      <td>{data?.home?.away?.oddsWinRate}</td>

                      <td>{data?.home?.away?.oddsOver}</td>
                      <td>{data?.home?.away?.oddsOverRate}</td>
                      <td>{data?.home?.away?.oddsUnder}</td>
                      <td>{data?.home?.away?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>6 trận gần </td>
                      <td>{data?.home?.recentSix?.[0].count}</td>
                      <td colSpan={3}>
                        {data?.home?.recentSix?.[0].handicapResult
                          .split("")
                          .map((item, index) => {
                            if (item === "w") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "l") {
                              return (
                                <span className="o-lose" key={index}>
                                  B
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                      <td>{data?.home?.recentSix?.[0].oddsWinRate}</td>

                      <td colSpan={4}>
                        {data?.home?.recentSix?.[0].overUnderResult
                          .split("")
                          .map((item, index) => {
                            if (item === "o") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "u") {
                              return (
                                <span className="o-lose" key={index}>
                                  X
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <table
                  width="100%"
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  className="team-table-guest team-table-custom"
                >
                  <tbody>
                    <tr className="team-guest">
                      <td colSpan={12}>
                        <span>
                          <a href={`/team/${data.awayId}`}>{data?.awayName}</a>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={2}>FT</th>
                      <th colSpan={5} className="ll rl hbg2" width="40%">
                        HDP
                      </th>
                      <th colSpan={5} width="40%">
                        Tài xỉu
                      </th>
                    </tr>
                    <tr>
                      <th width="12%">&nbsp;</th>
                      <th>Trận đấu</th>
                      <th width="10%">T</th>
                      <th>H</th>
                      <th width="10%">B</th>
                      <th>T%</th>
                      <th>T</th>
                      <th width="8%">Tài%</th>
                      <th>X</th>
                      <th width="8%">Xỉu%</th>
                    </tr>
                    <tr>
                      <td height={22}>Tổng</td>
                      <td>{data?.away?.total?.count}</td>
                      <td>{data?.away?.total?.oddsWin}</td>
                      <td>{data?.away?.total?.oddsVoid}</td>
                      <td>{data?.away?.total?.oddsLose}</td>
                      <td>{data?.away?.total?.oddsWinRate}</td>

                      <td>{data?.away?.total?.oddsOver}</td>
                      <td>{data?.away?.total?.oddsOverRate}</td>
                      <td>{data?.away?.total?.oddsUnder}</td>
                      <td>{data?.away?.total?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-home-f">Sân nhà</span>
                      </td>
                      <td>{data?.away?.home?.count}</td>
                      <td>{data?.away?.home?.oddsWin}</td>
                      <td>{data?.away?.home?.oddsVoid}</td>
                      <td>{data?.away?.home?.oddsLose}</td>
                      <td>{data?.away?.home?.oddsWinRate}</td>

                      <td>{data?.away?.home?.oddsOver}</td>
                      <td>{data?.away?.home?.oddsOverRate}</td>
                      <td>{data?.away?.home?.oddsUnder}</td>
                      <td>{data?.away?.home?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-away-f">Sân Khách</span>
                      </td>
                      <td>{data?.away?.away?.count}</td>
                      <td>{data?.away?.away?.oddsWin}</td>
                      <td>{data?.away?.away?.oddsVoid}</td>
                      <td>{data?.away?.away?.oddsLose}</td>
                      <td>{data?.away?.away?.oddsWinRate}</td>

                      <td>{data?.away?.away?.oddsOver}</td>
                      <td>{data?.away?.away?.oddsOverRate}</td>
                      <td>{data?.away?.away?.oddsUnder}</td>
                      <td>{data?.away?.away?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>6 trận gần </td>
                      <td>{data?.away?.recentSix?.[0].count}</td>
                      <td colSpan={3}>
                        {data?.away?.recentSix?.[0].handicapResult
                          .split("")
                          .map((item, index) => {
                            if (item === "w") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "l") {
                              return (
                                <span className="o-lose" key={index}>
                                  B
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                      <td>{data?.away?.recentSix?.[0].oddsWinRate}</td>

                      <td colSpan={4}>
                        {data?.away?.recentSix?.[0].overUnderResult
                          .split("")
                          .map((item, index) => {
                            if (item === "o") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "u") {
                              return (
                                <span className="o-lose" key={index}>
                                  X
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
          <br />
          <br />
          <div className="team-div" style={{ marginBottom: "20px" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <table
                  width="100%"
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  className="team-table-home team-table-custom"
                >
                  <tbody>
                    <tr className="team-home">
                      <td colSpan={12}>
                        <span>
                          <a>{data?.homeName}</a>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={2}>HT</th>
                      <th colSpan={5} className="ll rl hbg1" width="40%">
                        HDP
                      </th>
                      <th colSpan={5} width="40%">
                        Tài xỉu
                      </th>
                    </tr>
                    <tr>
                      <th width="12%">&nbsp;</th>
                      <th>Trận đấu</th>
                      <th width="10%">T</th>
                      <th>H</th>
                      <th width="10%">B</th>
                      <th>T%</th>
                      <th>T</th>
                      <th width="8%">Tài%</th>
                      <th>X</th>
                      <th width="8%">Xỉu%</th>
                    </tr>
                    <tr>
                      <td height={22}>Tổng</td>
                      <td>{data?.home?.totalHalf?.count}</td>
                      <td>{data?.home?.totalHalf?.oddsWin}</td>
                      <td>{data?.home?.totalHalf?.oddsVoid}</td>
                      <td>{data?.home?.totalHalf?.oddsLose}</td>
                      <td>{data?.home?.totalHalf?.oddsWinRate}</td>

                      <td>{data?.home?.totalHalf?.oddsOver}</td>
                      <td>{data?.home?.totalHalf?.oddsOverRate}</td>
                      <td>{data?.home?.totalHalf?.oddsUnder}</td>
                      <td>{data?.home?.totalHalf?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-home-f">Sân nhà</span>
                      </td>
                      <td>{data?.home?.homeHalf?.count}</td>
                      <td>{data?.home?.homeHalf?.oddsWin}</td>
                      <td>{data?.home?.homeHalf?.oddsVoid}</td>
                      <td>{data?.home?.homeHalf?.oddsLose}</td>
                      <td>{data?.home?.homeHalf?.oddsWinRate}</td>

                      <td>{data?.home?.homeHalf?.oddsOver}</td>
                      <td>{data?.home?.homeHalf?.oddsOverRate}</td>
                      <td>{data?.home?.homeHalf?.oddsUnder}</td>
                      <td>{data?.home?.homeHalf?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-away-f">Sân Khách</span>
                      </td>
                      <td>{data?.home?.awayHalf?.count}</td>
                      <td>{data?.home?.awayHalf?.oddsWin}</td>
                      <td>{data?.home?.awayHalf?.oddsVoid}</td>
                      <td>{data?.home?.awayHalf?.oddsLose}</td>
                      <td>{data?.home?.awayHalf?.oddsWinRate}</td>

                      <td>{data?.home?.awayHalf?.oddsOver}</td>
                      <td>{data?.home?.awayHalf?.oddsOverRate}</td>
                      <td>{data?.home?.awayHalf?.oddsUnder}</td>
                      <td>{data?.home?.awayHalf?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>6 trận gần </td>
                      <td>{data?.home?.recentSixHalf?.[0].count}</td>
                      <td colSpan={3}>
                        {data?.home?.recentSixHalf?.[0].handicapResult
                          .split("")
                          .map((item, index) => {
                            if (item === "w") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "l") {
                              return (
                                <span className="o-lose" key={index}>
                                  B
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                      <td>{data?.home?.recentSixHalf?.[0].oddsWinRate}</td>

                      <td colSpan={4}>
                        {data?.home?.recentSixHalf?.[0].overUnderResult
                          .split("")
                          .map((item, index) => {
                            if (item === "o") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "u") {
                              return (
                                <span className="o-lose" key={index}>
                                  X
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <table
                  width="100%"
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  className="team-table-guest team-table-custom"
                >
                  <tbody>
                    <tr className="team-guest">
                      <td colSpan={12}>
                        <span>
                          <a href="javascript:openFbTeam(7144)">
                            {data?.awayName}
                          </a>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={2}>HT</th>
                      <th colSpan={5} className="ll rl hbg2" width="40%">
                        HDP
                      </th>
                      <th colSpan={5} width="40%">
                        Tài xỉu
                      </th>
                    </tr>
                    <tr>
                      <th width="12%">&nbsp;</th>
                      <th>Trận đấu</th>
                      <th width="10%">T</th>
                      <th>H</th>
                      <th width="10%">B</th>
                      <th>T%</th>
                      <th>T</th>
                      <th width="8%">Tài%</th>
                      <th>X</th>
                      <th width="8%">Xỉu%</th>
                    </tr>
                    <tr>
                      <td height={22}>Tổng</td>
                      <td>{data?.away?.totalHalf?.count}</td>
                      <td>{data?.away?.totalHalf?.oddsWin}</td>
                      <td>{data?.away?.totalHalf?.oddsVoid}</td>
                      <td>{data?.away?.totalHalf?.oddsLose}</td>
                      <td>{data?.away?.totalHalf?.oddsWinRate}</td>

                      <td>{data?.away?.totalHalf?.oddsOver}</td>
                      <td>{data?.away?.totalHalf?.oddsOverRate}</td>
                      <td>{data?.away?.totalHalf?.oddsUnder}</td>
                      <td>{data?.away?.totalHalf?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-home-f">Sân nhà</span>
                      </td>
                      <td>{data?.away?.homeHalf?.count}</td>
                      <td>{data?.away?.homeHalf?.oddsWin}</td>
                      <td>{data?.away?.homeHalf?.oddsVoid}</td>
                      <td>{data?.away?.homeHalf?.oddsLose}</td>
                      <td>{data?.away?.homeHalf?.oddsWinRate}</td>

                      <td>{data?.away?.homeHalf?.oddsOver}</td>
                      <td>{data?.away?.homeHalf?.oddsOverRate}</td>
                      <td>{data?.away?.homeHalf?.oddsUnder}</td>
                      <td>{data?.away?.homeHalf?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>
                        <span className="team-away-f">Sân Khách</span>
                      </td>
                      <td>{data?.away?.awayHalf?.count}</td>
                      <td>{data?.away?.awayHalf?.oddsWin}</td>
                      <td>{data?.away?.awayHalf?.oddsVoid}</td>
                      <td>{data?.away?.awayHalf?.oddsLose}</td>
                      <td>{data?.away?.awayHalf?.oddsWinRate}</td>

                      <td>{data?.away?.awayHalf?.oddsOver}</td>
                      <td>{data?.away?.awayHalf?.oddsOverRate}</td>
                      <td>{data?.away?.awayHalf?.oddsUnder}</td>
                      <td>{data?.away?.awayHalf?.oddsUnderRate}</td>
                    </tr>
                    <tr>
                      <td height={22}>6 trận gần </td>
                      <td>{data?.away?.recentSixHalf?.[0].count}</td>
                      <td colSpan={3}>
                        {data?.away?.recentSixHalf?.[0].handicapResult
                          .split("")
                          .map((item, index) => {
                            if (item === "w") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "l") {
                              return (
                                <span className="o-lose" key={index}>
                                  B
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                      <td>{data?.away?.recentSixHalf?.[0].oddsWinRate}</td>

                      <td colSpan={4}>
                        {data?.away?.recentSixHalf?.[0].overUnderResult
                          .split("")
                          .map((item, index) => {
                            if (item === "o") {
                              return (
                                <span className="o-win" key={index}>
                                  T
                                </span>
                              );
                            } else if (item === "u") {
                              return (
                                <span className="o-lose" key={index}>
                                  X
                                </span>
                              );
                            } else {
                              return (
                                <span className="o-draw" key={index}>
                                  H
                                </span>
                              );
                            }
                          })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};
export default AsianOddsStatistics;
