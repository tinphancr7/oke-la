import Avatar from "@/components/avatar";
import IconComment from "@/components/icons/Commtent";
import IconEye from "@/components/icons/Eye";
import IconLike from "@/components/icons/Like";
import { IComment, ITip } from "@/interfaces";
import { formatKMBT } from "@/utils";
import moment from "moment";
import Link from "next/link";
import React from "react";

type Props = {
  // isLast?: boolean;
  tip: ITip;
};

function TipHomeItem({ tip }: Props) {
  return (
    <div className={`mt-4 border-b pb-4 last:border-b-0 p-2`}>
      {/* <div className={`mt-4 ${!isLast ? "border-b pb-4" : ""}`}> */}
      {/* user info */}
      <div className="flex gap-x-2">
        <Avatar size="2rem" src={tip?.user?.avatar} />
        <div>
          <Link
            href={`/${tip?.user?._id}/tips`}
            className="text-secondary font-semibold text-sm leading-normal"
          >
            {tip?.user?.full_name}
          </Link>
          <div className="flex gap-x-2 text-xs text-secondary-light">
            <div>{moment(tip?.createdAt).format("DD/MM/YYYY")}</div>
            {tip?.group && (
              <div>
                <span>Nhóm: </span>
                <Link
                  href={`/${tip?.group?._id}/tips`}
                  className="font-semibold text-secondary"
                >
                  {tip?.group?.groupName}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* content */}
      <div className="p-2 bg-white mt-2 text-md font-semibold">
        <Link href={`/tips/${tip?.slug}`}>{tip?.title}</Link>
      </div>

      {/* contact */}
      <div className="mt-2 flex items-center justify-end gap-x-4">
        <div className="flex items-center gap-x-0.5">
          <IconEye />
          <span className="text-xs text-secondary-light">
            {formatKMBT(tip?.view || 0)}
          </span>
        </div>

        <div className="flex items-center gap-x-0.5">
          <IconComment />
          <span className="text-xs text-secondary-light">
            {formatKMBT((tip?.comment as number) || 0)}
          </span>
        </div>

        <div className="flex items-center gap-x-0.5">
          <IconLike />
          <span className="text-xs text-secondary-light">
            {formatKMBT((tip?.like as number) || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TipHomeItem;
