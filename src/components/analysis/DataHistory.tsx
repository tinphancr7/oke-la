//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
function avg(data, count, name, key) {
  let countTotal = 0;
  data.map((item, index) => {
    if (index < count) {
      countTotal = countTotal + parseInt(item[name]?.[key]);
    }
  });
  const result = countTotal / count;
  if (result % 1 === 0) return result.toString();
  return result.toFixed(1).toString();
}
function total(data, count, name, key) {
  let countTotal = 0;
  data.map((item, index) => {
    if (index < count) {
      countTotal = countTotal + parseInt(item[name]?.[key]);
    }
  });
  return countTotal;
}
let example = [
  { key: "Tổng cộng", style: { fontSize: "14px", fontWeight: "bold" } },
  { key: "Tổng bàn thắng", home: "", away: "", total: "" },
  { key: "Tổng bàn thua", home: "", away: "", total: "" },
  { key: "TB bàn thắng", home: "", away: "", total: "" },
  { key: "TB bàn thua", home: "", away: "", total: "" },
  {
    key: "Chủ nhà | đội khách",
    style: { fontSize: "14px", fontWeight: "bold" },
  },
  { key: "Tổng bàn thắng", home: "", away: "", total: "" },
  { key: "Tổng bàn thua", home: "", away: "", total: "" },
  { key: "TB bàn thắng", home: "", away: "", total: "" },
  { key: "TB bàn thua", home: "", away: "", total: "" },
  {
    key: "6 trận trước",
    style: { fontSize: "14px", fontWeight: "bold" },
  },
  { key: "Tổng bàn thắng", home: "", away: "", total: "" },
  { key: "Tổng bàn thua", home: "", away: "", total: "" },
  { key: "TB bàn thắng", home: "", away: "", total: "" },
  { key: "TB bàn thua", home: "", away: "", total: "" },
];

