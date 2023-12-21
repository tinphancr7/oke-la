//@ts-nocheck

const DetailsRankTable = (props) => {
  const name = props?.name;
  const data = props?.data;
  const type = props?.type;
  const isHome = props?.home;
  const columnsHomeFT = [
    {
      title: props?.match?.homeName,
      dataIndex: "company",
      key: "company",
      width: 100,
      fixed: "center",
      className: "rank-td-home",
      children: [
        {
          title: "FT",
          width: 500,
          dataIndex: "ft",
          render: (value) => {
            if (value === "Sân nhà") {
              return <div style={{ color: "#e27a48" }}>{value}</div>;
            }
            if (value === "Sân Khách") {
              return <div style={{ color: "#3f9ed8" }}>{value}</div>;
            }
            return <div style={{ color: "black" }}>{value}</div>;
          },
        },
        {
          title: "Trận",
          dataIndex: "asia",
          key: "HDP",
          width: 150,
          render: (value) => <div style={{ color: "black" }}>{value?.HDP}</div>,
        },
        {
          title: "Thắng",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
        {
          title: "Hòa",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
        {
          title: "Bại",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
        {
          title: "Ghi",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
        {
          title: "Mất",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
        {
          title: "Điểm",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
        {
          title: "Xếp hạng",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
        {
          title: "T%",
          dataIndex: "asia",
          key: "guest",
          width: 150,
          render: (value) => (
            <div style={{ color: "black" }}>{value?.guest}</div>
          ),
        },
      ],
    },
  ];
  return (
    <>
      <div className="rank-table">
        <div>
          <table style={{ width: "100%" }}>
            <thead className="ant-table-thead">
              {type === "FT" && (
                <tr>
                  <th
                    colSpan="10"
                    className="ant-table-cell rank-td-away"
                    style={
                      isHome
                        ? { color: "white", background: "#de682f" }
                        : { color: "white", background: "#2495da" }
                    }
                  >
                    {name}
                  </th>
                </tr>
              )}
              <tr>
                <th className="10%">{type}</th>
                <th>Trận</th>
                <th>Thắng</th>
                <th>Hòa</th>
                <th>Bại</th>
                <th className="hidden sm:block">Ghi</th>
                <th className="hidden sm:block">Mất</th>
                <th>Điểm</th>
                <th style={{ width: "10%" }}>Xếp hạng</th>
                <th>T%</th>
              </tr>
            </thead>
            <tbody>
              <tr
                data-row-key="1"
                className="ant-table-row ant-table-row-level-0 table-row-light"
              >
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    Tổng
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.totalCount
                      : data?.totalHalf?.totalCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.winCount
                      : data?.totalHalf?.winCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.drawCount
                      : data?.totalHalf?.winCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.loseCount
                      : data?.totalHalf?.loseCount}
                  </div>
                </td>
                <td className="hidden ant-table-cell sm:block ">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.getScore
                      : data?.totalHalf?.getScore}
                  </div>
                </td>
                <td className="hidden ant-table-cell sm:block">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.loseScore
                      : data?.totalHalf?.loseScore}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.integral
                      : data?.totalHalf?.integral}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT" ? data?.total?.rank : data?.totalHalf?.rank}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.total?.winRate + "%"
                      : data?.totalHalf?.winRate + "%"}
                  </div>
                </td>
              </tr>
              <tr
                data-row-key="1"
                className="ant-table-row ant-table-row-level-0 table-row-light"
              >
                <td className="ant-table-cell">
                  <div
                    className="table-items"
                    style={{ color: "rgb(226, 122, 72)" }}
                  >
                    Sân nhà
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.totalCount
                      : data?.homeHalf?.totalCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.winCount
                      : data?.homeHalf?.winCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.drawCount
                      : data?.homeHalf?.winCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.loseCount
                      : data?.homeHalf?.loseCount}
                  </div>
                </td>
                <td className="hidden ant-table-cell sm:block">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.getScore
                      : data?.homeHalf?.getScore}
                  </div>
                </td>
                <td className="hidden ant-table-cell sm:block">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.loseScore
                      : data?.homeHalf?.loseScore}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.integral
                      : data?.homeHalf?.integral}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT" ? data?.home?.rank : data?.homeHalf?.rank}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.home?.winRate + "%"
                      : data?.homeHalf?.winRate + "%"}
                  </div>
                </td>
              </tr>
              <tr
                data-row-key="1"
                className="ant-table-row ant-table-row-level-0 table-row-light"
              >
                <td className="ant-table-cell">
                  <div
                    className="table-items"
                    style={{ color: "rgb(63, 158, 216)" }}
                  >
                    Sân khách
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.totalCount
                      : data?.awayHalf?.totalCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.winCount
                      : data?.awayHalf?.winCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.drawCount
                      : data?.awayHalf?.winCount}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.loseCount
                      : data?.awayHalf?.loseCount}
                  </div>
                </td>
                <td className="hidden ant-table-cell sm:block">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.getScore
                      : data?.awayHalf?.getScore}
                  </div>
                </td>
                <td className="hidden ant-table-cell sm:block">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.loseScore
                      : data?.awayHalf?.loseScore}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.integral
                      : data?.awayHalf?.integral}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT" ? data?.away?.rank : data?.awayHalf?.rank}
                  </div>
                </td>
                <td className="ant-table-cell">
                  <div className="table-items" style={{ color: "black" }}>
                    {type === "FT"
                      ? data?.away?.winRate + "%"
                      : data?.awayHalf?.winRate + "%"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default DetailsRankTable;
