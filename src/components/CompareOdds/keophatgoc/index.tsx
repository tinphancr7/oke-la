//@ts-nocheck
import { Table } from "antd";
import React, { useMemo } from "react";

type Props = {
  listOddsPreMatch: any[];
  listOddsInPlay: any[];
};

function CornerOdds({ listOddsPreMatch, listOddsInPlay }: Props) {
  const data = useMemo(() => {
    const result = [];

    for (let i = 0; i < listOddsPreMatch?.length; i++) {
      result.push({
        preMatch: listOddsPreMatch?.[i] || {},
        ...(listOddsInPlay?.find(
          (e) => e?.companyId === listOddsPreMatch?.[i]?.companyId
        )
          ? {
              inPlay: listOddsInPlay?.find(
                (e) => e?.companyId === listOddsPreMatch?.[i]?.companyId
              ),
            }
          : {}),
      });
    }

    return result;
  }, [listOddsPreMatch, listOddsInPlay]);

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
      dataIndex: "preMatch",
      key: "preMatch",
      width: 100,
      fixed: "center",
      render: (value) => {
        return (
          <div style={{ color: "black" }}>{companyList[value?.companyId]}</div>
        );
      },
    },
    {
      title: "Sớm",
      children: [
        {
          title: "Tài",
          width: 150,
          dataIndex: "preMatch",
          key: "host",
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.odds?.totalCorners}
              </div>
            </div>
          ),
        },
        {
          title: "Kèo",
          dataIndex: "preMatch",
          key: "HDP",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.odds?.over}
              </div>
            </div>
          ),
        },
        {
          title: "Xỉu",
          dataIndex: "preMatch",
          key: "guest",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.odds?.under}
              </div>
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
          width: 150,
          dataIndex: "inPlay",
          key: "host",
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.odds?.totalCorners  || "-"}
              </div>
            </div>
          ),
        },
        {
          title: "Kèo",
          dataIndex: "inPlay",
          key: "HDP",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.odds?.over  || "-"}
              </div>
            </div>
          ),
        },
        {
          title: "Xỉu",
          dataIndex: "inPlay",
          key: "guest",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.odds?.under || "-"}
              </div>
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
      style={{ color: "black" }}
      size="small"
      pagination={false}
      scroll={{ x: 600 }}
    />
  );
}

export default CornerOdds;