export default function DataHistory({ matchAnalysis }) {
  const router = useRouter();
  const [dataTotal, setData] = useState(example);
  const [dataHomeTotal, setDataHomeTotal] = useState([]);
  const [dataAwayTotal, setDataAwayTotal] = useState([]);
  const [dataHomeScore, setDataHomeScore] = useState([]);
  const [dataAwayScore, setDataAwayScore] = useState([]);
  useEffect(() => {
    const getDataTeam = async () => {
      return matchAnalysis;
    };
    if (matchAnalysis && Object.keys(matchAnalysis).length > 0) {
      getDataTeam().then((data) => {
        setDataHomeTotal(toHomeScore(data.homeScore, 5));
        setDataAwayTotal(toHomeScore(data.awayScore, 5));
        setDataHomeScore(toComparision(data.homeScore, 5));
        setDataAwayScore(toComparision(data.awayScore, 5));
        dataTotal[1].home = total(
          data.homeLastMatches,
          16,
          "home",
          "scoreHome"
        );
        dataTotal[1].away = total(
          data.awayLastMatches,
          16,
          "away",
          "scoreAway"
        );
        dataTotal[1].total =
          total(data.awayLastMatches, 16, "away", "scoreAway") +
          total(data.homeLastMatches, 16, "home", "scoreHome");
        dataTotal[2].home = total(
          data.homeLastMatches,
          16,
          "away",
          "scoreAway"
        );
        dataTotal[2].away = total(
          data.awayLastMatches,
          16,
          "home",
          "scoreHome"
        );
        dataTotal[2].total =
          total(data.homeLastMatches, 16, "away", "scoreAway") +
          total(data.awayLastMatches, 16, "home", "scoreHome");
        dataTotal[3].home = avg(data.homeLastMatches, 16, "home", "scoreHome");
        dataTotal[3].away = avg(data.awayLastMatches, 16, "away", "scoreAway");
        dataTotal[3].total =
          avg(data.awayLastMatches, 16, "away", "scoreAway") * 2 +
          avg(data.homeLastMatches, 16, "home", "scoreHome") * 2;
        dataTotal[4].home = avg(data.homeLastMatches, 16, "away", "scoreAway");
        dataTotal[4].away = avg(data.awayLastMatches, 16, "home", "scoreHome");
        dataTotal[4].total =
          avg(data.homeLastMatches, 16, "away", "scoreAway") * 2 +
          avg(data.awayLastMatches, 16, "home", "scoreHome") * 2;
        dataTotal[6].home = total(data.headToHead, 16, "home", "scoreHome");
        dataTotal[6].away = total(data.headToHead, 16, "away", "scoreAway");
        dataTotal[6].total =
          total(data.headToHead, 16, "away", "scoreAway") +
          total(data.headToHead, 16, "home", "scoreHome");
        dataTotal[7].home = total(data.headToHead, 16, "away", "scoreAway");
        dataTotal[7].away = total(data.headToHead, 16, "home", "scoreHome");
        dataTotal[7].total =
          total(data.headToHead, 16, "away", "scoreAway") +
          total(data.headToHead, 16, "home", "scoreHome");
        dataTotal[8].home = avg(data.headToHead, 16, "home", "scoreHome");
        dataTotal[8].away = avg(data.headToHead, 16, "away", "scoreAway");
        dataTotal[8].total =
          avg(data.headToHead, 16, "away", "scoreAway") * 2 +
          avg(data.headToHead, 16, "home", "scoreHome") * 2;
        dataTotal[9].home = avg(data.headToHead, 16, "away", "scoreAway");
        dataTotal[9].away = avg(data.headToHead, 16, "home", "scoreHome");
        dataTotal[9].total =
          avg(data.headToHead, 16, "away", "scoreAway") * 2 +
          avg(data.headToHead, 16, "home", "scoreHome") * 2;

        dataTotal[11].home = total(
          data.homeLastMatches,
          6,
          "home",
          "scoreHome"
        );
        dataTotal[11].away = total(
          data.awayLastMatches,
          6,
          "away",
          "scoreAway"
        );
        dataTotal[11].total =
          total(data.awayLastMatches, 6, "away", "scoreAway") +
          total(data.homeLastMatches, 6, "home", "scoreHome");
        dataTotal[12].home = total(
          data.homeLastMatches,
          6,
          "away",
          "scoreAway"
        );
        dataTotal[12].away = total(
          data.awayLastMatches,
          6,
          "home",
          "scoreHome"
        );
        dataTotal[12].total =
          total(data.homeLastMatches, 6, "away", "scoreAway") +
          total(data.awayLastMatches, 6, "home", "scoreHome");
        dataTotal[13].home = avg(data.homeLastMatches, 6, "home", "scoreHome");
        dataTotal[13].away = avg(data.awayLastMatches, 6, "away", "scoreAway");
        dataTotal[13].total =
          avg(data.awayLastMatches, 6, "away", "scoreAway") * 2 +
          avg(data.homeLastMatches, 6, "home", "scoreHome") * 2;
        dataTotal[14].home = avg(data.homeLastMatches, 6, "away", "scoreAway");
        dataTotal[14].away = avg(data.awayLastMatches, 6, "home", "scoreHome");
        dataTotal[14].total =
          avg(data.homeLastMatches, 6, "away", "scoreAway") * 2 +
          avg(data.awayLastMatches, 6, "home", "scoreHome") * 2;
      });
    }
  }, []);
  const toComparision = (data, count = data.length) => {
    let ex = {
      win2: 0,
      win1: 0,
      draw: 0,
      lose1: 0,
      lose2: 0,
    };
    data.map((item, index) => {
      if (index < count) {
        if (item.home === 1) {
          item.score >= 2
            ? ex.win2++
            : item.score === 1
            ? ex.win1++
            : item.score === 0
            ? ex.draw++
            : item.score === -1
            ? ex.lose1++
            : item.score <= -2
            ? ex.lose2++
            : "";
        } else {
          item.score >= 2
            ? ex.lose2++
            : item.score === 1
            ? ex.lose1++
            : item.score === 0
            ? ex.draw++
            : item.score === -1
            ? ex.win1++
            : item.score <= -2
            ? ex.win2++
            : "";
        }
      }
    });
    return ex;
  };
  const toHomeScore = (data, count = data.length) => {
    let home = {
      win: [],
      draw: 0,
      lose: [],
    };
    let away = {
      win: [],
      draw: 0,
      lose: [],
    };

    data.map((item, index) => {
      if (index < count) {
        if (item.home === 1) {
          item.score > 0
            ? home.win.push(item.score)
            : item.score === 0
            ? (home.draw = home.draw + 1)
            : home.lose.push(item.score);
        } else {
          item.score < 0
            ? away.win.push(item.score)
            : item.score === 0
            ? (away.draw = away.draw + 1)
            : away.lose.push(item.score);
        }
      }
    });
    return {
      home: home,
      away: away,
    };
  };
  return (
    <div
      id="teamTechDiv_analytics"
      className="content team-analytics data-history"
      style={{ backgroundColor: "white", padding: "20px 6px" }}
    >
      <h2 className="team-table-title text-sm sm:text-[25px]">
        Dữ liệu thống kê mùa giải này
      </h2>
      <div className="fx20">
        {/* desktop */}
        <ul className="stat">
          <h4>
            <span style={{ flex: "1" }}>Tổng </span>
            <b className="hidden lg:block">Stats</b>
            <span style={{ flex: "1" }}>Đội nhà/Đội khách</span>
          </h4>
          <div className="fx scoreComp !py-2 px-2 lg:!py-4">
            <div className="fx-div">
              <ul className="fx-tb-a">
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [
                      {dataHomeTotal.home?.win?.length +
                        dataHomeTotal.away?.win?.length}
                      ]{" "}
                      {parseInt(
                        ((dataHomeTotal.home?.win?.length +
                          dataHomeTotal.away?.win?.length) /
                          5) *
                          100
                      )}
                      %
                    </span>
                    <span>Thắng</span>
                    <span>
                      {parseInt(
                        ((dataAwayTotal.home?.win?.length +
                          dataAwayTotal.away?.win?.length) /
                          5) *
                          100
                      )}
                      % [
                      {dataAwayTotal.home?.win?.length +
                        dataAwayTotal.away?.win?.length}
                      ]
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          ((dataHomeTotal.home?.win?.length +
                            dataHomeTotal.away?.win?.length) /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          ((dataAwayTotal.home?.win?.length +
                            dataAwayTotal.away?.win?.length) /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeTotal.home?.draw + dataHomeTotal.away?.draw}]{" "}
                      {parseInt(
                        ((dataHomeTotal.home?.draw + dataHomeTotal.away?.draw) /
                          5) *
                          100
                      )}
                      %
                    </span>
                    <span>Hòa</span>
                    <span>
                      {((dataAwayTotal.home?.draw + dataAwayTotal.away?.draw) /
                        5) *
                        100}
                      % [{dataAwayTotal.home?.draw + dataAwayTotal.away?.draw}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          ((dataHomeTotal.home?.draw +
                            dataHomeTotal.away?.draw) /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          ((dataAwayTotal.home?.draw +
                            dataAwayTotal.away?.draw) /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [
                      {dataHomeTotal.home?.lose?.length +
                        dataHomeTotal.away?.lose?.length}
                      ]{" "}
                      {((dataHomeTotal.home?.lose?.length +
                        dataHomeTotal.away?.lose?.length) /
                        5) *
                        100}
                      %
                    </span>
                    <span>Thua</span>
                    <span>
                      {((dataAwayTotal.home?.lose?.length +
                        dataAwayTotal.away?.lose?.length) /
                        5) *
                        100}
                      % [
                      {dataAwayTotal.home?.lose?.length +
                        dataAwayTotal.away?.lose?.length}
                      ]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          ((dataHomeTotal.home?.lose?.length +
                            dataHomeTotal.away?.lose?.length) /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          ((dataAwayTotal.home?.lose?.length +
                            dataAwayTotal.away?.lose?.length) /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="fx-line" /> */}
          <div className="fx missComp !py-2 px-2 lg:!py-4">
            <div className="fx-div">
              <ul className="fx-tb-a">
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeTotal.home?.win?.length}]{" "}
                      {parseInt(
                        (dataHomeTotal.home?.win?.length /
                          (dataHomeTotal.home?.win?.length +
                            dataHomeTotal.home?.lose?.length +
                            dataHomeTotal.home?.draw)) *
                          100
                      )}
                      %
                    </span>
                    <span>Thắng</span>
                    <span>
                      {parseInt(
                        (dataAwayTotal.away?.win?.length /
                          (dataAwayTotal.away?.win?.length +
                            dataAwayTotal.away?.lose?.length +
                            dataAwayTotal.away?.draw)) *
                          100
                      )}
                      % [{dataAwayTotal.away?.win?.length}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeTotal.home?.win?.length /
                            (dataHomeTotal.home?.win?.length +
                              dataHomeTotal.home?.lose?.length +
                              dataHomeTotal.home?.draw)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayTotal.away?.win?.length /
                            (dataAwayTotal.away?.win?.length +
                              dataAwayTotal.away?.lose?.length +
                              dataAwayTotal.away?.draw)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeTotal.home?.draw}]{" "}
                      {parseInt(
                        (dataHomeTotal.home?.draw /
                          (dataHomeTotal.home?.win?.length +
                            dataHomeTotal.home?.lose?.length +
                            dataHomeTotal.home?.draw)) *
                          100
                      )}
                      %
                    </span>
                    <span>Hòa</span>
                    <span>
                      {" "}
                      {parseInt(
                        (dataAwayTotal.away?.draw /
                          (dataAwayTotal.away?.win?.length +
                            dataAwayTotal.away?.lose?.length +
                            dataAwayTotal.away?.draw)) *
                          100
                      )}
                      % [{dataAwayTotal.away?.draw}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeTotal.home?.draw /
                            (dataHomeTotal.home?.win?.length +
                              dataHomeTotal.home?.lose?.length +
                              dataHomeTotal.home?.draw)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayTotal.away?.draw /
                            (dataAwayTotal.away?.win?.length +
                              dataAwayTotal.away?.lose?.length +
                              dataAwayTotal.away?.draw)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeTotal.home?.lose?.length}]{" "}
                      {parseInt(
                        (dataHomeTotal.home?.lose?.length /
                          (dataHomeTotal.home?.win?.length +
                            dataHomeTotal.home?.lose?.length +
                            dataHomeTotal.home?.draw)) *
                          100
                      )}
                      %
                    </span>
                    <span>Thua</span>
                    <span>
                      {parseInt(
                        (dataAwayTotal.away?.lose?.length /
                          (dataAwayTotal.away?.win?.length +
                            dataAwayTotal.away?.lose?.length +
                            dataAwayTotal.away?.draw)) *
                          100
                      )}
                      % [{dataAwayTotal.away?.lose?.length}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeTotal.home?.lose?.length /
                            (dataHomeTotal.home?.win?.length +
                              dataHomeTotal.home?.lose?.length +
                              dataHomeTotal.home?.draw)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayTotal.away?.lose?.length /
                            (dataAwayTotal.away?.win?.length +
                              dataAwayTotal.away?.lose?.length +
                              dataAwayTotal.away?.draw)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ul>
        <ul className="stat">
          <h4>
            <b>Số ghi/mất bàn của đội nhà</b>
            <b>Số ghi/mất bàn của đội khách</b>
          </h4>
          {dataTotal.map((item, index) => (
            <li key={index} className="!p-0 w-full">
              <span className="stat-bar-wrapper homes !w-[110px] lg:!w-[320px]">
                <span
                  className="stat-bar fr"
                  style={{
                    width: `${(item.home * 50) / item.total}%`,
                  }}
                ></span>
                <span
                  className={`stat-c ${item.havePercent ? "havePercent" : ""}`}
                >
                  {item.home}
                </span>
              </span>
              <span
                className="stat-title !w-[80px] lg:!w-[140px]"
                style={item?.style}
              >
                {item.key}
              </span>
              <span className="stat-bar-wrapper aways !w-[110px] lg:!w-[320px]">
                <div
                  className="stat-bar fl"
                  style={{
                    width: `${(item.away / item.total) * 50}%`,
                  }}
                ></div>
                <span
                  className={`stat-c ${item.havePercent ? "havePercent" : ""}`}
                >
                  {item.away}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <ul className="stat">
          <h4>
            <b>Thống kê hiệu số bàn thắng</b>
          </h4>
          <div className="fx scoreComp !w-full lg:!w-[49%]">
            <div className="fx-div">
              <ul className="fx-tb-a">
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeScore.win2}]{" "}
                      {parseInt(
                        (dataHomeScore.win2 /
                          (dataHomeScore.win2 +
                            dataHomeScore.win1 +
                            dataHomeScore.draw +
                            dataHomeScore.lose1 +
                            dataHomeScore.lose2)) *
                          100
                      )}
                      %
                    </span>
                    <span>Thắng 2+</span>
                    <span>
                      {parseInt(
                        (dataAwayScore.win2 /
                          (dataAwayScore.win2 +
                            dataAwayScore.win1 +
                            dataAwayScore.draw +
                            dataAwayScore.lose1 +
                            dataAwayScore.lose2)) *
                          100
                      )}
                      % [{dataAwayScore.win2}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeScore.win2 /
                            (dataHomeScore.win2 +
                              dataHomeScore.win1 +
                              dataHomeScore.draw +
                              dataHomeScore.lose1 +
                              dataHomeScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayScore.win2 /
                            (dataAwayScore.win2 +
                              dataAwayScore.win1 +
                              dataAwayScore.draw +
                              dataAwayScore.lose1 +
                              dataAwayScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeScore.win1}]{" "}
                      {parseInt(
                        (dataHomeScore.win1 /
                          (dataHomeScore.win2 +
                            dataHomeScore.win1 +
                            dataHomeScore.draw +
                            dataHomeScore.lose1 +
                            dataHomeScore.lose2)) *
                          100
                      )}
                      %
                    </span>
                    <span>Thắng 1 trái</span>
                    <span>
                      {parseInt(
                        (dataAwayScore.win1 /
                          (dataAwayScore.win2 +
                            dataAwayScore.win1 +
                            dataAwayScore.draw +
                            dataAwayScore.lose1 +
                            dataAwayScore.lose2)) *
                          100
                      )}
                      % [{dataAwayScore.win1}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeScore.win1 /
                            (dataHomeScore.win2 +
                              dataHomeScore.win1 +
                              dataHomeScore.draw +
                              dataHomeScore.lose1 +
                              dataHomeScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayScore.win1 /
                            (dataAwayScore.win2 +
                              dataAwayScore.win1 +
                              dataAwayScore.draw +
                              dataAwayScore.lose1 +
                              dataAwayScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeScore.draw}]{" "}
                      {parseInt(
                        (dataHomeScore.draw /
                          (dataHomeScore.win2 +
                            dataHomeScore.win1 +
                            dataHomeScore.draw +
                            dataHomeScore.lose1 +
                            dataHomeScore.lose2)) *
                          100
                      )}
                      %
                    </span>
                    <span>Hòa</span>
                    <span>
                      {parseInt(
                        (dataAwayScore.draw /
                          (dataAwayScore.win2 +
                            dataAwayScore.win1 +
                            dataAwayScore.draw +
                            dataAwayScore.lose1 +
                            dataAwayScore.lose2)) *
                          100
                      )}
                      % [{dataAwayScore.draw}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeScore.draw /
                            (dataHomeScore.win2 +
                              dataHomeScore.win1 +
                              dataHomeScore.draw +
                              dataHomeScore.lose1 +
                              dataHomeScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayScore.draw /
                            (dataAwayScore.win2 +
                              dataAwayScore.win1 +
                              dataAwayScore.draw +
                              dataAwayScore.lose1 +
                              dataAwayScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="fx missComp !w-full lg:!w-[49%]">
            <div className="fx-div">
              <ul className="fx-tb-a">
                <li>
                  <div className="fx-tb-title">
                    <span>
                      [{dataHomeScore.lose1}]{" "}
                      {parseInt(
                        (dataHomeScore.lose1 /
                          (dataHomeScore.win2 +
                            dataHomeScore.win1 +
                            dataHomeScore.draw +
                            dataHomeScore.lose1 +
                            dataHomeScore.lose2)) *
                          100
                      )}
                      %
                    </span>
                    <span>Thua 1 trái</span>
                    <span>
                      {parseInt(
                        (dataAwayScore.lose1 /
                          (dataAwayScore.win2 +
                            dataAwayScore.win1 +
                            dataAwayScore.draw +
                            dataAwayScore.lose1 +
                            dataAwayScore.lose2)) *
                          100
                      )}
                      % [{dataAwayScore.lose1}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeScore.lose1 /
                            (dataHomeScore.win2 +
                              dataHomeScore.win1 +
                              dataHomeScore.draw +
                              dataHomeScore.lose1 +
                              dataHomeScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayScore.lose1 /
                            (dataAwayScore.win2 +
                              dataAwayScore.win1 +
                              dataAwayScore.draw +
                              dataAwayScore.lose1 +
                              dataAwayScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="fx-tb-title">
                    <span>
                      {" "}
                      [{dataHomeScore.lose2}]{" "}
                      {parseInt(
                        (dataHomeScore.lose2 /
                          (dataHomeScore.win2 +
                            dataHomeScore.win1 +
                            dataHomeScore.draw +
                            dataHomeScore.lose1 +
                            dataHomeScore.lose2)) *
                          100
                      )}
                      %
                    </span>
                    <span>Thua 2+</span>
                    <span>
                      {" "}
                      {parseInt(
                        (dataAwayScore.lose2 /
                          (dataAwayScore.win2 +
                            dataAwayScore.win1 +
                            dataAwayScore.draw +
                            dataAwayScore.lose1 +
                            dataAwayScore.lose2)) *
                          100
                      )}
                      % [{dataAwayScore.lose2}]{" "}
                    </span>
                  </div>
                  <div className="fx-td-data">
                    <div
                      className="home-bg"
                      style={{
                        width: `${
                          (dataHomeScore.lose2 /
                            (dataHomeScore.win2 +
                              dataHomeScore.win1 +
                              dataHomeScore.draw +
                              dataHomeScore.lose1 +
                              dataHomeScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="fx-td-data guest">
                    <div
                      className="away-bg"
                      style={{
                        width: `${
                          (dataAwayScore.lose2 /
                            (dataAwayScore.win2 +
                              dataAwayScore.win1 +
                              dataAwayScore.draw +
                              dataAwayScore.lose1 +
                              dataAwayScore.lose2)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
