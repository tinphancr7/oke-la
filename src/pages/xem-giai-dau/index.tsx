import Button from "@/components/button/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiArrowRightSFill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import Heading from "@/components/heading/Heading";
import TableTranscript from "@/components/table-transcript/TableTranscript";
import { BsArrowLeft } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import Pagination from "@/components/pagination/Pagination";
import { paths, schedules, tabs } from "@/constant";

import scheduleApi from "@/apis/schedule.api";
import { findTourName, formatDate } from "@/utils/common";
import Link from "next/link";
import slugify from "slugify";
import useTabs from "@/hooks/useTabs";
import SidebarTournament from "@/components/sidebarTournament/SidebarTournament";
import Breadcrumb from "@/components/Breadcrumb";

const Tournament = () => {
  const { tab, setTab } = useTabs(tabs);
  const [tournamentId, setTournamentId] = useState<number | null>(null);

  const [scheduleId, setScheduleId] = useState("16679");
  const [rankId, setRankId] = useState("4976");
  const [schedulesData, setSchedulesData] = useState([]);

  const getSchedulesData = async () => {
    try {
      const res = await scheduleApi.getSchedulesById(scheduleId, "2023-07-28");

      setSchedulesData(res?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getSchedulesData();
  }, [scheduleId]);

  const handleChooseTournament = (id: number) => {
    if (tournamentId === id) {
      setTournamentId(null);
    } else {
      setTournamentId(id);
    }
  };

  return (
    <div className="xl:container mx-auto md:px-4 xl:px-2">
      <div className="py-6 px-4">
        <Breadcrumb
          backLink="/"
          breadCrumb={[
            { title: "Trang chủ", url: "/" },
            { title: "Lịch thi đấu", url: "/lich-thi-dau" },
          ]}
        />
      </div>
      <div className="flex  lg:inline-flex items-center gap-10 border-b  mb-4 mx-4">
        {tabs.map((item, index) => (
          <div
            key={index}
            onClick={() => setTab(item.nameEn)}
            className={` text-base whitespace-nowrap  pb-1  cursor-pointer transition ${
              tab === item.nameEn
                ? "text-primary  border-b-2 border-primary font-bold"
                : "text-[#BBBBBB]"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div>
        <div className="grid grid-cols-12 gap-5 mt-4">
          <div className="col-span-12 lg:col-span-3">
            <div className="mb-4">
              <div className="w-full p-4 flex-col  h-fit bg-[#f1f1f1] border-[#E4E4E4] border rounded-lg shadow">
                <div className="flex items-center gap-2 pb-6">
                  <div className="w-[80px] h-[80px] relative flex-shrink-0">
                    <Image
                      src={`/images/${
                        findTourName(schedules, Number(scheduleId)).logo
                      }`}
                      fill
                      className="w-full h-full object-fill rounded-full"
                      alt=""
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#000]">
                    Giải bóng đá{" "}
                    {findTourName(schedules, Number(scheduleId)).name}
                  </h3>
                </div>
                <div className="text-base font-normal">
                  <div className="flex items-center justify-between pb-2">
                    <span>Quốc gia:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 relative flex-shrink-0">
                        <Image
                          src={`/images/${
                            findTourName(schedules, Number(scheduleId)).logo
                          }`}
                          fill
                          className="w-full h-full object-contain rounded-full"
                          alt=""
                        />
                      </div>
                      <span className="capitalize">
                        {findTourName(schedules, Number(scheduleId)).nameVi}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span>Mùa giải</span>
                    <Button
                      type="button"
                      className="bg-primary text-white font-normal px-[10px] py-1"
                      icon={RiArrowDownSFill}
                    >
                      2020 -2023
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span>Cầu thủ</span>
                    <span>702</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span>Cầu thủ ngoại</span>
                    <span>265</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span>Số lượng đội</span>
                    <span>702</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span>Giá trị thị trường ($)</span>
                    <span>10.45125 B</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:block hidden">
              <SidebarTournament />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            {/* <div className="rounded-xl shadow bg-[#F1F1F1] border border-[#E4E4E4] p-4 mb-6">
              <Heading className=" pb-5">Vòng</Heading>
              <div className="w-full pb-4 lg:block hidden">
                <Pagination pageSize={10} totalPage={10} setPageIndex={10} />
              </div>
              <div className="w-full pb-4 lg:hidden block">
                <Pagination pageSize={5} totalPage={5} setPageIndex={10} />
              </div>
              <div>
                <Heading className="">Trận cầu vòng 28</Heading>
                <div>
                  {schedulesData?.length === 0 ? (
                    <div className="flex items-center justify-center text-red-500 font-semibold text-base uppercase">
                      không có dữ liệu
                    </div>
                  ) : (
                    schedulesData?.map((schedule: any, index: number) => (
                      <div key={index} className="bg-white w-full border-b">
                        <div className="flex items-center p-4 ">
                          <div className="text-xs text-black11 w-[20%] flex items-center flex-col lg:flex-row gap-1">
                            {formatDate(schedule?.matchTime)}
                          </div>
                          <div className="flex items-center justify-center text-xs font-normal text-black11 w-[60%] gap-4 flex-col lg:flex-row">
                            <div className="flex items-center gap-2 w-[45%] justify-end">
                              <span className="hidden lg:block">
                                {schedule?.homeName}
                              </span>
                              <div className="w-7 h-7 bg-[#F4F5F6] rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 relative flex-shrink-0">
                                  <Image
                                    src={schedule?.homeIcon}
                                    fill
                                    className="w-full h-full object-fill"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <span className="hidden lg:inline-flex items-center justify-center w-[10%]">
                              v
                            </span>
                            <div className="flex items-center gap-2 w-[45%] ">
                              <div className="w-7 h-7 bg-[#F4F5F6] rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 relative flex-shrink-0">
                                  <Image
                                    src={schedule?.awayIcon}
                                    fill
                                    className="w-full h-full object-fill"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <span>{schedule?.awayName}</span>
                            </div>
                          </div>
                          <div className="w-[20%] flex items-center justify-end">
                            <div className="text-black00 text-xs font-bold border-b inline-flex border-black00 ">
                              Chi tiết
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div> */}
            <div className="rounded-xl shadow bg-[#F1F1F1] border border-[#E4E4E4] p-4 mb-6">
              <Heading className="pb-4">Bảng xếp hạng hiện tại</Heading>
              <TableTranscript status="all" rankId={rankId} />
            </div>
            <div className="lg:hidden ">
              <SidebarTournament />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
