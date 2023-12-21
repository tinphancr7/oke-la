//@ts-nocheck
import { Table } from "antd";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";

const overUnderKeys = [
  "matchId",
  "companyId",
  "initialHandicap",
  "initialOver",
  "initialUnder",
  "instantHandicap",
  "instantOver",
  "instantUnder",
  "changeTime",
  "close",
  "OddsType",
];

const RateOfFortune = ({ oddList }) => {
  const [oddListMap, setOddListMap] = useState([]);

  useEffect(() => {
    const list = oddList?.map((item) => {
      const newHandicap: {
        [key: string]: any;
      } = {};
      overUnderKeys.forEach(
        (key, index) => (newHandicap[key] = item?.split(",")[index])
      );
      return newHandicap;
    });

    setOddListMap(list);
  }, [oddList]);
  const companyList = {
    1: "Macauslot",
    3: "Crown",
    4: "Ladbrokes",
    8: "Bet365",
    9: "William Hill",
    12: "Easybets",
    14: "Vcbet",
    17: "Mansion88",
    19: "Interwette",
    22: "10BET",
    23: "188bet",
    24: "12bet",
    31: "Sbobet",
    35: "Wewbet",
    42: "18bet",
    47: "Pinnacle",
    48: "HK Jockey Club",
  };

  const columns = [
    {
      title: "Công ty",
      dataIndex: "companyId",
      key: "companyId",
      width: 100,
      fixed: "center",
      render: (value) => (
        <div style={{ color: "black" }}>{companyList[value]}</div>
      ),
    },
    {
      title: "Sớm",
      children: [
        {
          title: "Tài",
          width: 150,
          dataIndex: "initialOver",
          key: "initialOver",
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>{value}</div>
              {/* {compareStringFloatOdds(
                value?.[0]?.initialOver,
                value?.[0]?.instantOver
              )} */}
            </div>
          ),
        },
        {
          title: "Kèo đấu",
          dataIndex: "initialHandicap",
          key: "initialHandicap",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>{value}</div>
              {/* {compareStringFloatOdds(
                value?.[0]?.initialHandicap,
                value?.[0]?.instantHandicap
              )} */}
            </div>
          ),
        },
        {
          title: "Xỉu",
          dataIndex: "initialUnder",
          key: "initialUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>{value}</div>
              {/* {compareStringFloatOdds(
                value?.[0]?.initialAway,
                value?.[0]?.instantAway
              )} */}
            </div>
          ),
        },
      ],
    },
    {
      title: "Live",
      children: [
        {
          title: "Tài",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (_, record) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialOver} */}
              </div>
              {compareStringFloatOdds(record?.initialOver, record?.instantOver)}
            </div>
          ),
        },
        {
          title: "Kèo đấu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (_, record) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialHandicap} */}
              </div>
              {compareStringFloatOdds(
                record?.initialHandicap,
                record?.instantHandicap
              )}
            </div>
          ),
        },
        {
          title: "Xỉu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (_, record) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialUnder} */}
              </div>
              {compareStringFloatOdds(
                record?.initialUnder,
                record?.instantUnder
              )}
            </div>
          ),
        },
      ],
    },
    // {
    //   title: "Xem thêm",
    //   width: 130,
    //   render: () => {
    //     return (
    //       <div className="seeMore">
    //         <CgSearch size={24} />
    //       </div>
    //     );
    //   },
    // },
  ];
  const compareStringFloatOdds = (initial, instant) => {
    if (initial !== undefined) {
      let a = parseFloat(initial).toFixed(2);
      let b = parseFloat(instant).toFixed(2);
      if (a > b) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="oddDowns">{instant} </div>
            <HiOutlineArrowSmDown size={16} style={{ color: "red" }} />
          </div>
        );
      } else if (a == b) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="oddUp">{instant} </div>
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="oddUp">{instant} </div>
            <HiOutlineArrowSmUp
              size={16}
              style={{ color: "green", marginLeft: "2px" }}
            />
          </div>
        );
      }
    }
  };
  return (
    <Table
      columns={columns}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      dataSource={oddListMap}
      bordered
      style={{ color: "black" }}
      size="small"
      pagination={false}
      scroll={{ x: 1000}}
    />
  );
};
export default RateOfFortune;
