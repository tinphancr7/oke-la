import { getMyTip, getTipByUserOrGroup } from "@/apis/tip";
import ButtonSelectProfile from "@/components/ButtonSelectProfile";
import TipHomeItem from "@/containers/Home/TipHomeItem";
import { ITip } from "@/interfaces";
import ProfileLayout from "@/layouts/ProfileLayout";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const MyDiamond = () => {
  const [tab, setTab] = useState("all");
  const [userTips, setUserTips] = useState<ITip[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getUserTips = async () => {
    try {
      const tips = await getMyTip();
      setUserTips(tips.data?.result?.result || []);
      setTotalPage(tips.data?.result?.totalPage || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTips();
  }, [pageSize, pageIndex]);
  return (
    <div className="w-full col-span-8">
      <h5 className="text-lg font-bold text-black pb-6">Tips của bạn</h5>
      {userTips?.map((item) => (
        <TipHomeItem key={item._id} tip={item} />
      ))}
      <ReactPaginate
        className="flex tips-pagination justify-center"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(selectd) => setPageIndex(selectd.selected)}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
      <div className="flex gap-4 md:hidden">
        <ButtonSelectProfile
          onClick={() => setTab("all")}
          isSelect={tab === "all"}
          label={"Tất cả"}
        />
        <ButtonSelectProfile
          onClick={() => setTab("tip")}
          isSelect={tab === "tip"}
          label={"Tips"}
        />
        <ButtonSelectProfile
          onClick={() => setTab("discussion")}
          isSelect={tab === "discussion"}
          label={"Thảo luận"}
        />
      </div>
    </div>
  );
};
MyDiamond.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;

export default MyDiamond;
