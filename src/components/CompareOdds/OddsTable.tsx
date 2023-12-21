//@ts-nocheck
import React, { useState } from "react";
import { Table, Menu, Row } from "antd";

const listCompany = [
  "Shobet",
  "Bet365",
  "188Bet",
  "M88",
  "Crown",
  "12Bet",
  "18Bet",
  "Macauslot",
  "Ladbrokes",
  "Easybet",
];
const items = [
  {
    label: "Tỷ lệ Châu Á",
    key: "asia",
  },
  {
    label: "Tỷ lệ tài xỉu",
    key: "odds",
    // disabled: true,
  },
];

const dataType = {
  key: React.key,
  time: Date,
  company: { name: String, odds: String, host: String, guest: String },
};
const columns = [
  {
    title: "Shobet",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
];

const columns1 = [
  {
    title: "Shobet",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  {
    title: "Bet365",
    dataIndex: "company",
    render: (value) =>
      listCompany.includes(value.name) ? (
        <div style={{ color: "black", fontSize: "12px" }}>
          {value?.odds}
          <br />
          {value?.host}
          {"   "}
          {value?.guest}
        </div>
      ) : (
        <> {value.name}</>
      ),
  },
  // {
  //   title: "Bet365",
  //   dataIndex: "company",
  //   render: (value) =>
  //     listCompany.includes(value.name) ? (
  //       <div style={{ color: "black", fontSize: "12px" }}>
  //         {value?.odds}
  //         <br />
  //         {value?.host}
  //         {"   "}
  //         {value?.guest}
  //       </div>
  //     ) : (
  //       <> {value.name}</>
  //     ),
  // },
  // {
  //   title: "Bet365",
  //   dataIndex: "company",
  //   render: (value) =>
  //     listCompany.includes(value.name) ? (
  //       <div style={{ color: "black", fontSize: "12px" }}>
  //         {value?.odds}
  //         <br />
  //         {value?.host}
  //         {"   "}
  //         {value?.guest}
  //       </div>
  //     ) : (
  //       <> {value.name}</>
  //     ),
  // },
];
const data = [];
for (let i = 0; i < 7; i++) {
  data.push({
    key: i,
    time: new Date(Date.now() + i * 10000),
    company: {
      name: "Ladbrokes",
      odds: "0/-0.5",
      host: "0.66",
      guest: " 1.11",
    },
  });
}
data.push({
  key: data.length + 1,
  time: new Date(Date.now() + 800000),
  company: {
    name: "Shobet",
    odds: "0/-0.5",
    host: "0.66",
    guest: " 1.11",
  },
});

const OddsTable = () => {
  const [current, setCurrent] = useState("asia");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="container !mx-auto odd-table">
      <Menu
        style={{ backgroundColor: "transparent" }}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {current === "asia" ? (
        <>
          <div className="table_active_reponsive">
            <Table
              columns={columns}
              dataSource={data}
              bordered
              style={{ color: "black", width: "100%" }}
              size="small"
              pagination={false}
            />
          </div>
          {/* <div className="table_active_reponsive1">
        <Table
            columns={columns1}
            dataSource={data}
            bordered
            style={{ color: "black", width: "100%" }}
            size="small"
            pagination={false}
          />
        </div> */}
        </>
      ) : (
        <Table
          columns={columns}
          // dataSource={data}
          bordered
          style={{ color: "black", width: "100%" }}
          size="small"
          pagination={false}
        />
      )}
    </div>
  );
};
export default OddsTable;
