import Image from "next/image";
import React from "react";
import { schedules } from "@/constant/index";

type Props = {};

const Favoured = (props: Props) => {
  return (
    <section className="xl:container container  mx-auto flex items-center justify-center md:px-4 xl:px-2">
      <div className="mt-7 w-full flex justify-center">
        <div className="sm:flex hidden">
          <img
            src="/images/favoured-banner1.png"
            alt=""
            className="w-[187px] h-[471px] bg-zinc-300 rounded-2xl "
          />
        </div>
        <div className="flex flex-1 flex-col mx-5">
          <div className="flex flex-col w-fit">
            <h5 className="text-center text-yellow-700 text-lg font-semibold leading-normal">
              Giải đấu yêu thích
            </h5>
            <div className="w-full pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="4"
                viewBox="0 0 140 4"
                fill="none"
                className="w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 2H138"
                  stroke="#A95E01"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap gap-3 mt-6 justify-center">
            {schedules.map((item) => (
              <div
                key={item.id}
                className="flex xl:w-[48%] lg:w-[47%] md:w-[95%] w-[100%] h-24 p-4 bg-zinc-100 rounded-2xl shadow border border-neutral-200 justify-center items-center gap-2.5 "
              >
                <div>
                  <img
                    className="w-[56px] h-[56px] rounded-full object-cover"
                    src={`/images/${item.logo}`}
                    alt=""
                  />
                </div>
                <div className="flex flex-1 justify-center">
                  <p className="text-zinc-950 text-base font-normal leading-norma text-center">
                    {item.name}
                  </p>
                </div>
                <div>
                  <img src="/images/star.svg" alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:flex hidden">
          <img
            src="/images/favoured-banner2.png"
            alt=""
            className="w-[187px] h-[471px] bg-zinc-300 rounded-2xl "
          />
        </div>
      </div>
    </section>
  );
};

export default Favoured;
