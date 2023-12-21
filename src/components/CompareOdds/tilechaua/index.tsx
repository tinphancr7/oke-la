//@ts-nocheck
import { Table } from "antd";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";

const handicapKeys = [
  "matchId",
  "companyId",
  "initialHandicap",
  "initialHome",
  "initialAway",
  "instantHandicap",
  "instantHome",
  "instantAway",
  "maintenance",
  "inPlay",
  "changeTime",
  "close",
  "OddsType",
];
const AsiaRatio = ({ oddList }) => {
  const [oddListMap, setOddListMap] = useState([]);

  useEffect(() => {
    const list = oddList?.map((item) => {
      const newHandicap: {
        [key: string]: any;
      } = {};
      handicapKeys.forEach(
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
      render: (value) => {
        return <div style={{ color: "black" }}>{companyList[value]}</div>;
      },
    },
    {
      title: "Sớm",
      children: [
        {
          title: "Chủ",
          width: 150,
          dataIndex: "initialHome",
          key: "host",
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>{value}</div>
              {/* {compareStringFloatOdds(
                value?.[0]?.initialHome,
                value?.[0]?.instantHome
              )} */}
            </div>
          ),
        },
        {
          title: "HDP",
          dataIndex: "initialHandicap",
          key: "HDP",
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
          title: "Khách",
          dataIndex: "initialAway",
          key: "guest",
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
          title: "Chủ",
          dataIndex: "handicap",
          key: "host",
          width: 150,
          render: (_, record) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialOver} */}
              </div>
              {compareStringFloatOdds(record?.initialHome, record?.instantHome)}
            </div>
          ),
        },
        {
          title: "HDP",
          dataIndex: "handicap",
          key: "HDP",
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
          title: "Khách",
          dataIndex: "handicap",
          key: "guest",
          width: 150,
          render: (_, record) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialUnder} */}
              </div>
              {compareStringFloatOdds(record?.initialAway, record?.instantAway)}
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="oddDowns">{instant} </div>
            <HiOutlineArrowSmDown size={16} style={{ color: "red" }} />
          </div>
        );
      } else if (a == b) {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {instant}{" "}
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {instant}{" "}
            </div>
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

export default AsiaRatio;
