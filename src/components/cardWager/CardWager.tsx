import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconLiveStream from "../icons/LiveStream";
import { twMerge } from "tailwind-merge";
import IconLiveStream2 from "../icons/LiveStream2";
import slugify from "slugify";
import moment from "moment";

interface ICardWager {
  classNameImg?: string;
  isLive?: boolean;
  className?: string;
  isPrimary?: boolean;
  type?: "primary" | "secondary";
  thumbnail?: string;
  title?: string;
  time?: string;
  card?: string;
  slug?: string;
}
const CardWager = ({
  classNameImg,
  isLive = true,
  className,
  isPrimary = false,
  type = "primary",
  thumbnail,
  title,
  time,
  slug,
}: ICardWager) => {
  return (
    <div className={`w-full h-fit ${className}`}>
      {type === "primary" ? (
        <>
          <Link
            href={`/soi-keo/${slug}`}
            className={twMerge(
              `w-full block h-[164px] relative ${classNameImg}`
            )}
          >
            <Image
              src={
                thumbnail
                  ? `https://cdn.okchoi.com/okchoi/${thumbnail}`
                  : "/images/card.png"
              }
              className="w-full h-full object-fill rounded-lg"
              fill
              alt=""
            />
            {/* {isLive && (
              <div className="absolute bottom-3 left-3 z-10">
                <Link href={"/truc-tiep"}>
                  <button className="bg-brand-red p-2 rounded-lg gap-x-1 flex items-center">
                    <IconLiveStream />
                    <span className="text-white text-xs font-semibold">
                      Trực tiếp
                    </span>
                  </button>
                </Link>
              </div>
            )} */}
          </Link>
          <Link href={`/soi-keo/${slug}`}>
            <div>
              <div className="text-xs font-normal text-gray9D py-2">
                {moment(time).locale("vi").fromNow()}
              </div>
              <p
                className={twMerge(
                  `line-clamp-2 text-base font-semibold text-black ${
                    isPrimary ? "text-2xl font-bold" : ""
                  }`
                )}
              >
                {title}
              </p>
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="w-[100px] h-[56px] relative flex-shrink-0">
              <Image
                src="/images/card.png"
                className="w-full h-full object-fill rounded-lg"
                fill
                alt=""
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-black line-clamp-2">
                Nhận định, soi kèo Seoul E Land vs Chungnam Asan, 17h ngày 31/7
              </p>
              <div className="flex items-center gap-1 pt-1">
                <div className="flex-shrink-0">
                  <IconLiveStream2 />
                </div>
                <span className="text-redE6 text-xs font-semibold">
                  Đang trực tiếp
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardWager;
