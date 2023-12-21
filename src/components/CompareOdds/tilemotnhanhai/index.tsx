//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Col, Select, Table, Row } from "antd";
// import { getComparison1X2 } from "@/stores/calendar.stores";
import moment from "moment";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";
import { getComparison1X2 } from "@/apis/match";
export const SplitString = (data) => {
  const arr = data.split(",");
  return arr;
};
const { Option } = Select;
const RatioOneTimesTwo = (props) => {
  const [data, setData] = useState([]);
  const [khach, setKhach] = useState(0);
  const calculateHomePercentWin = (home, draw, away) => {
    let homeOdds = Number(home);
    let drawOdds = Number(draw);
    let awayOdds = Number(away);

    return 1 / (1 + homeOdds / drawOdds + homeOdds / awayOdds);
  };
  const calculateDrawPercentWin = (home, draw, away) => {
    let homeOdds = Number(home);
    let drawOdds = Number(draw);
    let awayOdds = Number(away);

    return 1 / (1 + drawOdds / homeOdds + drawOdds / awayOdds);
  };

  const calculateAwayPercentWin = (home, draw, away) => {
    let homeOdds = Number(home);
    let drawOdds = Number(draw);
    let awayOdds = Number(away);

    return 1 / (1 + awayOdds / homeOdds + awayOdds / drawOdds);
  };

  const calculatePercentReturn = (odds, percents) => {
    let oddsNumber = Number(odds);
    return oddsNumber * percents;
  };
  const columns = [
    {
      title: "Nhà cái",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{data?.[1]} </>;
      },
    },
    {
      title: "Chủ",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{compareStringFloatOdds(data?.[2], data?.[5])} </>;
      },
    },
    {
      title: "Hòa",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{compareStringFloatOdds(data?.[3], data?.[6])} </>;
      },
    },
    {
      title: "khách",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{compareStringFloatOdds(data?.[4], data?.[7])} </>;
      },
    },
    {
      title: "Chủ%",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        const chu =
          calculateHomePercentWin(data?.[5], data?.[6], data?.[7]) * 100;
        setKhach(chu);
        return <>{chu.toFixed(2)}</>;
      },
    },
    {
      title: "H%",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        const hoa =
          calculateDrawPercentWin(data?.[5], data?.[6], data?.[7]) * 100;
        return <>{hoa.toFixed(2)}</>;
      },
    },
    {
      title: "khách%",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        const khach =
          calculateAwayPercentWin(data?.[5], data?.[6], data?.[7]) * 100;
        return <>{khach.toFixed(2)}</>;
      },
    },
    {
      title: "Hoàn vốn%",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        const hoanVon = calculatePercentReturn(
          data?.[5],
          calculateHomePercentWin(data?.[5], data?.[6], data?.[7]) * 100
        );
        return <>{hoanVon.toFixed(2)}</>;
      },
    },
    // {
    //   title: "Tiêu chuẩn kelly",
    //   children: [
    //     {
    //       title: "Chủ",
    //       dataIndex: "oddsDetail",
    //       key: "oddsDetail",
    //       render: (_, record) => {
    //         const data = SplitString(_);
    //         return <>{data[5]} </>;
    //       },
    //     },
    //     {
    //       title: "Hòa",
    //       dataIndex: "oddsDetail",
    //       key: "oddsDetail",
    //       render: (_, record) => {
    //         const data = SplitString(_);
    //         return <>{data[6]} </>;
    //       },
    //     },
    //     {
    //       title: "khách",
    //       dataIndex: "oddsDetail",
    //       key: "oddsDetail",
    //       render: (_, record) => {
    //         const data = SplitString(_);
    //         return <>{data[7]} </>;
    //       },
    //     },
    //   ],
    // },
    {
      title: "Lần thay đổi cuối cùng",
      dataIndex: "changeTime",
      key: "changeTime",
      render: (_, cord) => {
        return <> {moment.unix(_).format("DD/MM/YYYY")}</>;
      },
    },
    // {
    //   title: "Xem thêm",
    //   dataIndex: "oddsDetail",
    //   key: "oddsDetail",
    //   render: (_, record) => {
    //     const data = SplitString(_);
    //     return (
    //       <>
    //         <FiSearch style={{ cursor: "pointer" }} />{" "}
    //       </>
    //     );
    //   },
    // },
  ];
  const columnsMobile = [
    {
      title: "Nhà cái",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{data?.[1]} </>;
      },
      width: "40%",
    },
    {
      title: "Chủ",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{compareStringFloatOdds(data?.[2], data?.[5])} </>;
      },
      width: "20%",
    },
    {
      title: "Hòa",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{compareStringFloatOdds(data?.[3], data?.[6])} </>;
      },
      width: "20%",
    },
    {
      title: "khách",
      dataIndex: "oddsDetail",
      key: "oddsDetail",
      render: (_, record) => {
        const data = SplitString(_);
        return <>{compareStringFloatOdds(data?.[4], data?.[7])} </>;
      },
      width: "20%",
    },
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
              alignItems: "center",
              justifyContent: "center",
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
              alignItems: "center",
              justifyContent: "center",
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="oddUp" style={{ color: "green" }}>
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
  const [selected, Setselected] = useState("");

  const getAllData = async () => {
    const getdData = await getComparison1X2(props?.match?.matchId);
    setData(getdData?.odds);
    Setselected(getdData?.homeName);
    handleExportSelectCompany(getdData?.odds);
  };
  const [companyList, setCompanyList] = useState([]);

  const handleExportSelectCompany = (companyOdds) => {
    if (companyOdds) {
      let companyListExport = companyOdds?.map((item) => {
        let splitItem = item?.oddsDetail.toString()?.split(",");
        return {
          key: splitItem?.[0],
          value: splitItem?.[0],
          label: splitItem?.[1],
        };
      });
      setCompanyList(companyListExport);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeCompany = (e) => {
    setLoading(true);
    let dataFilter = [];
    e?.map((item) => {
      let a = data?.find(
        (item1) => item1?.oddsDetail.toString()?.split(",")?.[0] === item
      );
      dataFilter.push(a);
    });
    setDataFilter(dataFilter);
    if (dataFilter.length === 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="tableOneTwo">
      <div
        id="tilemotnhanhai"
        className="tile1x2Odds"
        style={{
          width: "100%",
          backgroundColor: "#ffad01",
          textAlign: "left",
          padding: "5px 15px",
          color: "white",
          display: "flex",
        }}
      >
        <Col lg={10}>
          <Select
            size="medium"
            className="hidden lg:block w-[30%]"
            options={companyList}
            onChange={(e) => handleChangeCompany(e)}
            allowClear
            showSearch
            optionFilterProp="label"
            mode="multiple"
          ></Select>
        </Col>
        <Col lg={14}>
          <span
            style={{
              color: "white",
              fontSize: "16px",
              whiteSpace: "pre",
              width: "100%",
            }}
          >
            Bảng tỉ lệ 1x2 ({`${data?.length}`} nhà cái)
          </span>
        </Col>
      </div>
      <div className="hidden min-[515px]:block">
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataFilter?.length > 0 ? dataFilter : data}
          pagination={false}
          className="w-full"
          scroll={{ x: 1000}}
        />
      </div>
      <div className="block min-[515px]:hidden">
        <Table
          loading={loading}
          columns={columnsMobile}
          dataSource={dataFilter?.length > 0 ? dataFilter : data}
          pagination={false}
          className="w-full"
          scroll={{ x: 1000}}
        />
      </div>
    </div>
  );
};

export default RatioOneTimesTwo;
