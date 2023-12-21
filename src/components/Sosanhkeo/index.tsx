import { getMatchOdds } from "@/apis/odd";
import { COMPANY } from "@/constant";
import { IHotMatch } from "@/interfaces";
import { convertStringOddToArray } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const Sosanhkeo = ({ match }: { match: IHotMatch }) => {
  const [odds, setOdds] = useState<any>({});
  const getData = async () => {
    try {
      const [odd] = await Promise.all([getMatchOdds(match?.matchId)]);
      setOdds(odd?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const maxOddsLength = useMemo(() => {
    let maxLength = 0;

    if (odds?.handicap?.length > maxLength) {
      maxLength = odds?.handicap?.length;
    }

    if (odds?.europeOdds?.length > maxLength) {
      maxLength = odds?.europeOdds?.length;
    }

    if (odds?.overUnder?.length > maxLength) {
      maxLength = odds?.overUnder?.length;
    }

    return maxLength;
  }, [odds]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {/* Tỉ số trận */}
      <div className="flex justify-around p-2"></div>
      {/* So sánh kèo trực tuyến */}
      <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
        <h2 className="mb-3 text-2xl font-semibold leadi text-center">
          So sánh kèo trực tuyến
        </h2>
        <div className="overflow-x-auto ">
          <table className="min-w-full text-xs table-auto border border-b border-slate-400">
            <thead className="rounded-t-lg dark:bg-gray-700 border border-slate-400 bg-neutral-100">
              <tr className="text-center border border-slate-400">
                <th
                  title="Ranking"
                  className="p-3 border-r border-slate-400"
                  rowSpan={2}
                >
                  Công ty
                </th>
                <th
                  title="Team name"
                  className="p-3 border-r border-slate-400"
                  rowSpan={2}
                ></th>
                <th
                  title="Wins"
                  className="p-3 border-r border-slate-400"
                  colSpan={3}
                >
                  Tỷ lệ Châu Á
                </th>
                <th
                  title="Losses"
                  className="p-3 border-r border-slate-400"
                  colSpan={3}
                >
                  Tỷ lệ tài xỉu
                </th>
                <th
                  title="Win percentage"
                  className="p-3 border-r border-slate-400"
                  colSpan={3}
                >
                  Tỷ lệ Châu Âu
                </th>
                <th
                  title="Games behind"
                  className="p-3 border-r border-slate-400"
                  rowSpan={2}
                >
                  Thay đổi
                </th>
                <th
                  title="Home games"
                  className="p-3 border-r border-slate-400"
                  rowSpan={2}
                >
                  +
                </th>
              </tr>
              <tr className="text-center">
                <th title="Wins" className="p-3 border-r border-slate-400">
                  Chủ
                </th>
                <th title="Losses" className="p-3 border-r border-slate-400">
                  HDP
                </th>
                <th
                  title="Win percentage"
                  className="p-3 border-r border-slate-400"
                >
                  Khách
                </th>
                <th
                  title="Games behind"
                  className="p-3 border-r border-slate-400"
                >
                  Tài
                </th>
                <th
                  title="Home games"
                  className="p-3 border-r border-slate-400"
                >
                  Kèo đầu
                </th>
                <th
                  title="Away games"
                  className="p-3 border-r border-slate-400"
                >
                  Xỉu
                </th>
                <th
                  title="Last 10 games"
                  className="p-3 border-r border-slate-400"
                >
                  Chủ
                </th>
                <th
                  title="Current streak"
                  className="p-3 border-r border-slate-400"
                >
                  Hòa
                </th>
                <th
                  title="Current streak"
                  className="p-3 border-r border-slate-400"
                >
                  Khách
                </th>
              </tr>
            </thead>
            <tbody>
              {new Array(maxOddsLength)
                .fill(maxOddsLength)
                .map((item, index) => {
                  return (
                    <>
                      <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                        <td
                          className="px-3 py-2  border-r border-slate-400"
                          rowSpan={3}
                        >
                          <span>
                            {
                              // @ts-ignore
                              COMPANY[
                                Number(
                                  convertStringOddToArray(
                                    odds?.handicap?.[index]
                                  )?.[1]
                                )
                              ]
                            }
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>Sớm</span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[3] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[2] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[4] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[3] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[2] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[4] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[2] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[3] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[4] || "-"}
                          </span>
                        </td>
                        <td
                          className="px-3 py-2 border-r border-slate-400"
                          rowSpan={3}
                        >
                          <span>+</span>
                        </td>
                        <td
                          className="px-3 py-2 border-r border-slate-400"
                          rowSpan={3}
                        >
                          <span>-</span>
                        </td>
                      </tr>
                      <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>Live</span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[6] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[5] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[7] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[6] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[5] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[7] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[5] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[6] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[7] || "-"}
                          </span>
                        </td>
                      </tr>
                      <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>Run</span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[6] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[5] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.handicap?.[index]
                            )?.[7] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[6] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[5] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.overUnder?.[index]
                            )?.[7] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[5] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[6] || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-r border-slate-400">
                          <span>
                            {" "}
                            {convertStringOddToArray(
                              odds?.europeOdds?.[index]
                            )?.[7] || "-"}
                          </span>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bảng xếp hạng */}
      <div className="p-2 mt-10">
        <h2 className="mb-3 text-2xl font-semibold leadi text-center">
          Bảng xếp hạng
        </h2>
        <div className="flex justify-center">
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <thead className="rounded-t-lg dark:bg-gray-700 border border-slate-400 bg-neutral-100">
                <tr className="text-center border border-slate-400 bg-[#de682f]">
                  <td
                    title="Ranking"
                    className="px-3 py-1 border-r border-slate-400 font-bold text-white text-base"
                    colSpan={10}
                  >
                    [MEX D2(a)-13] Atletico La Paz
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center text-[#888] bg-neutral-100">
                  <td title="Wins" className="px-2 py-2 ">
                    FT
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Trận
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Thắng
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    Hòa
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Bại
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Ghi
                  </td>
                  <td title="Last 10 games" className="px-2 py-2">
                    Mất
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Điểm
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Xếp hạng
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    T%
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Tổng</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Nhà</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Khách</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>6 trận gần</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center text-[#888] bg-neutral-100">
                  <td title="Wins" className="px-2 py-2 ">
                    FT
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Trận
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Thắng
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    Hòa
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Bại
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Ghi
                  </td>
                  <td title="Last 10 games" className="px-2 py-2">
                    Mất
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Điểm
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Xếp hạng
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    T%
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Tổng</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Nhà</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Khách</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>6 trận gần</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <thead className="rounded-t-lg dark:bg-gray-700 border border-slate-400 bg-neutral-100">
                <tr className="text-center border border-slate-400 bg-[#2495da]">
                  <td
                    title="Ranking"
                    className="px-3 py-1 border-r border-slate-400 font-bold text-white text-base"
                    colSpan={10}
                  >
                    [MEX D2(a)-13] Atletico La Paz
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center text-[#888] bg-neutral-100">
                  <td title="Wins" className="px-2 py-2 ">
                    FT
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Trận
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Thắng
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    Hòa
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Bại
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Ghi
                  </td>
                  <td title="Last 10 games" className="px-2 py-2">
                    Mất
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Điểm
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Xếp hạng
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    T%
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Tổng</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Nhà</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Khách</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>6 trận gần</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center text-[#888] bg-neutral-100">
                  <td title="Wins" className="px-2 py-2 ">
                    FT
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Trận
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Thắng
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    Hòa
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Bại
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Ghi
                  </td>
                  <td title="Last 10 games" className="px-2 py-2">
                    Mất
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Điểm
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    Xếp hạng
                  </td>
                  <td title="Current streak" className="px-2 py-2">
                    T%
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Tổng</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Nhà</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>Sân Khách</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>6 trận gần</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>17</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>6</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>8</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>25</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>29</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>21</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13</span>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-400">
                    <span>35.3%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Thành tích đối đầu */}
      <div className="p-2 mt-10">
        <h2 className="mb-3 text-2xl font-semibold leadi text-center">
          Thành tích đối đầu
        </h2>
        <div className="overflow-x-auto">
          <div className="bg-[#888] py-3 flex justify-center text-white">
            <span className="px-2">Atletico La Paz </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> Chủ{" "}
            </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> Giải đấu tương đồng{" "}
            </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> HT{" "}
            </span>
            <select className="px-2 ml-2 text-black text-sm">
              <option>1 trận gần</option>
              <option>2 trận gần</option>
            </select>
          </div>
          <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
            <tbody>
              <tr className="text-center bg-neutral-100 text-[#888]">
                <td title="Wins" className="px-2 py-2 " rowSpan={2}>
                  Giải đấu
                </td>
                <td title="Losses" className="px-2 py-2 " rowSpan={2}>
                  Ngày
                </td>
                <td title="Win percentage" className="px-2 py-2 " rowSpan={2}>
                  Chủ
                </td>
                <td title="Games behind" className="px-2 py-2" rowSpan={2}>
                  Tỷ số
                </td>
                <td title="Home games" className="px-2 py-2" rowSpan={2}>
                  Khách
                </td>
                <td title="Away games" className="px-2 py-2" rowSpan={2}>
                  Phạt góc
                </td>
                <td
                  title="Last 10 games"
                  className="px-2 py-2 border-l border-slate-400"
                  colSpan={2}
                >
                  <select name="" id="" className="text-black">
                    <option value="">Sbobet</option>
                    <option value="">Bet365</option>
                    <option value="">12Bet</option>
                    <option value="">Crown</option>
                    <option value="">1x2</option>
                  </select>
                </td>
                <td title="Last 10 games" className="px-2 py-2" colSpan={2}>
                  <select name="" id="" className="text-black">
                    <option value="">Ban đẩu</option>
                    <option value="">Cuối cùng</option>
                  </select>
                </td>
                <td
                  title="Last 10 games"
                  className="px-2 py-2 border-l border-slate-400"
                  colSpan={2}
                >
                  <select name="" id="" className="text-black">
                    <option value="">Sbobet</option>
                    <option value="">Bet365</option>
                    <option value="">12Bet</option>
                    <option value="">Crown</option>
                    <option value="">1x2</option>
                  </select>
                </td>
                <td title="Last 10 games" className="px-2 py-2" colSpan={2}>
                  <select name="" id="" className="text-black">
                    <option value="">Ban đẩu</option>
                    <option value="">Cuối cùng</option>
                  </select>
                </td>
                <td title="Current streak" className="px-2 py-2" rowSpan={2}>
                  T/X
                </td>
              </tr>
              <tr className="text-center bg-neutral-100 text-[#888]">
                <td
                  title="Wins"
                  className="px-2 py-2 border-l border-slate-400"
                >
                  Chủ
                </td>
                <td title="Losses" className="px-2 py-2 ">
                  Hòa
                </td>
                <td title="Win percentage" className="px-2 py-2 ">
                  Khách
                </td>
                <td title="Games behind" className="px-2 py-2">
                  T/B
                </td>
                <td
                  title="Home games"
                  className="px-2 py-2 border-l border-slate-400"
                >
                  Chủ
                </td>
                <td title="Away games" className="px-2 py-2">
                  HDP
                </td>
                <td title="Away games" className="px-2 py-2">
                  Khách
                </td>
                <td title="Away games" className="px-2 py-2">
                  HDP
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 ">
                  <span>MEX D2</span>
                </td>
                <td className="px-2 py-2">
                  <span>20/04/2023</span>
                </td>
                <td className="px-2 py-2">
                  <span>Celaya FC</span>
                </td>
                <td className="px-2 py-2">
                  <span>4-2(2-2)</span>
                </td>
                <td className="px-2 py-2">
                  <span>Atletico La Paz</span>
                </td>
                <td className="px-2 py-2">
                  <span>8-5(5-1)</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.48</span>
                </td>
                <td className="px-2 py-2">
                  <span>3.80</span>
                </td>
                <td className="px-2 py-2">
                  <span>5.40</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.85</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.97</span>
                </td>
                <td className="px-2 py-2">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>T</span>
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 ">
                  <span>MEX D2</span>
                </td>
                <td className="px-2 py-2">
                  <span>20/04/2023</span>
                </td>
                <td className="px-2 py-2">
                  <span>Celaya FC</span>
                </td>
                <td className="px-2 py-2">
                  <span>4-2(2-2)</span>
                </td>
                <td className="px-2 py-2">
                  <span>Atletico La Paz</span>
                </td>
                <td className="px-2 py-2">
                  <span>8-5(5-1)</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.48</span>
                </td>
                <td className="px-2 py-2">
                  <span>3.80</span>
                </td>
                <td className="px-2 py-2">
                  <span>5.40</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.85</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.97</span>
                </td>
                <td className="px-2 py-2">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>T</span>
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td colSpan={15}>
                  <p>
                    Bongdalu thống kê 2 trận gần đây, thắng 0, hòa 1, thua 1. Tỷ
                    lệ thắng: 0.0% Tỷ lệ thắng kèo: 0.0% Tỷ lệ Tài: 50.0%
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Thành tích gần đây*/}
      <div className="p-2 mt-10">
        <h2 className="mb-3 text-2xl font-semibold leadi text-center">
          Thành tích gần đây
        </h2>
        <div className="overflow-x-auto">
          <div className="bg-[#de682f] py-3 flex justify-center text-white">
            <span className="px-2">Atletico La Paz </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> Chủ{" "}
            </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> Giải đấu tương đồng{" "}
            </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> HT{" "}
            </span>
            <select className="px-2 ml-2 text-black">
              <option>1 trận gần</option>
              <option>2 trận gần</option>
            </select>
          </div>
          <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
            <tbody>
              <tr className="text-center bg-[#eaeaea]">
                <td title="Wins" className="px-2 py-2 " rowSpan={2}>
                  Giải đấu
                </td>
                <td title="Losses" className="px-2 py-2 " rowSpan={2}>
                  Ngày
                </td>
                <td title="Win percentage" className="px-2 py-2 " rowSpan={2}>
                  Chủ
                </td>
                <td title="Games behind" className="px-2 py-2" rowSpan={2}>
                  Tỷ số
                </td>
                <td title="Home games" className="px-2 py-2" rowSpan={2}>
                  Khách
                </td>
                <td title="Away games" className="px-2 py-2" rowSpan={2}>
                  Phạt góc
                </td>
                <td
                  title="Last 10 games"
                  className="px-2 py-2 border-l border-slate-400"
                  colSpan={2}
                >
                  <select name="" id="">
                    <option value="">Sbobet</option>
                    <option value="">Bet365</option>
                    <option value="">12Bet</option>
                    <option value="">Crown</option>
                    <option value="">1x2</option>
                  </select>
                </td>
                <td title="Last 10 games" className="px-2 py-2" colSpan={2}>
                  <select name="" id="">
                    <option value="">Ban đẩu</option>
                    <option value="">Cuối cùng</option>
                  </select>
                </td>
                <td
                  title="Last 10 games"
                  className="px-2 py-2 border-l border-slate-400"
                  colSpan={2}
                >
                  <select name="" id="">
                    <option value="">Sbobet</option>
                    <option value="">Bet365</option>
                    <option value="">12Bet</option>
                    <option value="">Crown</option>
                    <option value="">1x2</option>
                  </select>
                </td>
                <td title="Last 10 games" className="px-2 py-2" colSpan={2}>
                  <select name="" id="">
                    <option value="">Ban đẩu</option>
                    <option value="">Cuối cùng</option>
                  </select>
                </td>
                <td title="Current streak" className="px-2 py-2" rowSpan={2}>
                  T/X
                </td>
              </tr>
              <tr className="text-center bg-[#eaeaea]">
                <td
                  title="Wins"
                  className="px-2 py-2 border-l border-slate-400"
                >
                  Chủ
                </td>
                <td title="Losses" className="px-2 py-2 ">
                  Hòa
                </td>
                <td title="Win percentage" className="px-2 py-2 ">
                  Khách
                </td>
                <td title="Games behind" className="px-2 py-2">
                  T/B
                </td>
                <td
                  title="Home games"
                  className="px-2 py-2 border-l border-slate-400"
                >
                  Chủ
                </td>
                <td title="Away games" className="px-2 py-2">
                  HDP
                </td>
                <td title="Away games" className="px-2 py-2">
                  Khách
                </td>
                <td title="Away games" className="px-2 py-2">
                  HDP
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 ">
                  <span>MEX D2</span>
                </td>
                <td className="px-2 py-2">
                  <span>20/04/2023</span>
                </td>
                <td className="px-2 py-2">
                  <span>Celaya FC</span>
                </td>
                <td className="px-2 py-2">
                  <span>4-2(2-2)</span>
                </td>
                <td className="px-2 py-2">
                  <span>Atletico La Paz</span>
                </td>
                <td className="px-2 py-2">
                  <span>8-5(5-1)</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.48</span>
                </td>
                <td className="px-2 py-2">
                  <span>3.80</span>
                </td>
                <td className="px-2 py-2">
                  <span>5.40</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.85</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.97</span>
                </td>
                <td className="px-2 py-2">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>T</span>
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 ">
                  <span>MEX D2</span>
                </td>
                <td className="px-2 py-2">
                  <span>20/04/2023</span>
                </td>
                <td className="px-2 py-2">
                  <span>Celaya FC</span>
                </td>
                <td className="px-2 py-2">
                  <span>4-2(2-2)</span>
                </td>
                <td className="px-2 py-2">
                  <span>Atletico La Paz</span>
                </td>
                <td className="px-2 py-2">
                  <span>8-5(5-1)</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.48</span>
                </td>
                <td className="px-2 py-2">
                  <span>3.80</span>
                </td>
                <td className="px-2 py-2">
                  <span>5.40</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.85</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.97</span>
                </td>
                <td className="px-2 py-2">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>T</span>
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td colSpan={15}>
                  <p>
                    Bongdalu thống kê 2 trận gần đây, thắng 0, hòa 1, thua 1. Tỷ
                    lệ thắng: 0.0% Tỷ lệ thắng kèo: 0.0% Tỷ lệ Tài: 50.0%
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto">
          <div className="bg-[#2495da] py-3 flex justify-center text-white">
            <span className="px-2">Atletico La Paz </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> Chủ{" "}
            </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> Giải đấu tương đồng{" "}
            </span>
            <span className="px-2">
              <input className="mr-1" type="checkbox" /> HT{" "}
            </span>
            <select className="px-2 ml-2 text-black">
              <option>1 trận gần</option>
              <option>2 trận gần</option>
            </select>
          </div>
          <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
            <tbody>
              <tr className="text-center bg-neutral-100">
                <td title="Wins" className="px-2 py-2 " rowSpan={2}>
                  Giải đấu
                </td>
                <td title="Losses" className="px-2 py-2 " rowSpan={2}>
                  Ngày
                </td>
                <td title="Win percentage" className="px-2 py-2 " rowSpan={2}>
                  Chủ
                </td>
                <td title="Games behind" className="px-2 py-2" rowSpan={2}>
                  Tỷ số
                </td>
                <td title="Home games" className="px-2 py-2" rowSpan={2}>
                  Khách
                </td>
                <td title="Away games" className="px-2 py-2" rowSpan={2}>
                  Phạt góc
                </td>
                <td
                  title="Last 10 games"
                  className="px-2 py-2 border-l border-slate-400"
                  colSpan={2}
                >
                  <select name="" id="">
                    <option value="">Sbobet</option>
                    <option value="">Bet365</option>
                    <option value="">12Bet</option>
                    <option value="">Crown</option>
                    <option value="">1x2</option>
                  </select>
                </td>
                <td title="Last 10 games" className="px-2 py-2" colSpan={2}>
                  <select name="" id="">
                    <option value="">Ban đẩu</option>
                    <option value="">Cuối cùng</option>
                  </select>
                </td>
                <td
                  title="Last 10 games"
                  className="px-2 py-2 border-l border-slate-400"
                  colSpan={2}
                >
                  <select name="" id="">
                    <option value="">Sbobet</option>
                    <option value="">Bet365</option>
                    <option value="">12Bet</option>
                    <option value="">Crown</option>
                    <option value="">1x2</option>
                  </select>
                </td>
                <td title="Last 10 games" className="px-2 py-2" colSpan={2}>
                  <select name="" id="">
                    <option value="">Ban đẩu</option>
                    <option value="">Cuối cùng</option>
                  </select>
                </td>
                <td title="Current streak" className="px-2 py-2" rowSpan={2}>
                  T/X
                </td>
              </tr>
              <tr className="text-center bg-neutral-100">
                <td
                  title="Wins"
                  className="px-2 py-2 border-l border-slate-400"
                >
                  Chủ
                </td>
                <td title="Losses" className="px-2 py-2 ">
                  Hòa
                </td>
                <td title="Win percentage" className="px-2 py-2 ">
                  Khách
                </td>
                <td title="Games behind" className="px-2 py-2">
                  T/B
                </td>
                <td
                  title="Home games"
                  className="px-2 py-2 border-l border-slate-400"
                >
                  Chủ
                </td>
                <td title="Away games" className="px-2 py-2">
                  HDP
                </td>
                <td title="Away games" className="px-2 py-2">
                  Khách
                </td>
                <td title="Away games" className="px-2 py-2">
                  HDP
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 ">
                  <span>MEX D2</span>
                </td>
                <td className="px-2 py-2">
                  <span>20/04/2023</span>
                </td>
                <td className="px-2 py-2">
                  <span>Celaya FC</span>
                </td>
                <td className="px-2 py-2">
                  <span>4-2(2-2)</span>
                </td>
                <td className="px-2 py-2">
                  <span>Atletico La Paz</span>
                </td>
                <td className="px-2 py-2">
                  <span>8-5(5-1)</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.48</span>
                </td>
                <td className="px-2 py-2">
                  <span>3.80</span>
                </td>
                <td className="px-2 py-2">
                  <span>5.40</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.85</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.97</span>
                </td>
                <td className="px-2 py-2">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>T</span>
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 ">
                  <span>MEX D2</span>
                </td>
                <td className="px-2 py-2">
                  <span>20/04/2023</span>
                </td>
                <td className="px-2 py-2">
                  <span>Celaya FC</span>
                </td>
                <td className="px-2 py-2">
                  <span>4-2(2-2)</span>
                </td>
                <td className="px-2 py-2">
                  <span>Atletico La Paz</span>
                </td>
                <td className="px-2 py-2">
                  <span>8-5(5-1)</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.48</span>
                </td>
                <td className="px-2 py-2">
                  <span>3.80</span>
                </td>
                <td className="px-2 py-2">
                  <span>5.40</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.85</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>0.97</span>
                </td>
                <td className="px-2 py-2">
                  <span>B</span>
                </td>
                <td className="px-2 py-2">
                  <span>T</span>
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td colSpan={15}>
                  <p>
                    Bongdalu thống kê 2 trận gần đây, thắng 0, hòa 1, thua 1. Tỷ
                    lệ thắng: 0.0% Tỷ lệ thắng kèo: 0.0% Tỷ lệ Tài: 50.0%
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* So sánh số liệu */}
      <div className="p-2 mt-10">
        <h2 className="mb-3 text-2xl font-semibold leadi text-center">
          So sánh số liệu
          <select
            name=""
            id=""
            className="right-0 mt-3 mr-3 border absolute text-sm"
          >
            <option value="">1 trận gần</option>
            <option value="">2 trận gần</option>
            <option value="">3 trận gần</option>
            <option value="">4 trận gần</option>
            <option value="">5 trận gần</option>
            <option value="">6 trận gần</option>
            <option value="">7 trận gần</option>
            <option value="">8 trận gần</option>
            <option value="">9 trận gần</option>
            <option value="">10 trận gần</option>
          </select>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
            <tbody>
              <tr className="text-center bg-[#eaeaea] text-[#888]">
                <td title="Wins" className="px-2 py-2 ">
                  Đội bóng
                </td>
                <td title="Losses" className="px-2 py-2 ">
                  Ghi
                </td>
                <td title="Win percentage" className="px-2 py-2 ">
                  Mất
                </td>
                <td title="Games behind" className="px-2 py-2">
                  +/-
                </td>
                <td title="Home games" className="px-2 py-2">
                  TB được điểm
                </td>
                <td title="Away games" className="px-2 py-2">
                  T%
                </td>
                <td title="Away games" className="px-2 py-2">
                  H%
                </td>
                <td title="Away games" className="px-2 py-2">
                  B%
                </td>
                <td title="Away games" className="px-2 py-2">
                  C/K
                </td>
                <td title="Away games" className="px-2 py-2">
                  Ghi
                </td>
                <td title="Away games" className="px-2 py-2">
                  Mất
                </td>
                <td title="Away games" className="px-2 py-2">
                  +/-
                </td>
                <td title="Away games" className="px-2 py-2">
                  TB được điểm
                </td>
                <td title="Away games" className="px-2 py-2">
                  T%
                </td>
                <td title="Away games" className="px-2 py-2">
                  H%
                </td>
                <td title="Away games" className="px-2 py-2">
                  B%
                </td>
              </tr>

              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 bg-[#de682f]">
                  <span>Atletico La Paz</span>
                </td>
                <td className="px-2 py-2">
                  <span>22</span>
                </td>
                <td className="px-2 py-2">
                  <span>21</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.57</span>
                </td>
                <td className="px-2 py-2">
                  <span>42.9%</span>
                </td>
                <td className="px-2 py-2">
                  <span>14.3%</span>
                </td>
                <td className="px-2 py-2">
                  <span>42.9%</span>
                </td>
                <td className="px-2 py-2">
                  <span>Chủ</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>15</span>
                </td>
                <td className="px-2 py-2">
                  <span>9</span>
                </td>
                <td className="px-2 py-2">
                  <span>6</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.88</span>
                </td>
                <td className="px-2 py-2">
                  <span>62.5%</span>
                </td>
                <td className="px-2 py-2">
                  <span>12.5%</span>
                </td>
                <td className="px-2 py-2">
                  <span>25%</span>
                </td>
              </tr>
              <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                <td className="px-2 py-2 bg-[#2495da]">
                  <span>Celaya FC</span>
                </td>
                <td className="px-2 py-2">
                  <span>22</span>
                </td>
                <td className="px-2 py-2">
                  <span>21</span>
                </td>
                <td className="px-2 py-2">
                  <span>1</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.57</span>
                </td>
                <td className="px-2 py-2">
                  <span>42.9%</span>
                </td>
                <td className="px-2 py-2">
                  <span>14.3%</span>
                </td>
                <td className="px-2 py-2">
                  <span>42.9%</span>
                </td>
                <td className="px-2 py-2">
                  <span>Chủ</span>
                </td>
                <td className="px-2 py-2 ">
                  <span>15</span>
                </td>
                <td className="px-2 py-2">
                  <span>9</span>
                </td>
                <td className="px-2 py-2">
                  <span>6</span>
                </td>
                <td className="px-2 py-2">
                  <span>1.88</span>
                </td>
                <td className="px-2 py-2">
                  <span>62.5%</span>
                </td>
                <td className="px-2 py-2">
                  <span>12.5%</span>
                </td>
                <td className="px-2 py-2">
                  <span>25%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Lịch sử kèo châu Á tương đồng */}
      <div className="p-2 mt-10">
        <h2 className="mb-3 text-2xl font-semibold leadi text-center">
          Lịch sử kèo châu Á tương đồng
        </h2>
        <div className="flex justify-center">
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <thead className="rounded-t-lg dark:bg-gray-700 border border-slate-400 bg-neutral-100">
                <tr className="text-center border border-slate-400 bg-[#de682f]">
                  <td
                    title="Ranking"
                    className="p-3 border-r border-slate-400"
                    colSpan={10}
                  >
                    Atletico La Paz
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center bg-neutral-100 text-[#888]">
                  <td title="Wins" className="px-2 py-2 ">
                    Trận đấu
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Giờ
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Chủ
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    HDP
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Khách
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Tỷ số
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    HDP
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>24/08/2022</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Atletico La Paz</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Raya2 Expansion</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>1-0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <thead className="rounded-t-lg dark:bg-gray-700 border border-slate-400 bg-neutral-100">
                <tr className="text-center border border-slate-400 bg-[#2495da]">
                  <td
                    title="Ranking"
                    className="p-3 border-r border-slate-400"
                    colSpan={10}
                  >
                    Celaya FC
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center bg-neutral-100 text-[#888]">
                  <td title="Wins" className="px-2 py-2 ">
                    Trận đấu
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Giờ
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Chủ
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    HDP
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Khách
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Tỷ số
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    HDP
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>03/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Monarcas Morelia</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>B</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Correcaminos UAT</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0-1</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span> 04/02/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Club Chivas Tapatio</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>2-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>H</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Correcaminos UAT</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0-1</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Correcaminos UAT</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0-1</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <thead className="rounded-t-lg dark:bg-gray-700 border border-slate-400 bg-neutral-100">
                <tr className="text-center border border-slate-400 bg-[#de682f]">
                  <td
                    title="Ranking"
                    className="p-3 border-r border-slate-400"
                    colSpan={10}
                  >
                    Atletico La Paz
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center bg-neutral-100 text-[#888]">
                  <td title="Wins" className="px-2 py-2 ">
                    Trận đấu
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Giờ
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Chủ
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    Kèo đầu
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Khách
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Tỷ số
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    HDP
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>24/08/2022</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Atletico La Paz</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>2.5</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Raya2 Expansion</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>1-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>24/08/2022</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Atletico La Paz</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>2.5</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Raya2 Expansion</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>1-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>24/08/2022</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Atletico La Paz</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>2.5</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Raya2 Expansion</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>1-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>24/08/2022</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Atletico La Paz</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>2.5</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Raya2 Expansion</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>1-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>24/08/2022</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Atletico La Paz</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>2.5</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Raya2 Expansion</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>1-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <thead className="rounded-t-lg dark:bg-gray-700 border border-slate-400 bg-neutral-100">
                <tr className="text-center border border-slate-400 bg-[#2495da]">
                  <td
                    title="Ranking"
                    className="p-3 border-r border-slate-400"
                    colSpan={10}
                  >
                    Celaya FC
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center bg-neutral-100 text-[#888]">
                  <td title="Wins" className="px-2 py-2 ">
                    Trận đấu
                  </td>
                  <td title="Losses" className="px-2 py-2 ">
                    Giờ
                  </td>
                  <td title="Win percentage" className="px-2 py-2 ">
                    Chủ
                  </td>
                  <td title="Games behind" className="px-2 py-2">
                    Kèo đầu
                  </td>
                  <td title="Home games" className="px-2 py-2">
                    Khách
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    Tỷ số
                  </td>
                  <td title="Away games" className="px-2 py-2">
                    HDP
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>03/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Monarcas Morelia</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>3-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>B</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Correcaminos UAT</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0-1</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span> 04/02/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Club Chivas Tapatio</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>2-2</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>H</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Correcaminos UAT</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0-1</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-2 py-2 ">
                    <span>MEX</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>13/04/2023</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Correcaminos UAT</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>Celaya FC</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>0-1</span>
                  </td>
                  <td className="px-2 py-2">
                    <span>T</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 3 trận sắp tới */}
      <div className="p-2 mt-10">
        <div className="flex justify-between">
          <h3 className="mt-[20px] text-[#de682f] font-bold">
            Atletico La Paz
          </h3>
          <h2 className="mb-3 text-2xl font-semibold leadi text-center">
            3 trận sắp tới
          </h2>
          <h3 className="mt-[20px] text-[#2495da] font-bold">Celaya FC</h3>
        </div>
        <div className="flex justify-center">
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <tbody className="border-t-2 border-[#e27a48]">
                <tr className="text-center bg-neutral-100 text-[#888]">
                  <td title="Wins" className="px-1 py-2 ">
                    Giải đấu
                  </td>
                  <td title="Losses" className="px-1 py-2 ">
                    Ngày
                  </td>
                  <td title="Win percentage" className="px-1 py-2 ">
                    Kiểu
                  </td>
                  <td title="Games behind" className="px-1 py-2">
                    VS
                  </td>
                  <td title="Home games" className="px-1 py-2">
                    Trận đấu đang
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[50%] overflow-x-auto px-1">
            <table className="min-w-full text-xs table-fixed border border-b border-slate-400">
              <tbody className="border-t-2 border-[#2495da]">
                <tr className="text-center bg-neutral-100 text-[#888]">
                  <td title="Wins" className="px-1 py-2 ">
                    Giải đấu
                  </td>
                  <td title="Losses" className="px-1 py-2 ">
                    Ngày
                  </td>
                  <td title="Win percentage" className="px-1 py-2 ">
                    Kiểu
                  </td>
                  <td title="Games behind" className="px-1 py-2">
                    VS
                  </td>
                  <td title="Home games" className="px-1 py-2">
                    Trận đấu đang
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
                <tr className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-1 py-2 ">
                    <span>Mexico Liga de Expansion MX</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>31/07/2023</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>Khách</span>
                  </td>
                  <td className="px-1 py-2">
                    <span>CSyD Dorados de Sinaloa </span>
                  </td>
                  <td className="px-1 py-2">
                    <span>4 Ngày</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Dữ liệu thống kê mùa giải này */}
      <div className="p-2 mt-10 mb-10">
        <h2 className="mb-3 text-2xl font-semibold leadi text-center">
          Dữ liệu thống kê mùa giải này
        </h2>
        <div className="overflow-x-auto mt-5">
          <div className="flex justify-around bg-[#eaeaea] p-2 text-[#666]">
            <span>Tổng</span>
            <b>Thống kê thành tích</b>
            <span>Chủ/Khách</span>
          </div>
          <div className="flex text-sm">
            <div className="w-[50%] p-3">
              <div className="mt-1">
                <div className="mt-3">
                  <div className="flex justify-between">
                    <span>[6] 35%</span>
                    <span>Thắng</span>
                    <span>64% [11]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[35%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[65%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <span>[3] 17%</span>
                    <span>Hòa</span>
                    <span>23% [4]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[17%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[23%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <span>[8] 47%</span>
                    <span>Bại</span>
                    <span>11% [2]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[47%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[11%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%] p-3">
              <div className="mt-1">
                <div className="mt-3">
                  <div className="flex justify-between">
                    <span>[6] 35%</span>
                    <span>Thắng</span>
                    <span>64% [11]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[35%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[65%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <span>[3] 17%</span>
                    <span>Hòa</span>
                    <span>23% [4]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[17%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[23%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <span>[8] 47%</span>
                    <span>Bại</span>
                    <span>11% [2]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[47%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[11%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-5">
          <div className="flex justify-around bg-[#eaeaea] p-2 text-[#666]">
            <b>Số ghi/mất bàn của đội nhà</b>
            <b>Số ghi/mất bàn của đội khách</b>
          </div>
          <div className="flex justify-between">
            <div className="w-1/6 flex justify-center items-center">
              <Image
                src="/images/teama.png"
                width={100}
                height={100}
                alt=""
                className="p-3 rounded border"
              />
            </div>
            <div className="w-4/6 text-sm text-[#666]">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center"></div>
                  <div className="w-1/5 text-center border p-1">
                    <b>Tổng</b>
                  </div>
                  <div className="w-2/5 flex items-center"></div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>Tổng số được điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>Tổng số mất điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>TB được điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>TB mất điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center"></div>
                  <div className="w-1/5 text-center border p-1">
                    <b>Sân nhà|Sân Khách</b>
                  </div>
                  <div className="w-2/5 flex items-center"></div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>Tổng số được điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>Tổng số mất điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>TB được điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>TB mất điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center"></div>
                  <div className="w-1/5 text-center border p-1">
                    <b>6 trận gần đây</b>
                  </div>
                  <div className="w-2/5 flex items-center"></div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>Tổng số được điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>Tổng số mất điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>TB được điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-2/5 flex justify-end items-center">
                    <span className="mr-3 text-[#de682f] font-semibold">
                      25
                    </span>
                    <div className="bg-[#de682f] h-4 w-[25%] rounded-tl-sm rounded-bl-sm"></div>
                  </div>
                  <div className="w-1/5 text-center border p-1">
                    <span>TB mất điểm</span>
                  </div>
                  <div className="w-2/5 flex items-center">
                    <div className="bg-[#2495da] h-4 w-[29%] rounded-tr-sm rounded-br-sm"></div>
                    <span className="ml-3 text-[#2495da] font-semibold">
                      29
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/6 flex justify-center items-center">
              <Image
                src="/images/teamb.jpg"
                width={100}
                height={100}
                alt=""
                className="p-3 rounded border"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-5">
          <div className=" bg-[#eaeaea] p-2 text-center text-[#666]">
            <b>Thống kê hiệu số bàn thắng</b>
          </div>
          <div className="flex text-[#666] text-sm">
            <div className="w-[50%] p-3">
              <div className="mt-2">
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>[6] 35%</span>
                    <span>Thắng 2 bàn+</span>
                    <span>64% [11]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[35%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[65%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>[3] 17%</span>
                    <span>Thắng 1 bàn+</span>
                    <span>23% [4]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[17%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[23%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>[8] 47%</span>
                    <span>Hòa</span>
                    <span>11% [2]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[47%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[11%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%] p-3">
              <div className="mt-2">
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>[6] 35%</span>
                    <span>Mất 1 bàn</span>
                    <span>64% [11]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[35%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[65%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>[3] 17%</span>
                    <span>Mất 2 bàn+</span>
                    <span>23% [4]</span>
                  </div>
                  <div className="flex">
                    <div className="w-full bg-gray-200 rounded-tl-md rounded-bl-md h-2 dark:bg-gray-700 flex flex-row-reverse">
                      <div className=" bg-[#de682f]  h-2 rounded-tl-md rounded-bl-md w-[17%] "></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-tr-md rounded-br-md h-2  dark:bg-gray-700">
                      <div className="bg-[#2495da] h-2 rounded-tr-md rounded-br-md w-[23%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sosanhkeo;
