import { getTipByUserOrGroup, getUserForTip } from "@/apis/tip";
import { getRankTable } from "@/apis/user";
import Breadcrumb from "@/components/Breadcrumb";
import DetailGroup from "@/components/DetailGroup";
import DifferentGroup from "@/components/DiffGroup";
import HotMember from "@/components/HotMember";
import TipUser from "@/components/TipUser";
import RankHomeItem from "@/containers/Home/RankHomeItem";
import TipHomeItem from "@/containers/Home/TipHomeItem";
import { AuthContext } from "@/context/AuthContext";
import { IRank, ITip, IUser } from "@/interfaces";
import { Listbox, Transition } from "@headlessui/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi";

type Props = {
  tip: ITip[];
  type: string;
  ranks: IRank[];
};
const option = [
  { id: 1, value: "createdAt", label: "Thời gian" },
  { id: 2, value: "createdAt", label: "Thời gian sẽ chữa lành mọi vết thương" },
  { id: 3, value: "createdAt", label: "Thứ giết chết chúng ta là kỷ niệm" },
];

const listHotMember = [
  {
    id: 0,
    name: "Bach",
    avatar: "/images/ellipse-12.png",
    rank: 8,
    contribute: 156100,
  },
  {
    id: 1,
    name: "Bach",
    avatar: "/images/ellipse-12.png",
    rank: 7,
    contribute: 156100,
  },
  {
    id: 2,
    name: "Bach",
    avatar: "/images/ellipse-12.png",
    rank: 6,
    contribute: 156100,
  },
  {
    id: 3,
    name: "Bach",
    avatar: "/images/ellipse-12.png",
    rank: 5,
    contribute: 156100,
  },
  {
    id: 4,
    name: "Bach",
    avatar: "/images/ellipse-12.png",
    rank: 4,
    contribute: 156100,
  },
];

const TipsOfUserOrGroup = ({ type, tip, ranks }: Props) => {
  const {
    user: authUser,
    isOpen,
    setIsOpen: setOpenLogin,
  } = useContext(AuthContext);

  const [commentFilter, setCommentFilter] = useState(option[0]);
  const router = useRouter();

  const handleCreatePost = () => {
    if (authUser) {
      router.push(`/tips/dang-bai/${router.query?.user}`);
    } else {
      setOpenLogin(true);
    }
  };
  return (
    <div className="match-list-detail mt-4 xl:container mx-auto">
      <div className="match-list-detail-header ml-4 md:ml-0">
        <Breadcrumb
          backLink="/"
          breadCrumb={[
            { title: "Trang chủ", url: "/truc-tiep" },
            { title: "TIPS Bóng đá", url: "/truc-tiep" },
          ]}
        />
      </div>

      <div className="grid grid-cols-4 gap-x-5 mt-4">
        {type === "user" ? (
          <div className="col-span-4 md:col-span-1 flex flex-col gap-5 md:px-0 px-4">
            <TipUser userId={router.query.user as string} />
            {tip?.length > 0 && (
              <div className="h-fit px-4 py-4 bg-neutral-100 md:hidden ">
                {tip?.map((tip) => (
                  <TipHomeItem key={tip._id} tip={tip} />
                ))}
              </div>
            )}
            <div className="bg-neutral-100 px-4 py-4">
              <div>
                <h5 className="text-black text-lg font-bold">Bảng xếp hạng</h5>
              </div>
              <div className="mt-4">
                {ranks?.map((item, index) => (
                  <RankHomeItem
                    index={index + 1}
                    user={item as any}
                    key={item?._id}
                    border={false}
                  />
                ))}
              </div>
              <button className="flex w-full rounded border border-amber-500 justify-center items-center gap-2 text-amber-500 text-sm font-semibold py-2">
                Xem thêm
              </button>
            </div>
          </div>
        ) : type === "group" ? (
          <div className="col-span-4 md:col-span-1 flex flex-col md:px-0 px-4">
            <DetailGroup groupId={router.query?.user as string} />

            {tip?.length > 0 && (
              <div className="h-fit px-4 py-4 bg-neutral-100 md:hidden mt-4">
                {tip?.map((tip) => (
                  <TipHomeItem key={tip._id} tip={tip} />
                ))}
              </div>
            )}
            <HotMember groupId={router.query?.user as string} />
            <DifferentGroup groupId={router.query?.user as string} />
          </div>
        ) : null}
        <div className="col-span-4 md:col-span-3 flex-col gap-4 hidden md:flex">
          {type === "group" && (
            <div className="w-full flex justify-between items-start md:px-0 px-4">
              <div className="w-1/2">
                <div className="flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center w-1/3">
                    <p className="text-gray-400 text-sm font-medium leading-[21px]">
                      Sắp xếp theo
                    </p>
                  </div>
                  <div className="w-full">
                    <Listbox value={commentFilter} onChange={setCommentFilter}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-neutral-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="text-black text-[11px] font-normal">
                            {commentFilter.label}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiChevronDown
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {option.map((opt) => (
                              <Listbox.Option
                                key={opt.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-2 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={opt}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {opt.label}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 right-1 flex items-center pl-3 text-amber-600">
                                        <HiCheck
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-4">
                <button
                  onClick={handleCreatePost}
                  className="h-10 p-2 bg-orange-500 rounded-lg justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="w-6 h-6 justify-center items-center flex">
                    <img
                      src="/images/Pen.svg"
                      className="w-6 h-6 relative"
                      alt=""
                    />
                  </div>
                  <span className="text-center text-white text-sm font-semibold">
                    Đăng bài TIPS
                  </span>
                </button>
              </div>
            </div>
          )}
          {tip?.length > 0 && (
            <div className="h-fit  px-4 py-4 bg-neutral-100 ">
              {tip?.map((tip) => (
                <TipHomeItem key={tip._id} tip={tip} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TipsOfUserOrGroup;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  try {
    const [tipRes, rankRes] = await Promise.all([
      getTipByUserOrGroup(params?.user as string),
      getRankTable(),
    ]);
    return {
      props: {
        tip: tipRes.data?.result.result,
        type: tipRes.data?.result.type,
        ranks: rankRes?.data?.result?.data || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
