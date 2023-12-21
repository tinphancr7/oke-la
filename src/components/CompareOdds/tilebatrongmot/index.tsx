//@ts-nocheck
import { Table } from "antd";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";

const ThreeInOneRatio = ({ oddListImport }) => {
  const [oddList, setOddList] = useState([]);
  const getMatcheOdds = async () => {
    let odds = oddListImport;
    let listCompany = [];
    odds.forEach((item) => {
      let itemCompany = {
        value: item.key,
        label: item.company,
        isCheck: true,
      };
      listCompany.push(itemCompany);
    });
    const rs = odds.filter((item) => {
      if (
        item?.handicap.length > 0 ||
        item?.europeOdds.length > 0 ||
        item?.overUnder.length > 0
      ) {
        return item;
      }
    });
    setListCompany(listCompany);
    setOddList(rs);
    setStorageOdd(odds);
  };
  useEffect(() => {
    getMatcheOdds();
  }, [oddListImport]);
  const columns = [
    {
      title: "Công ty",
      dataIndex: "company",
      key: "company",
      width: 100,
      fixed: "center",
      render: (value) => <div style={{ color: "black" }}>{value}</div>,
    },
    {
      title: "Tỷ lệ Châu Á",
      children: [
        {
          title: "Chủ",
          width: 150,
          dataIndex: "handicap",
          render: (value) => {
            return (
              <div className="result">
                <div style={{ width: "60%", textAlign: "right" }}>
                  {value?.[0]?.["initialHome"]}
                </div>

                {compareStringFloatOdds(
                  value?.[0]?.initialHome,
                  value?.[0]?.instantHome
                )}
              </div>
            );
          },
        },

        {
          title: "HDP",
          dataIndex: "handicap",
          key: "HDP",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialHandicap}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialHandicap,
                value?.[0]?.instantHandicap
              )}
            </div>
          ),
        },
        {
          title: "Khách",
          dataIndex: "handicap",
          key: "guest",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialAway}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialAway,
                value?.[0]?.instantAway
              )}
            </div>
          ),
        },
      ],
    },
    {
      title: "Tỉ lệ tài xỉu",
      children: [
        {
          title: "Tài",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialOver}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialOver,
                value?.[0]?.instantOver
              )}
            </div>
          ),
        },
        {
          title: "Kèo đấu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialHandicap}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialHandicap,
                value?.[0]?.instantHandicap
              )}
            </div>
          ),
        },
        {
          title: "Xỉu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialUnder}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialUnder,
                value?.[0]?.instantUnder
              )}
            </div>
          ),
        },
      ],
    },
    {
      title: "1X2",
      children: [
        {
          title: "Chủ",
          dataIndex: "europeOdds",
          key: "europeOdds",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialHome}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialHome,
                value?.[0]?.instantHome
              )}
            </div>
          ),
        },
        {
          title: "Hòa",
          dataIndex: "europeOdds",
          key: "europeOdds",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialDraw}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialDraw,
                value?.[0]?.instantDraw
              )}
            </div>
          ),
        },
        {
          title: "Khách",
          dataIndex: "europeOdds",
          key: "europeOdds",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialAway}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialAway,
                value?.[0]?.instantAway
              )}
            </div>
          ),
        },
      ],
    },
    {
      title: "Xem thêm",
      width: 130,
      render: () => {
        return (
          <div className="seeMore">
            <CgSearch size={24} />
          </div>
        );
      },
    },
  ];
  const compareStringFloatOdds = (initial, instant) => {
    if (initial !== undefined) {
      let a = parseFloat(initial).toFixed(2);
      let b = parseFloat(instant).toFixed(2);
      if (a > b) {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="oddDowns">{instant} </div>
            <HiOutlineArrowSmDown size={16} style={{ color: "red" }} />
          </div>
        );
      } else if (a == b) {
        return (
          <div className="customOddUp">
            <div className="oddUp" style={{ width: "60%", textAlign: "right" }}>
              {instant}{" "}
            </div>
          </div>
        );
      } else {
        return (
          <div className="customOddUp">
            <div
              className="oddUp"
              style={{ width: "60%", textAlign: "right", color: "green" }}
            >
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
      dataSource={oddList}
      // dataSource={[]}
      bordered
      style={{ color: "black" }}
      size="small"
      pagination={false}
    />
  );
};
export default ThreeInOneRatio;
