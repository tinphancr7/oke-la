import Breadcrumb from "@/components/Breadcrumb";
import SidebarTournament from "@/components/sidebarTournament/SidebarTournament";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import moment from "moment";
import { genDayOfWeekVietnamese } from "@/utils";
import { AuthContext } from "@/context/AuthContext";
import { AiFillStar } from "react-icons/ai";
import IconStar from "@/components/icons/Star";
import RateLeague from "@/containers/Rate/RateLeague";
import { getSeoByLink } from "@/apis/seo";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import parse from "html-react-parser";
import {
  getMatchesByDateWithOdds,
  getMatchesByDateWithOddsGroupLeague,
} from "@/apis/match";
import ReactPaginate from "react-paginate";
import { count } from "console";
import InfiniteScroll from "react-infinite-scroll-component";

function TyLeKeo({ tags }: { tags: string[] }) {
  const sliderRef = useRef<any>(null);
  const [chosenDate, setChosenDate] = useState(moment().format("YYYY-MM-DD"));
  const { user }: any = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(6);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const getScheduleAndResult = async () => {
    try {
      const result = await getMatchesByDateWithOddsGroupLeague(
        1,
        pageSize,
        chosenDate
      );

      setTotalPage(result.data?.totalPage);
      setData(result.data?.matches || {});
      setPageIndex(1);
      if (result.data?.totalPage > pageIndex) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const genDate = useMemo(() => {
    const listDate = [];
    const startWeek = moment().startOf("W").subtract(1, "d");
    for (let i = 0; i <= 13; i++) {
      const temp = startWeek.add(1, "d");
      listDate.push({
        dayOfWeek: genDayOfWeekVietnamese(temp.format("dddd")),
        date: temp.format("DD/MM"),
        dateTime: temp.format("YYYY-MM-DD"),
      });
    }
    return listDate;
  }, []);

  useEffect(() => {
    getScheduleAndResult();
  }, [chosenDate]);

  const handleLoadMore = async (page: number) => {
    try {
      const result = await getMatchesByDateWithOddsGroupLeague(
        page,
        pageSize,
        chosenDate
      );
      setTotalPage(result.data?.totalPage);
      setData((prev) => {
        return {
          ...prev,
          ...result.data?.matches,
        };
      });
      setPageIndex(page);
      if (result.data?.totalPage > pageIndex) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        {tags?.map((tag, index) => (
          <React.Fragment key={index}>{parse(tag)}</React.Fragment>
        ))}
      </Head>
      <section className="container mx-auto md:px-4 xl:px-2">
        <div className="mt-6">
          <Breadcrumb
            backLink="/"
            breadCrumb={[
              { title: "Trang chủ", url: "/" },
              { title: "Tỷ lệ kèo", url: "/ty-le-keo" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 mt-8 gap-5">
          <div className="order-2 lg:order-first col-span-1">
            <SidebarTournament />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="font-bold text-xl">Tỷ lệ kèo</div>
            <div className="league-detail-round mt-8 relative px-[35px]">
              <Swiper
                // @ts-ignore
                ref={sliderRef}
                slidesPerView={7}
                spaceBetween={10}
                initialSlide={genDate?.findIndex(
                  (item) => item.dateTime === chosenDate
                )}
                navigation={false}
              >
                {genDate?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`${
                        chosenDate === item?.dateTime
                          ? `bg-secondary text-white`
                          : "bg-light text-gray9D"
                      } text-center py-2  rounded-lg cursor-pointer`}
                      onClick={() => {
                        setChosenDate(item?.dateTime);
                        setPageIndex(1);
                      }}
                    >
                      <div className="text-sm md:text font-semibold">
                        {item?.dayOfWeek}
                      </div>
                      <div className="mt-1 text-[10px] md:text-[14px] font-bold">
                        {item?.date}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <ButtonOnlyIcon
                onClick={handlePrev}
                wrapperClassName="rounded-full"
                wrapperStyle={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  zIndex: "1000",
                  transform: "translateY(-50%)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    opacity="0.2"
                    d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.387 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                    fill="#A95E01"
                  />
                  <path
                    d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM14.0306 8.78063L10.8103 12L14.0306 15.2194C14.1003 15.2891 14.1556 15.3718 14.1933 15.4628C14.231 15.5539 14.2504 15.6515 14.2504 15.75C14.2504 15.8485 14.231 15.9461 14.1933 16.0372C14.1556 16.1282 14.1003 16.2109 14.0306 16.2806C13.9609 16.3503 13.8782 16.4056 13.7872 16.4433C13.6961 16.481 13.5986 16.5004 13.5 16.5004C13.4015 16.5004 13.3039 16.481 13.2128 16.4433C13.1218 16.4056 13.0391 16.3503 12.9694 16.2806L9.21938 12.5306C9.14965 12.461 9.09433 12.3783 9.05658 12.2872C9.01884 12.1962 8.99941 12.0986 8.99941 12C8.99941 11.9014 9.01884 11.8038 9.05658 11.7128C9.09433 11.6217 9.14965 11.539 9.21938 11.4694L12.9694 7.71937C13.0391 7.64969 13.1218 7.59442 13.2128 7.5567C13.3039 7.51899 13.4015 7.49958 13.5 7.49958C13.5986 7.49958 13.6961 7.51899 13.7872 7.5567C13.8782 7.59442 13.9609 7.64969 14.0306 7.71937C14.1003 7.78906 14.1556 7.87178 14.1933 7.96283C14.231 8.05387 14.2504 8.15145 14.2504 8.25C14.2504 8.34855 14.231 8.44613 14.1933 8.53717C14.1556 8.62822 14.1003 8.71094 14.0306 8.78063Z"
                    fill="#A95E01"
                  />
                </svg>
              </ButtonOnlyIcon>
              <ButtonOnlyIcon
                onClick={handleNext}
                wrapperClassName="rounded-full"
                wrapperStyle={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  zIndex: "1000",
                  transform: "translateY(-50%)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    opacity="0.2"
                    d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.387 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                    fill="#A95E01"
                  />
                  <path
                    d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM14.7806 11.4694C14.8504 11.539 14.9057 11.6217 14.9434 11.7128C14.9812 11.8038 15.0006 11.9014 15.0006 12C15.0006 12.0986 14.9812 12.1962 14.9434 12.2872C14.9057 12.3783 14.8504 12.461 14.7806 12.5306L11.0306 16.2806C10.9609 16.3503 10.8782 16.4056 10.7872 16.4433C10.6961 16.481 10.5986 16.5004 10.5 16.5004C10.4015 16.5004 10.3039 16.481 10.2128 16.4433C10.1218 16.4056 10.0391 16.3503 9.96938 16.2806C9.8997 16.2109 9.84442 16.1282 9.80671 16.0372C9.769 15.9461 9.74959 15.8485 9.74959 15.75C9.74959 15.6515 9.769 15.5539 9.80671 15.4628C9.84442 15.3718 9.8997 15.2891 9.96938 15.2194L13.1897 12L9.96938 8.78063C9.82865 8.63989 9.74959 8.44902 9.74959 8.25C9.74959 8.05098 9.82865 7.86011 9.96938 7.71937C10.1101 7.57864 10.301 7.49958 10.5 7.49958C10.699 7.49958 10.8899 7.57864 11.0306 7.71937L14.7806 11.4694Z"
                    fill="#A95E01"
                  />
                </svg>
              </ButtonOnlyIcon>
            </div>

            <div className="mt-4">
              {/* header */}
              <div className="w-full bg-secondary hidden lg:flex text-white font-semibold text-md">
                <div className="w-[40%] px-4 flex items-center gap-x-6">
                  <IconStar color="#ffffff" />
                  <div>TRẬN ĐẤU</div>
                </div>
                <div className="w-[30%]">
                  <div className="border border-primary text-center w-full py-1">
                    CẢ TRẬN
                  </div>
                  <div className="flex w-full [&>div]:py-1 [&>div]:border-primary">
                    <div className="w-[40%] text-center border-l">Tỷ lệ</div>
                    <div className="w-[40%] text-center border-x">Tài xỉu</div>
                    <div className="w-[20%] text-center border-r">1x2</div>
                  </div>
                </div>
                <div className="w-[30%]">
                  <div className="border border-l-0 border-primary text-center w-full py-1">
                    HIỆP 1
                  </div>
                  <div className="flex w-full [&>div]:py-1 [&>div]:border-primary">
                    <div className="w-[50%] text-center border-r">Tỷ lệ</div>
                    <div className="w-[50%] text-center border-r">Tài xỉu</div>
                  </div>
                </div>
              </div>
              {/* body */}
              <InfiniteScroll
                dataLength={pageIndex * pageSize} //This is important field to render the next data
                next={() => handleLoadMore(pageIndex + 1)}
                hasMore={hasMore}
                loader={<p></p>}
                // below props only if you need pull down functionality
              >
                {Object.keys(data)?.length > 0 ? (
                  <>
                    {Object.keys(data).map((item: any) => (
                      <RateLeague
                        key={item}
                        leagueName={item}
                        league={data?.[item]}
                      />
                    ))}
                  </>
                ) : (
                  <div className="p-4 border text-center font-sm font-semibold">
                    Không tìm thấy trận đấu
                  </div>
                )}
              </InfiniteScroll>
              {/* <ReactPaginate
                containerClassName="react-pagination"
                breakLabel="..."
                nextLabel=">"
                forcePage={pageIndex - 1}
                onPageChange={(value) => setPageIndex(value.selected + 1)}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="<"
                renderOnZeroPageCount={null}
              /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TyLeKeo;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const seo = await getSeoByLink("/ty-le-keo");

    return {
      props: {
        tags: seo?.data?.result?.tags || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
