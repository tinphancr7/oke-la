// @ts-nocheck
import { Table } from "antd";
import React, { useMemo } from "react";
import { CgSearch } from "react-icons/cg";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";

const getLongestArray = (listArray: any[]) => {
  let max = 0;
  let indexMax = 0;

  listArray?.forEach((arr, index) => {
    if (arr?.length > max) {
      (max = arr?.length), (indexMax = index);
    }
  });

  return listArray?.[indexMax] || [];
};

type Props = {
  match: any;
  type: "ft" | "ht";
};

function ThreeInOneOdd({ match, type }: Props) {
  const data = useMemo(() => {
    const companyIds = [];
    const result = [];
    getLongestArray([
      match?.handicap || [],
      match?.europeOdds || [],
      match?.overUnder || [],
    ])?.forEach((oddString: string) => {
      companyIds?.push(oddString?.split(",")?.[1]);
    });

    companyIds?.forEach((id) => {
      const handicap =
        type === "ft"
          ? match?.handicap?.find((odd) => odd?.split(",")?.[1] === id) || ""
          : match?.handicapHalf?.find((odd) => odd?.split(",")?.[1] === id) ||
            "";

      const europeOdds =
        match?.europeOdds?.find((odd) => odd?.split(",")?.[1] === id) || "";

      const overUnder =
        type === "ft"
          ? match?.overUnder?.find((odd) => odd?.split(",")?.[1] === id) || ""
          : match?.overUnderHalf?.find((odd) => odd?.split(",")?.[1] === id) ||
            "";

      result.push({
        companyId: id,
        handicap,
        europeOdds,
        overUnder,
      });
    });

    return result;
  }, [match, type]);

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
            <div className="oddUp">{instant} </div>
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="oddUp">{instant} </div>
            <HiOutlineArrowSmUp size={16} style={{ color: "green" }} />
          </div>
        );
      }
    }
  };

  const genDataOdd = (odd: string) => {
    return odd?.split(",");
  };

  const columns = [
    {
      title: "Công ty",
      dataIndex: "companyId",
      key: "companyId",
      width: 200,
      fixed: "center",
      render: (value) => (
        <div className="flex items-center font-semibold">
          <div className="flex-1">{companyList[value]}</div>
          <div className="border-l pl-2">
            <div>Sớm</div>
            <div>Live</div>
            <div className="text-red-600">Run</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tỷ lệ Châu Á",
      children: [
        {
          title: "Chủ",
          width: 100,
          dataIndex: "handicap",
          render: (value) => {
            return (
              <div className="flex flex-col items-center">
                <div>{genDataOdd(value)?.[3] || "-"}</div>
                <div>
                  {compareStringFloatOdds(
                    genDataOdd(value)?.[3],
                    genDataOdd(value)?.[6]
                  )}
                </div>
                <div>-</div>
              </div>
            );
          },
        },

        {
          title: "HDP",
          dataIndex: "handicap",
          key: "HDP",
          width: 100,
          render: (value) => (
            <div className="flex flex-col items-center">
              <div>{genDataOdd(value)?.[2] || "-"}</div>
              <div>
                {compareStringFloatOdds(
                  genDataOdd(value)?.[2],
                  genDataOdd(value)?.[5]
                )}
              </div>
              <div>-</div>
            </div>
          ),
        },
        {
          title: "Khách",
          dataIndex: "handicap",
          key: "guest",
          width: 70,
          render: (value) => (
            <div className="flex flex-col items-center">
              <div>{genDataOdd(value)?.[4] || "-"}</div>
              <div>
                {compareStringFloatOdds(
                  genDataOdd(value)?.[4],
                  genDataOdd(value)?.[7]
                )}
              </div>
              <div>-</div>
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
          width: 100,
          dataIndex: "overUnder",
          render: (value) => {
            return (
              <div className="flex flex-col items-center">
                <div>{genDataOdd(value)?.[3] || "-"}</div>
                <div>
                  {compareStringFloatOdds(
                    genDataOdd(value)?.[3],
                    genDataOdd(value)?.[6]
                  )}
                </div>
                <div>-</div>
              </div>
            );
          },
        },

        {
          title: "Kèo đấu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 100,
          render: (value) => (
            <div className="flex flex-col items-center">
              <div>{genDataOdd(value)?.[2] || "-"}</div>
              <div>
                {compareStringFloatOdds(
                  genDataOdd(value)?.[2],
                  genDataOdd(value)?.[5]
                )}
              </div>
              <div>-</div>
            </div>
          ),
        },
        {
          title: "Khách",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 70,
          render: (value) => (
            <div className="flex flex-col items-center">
              <div>{genDataOdd(value)?.[4] || "-"}</div>
              <div>
                {compareStringFloatOdds(
                  genDataOdd(value)?.[4],
                  genDataOdd(value)?.[7]
                )}
              </div>
              <div>-</div>
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
          width: 100,
          dataIndex: "europeOdds",
          render: (value) => {
            return (
              <div className="flex flex-col items-center">
                <div>{genDataOdd(value)?.[3] || "-"}</div>
                <div>
                  {compareStringFloatOdds(
                    genDataOdd(value)?.[3],
                    genDataOdd(value)?.[6]
                  )}
                </div>
                <div>-</div>
              </div>
            );
          },
        },

        {
          title: "Hòa",
          dataIndex: "europeOdds",
          key: "europeOdds",
          width: 100,
          render: (value) => (
            <div className="flex flex-col items-center">
              <div>{genDataOdd(value)?.[2] || "-"}</div>
              <div>
                {compareStringFloatOdds(
                  genDataOdd(value)?.[2],
                  genDataOdd(value)?.[5]
                )}
              </div>
              <div>-</div>
            </div>
          ),
        },
        {
          title: "Thua",
          dataIndex: "europeOdds",
          key: "europeOdds",
          width: 70,
          render: (value) => (
            <div className="flex flex-col items-center">
              <div>{genDataOdd(value)?.[4] || "-"}</div>
              <div>
                {compareStringFloatOdds(
                  genDataOdd(value)?.[4],
                  genDataOdd(value)?.[7]
                )}
              </div>
              <div>-</div>
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

  return (
    <Table
      columns={columns}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      dataSource={data}
      bordered
      size="small"
      scroll={{ x: 1200 }}
      pagination={false}
    />
  );
}

export default ThreeInOneOdd;
