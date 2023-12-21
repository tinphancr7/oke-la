//@ts-nocheck
import { Table } from "antd";
import React, { useMemo } from "react";

type Props = {
  listOddsPreMatch: any[];
  listHalfTimeOddsPreMatch: any[];
  type: "ft" | "ht";
};

function CorrectScoreOdd({
  listOddsPreMatch,
  listHalfTimeOddsPreMatch,
  type,
}: Props) {
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

  const genColumns = () => {
    const column = [
      {
        title: "Công ty",
        dataIndex: "companyId",
        key: "companyId",
        width: 100,
        fixed: "center",
        render: (value) => {
          return <div>{companyList[value]}</div>;
        },
      },
    ];

    listOddsPreMatch?.[0]?.odds?.bettingOddsItems?.forEach((item, index) => {
      column.push({
        title: item?.homeScore + ":" + item?.awayScore,
        dataIndex: "odds",
        key: "companyId",
        width: 50,
        fixed: "center",
        render: (value) => {
          return <div>{Number(value?.bettingOddsItems?.[index]?.odds) || "-"}</div>;
        },
      });
    });

    column.push({
      title: "Other",
      dataIndex: "odds",
      key: "companyId",
      width: 70,
      fixed: "center",
      render: (value) => {
        return <div>{value?.otherScoresOdds}</div>;
      },
    });

    return column;
  };

  return (
    <Table
      columns={genColumns()}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      dataSource={type === "ft" ? listOddsPreMatch : listHalfTimeOddsPreMatch}
      bordered
      style={{ color: "black" }}
      size="small"
      pagination={false}
      scroll={{ x: 1200 }}
    />
  );
}

export default CorrectScoreOdd;
