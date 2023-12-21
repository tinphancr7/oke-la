import { schedules } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

const SidebarWager = () => {
  return (
    <div className="w-full p-4 flex-col  h-fit bg-[#f1f1f1] border-[#E4E4E4] border rounded-lg shadow">
      <h3 className="text-xl font-bold pb-2">Soi kèo theo giải đấu</h3>
      {schedules.map((item, index) => (
        <div key={index}>
          <div className="flex items-center justify-between py-2 transition-all">
            <Link
              href={`/soi-keo/giai-dau/${slugify(item?.name).toLowerCase()}-${
                item?.id
              }`}
              className="flex items-center gap-2 "
            >
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image
                  src={`/images/${item.logo}`}
                  fill
                  className="w-full h-full object-fill rounded-full"
                  alt=""
                />
              </div>
              <span className="capitalize font-semibold text-base">
                {item?.name}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarWager;
