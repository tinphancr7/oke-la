//@ts-nocheck
import { Table } from "antd";
import moment from "moment";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";

const AsiaLive = ({ data, matchTime,keyStatus }) => {
  let dataFilter=[];
  if(keyStatus === "ht"){
  dataFilter = data?.handicap?.[0]?.detail?.filter(item => moment.unix(item.modifyTime).diff(moment.unix(matchTime),'minutes') < 95)
  dataFilter= dataFilter?.filter(item => item?.modifyTime < matchTime)
  }else{
     dataFilter = data?.handicap?.[0]?.detail?.filter(item => moment.unix(item.modifyTime).diff(moment.unix(matchTime),'minutes') < 95)

  }

  const odds1 = data?.handicap?.[0]?.odds1;
  const odds2 = data?.handicap?.[0]?.odds2;
  const odds3 = data?.handicap?.[0]?.odds3;
  const columns = [
    {
      title: "Tỉ lệ châu Á",
      children: [
        {
          title:'Phút',
          dataIndex: "modifyTime",
          render: (value) => {
            if (value < matchTime) {
              return <p>Live</p>;
            } else {
              const momentA = moment.unix(matchTime);
              const momentB = moment.unix(value);
              const diffInMinutes = momentB.diff(momentA, "minutes");
              return `${diffInMinutes}`;
            }
          },
        },
        {
          title:"Chủ",
          dataIndex: "odds2",
          render: (value, _,index) => {

            return (
              <div className="result">
                <div style={{ textAlign: "right" }}>
                  {/* {value?.[0]?.["initialHome"]} */}
                </div>

                {compareStringFloatOdds(dataFilter?.[index+1]?.odds2,value)}
              </div>
            );
          },
        },
        {
          title:"Hòa",
          dataIndex: "odds1",
          width:90,
          align: "center",
          render: (value, _,index) => {
            return (
              <div className="result">
                <div style={{ textAlign: "right" }}>
                  {/* {value?.[0]?.["initialHome"]} */}
                </div>

                {compareStringFloatOdds(dataFilter?.[index+1]?.odds1,value)}
              </div>
            );
          },
        },
        {
          title:"Khách",
          dataIndex: "odds3",
          align: "center",
          render: (value, _,index) => {
            return (
              <div className="result">
                <div style={{ textAlign: "right" }}>
                  {/* {value?.[0]?.["initialHome"]} */}
                </div>

                {compareStringFloatOdds(dataFilter?.[index+1]?.odds3,value)}
              </div>
            );
          },
        },

        {
          title:"Thời gian",
          dataIndex: "modifyTime",
          render: (value) => {
            return (
              <div className="result">
                <div style={{ textAlign: "right" }}></div>
                {moment.unix(value).format("DD/MM HH:mm")}
              </div>
            );
          },
        },
      ],
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
      } else if (a === b) {
        return (
          <div className="customOddUp">
            <div className="oddSame" style={{ textAlign: "right" }}>
              {instant}{" "}
            </div>
          </div>
        );
      } else {
        return (
          <div className="customOddUp">
            <div
              className="oddDowns"
              style={{ textAlign: "right", color: "green" }}
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
    }else{
      return (
        <div className="customOddUp">
          <div className="oddSame" style={{ textAlign: "right" }}>
            {instant}{" "}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Table
        // dataSource={data?.handicap?.[0]?.detail}
        dataSource={dataFilter}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-dark" : "table-row-light"
        }
        columns={columns}
        // style={{ color: "black" }}
        size="small"
        pagination={false}
      />
    </>
  );
};
export default AsiaLive;
