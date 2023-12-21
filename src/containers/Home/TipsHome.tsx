import Link from "next/link";
import React from "react";
import TipHomeItem from "./TipHomeItem";
import { ITip } from "@/interfaces";

interface Props {
  tips: ITip[];
}

function TipsHome({ tips }: Props) {
  return (
    <div className="mt-4 w-full tips-home px-2 py-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-lg">Tips bóng đá</h4>
        <Link className="text-md font-semibold text-secondary" href={"/tips"}>
          Xem thêm
        </Link>
      </div>

      <div>
        {tips?.map((item) => (
          <TipHomeItem key={item?._id} tip={item} />
        ))}
      </div>
    </div>
  );
}

export default TipsHome;
