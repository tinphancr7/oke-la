//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table } from "antd";
import Column from "antd/es/table/Column";

function avg(data, count, name, key) {
  let countTotal = 0;
  data.map((item, index) => {
    if (index < count) {
      countTotal = countTotal + parseInt(item[name]?.[key]);
    }
  });
  const result = countTotal / count;
  if (result % 1 === 0) return result.toString();
  return result.toFixed(1).toString();
}
function total(data, count, name, key) {
  let countTotal = 0;
  data?.map((item, index) => {
    if (index < count) {
      countTotal = countTotal + parseInt(item[name]?.[key]);
    }
  });
  return countTotal;
}
function countHome(data, count, name, key) {
  let countTotal = 0;
  data.map((item, index) => {
    if (index < count && item.isHome) {
      countTotal = countTotal + parseInt(item[name]?.[key]);
    }
  });
  return countTotal;
}
function countAway(data, count, name, key) {
  let countTotal = 0;
  data.map((item, index) => {
    if (index < count && !item.isHome) {
      countTotal = countTotal + parseInt(item[name]?.[key]);
    }
  });
  return countTotal;
}
function calculate(data, count) {
  let win = 0;
  let draw = 0;
  let lose = 0;
  data?.map((item, index) => {
    if (index < count) {
      if (item.home === 1) {
        item.score > 0
          ? win++
          : item.score === 0
          ? draw++
          : item.score < 0
          ? lose++
          : "";
      } else {
        item.score > 0
          ? lose++
          : item.score === 0
          ? draw++
          : item.score < 0
          ? win++
          : "";
      }
    }
  });
  return { win, draw, lose };
}
function calculateHome(data, count) {
  let win = 0;
  let draw = 0;
  let lose = 0;
  data?.map((item, index) => {
    if (index < count) {
      if (item.home === 1) {
        item.score > 0
          ? win++
          : item.score === 0
          ? draw++
          : item.score < 0
          ? lose++
          : "";
      }
    }
  });
  return { win, draw, lose };
}
function calculateAway(data, count) {
  let win = 0;
  let draw = 0;
  let lose = 0;
  data?.map((item, index) => {
    if (index < count) {
      if (item.home === 0) {
        item.score > 0
          ? lose++
          : item.score === 0
          ? draw++
          : item.score < 0
          ? win++
          : "";
      }
    }
  });
  return { win, draw, lose };
}
const CompareData = ({ matchAnalysis }) => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const exportData = (data, score, isHome) => {
    let rate = calculate(score, count);
    let result = {
      name: "",
      total: {
        scored: 0,
        conceded: 0,
        diff: 0,
        avgScored: 0,
        winRate: 0,
        drawRate: 0,
        loseRate: 0,
      },
      home: {
        scored: 0,
        conceded: 0,
        diff: 0,
        avgScored: 0,
        winRate: 0,
        drawRate: 0,
        loseRate: 0,
      },
    };
    result.name = data?.[0]?.home?.homeName;
    result.total.scored = total(data, count, "home", "scoreHome");
    result.total.conceded = total(data, count, "away", "scoreAway");
    result.total.diff = result.total.scored - result.total.conceded;
    result.total.avgScored = parseFloat(result.total.scored / count).toFixed(1);
    result.total.winRate = (
      (rate.win / (rate.win + rate.draw + rate.lose)) *
      100
    ).toFixed(1);
    result.total.drawRate = (
      (rate.draw / (rate.win + rate.draw + rate.lose)) *
      100
    ).toFixed(1);
    result.total.loseRate = (
      (rate.lose / (rate.win + rate.draw + rate.lose)) *
      100
    ).toFixed(1);
    if (isHome) {
      let rateHome = calculateHome(score, count);
      result.home.scored = countHome(data, count, "home", "scoreHome");
      result.home.conceded = countHome(data, count, "away", "scoreAway");
      result.home.diff = result.home.scored - result.home.conceded;
      result.home.avgScored = parseFloat(result.home.scored / count).toFixed(1);
      result.home.winRate = (
        (rateHome.win / (rateHome.win + rateHome.draw + rateHome.lose)) *
        100
      ).toFixed(1);
      result.home.drawRate = (
        (rateHome.draw / (rateHome.win + rateHome.draw + rateHome.lose)) *
        100
      ).toFixed(1);
      result.home.loseRate = (
        (rateHome.lose / (rateHome.win + rateHome.draw + rateHome.lose)) *
        100
      ).toFixed(1);
    } else {
      let rateHome = calculateAway(score, count);
      result.home.scored = countAway(data, count, "home", "scoreHome");
      result.home.conceded = countAway(data, count, "away", "scoreAway");
      result.home.diff = result.home.scored - result.home.conceded;
      result.home.avgScored = parseFloat(result.home.scored / count).toFixed(1);
      result.home.winRate = (
        (rateHome.win / (rateHome.win + rateHome.draw + rateHome.lose)) *
        100
      ).toFixed(1);
      result.home.drawRate = (
        (rateHome.draw / (rateHome.win + rateHome.draw + rateHome.lose)) *
        100
      ).toFixed(1);
      result.home.loseRate = (
        (rateHome.lose / (rateHome.win + rateHome.draw + rateHome.lose)) *
        100
      ).toFixed(1);
    }

    return result;
  };
  useEffect(() => {
    const getDataTeam = async () => {
      return matchAnalysis;
    };
    if (router.query?.pid) {
      getDataTeam()?.then((result) => {
        if (Object.keys(result).length > 0) {
          let data = {
            home: exportData(result?.homeLastMatches, result?.homeScore, true),
            away: exportData(result?.awayLastMatches, result?.awayScore, false),
          };
          setDataTable(data);
        }
      });
    }
  }, [count, matchAnalysis]);

  return (
    <div className="porletP" id="porletP5" style={{ background: "#fff" }}>
      <h2 className="team-table-title text-sm sm:text-[25px]">
        So sánh số liệu
        <select
          id="com_s"
          className="data-comp-select"
          onChange={(e) => setCount(e.target.value)}
          style={{ fontSize: "16px" }}
        >
          <option value={1}>1 trận gần</option>
          <option value={2}>2 trận gần</option>
          <option value={3}>3 trận gần</option>
          <option value={4}>4 trận gần</option>
          <option value={5}>5 trận gần</option>
          <option value={6}>6 trận gần</option>
          <option value={7}>7 trận gần</option>
          <option value={8}>8 trận gần</option>
          <option value={9}>9 trận gần</option>
          <option value={10}>10 trận gần</option>
          <option value={11}>11 trận gần</option>
          <option value={12}>12 trận gần</option>
          <option value={13}>13 trận gần</option>
          <option value={14}>14 trận gần</option>
          <option value={15}>15 trận gần</option>
          <option value={16}>16 trận gần</option>
          <option value={17}>17 trận gần</option>
          <option value={18}>18 trận gần</option>
          <option value={19}>19 trận gần</option>
          <option value={20}>20 trận gần</option>
        </select>
      </h2>
      <div className="hidden md:block">
        <table
          width="100%"
          align="center"
          cellPadding={1}
          cellSpacing={0}
          className="team-table-other team-table-custom"
        >
          <tbody>
            <tr align="middle" style={{ width: "100%" }}>
              <th style={{ width: "10%" }}>Đội bóng</th>
              <th>Ghi </th>
              <th>Mất</th>
              <th title="Cách biệt bàn thắng">+/-</th>
              <th title="Bàn thắng trung bình ">TB được điểm</th>
              <th title="Tỷ lệ thắng">T%</th>
              <th title="Tỷ lệ hòa">H%</th>
              <th title="Tỷ lệ thua">B%</th>
              <th title="Chủ /Khách">C/K</th>
              <th>Ghi </th>
              <th>Mất</th>
              <th title="Cách biệt bàn thắng">+/-</th>
              <th title="Bàn thắng trung bình ">TB được điểm</th>
              <th title="Tỷ lệ thắng">T%</th>
              <th title="Tỷ lệ hòa">H%</th>
              <th title="Tỷ lệ thua">B%</th>
            </tr>
            <tr id="tr_com_h" className="border-collapse">
              <td className="border home-m">{dataTable?.home?.name}</td>
              <td>{dataTable?.home?.total?.scored}</td>
              <td>{dataTable?.home?.total?.conceded}</td>
              <td>{dataTable?.home?.total?.diff}</td>
              <td>{dataTable?.home?.total?.avgScored}</td>
              <td>
                {dataTable?.home?.total?.winRate !== "NaN"
                  ? dataTable?.home?.total?.winRate
                  : 0 || 0}
                %
              </td>
              <td>
                {dataTable?.home?.total?.drawRate !== "NaN"
                  ? dataTable?.home?.total?.drawRate
                  : 0 || 0}
                %
              </td>
              <td>
                {dataTable?.home?.total?.loseRate !== "NaN"
                  ? dataTable?.home?.total?.loseRate
                  : 0 || 0}
                %
              </td>
              <td>Chủ</td>
              <td>{dataTable?.home?.home?.scored}</td>
              <td>{dataTable?.home?.home?.conceded}</td>
              <td>{dataTable?.home?.home?.diff}</td>
              <td>{dataTable?.home?.home?.avgScored}</td>
              <td>
                {dataTable?.home?.home?.winRate !== "NaN"
                  ? dataTable?.home?.home?.winRate
                  : 0 || 0}
                %
              </td>
              <td>
                {dataTable?.home?.home?.drawRate !== "NaN"
                  ? dataTable?.home?.home?.drawRate
                  : 0 || 0}
                %
              </td>
              <td>
                {dataTable?.home?.home?.loseRate !== "NaN"
                  ? dataTable?.home?.home?.loseRate
                  : 0 || 0}
                %
              </td>
            </tr>
            <tr id="tr_com_g">
              <td className="guest-m">{dataTable?.away?.name}</td>
              <td>{dataTable?.away?.total?.scored}</td>
              <td>{dataTable?.away?.total?.conceded}</td>
              <td>{dataTable?.away?.total?.diff}</td>
              <td>{dataTable?.away?.total?.avgScored}</td>
              <td>
                {dataTable?.away?.total?.winRate !== "NaN"
                  ? dataTable?.away?.total?.winRate
                  : 0 || 0}
                %
              </td>
              <td>
                {dataTable?.away?.total?.drawRate !== "NaN"
                  ? dataTable?.away?.total?.drawRate
                  : 0 || 0}
                %
              </td>
              <td>
                {dataTable?.away?.total?.loseRate !== "NaN"
                  ? dataTable?.away?.total?.loseRate
                  : 0 || 0}
                %
              </td>
              <td>Khách</td>
              <td>{dataTable?.away?.home?.scored}</td>
              <td>{dataTable?.away?.home?.conceded}</td>
              <td>{dataTable?.away?.home?.diff}</td>
              <td>{dataTable?.away?.home?.avgScored}</td>
              <td>
                {dataTable?.away?.home?.winRate !== "NaN"
                  ? dataTable?.away?.home?.winRate
                  : 0}
                %
              </td>
              <td>
                {dataTable?.away?.home?.drawRate !== "NaN"
                  ? dataTable?.away?.home?.drawRate
                  : 0 || 0}
                %
              </td>
              <td>
                {dataTable?.away?.home?.loseRate !== "NaN"
                  ? dataTable?.away?.home?.loseRate
                  : 0 || 0}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        <table className="w-full border border-gray-300 table-fixed">
          <colgroup>
            <col style={{ width: "18%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "16%" }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-xs text-center border-b">Đội bóng</th>
              <th className="p-2 text-xs text-center border-b">Ghi</th>
              <th className="p-2 text-xs text-center border-b">Mất</th>
              <th className="p-2 text-xs text-center border-b">+/-</th>
              <th className="p-2 text-xs text-center border-b">TB được điểm</th>
              <th className="p-2 text-xs text-center border-b">T%</th>
              <th className="p-2 text-xs text-center border-b">H%</th>
              <th className="p-2 text-xs text-center border-b">B%</th>
              <th className="p-2 text-xs text-center border-b">C/K</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xs text-center text-white bg-orange-500 border-b ">
                {dataTable?.home?.name}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.home?.total?.scored}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.home?.total?.conceded}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.home?.total?.diff}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.home?.total?.avgScored}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.home?.total?.winRate !== "NaN"
                  ? dataTable?.home?.total?.winRate
                  : 0 || 0}
                %
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.home?.total?.drawRate !== "NaN"
                  ? dataTable?.home?.total?.drawRate
                  : 0 || 0}
                %
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.home?.loseRate !== "NaN"
                  ? dataTable?.away?.home?.loseRate
                  : 0 || 0}
                %
              </td>
              <td className="p-2 text-xs text-center border-b">Chủ</td>
            </tr>
            <tr>
              <td className="text-xs text-center text-white bg-[#2495da] border-b ">
                {dataTable?.away?.name}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.total?.scored}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.total?.conceded}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.total?.diff}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.total?.avgScored}
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.total?.winRate !== "NaN"
                  ? dataTable?.away?.total?.winRate
                  : 0 || 0}
                %
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.total?.drawRate !== "NaN"
                  ? dataTable?.away?.total?.drawRate
                  : 0 || 0}
                %
              </td>
              <td className="p-2 text-xs text-center border-b">
                {dataTable?.away?.total?.loseRate !== "NaN"
                  ? dataTable?.away?.total?.loseRate
                  : 0 || 0}
                %
              </td>
              <td className="p-2 text-xs text-center border-b">Khách</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CompareData;
