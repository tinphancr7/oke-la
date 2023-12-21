import { getMatchById } from "@/apis/match";
import {
  createComment,
  disLikeTip,
  getTipBySlug,
  getUserForTip,
  likeTip,
} from "@/apis/tip";
import { getRankTable } from "@/apis/user";
import Breadcrumb from "@/components/Breadcrumb";
import BuyTip from "@/components/BuyTip";
import TipUser from "@/components/TipUser";
import Avatar from "@/components/avatar";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import IconComment from "@/components/icons/Commtent";
import IconLike from "@/components/icons/Like";
import ImageWithFallback from "@/components/imageWithFallback";
import RankUser from "@/components/rank";
import { LOGO_DEFAULT } from "@/constant";
import RankHomeItem from "@/containers/Home/RankHomeItem";
import { AuthContext } from "@/context/AuthContext";
import { IComment, ITip, IUser } from "@/interfaces";
import { formatKMBT, generateMatchTime, isPlayingMatches } from "@/utils";
import { Listbox, Transition } from "@headlessui/react";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";

import { HiCheck, HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";

type Props = {
  tip: ITip;
  rank: any;
};

const option = [
  { id: 1, value: "createdAt", label: "Thời gian" },
  { id: 2, value: "createdAt", label: "Thời gian sẽ chữa lành mọi vết thương" },
  { id: 3, value: "createdAt", label: "Thứ giết chết chúng ta là kỷ niệm" },
];

const OddTitle = [
  { initialHome: "Chủ", initialHandicap: "HDP", initialAway: "Khách" },
  { initialOver: "Tài", initialHandicap: "T/X", initialUnder: "Xỉu" },
];

const TipDetail = ({ tip, rank }: Props) => {
  const [commentFilter, setCommentFilter] = useState(option[0]);
  const [comments, setComments] = useState(tip?.comment || []);
  const [likes, setLikes] = useState<string[]>(tip?.likes);
  const [commentContent, setCommentContent] = useState<string>();
  const [match, setMatch] = useState<any>();

  const { user: authUser } = useContext(AuthContext);

  const getDetailMatch = async (matchId: string) => {
    try {
      const res = await getMatchById(matchId);
      setMatch(res.data?.match[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tip?.matchId) getDetailMatch(tip?.matchId);
  }, [tip]);

  const handleComment = async () => {
    try {
      if (commentContent?.trim().length !== 0) {
        const data = {
          tip: tip?._id,
          content: commentContent as string,
        };
        const res = await createComment(data);

        if (res.data?.status === 1) {
          setComments([...(comments as IComment[]), res.data?.result]);
          setCommentContent("");
          toast.success("Bình luận thành công");
        } else {
          toast.error("Bình luận thất bại");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Bình luận thất bại");
    }
  };

  const handleLike = async () => {
    try {
      const res = await likeTip(tip?._id);
      if (res.data?.status === 1) {
        setLikes([...likes, res.data?.result.user]);
      }
    } catch (error) {}
  };
  const handleDisLike = async () => {
    try {
      const res = await disLikeTip(tip?._id);
      if (res.data?.status === 1) {
        setLikes(likes.filter((u) => u !== authUser?._id));
      }
    } catch (error) {}
  };

  return (
    <div className="match-list-detail mt-4 md:container mx-auto md:px-4 xl:px-2">
      <div className="match-list-detail-header">
        <Breadcrumb
          backLink="/tips"
          breadCrumb={[
            { title: "Trang chủ", url: "/" },
            { title: "TIPS Bóng đá", url: "/tips" },
          ]}
        />
      </div>
      <div className="grid md:grid-cols-4 gap-x-5 mt-4">
        <div className="md:col-span-3 col-span-4 w-full">
          <div className="border-b-2">
            <div className="w-full">
              <h1 className="text-black text-[32px] font-bold capitalize leading-[48px]">
                {tip?.title}
              </h1>
            </div>

            <div className="w-full mt-2">
              <span className="text-gray-400 text-xs font-medium mr-2">
                {moment(tip?.createdAt).format("DD/MM/YYYY")}
              </span>
              <span className="text-gray-400 text-xs font-medium">Nhóm :</span>
              <Link
                href={`/${tip?.group._id}/tips`}
                className="text-yellow-700 text-xs font-bold"
              >
                {tip?.group.groupName}
              </Link>
            </div>
            {match && (
              <div className="w-full mt-2 bg-neutral-100 px-4 py-4 rounded-lg">
                <span className="text-gray-400 text-xs font-medium mr-2">
                  {moment.unix(match?.matchTime).format("DD/MM/YYYY HH:mm")}
                </span>
                <span className="text-yellow-700 text-xs font-bold">
                  {match?.leagueName}
                </span>
                <div className="py-2">
                  <div className="flex items-center gap-12">
                    <div className=" flex-1 flex justify-end items-center gap-2 md:gap-8 flex-col md:flex-row">
                      <ImageWithFallback
                        src={match?.homeIcon}
                        width={48}
                        height={48}
                        alt="logo"
                        className="rounded-full"
                      />
                      <p className="text-[16px] md:text-[24px]">
                        <span className="font-bold">{match?.homeName}</span>
                        <span className="text-[#9DA5AC] ml-2"></span>
                      </p>
                    </div>
                    <div className="match-list-detail-score">
                      <p className="text-time-red text-center">
                        {isPlayingMatches(match?.status)
                          ? generateMatchTime(
                              match.matchTime,
                              match.status,
                              match.halfStartTime
                            )
                          : ""}
                      </p>
                      <div className="match-list-detail-score">
                        <p className=" text-[#9DA5AC] text-[24px] text-center">
                          {isPlayingMatches(match?.status) || match.status == -1
                            ? `${match.homeScore} - ${match.awayScore}`
                            : "? - ?"}
                        </p>
                      </div>
                    </div>
                    <div className="match-list-detail-team-away flex-1 flex items-center  md:gap-8 gap-2 md:flex-row flex-col-reverse">
                      <p className="match-list-detail-team-away-name text-[16px] md:text-[24px]">
                        <span className="font-bold">{match?.awayName}</span>
                        <span className="text-[#9DA5AC] ml-2"></span>
                      </p>
                      <ImageWithFallback
                        src={match?.awayIcon}
                        width={48}
                        height={48}
                        alt="logo"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
                {tip?.odd && tip.odd?.type === 0 ? (
                  <div className="grid grid-cols-3 gap-2 md:gap-10 text-sm md:px-5 px-2">
                    <div
                      className={`col-span-1 w-full flex justify-center rounded-md border h-[40px] items-center ${
                        tip?.odd?.choosen === "initialHome"
                          ? "text-white text-sm font-normal bg-amber-500 border-yellow-700"
                          : "bg-neutral-200 border-zinc-100 "
                      }`}
                    >
                      {`${OddTitle[0].initialHome} ${tip?.odd?.initialHome}`}
                    </div>
                    <div
                      className={`col-span-1 w-full flex justify-center rounded-md border h-[40px] items-center ${
                        tip?.odd?.choosen === "initialHandicap"
                          ? "text-white text-sm font-normal bg-amber-500 border-yellow-700"
                          : "bg-neutral-200 border-zinc-100 "
                      }`}
                    >
                      {`${OddTitle[0].initialHandicap} ${tip?.odd?.initialHandicap}`}
                    </div>
                    <div
                      className={`col-span-1 w-full flex justify-center rounded-md border  h-[40px] items-center ${
                        tip?.odd?.choosen === "initialAway"
                          ? "text-white text-sm font-normal bg-amber-500 border-yellow-700"
                          : " bg-neutral-200 border-zinc-100 "
                      }`}
                    >
                      {`${OddTitle[0].initialAway} ${tip?.odd?.initialAway}`}
                    </div>
                  </div>
                ) : tip.odd?.type === 1 ? (
                  <div className="grid grid-cols-3 gap-2 md:gap-10 text-sm md:px-5 px-2">
                    <div
                      className={`col-span-1 w-full flex justify-center rounded-md border h-[40px] items-center ${
                        tip?.odd?.choosen === "initialOver"
                          ? "text-white text-sm font-normal bg-amber-500 border-yellow-700"
                          : "bg-neutral-200 border-zinc-100 "
                      }`}
                    >
                      {`${OddTitle[1].initialOver} ${tip?.odd?.initialOver}`}
                    </div>
                    <div
                      className={`col-span-1 w-full flex justify-center rounded-md border h-[40px] items-center ${
                        tip?.odd?.choosen === "initialHandicap"
                          ? "text-white text-sm font-normal bg-amber-500 border-yellow-700"
                          : "bg-neutral-200 border-zinc-100 "
                      }`}
                    >
                      {`${OddTitle[1].initialHandicap} ${tip?.odd?.initialHandicap}`}
                    </div>
                    <div
                      className={`col-span-1 w-full flex justify-center rounded-md border  h-[40px] items-center ${
                        tip?.odd?.choosen === "initialUnder"
                          ? "text-white text-sm font-normal bg-amber-500 border-yellow-700"
                          : " bg-neutral-200 border-zinc-100 "
                      }`}
                    >
                      {`${OddTitle[1].initialUnder} ${tip?.odd?.initialUnder}`}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
            <div
              className="mt-6 text-justify"
              dangerouslySetInnerHTML={{ __html: tip?.content }}
            ></div>
            <div className="my-6 w-full flex justify-end items-center gap-6">
              <div className="flex items-center gap-1">
                {likes?.includes(authUser?._id) ? (
                  <ButtonOnlyIcon onClick={handleDisLike}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M1.99951 6.5H4.99951V13H1.99951C1.8669 13 1.73973 12.9473 1.64596 12.8536C1.55219 12.7598 1.49951 12.6326 1.49951 12.5V7C1.49951 6.86739 1.55219 6.74021 1.64596 6.64645C1.73973 6.55268 1.8669 6.5 1.99951 6.5V6.5Z"
                        stroke="#a95e01"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.99951 6.5L7.49951 1.5C7.76216 1.5 8.02223 1.55173 8.26488 1.65224C8.50753 1.75275 8.72801 1.90007 8.91372 2.08579C9.09944 2.2715 9.24676 2.49198 9.34727 2.73463C9.44778 2.97728 9.49951 3.23736 9.49951 3.5V5H13.3667C13.5085 5 13.6487 5.03015 13.7779 5.08846C13.9072 5.14677 14.0226 5.2319 14.1164 5.3382C14.2102 5.4445 14.2804 5.56954 14.3222 5.70502C14.3641 5.84051 14.3766 5.98334 14.359 6.12403L13.609 12.124C13.5788 12.3659 13.4613 12.5884 13.2785 12.7497C13.0958 12.911 12.8605 13 12.6167 13H4.99951"
                        stroke="#a95e01"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </ButtonOnlyIcon>
                ) : (
                  <ButtonOnlyIcon onClick={handleLike}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M1.99951 6.5H4.99951V13H1.99951C1.8669 13 1.73973 12.9473 1.64596 12.8536C1.55219 12.7598 1.49951 12.6326 1.49951 12.5V7C1.49951 6.86739 1.55219 6.74021 1.64596 6.64645C1.73973 6.55268 1.8669 6.5 1.99951 6.5V6.5Z"
                        stroke="#9DA5AC"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.99951 6.5L7.49951 1.5C7.76216 1.5 8.02223 1.55173 8.26488 1.65224C8.50753 1.75275 8.72801 1.90007 8.91372 2.08579C9.09944 2.2715 9.24676 2.49198 9.34727 2.73463C9.44778 2.97728 9.49951 3.23736 9.49951 3.5V5H13.3667C13.5085 5 13.6487 5.03015 13.7779 5.08846C13.9072 5.14677 14.0226 5.2319 14.1164 5.3382C14.2102 5.4445 14.2804 5.56954 14.3222 5.70502C14.3641 5.84051 14.3766 5.98334 14.359 6.12403L13.609 12.124C13.5788 12.3659 13.4613 12.5884 13.2785 12.7497C13.0958 12.911 12.8605 13 12.6167 13H4.99951"
                        stroke="#9DA5AC"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </ButtonOnlyIcon>
                )}
                <span className="text-xs text-secondary-light">
                  {formatKMBT(likes.length || 0)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.83443 12.6173L2.82174 14.3092C2.74886 14.3705 2.65999 14.4097 2.5656 14.4222C2.47121 14.4347 2.37521 14.4199 2.2889 14.3797C2.20258 14.3395 2.12954 14.2755 2.07836 14.1952C2.02719 14.1149 2 14.0217 2 13.9265V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15617C5.03847 12.5 4.92453 12.5415 4.83443 12.6173Z"
                    stroke="#9DA5AC"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75Z"
                    fill="#9DA5AC"
                  />
                  <path
                    d="M5 8.75C5.41421 8.75 5.75 8.41421 5.75 8C5.75 7.58579 5.41421 7.25 5 7.25C4.58579 7.25 4.25 7.58579 4.25 8C4.25 8.41421 4.58579 8.75 5 8.75Z"
                    fill="#9DA5AC"
                  />
                  <path
                    d="M11 8.75C11.4142 8.75 11.75 8.41421 11.75 8C11.75 7.58579 11.4142 7.25 11 7.25C10.5858 7.25 10.25 7.58579 10.25 8C10.25 8.41421 10.5858 8.75 11 8.75Z"
                    fill="#9DA5AC"
                  />
                </svg>
                <span className="text-xs text-secondary-light">
                  {formatKMBT((comments as IComment[]).length || 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full flex justify-between items-center">
              <p className="text-black text-lg font-bold">
                Bình Luận {"("}
                <span>{(tip?.comment as IComment[]).length || 0}</span>
                {")"}
              </p>
              <div className="flex justify-end items-center gap-2 w-1/2">
                <div className="flex justify-end items-center w-full">
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
            <div className="mt-6">
              {authUser && (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <Avatar src={authUser?.avatar} />
                    <input
                      type="text"
                      name=""
                      id=""
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="p-4 bg-neutral-100 rounded-lg gap-3 outline-none w-full text-gray-400 text-sm font-semibold leading-[21px]"
                      placeholder="Nhập bình luận"
                    />
                  </div>
                  <div className="flex w-full justify-end items-center">
                    <button
                      onClick={handleComment}
                      className="flex px-4 py-2 bg-yellow-700 rounded justify-start items-center gap-2 text-white text-sm font-medium"
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </div>
              )}
              {(comments as IComment[]).map((comment) => (
                <div
                  key={comment?._id}
                  className="flex justify-start items-start gap-4 mb-10"
                >
                  <div>
                    <Avatar src={comment?.user.avatar} />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Link
                        href={`/${comment?.user._id}/tips`}
                        className="text-amber-500 text-base font-semibold"
                      >
                        {comment?.user.full_name}
                      </Link>
                      <RankUser rank={comment?.user.level} />
                      <p className="text-neutral-400 text-xs font-medium">
                        {moment(comment?.createdAt).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div
                      className="text-black text-sm font-medium"
                      dangerouslySetInnerHTML={{ __html: comment?.content }}
                    ></div>
                    <div className=" w-full flex  items-center gap-6">
                      <div className="flex items-center gap-1">
                        <IconLike />
                        <span className="text-xs text-secondary-light">
                          {formatKMBT((tip?.like as number) || 0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconComment />
                        <span className="text-xs text-secondary-light">
                          {formatKMBT((tip?.comment as IComment[]).length || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-1 col-span-4 w-full">
          <div>
            <TipUser userId={tip?.user._id} />
          </div>
          <div className="mt-5">
            <BuyTip userId={tip?.user._id} />
          </div>
          <div className="mt-5">
            <div className="bg-neutral-100 px-4 py-4">
              <div>
                <h5 className="text-black text-lg font-bold">Bảng xếp hạng</h5>
              </div>
              <div className="mt-4">
                {rank?.map((item: any, index: number) => (
                  <RankHomeItem
                    user={item}
                    index={index + 1}
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
        </div>
      </div>
    </div>
  );
};

export default TipDetail;

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const { slug } = query;

    const [tipRes, rank] = await Promise.all([
      getTipBySlug(slug as string),
      getRankTable(),
    ]);

    return {
      props: {
        tip: tipRes.data?.result,
        rank: rank?.data?.result?.data,
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
