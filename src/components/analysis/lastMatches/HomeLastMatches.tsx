//@ts-nocheck
import React, { useEffect, useState } from "react";
import {  Select, Table } from "antd";
import { useRouter } from "next/router";
import moment from "moment";

export const HomeLastMatches = ({ matchAnalysis, matche, teamData }) => {
  const router = useRouter();
  const [homeLastMatches, setHomeLastMatches] = useState([]);
  const [storageHomeLastMatches, setStorageHomeLastMatches] = useState([]);
  const [isInitialHandicap, setIsInitialHandicap] = useState(true);
  const [isInstant, setIsInstant] = useState(true);
  const [totalMatche, setTotalMatche] = useState(0);
  const [win, setWin] = useState(0);
  const [draw, setDraw] = useState(0);
  const [lose, setLose] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [oddsOfWinning, setOddsOfWinning] = useState(0);
  const [ratioOfFinance, setRatioOfFinance] = useState(0);
  const [listMactes, setListMactes] = useState([]);

  const columns = [
    {
      title: (
        <>
          <div className="recent-achievement-header-home">
            <div style={{ paddingTop: "3px" }}>
              <a style={{ paddingRight: "12px", color: "#fff" }}>
                {matche?.team_home_name}
              </a>
              {/* <Checkbox>
                <a style={{ color: "#fff" }}>H-A Same</a>
              </Checkbox>
              <Checkbox>
                <a style={{ color: "#fff" }}>IND BLR SD</a>
              </Checkbox>
              <Checkbox>
                <a style={{ color: "#fff" }}>HT</a>
              </Checkbox> */}
              <Select
                suffixIcon={<i className="arrow down"></i>}
                placeholder={`${totalMatche} trận gần đây`}
                dropdownStyle={{ width: 120, color: "#000 !important" }}
                onChange={(e) => handleChange(e)}
                options={listMactes}
              />
            </div>
          </div>
        </>
      ),
      width: 100,
      fixed: "center",
      children: [
        {
          title: "Giải đấu",
          width: 150,
          className: "text-header",
          render: (value) => (
            <div style={{ color: "black" }}>{value?.league}</div>
          ),
        },
        {
          title: "Ngày",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>
              {moment.unix(value?.matchTime).format("DD/MM/YYYY")}
            </div>
          ),
        },
        {
          title: "Chủ",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.home?.homeName}</div>
          ),
        },
        {
          title: "Tỷ số",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>
              {value?.home?.scoreHome}-{value?.away?.scoreAway}
            </div>
          ),
        },
        {
          title: "Phạt góc",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>
              {value?.home?.homeCorner}-{value?.away?.awayCorner}
            </div>
          ),
        },
        {
          title: "Khách",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.away?.awayName}</div>
          ),
        },
        {
          title: (
            <>
              <Select
                suffixIcon={<i className="arrow down"></i>}
                placeholder="Crown's"
                style={{ width: 100 }}
                options={[
                  {
                    value: "Crown's",
                  },
                ]}
              />
              <span> </span>
              <Select
                suffixIcon={<i className="arrow down"></i>}
                placeholder="Ban đầu"
                style={{ width: 100 }}
                onChange={(e) => handleChangeMatchInitial(e)}
                options={[
                  {
                    value: 1,
                    label: "Ban đầu",
                  },
                  {
                    value: 2,
                    label: "Kết thúc",
                  },
                ]}
              />
            </>
          ),
          width: 150,
          children: [
            {
              title: "Chủ",
              width: 150,
              className: "text-header-children-uk",
              render: (value) => (
                <div style={{ color: "black" }}>
                  {isInstant ? value?.initialHome : value?.instantHome}
                </div>
              ),
            },
            {
              title: "Hòa",
              width: 150,
              className: "text-header-children-uk",
              render: (value) => (
                <div style={{ color: "black" }}>
                  {isInstant ? value?.initialDraw : value?.instantDraw}
                </div>
              ),
            },
            {
              title: "Khách",
              width: 150,
              className: "text-header-children-uk",
              render: (value) => (
                <div style={{ color: "black" }}>
                  {isInstant ? value?.initialAway : value?.instantAway}
                </div>
              ),
            },
          ],
        },
        {
          title: (
            <>
              <Select
                suffixIcon={<i className="arrow down"></i>}
                placeholder="Crown's"
                style={{ width: 100 }}
                options={[
                  {
                    value: "Crown's",
                  },
                ]}
              />
              <span> </span>
              <Select
                suffixIcon={<i className="arrow down"></i>}
                placeholder="Ban đầu"
                style={{ width: 100 }}
                onChange={(e) => handleChangeMatchHandicap(e)}
                options={[
                  {
                    value: 1,
                    label: "Ban đầu",
                  },
                  {
                    value: 2,
                    label: "Kết thúc",
                  },
                ]}
              />
            </>
          ),
          width: 300,
          children: [
            {
              title: "Chủ",
              width: 150,
              className: "text-header-children-uk",
              render: (value) => (
                <div style={{ color: "black" }}>
                  {isInitialHandicap
                    ? value?.initialHandicapHome
                    : value?.instantHandicapHome}
                </div>
              ),
            },
            {
              title: "HDP",
              width: 150,
              className: "text-header-children-uk",
              render: (value) => (
                <div style={{ color: "black" }}>
                  {isInitialHandicap
                    ? value?.initialHandicap
                    : value?.instantHandicap}
                </div>
              ),
            },
            {
              title: "Khách",
              width: 150,
              className: "text-header-children-uk",
              render: (value) => (
                <div style={{ color: "black" }}>
                  {isInitialHandicap
                    ? value?.initialHandicapAway
                    : value?.instantHandicapAway}
                </div>
              ),
            },
          ],
        },
        {
          title: "T/B",
          align: "center",
          width: 150,
          render: (value) => (
            <>
              {value.home.scoreHome === value.away.scoreAway ? (
                <div style={{ backgroundColor: "#348ce2" }}>
                  <span style={{ color: "#fff" }}>H</span>
                </div>
              ) : value.home.scoreHome > value.away.scoreAway ? (
                <div style={{ backgroundColor: "green" }}>
                  <span style={{ color: "#fff" }}>T</span>
                </div>
              ) : (
                <div style={{ backgroundColor: "red" }}>
                  <span style={{ color: "#fff" }}>B</span>
                </div>
              )}
            </>
          ),
        },
        {
          title: "HDP",
          align: "center",
          width: 150,
          render: (value) => (
            <>
              {isInitialHandicap ? (
                value.home.scoreHome ===
                value.away.scoreAway + value.initialHandicap ? (
                  <div style={{ backgroundColor: "#348ce2" }}>
                    <span style={{ color: "#fff" }}>H</span>
                  </div>
                ) : value.home.scoreHome >
                  value.away.scoreAway + value.initialHandicap ? (
                  <div style={{ backgroundColor: "green" }}>
                    <span style={{ color: "#fff" }}>T</span>
                  </div>
                ) : (
                  <div style={{ backgroundColor: "red" }}>
                    <span style={{ color: "#fff" }}>X</span>
                  </div>
                )
              ) : value.home.scoreHome ===
                value.away.scoreAway + value.instantHandicap ? (
                <div style={{ backgroundColor: "#348ce2" }}>
                  <span style={{ color: "#fff" }}>H</span>
                </div>
              ) : value.home.scoreHome >
                value.away.scoreAway + value.instantHandicap ? (
                <div style={{ backgroundColor: "green" }}>
                  <span style={{ color: "#fff" }}>T</span>
                </div>
              ) : (
                <div style={{ backgroundColor: "red" }}>
                  <span style={{ color: "#fff" }}>X</span>
                </div>
              )}
            </>
          ),
        },
        {
          title: "T/X",
          align: "center",
          width: 150,
          render: (value) => (
            <>
              {isInitialHandicap ? (
                value.home.scoreHome ===
                value.away.scoreAway + value.initialTotal ? (
                  <div style={{ backgroundColor: "#348ce2" }}>
                    <span style={{ color: "#fff" }}>H</span>
                  </div>
                ) : value.home.scoreHome >
                  value.away.scoreAway + value.initialTotal ? (
                  <div style={{ backgroundColor: "green" }}>
                    <span style={{ color: "#fff" }}>T</span>
                  </div>
                ) : (
                  <div style={{ backgroundColor: "red" }}>
                    <span style={{ color: "#fff" }}>X</span>
                  </div>
                )
              ) : value.home.scoreHome ===
                value.away.scoreAway + value.instantTotal ? (
                <div style={{ backgroundColor: "#348ce2" }}>
                  <span style={{ color: "#fff" }}>H</span>
                </div>
              ) : value.home.scoreHome >
                value.away.scoreAway + value.instantTotal ? (
                <div style={{ backgroundColor: "green" }}>
                  <span style={{ color: "#fff" }}>T</span>
                </div>
              ) : (
                <div style={{ backgroundColor: "red" }}>
                  <span style={{ color: "#fff" }}>X</span>
                </div>
              )}
            </>
          ),
        },
      ],
    },
  ];

  const Footer = () => {
    return (
      <>
        <span style={{ color: "#000" }}>
          Thethao789 thống kê
          <span className="test-collor"> {totalMatche} </span>
          trận gần đây, thắng {win}, hòa {draw}, thua {lose}. Tỷ lệ thắng:
          <span className="test-collor"> {winRate}% </span>
          Tỷ lệ thắng kèo:
          <span className="test-collor"> {oddsOfWinning}% </span>
          Tỷ lệ Tài:
          <span className="test-collor"> {ratioOfFinance}% </span>
        </span>
      </>
    );
  };

  const handleChange = (event) => {
    let data = storageHomeLastMatches;
    let listHomeLastMatches = data.slice(0, event);
    setHomeLastMatches(listHomeLastMatches);
    calculate(listHomeLastMatches);
  };

  const handleChangeMatchHandicap = (event) => {
    if (event == 1) {
      setIsInitialHandicap(true);
    } else {
      setIsInitialHandicap(false);
    }
  };

  const handleChangeMatchInitial = (event) => {
    if (event == 1) {
      setIsInstant(true);
    } else {
      setIsInstant(false);
    }
  };

  const getHomeLastMatches = async () => {
    // const response = await axios.get(
    //   `${ip}/website/matches/teamData/${router.query?.pid}`
    // );
    // let data = response && response.data.homeLastMatches;
    let data = matchAnalysis?.homeLastMatches;
    //thêm danh sách trận dropdown
    let listMatchDropdow = [];
    data?.forEach((item, index) => {
      let itemMatchDropdow = {
        value: index + 1,
        label: index + 1 + " trận gần",
      };
      listMatchDropdow.push(itemMatchDropdow);
    });
    setListMactes(listMatchDropdow);
    setHomeLastMatches(data);
    setStorageHomeLastMatches(data);
    calculate(data);
  };

  const calculate = (listMatch) => {
    let totalMatche = listMatch?.length;
    let win = 0;
    let draw = 0;
    let lose = 0;
    let numberOddsOfWinning = 0;
    let numberRatioOfFinance = 0;
    //tính thắng, thua, hòa
    listMatch?.forEach((item) => {
      if (item.home.scoreHome > item.away.scoreAway) {
        win = win + 1;
      } else if (item.home.scoreHome === item.away.scoreAway) {
        draw = draw + 1;
      } else {
        lose = lose + 1;
      }
    });
    //tỷ lệ thắng
    let winRate = (win * 100) / totalMatche;
    //Tỷ lệ thắng kèo
    listMatch?.forEach((item) => {
      if (item.home.scoreHome > item.away.scoreAway + item.instantHandicap) {
        numberOddsOfWinning = numberOddsOfWinning + 1;
      }
    });
    let oddsOfWinning = (numberOddsOfWinning * 100) / totalMatche;
    //Tỷ lệ thắng kèo
    listMatch?.forEach((item) => {
      if (item.home.scoreHome > item.away.scoreAway + item.instantTotal) {
        numberRatioOfFinance = numberRatioOfFinance + 1;
      }
    });
    let ratioOfFinance = (numberRatioOfFinance * 100) / totalMatche;

    setTotalMatche(totalMatche);
    setWin(win);
    setDraw(draw);
    setLose(lose);
    setWinRate(winRate);
    setOddsOfWinning(oddsOfWinning);
    setRatioOfFinance(ratioOfFinance);
  };

  useEffect(() => {
    if (router.query?.pid) getHomeLastMatches();
  }, [router.asPath]);
  return (
    <Table
      columns={columns}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      dataSource={homeLastMatches}
      bordered
      style={{ color: "black" }}
      size="small"
      pagination={false}
      footer={() => Footer()}
    />
  );
};
