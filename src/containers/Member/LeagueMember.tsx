import { LOGO_DEFAULT, topLeague } from "@/constant";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

type Props = {
  favouriteLeague: any[];
};

function LeagueMember({ favouriteLeague }: Props) {
  return (
    <div className="col-span-12 lg:col-span-3 order-5 lg:order-4">
      <div className="shadow h-fit">
        <div className="bg-secondary border-l-[20px] border-primary p-1 text-md font-bold text-white rounded-t-[4px]">
          GIẢI CỦA TÔI
        </div>
        <div>
          {favouriteLeague?.length === 0 ? (
            <div className="text-center py-4 text-sm lg:text-lg font-semibold">
              Không có giải đấu
            </div>
          ) : (
            <>
              {favouriteLeague?.map((item) => (
                <div key={item.leagueId} className="border-t py-2 px-4">
                  <Link
                    href={`/xem-giai-dau/${slugify(item?.name).toLowerCase()}-${
                      item?.leagueId
                    }`}
                    className="flex items-center gap-4 w-fit hover:underline"
                  >
                    <img src={item.logo || LOGO_DEFAULT} alt="" className="h-[24px] w-[24px]" />

                    <span className="text-semibold text-sm">{item.name}</span>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* <div className="shadow h-fit mt-4">
        <div className="bg-secondary border-l-[20px] border-primary p-1 text-md font-bold text-white rounded-t-[4px]">
          ĐỘI CỦA TÔI
        </div>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="border-t py-2 px-4">
              <Link
                href={"/"}
                className="flex items-center gap-4 w-fit hover:underline"
              >
                <img
                  src="http://localhost:3000/images/logo-default.png"
                  alt=""
                  className="h-[24px] w-[24px]"
                />

                <span className="text-semibold text-sm">Chelsea</span>
              </Link>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default LeagueMember;
