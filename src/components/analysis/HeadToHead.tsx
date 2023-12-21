//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Checkbox, Select, Table } from "antd";
import { useRouter } from "next/router";
import moment from "moment";

export const HeadToHead = ({
  matche,
  matchAnalysis,
}: {
  matche: any;
  matchAnalysis: any;
}) => {
  const router = useRouter();
  const [headToHead, setHeadToHead] = useState([]);
  const [storageHeadToHead, setStorageHeadToHead] = useState([]);

  const [isInitialHandicap, setIsInitialHandicap] = useState(true);
  const [isInstant, setIsInstant] = useState(true);
  const [totalMatche, setTotalMatche] = useState(0);
  const [win, setWin] = useState(0);
  const [draw, setDraw] = useState(0);
  const [lose, setLose] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [oddsOfWinning, setOddsOfWinning] = useState(0);
  const [ratioOfFinance, setRatioOfFinance] = useState(0);
  const [listMactes, setListMactes] = useState<any[]>([]);

  const columns = [
    {
      title: (
        <>
          <div className="head-to-head-header">
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
          render: (value: any) => (
            <div style={{ color: "black" }}>{value?.league}</div>
          ),
        },
        {
          title: "Ngày",
          width: 150,
          render: (value: any) => (
            <div style={{ color: "black" }}>
              {moment.unix(value?.matchTime).format("DD/MM/YYYY")}
            </div>
          ),
        },
        {
          title: "Chủ",
          width: 150,
          render: (value: any) => (
            <div style={{ color: "black" }}>{value?.home?.homeName}</div>
          ),
        },
        {
          title: "Tỷ số",
          width: 150,
          render: (value: any) => (
            <div style={{ color: "black" }}>
              {value?.home?.scoreHome}-{value?.away?.scoreAway}
            </div>
          ),
        },
        {
          title: "Phạt góc",
          width: 150,
          render: (value: any) => (
            <div style={{ color: "black" }}>
              {value?.home?.homeCorner}-{value?.away?.awayCorner}
            </div>
          ),
        },
        {
          title: "Khách",
          width: 150,
          render: (value: any) => (
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
              render: (value: any) => (
                <div style={{ color: "black" }}>
                  {isInstant ? value?.initialHome : value?.instantHome}
                </div>
              ),
            },
            {
              title: "Hòa",
              width: 150,
              className: "text-header-children-uk",
              render: (value: any) => (
                <div style={{ color: "black" }}>
                  {isInstant ? value?.initialDraw : value?.instantDraw}
                </div>
              ),
            },
            {
              title: "Khách",
              width: 150,
              className: "text-header-children-uk",
              render: (value: any) => (
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
              render: (value: any) => (
                <div style={{ color: "black" }}>
                  {isInitialHandicap
                    ? value?.initialHandicapHome
                    : value?.instantHandicapHome}
                </div>
              ),
            },
            {
              title: "HDP",
              align: "center",
              width: 150,
              className: "text-header-children-uk",
              render: (value: any) => (
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
              render: (value: any) => (
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
          render: (value: any) => (
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
          width: 150,
          align: "center",
          render: (value: any) => (
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
          render: (value: any) => (
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
          okchoi.com thống kê
          <span className="test-collor"> {totalMatche} </span>
          trận gần đây, thắng {win}, hòa {draw}, thua {lose}. Tỷ lệ thắng:
          <span className="test-collor">
            {" "}
            {winRate.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %{" "}
          </span>
          Tỷ lệ thắng kèo:
          <span className="test-collor">
            {" "}
            {oddsOfWinning.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %{" "}
          </span>
          Tỷ lệ Tài:
          <span className="test-collor">
            {" "}
            {ratioOfFinance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %{" "}
          </span>
        </span>
      </>
    );
  };

  const handleChange = async (event: any) => {
    let data = storageHeadToHead;
    let listHeadToHead = data.slice(0, event);
    setHeadToHead(listHeadToHead);
    calculate(listHeadToHead);
  };

  const handleChangeMatchHandicap = (event: any) => {
    if (event == 1) {
      setIsInitialHandicap(true);
    } else {
      setIsInitialHandicap(false);
    }
  };

  const handleChangeMatchInitial = (event: any) => {
    if (event == 1) {
      setIsInstant(true);
    } else {
      setIsInstant(false);
    }
  };

  const getHeadToHead = async () => {
    // const response = await axios.get(
    //   `${ip}/website/matches/teamData/${router.query?.pid}`
    // );

    let data = matchAnalysis?.headToHead?.sort(
      (a: any, b: any) => b.matchTime - a.matchTime
    );
    //thêm danh sách trận dropdown
    let listMatchDropdow: any[] = [];
    data?.forEach((item: any, index: number) => {
      let itemMatchDropdow = {
        value: index + 1,
        label: index + 1 + " trận gần",
      };
      listMatchDropdow.push(itemMatchDropdow);
    });

    setListMactes(listMatchDropdow);
    setHeadToHead(data);
    setStorageHeadToHead(data);
    calculate(data);
  };

  const calculate = (listMatch: any) => {
    let totalMatche = listMatch?.length;
    let win = 0;
    let draw = 0;
    let lose = 0;
    let numberOddsOfWinning = 0;
    let numberRatioOfFinance = 0;
    //tính thắng, thua, hòa
    listMatch?.forEach((item: any) => {
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
    listMatch?.forEach((item: any) => {
      if (item.home.scoreHome > item.away.scoreAway + item.instantHandicap) {
        numberOddsOfWinning = numberOddsOfWinning + 1;
      }
    });
    let oddsOfWinning = (numberOddsOfWinning * 100) / totalMatche;
    //Tỷ lệ thắng kèo
    listMatch?.forEach((item: any) => {
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
    getHeadToHead();
  }, [router.asPath]);


  return (
    <div className="compare-odds">
      {headToHead && Object?.keys(headToHead)?.length > 0 && (
        <>
          <h2 className="team-table-title text-sm sm:text-[25px]">
            Thành tích đối đầu
          </h2>
          <div className="hidden md:block">
            <Table
              //@ts-ignore
              columns={columns}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={headToHead}
              bordered
              style={{ color: "black" }}
              size="small"
              pagination={false}
              footer={() => Footer()}
            />
          </div>
          <div className="block md:hidden">
            <table className="w-full border border-gray-300 table-fixed">
              <colgroup>
                <col style={{ width: "14%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-xs text-center border-b">Ngày</th>
                  <th className="p-2 text-xs text-center border-b">Chủ</th>
                  <th className="p-2 text-xs text-center border-b">Tỷ số</th>
                  <th className="p-2 text-xs text-center border-b">Khách</th>
                  <th className="p-2 text-xs text-center border-b">T/B</th>
                  <th className="p-2 text-xs text-center border-b">HDP</th>
                  <th className="p-2 text-xs text-center border-b">T/X</th>
                </tr>
              </thead>
              <tbody>
                {headToHead &&
                  Object?.keys(headToHead)?.length > 0 &&
                  headToHead.map((item, index) => (
                    <tr key={index}>
                      <td className="text-[10px] text-center border-b ">
                        {moment.unix(item?.matchTime).format("DD/MM/YYYY")}
                      </td>
                      <td className="p-2 text-[10px] text-center border-b">
                        {item.home.homeName}
                      </td>
                      <td className="p-2 text-[10px] text-center border-b">
                        {item.home.scoreHome} - {item.away.scoreAway}
                      </td>
                      <td className="p-2 text-[10px] text-center border-b">
                        {item.away.awayName}
                      </td>
                      <td className="p-2 text-[10px] text-center border-b">
                        {item.home.scoreHome === item.away.scoreAway ? (
                          <div style={{ backgroundColor: "#348ce2" }}>
                            <span style={{ color: "#fff" }}>H</span>
                          </div>
                        ) : item.home.scoreHome > item.away.scoreAway ? (
                          <div style={{ backgroundColor: "green" }}>
                            <span style={{ color: "#fff" }}>T</span>
                          </div>
                        ) : (
                          <div style={{ backgroundColor: "red" }}>
                            <span style={{ color: "#fff" }}>B</span>
                          </div>
                        )}
                      </td>
                      <td className="p-2 text-xs text-center border-b">
                        {isInitialHandicap ? (
                          item.home.scoreHome ===
                          item.away.scoreAway + item.initialHandicap ? (
                            <div style={{ backgroundColor: "#348ce2" }}>
                              <span style={{ color: "#fff" }}>H</span>
                            </div>
                          ) : item.home.scoreHome >
                            item.away.scoreAway + item.initialHandicap ? (
                            <div style={{ backgroundColor: "green" }}>
                              <span style={{ color: "#fff" }}>T</span>
                            </div>
                          ) : (
                            <div style={{ backgroundColor: "red" }}>
                              <span style={{ color: "#fff" }}>X</span>
                            </div>
                          )
                        ) : item.home.scoreHome ===
                          item.away.scoreAway + item.instantHandicap ? (
                          <div style={{ backgroundColor: "#348ce2" }}>
                            <span style={{ color: "#fff" }}>H</span>
                          </div>
                        ) : item.home.scoreHome >
                          item.away.scoreAway + item.instantHandicap ? (
                          <div style={{ backgroundColor: "green" }}>
                            <span style={{ color: "#fff" }}>T</span>
                          </div>
                        ) : (
                          <div style={{ backgroundColor: "red" }}>
                            <span style={{ color: "#fff" }}>X</span>
                          </div>
                        )}
                      </td>
                      <td className="p-2 text-xs text-center border-b">
                        {" "}
                        {isInitialHandicap ? (
                          item.home.scoreHome ===
                          item.away.scoreAway + item.initialTotal ? (
                            <div style={{ backgroundColor: "#348ce2" }}>
                              <span style={{ color: "#fff" }}>H</span>
                            </div>
                          ) : item.home.scoreHome >
                            item.away.scoreAway + item.initialTotal ? (
                            <div style={{ backgroundColor: "green" }}>
                              <span style={{ color: "#fff" }}>T</span>
                            </div>
                          ) : (
                            <div style={{ backgroundColor: "red" }}>
                              <span style={{ color: "#fff" }}>X</span>
                            </div>
                          )
                        ) : item.home.scoreHome ===
                          item.away.scoreAway + item.instantTotal ? (
                          <div style={{ backgroundColor: "#348ce2" }}>
                            <span style={{ color: "#fff" }}>H</span>
                          </div>
                        ) : item.home.scoreHome >
                          item.away.scoreAway + item.instantTotal ? (
                          <div style={{ backgroundColor: "green" }}>
                            <span style={{ color: "#fff" }}>T</span>
                          </div>
                        ) : (
                          <div style={{ backgroundColor: "red" }}>
                            <span style={{ color: "#fff" }}>X</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
