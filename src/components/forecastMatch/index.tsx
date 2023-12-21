import { IMatch } from "@/interfaces";
import React, { useEffect, useState } from "react";
import ImageWithFallback from "../imageWithFallback";
import scheduleApi from "@/apis/schedule.api";

type Props = {
  match: IMatch;
};

const handicapKeys = [
  "matchId",
  "companyId",
  "initialHandicap",
  "initialHome",
  "initialAway",
  "instantHandicap",
  "instantHome",
  "instantAway",
  "maintenance",
  "inPlay",
  "changeTime",
  "close",
  "OddsType",
];

function ForecastMatch({ match }: Props) {
  const [chosen, setChosen] = useState("");
  const [options, setOptions] = useState([
    {
      value: "C",
      title: "Chủ",
      quantity: 0,
    },
    {
      value: "H",
      title: "Hòa",
      quantity: 0,
    },
    {
      value: "K",
      title: "Khách",
      quantity: 0,
    },
  ]);

  useEffect(() => {
    if (match) {
      scheduleApi
        .getPrematchAndInplayOddByMatchId(Number(match?.matchId))
        .then((res: any) => {
          const hdc = res?.data?.handicap?.map((item: any) => {
            const newHandicap: {
              [key: string]: any;
            } = {};
            handicapKeys.forEach(
              (key, index) => (newHandicap[key] = item?.split(",")[index])
            );
            return newHandicap;
          });

          setOptions([
            {
              value: "C",
              title: "Chủ",
              quantity:
                (Number(hdc?.[0]?.initialHandicap) >= 0
                  ? 150 * Math.abs(Number(hdc?.[0]?.initialHandicap || 0))
                  : 50 * Math.abs(Number(hdc?.[0]?.initialHandicap || 0))) +
                100 +
                Math.floor(Math.random() * 10),
            },
            {
              value: "H",
              title: "Hòa",
              quantity: Math.floor(Math.random() * (60 - 20) + 20),
            },
            {
              value: "K",
              title: "Khách",
              quantity:
                (Number(hdc?.[0]?.initialHandicap) < 0
                  ? 150 * Math.abs(Number(hdc?.[0]?.initialHandicap || 0))
                  : 50 * Math.abs(Number(hdc?.[0]?.initialHandicap || 0))) +
                100 +
                Math.floor(Math.random() * 10),
            },
          ]);
        });
    }
  }, [match]);
  return (
    <div className="bg-[#F1F1F1] p-[24px] mt-12 rounded-[16px]">
      <div className="text-[20px] font-bold mb-4 text-center">
        Dự đoán đội thắng
      </div>
      <div className="flex items-center justify-center mb-4 gap-10">
        <ImageWithFallback
          style={{ width: "60px" }}
          className="inline lg:hidden"
          alt={match.homeName}
          src={match.homeIcon}
        />
        <ImageWithFallback
          style={{ width: "60px" }}
          className="inline lg:hidden"
          alt={match.awayName}
          src={match.awayIcon}
        />
      </div>

      <div className="flex items-center justify-between gap-10">
        <ImageWithFallback
          style={{ width: "80px" }}
          className="hidden lg:inline"
          alt={match.homeName}
          src={match.homeIcon}
        />

        <div className="flex-1 flex items-center gap-4 lg:gap-8 justify-between">
          {options?.map((item) => (
            <div
              onClick={() => {
                setChosen(item?.value);
                setOptions([
                  {
                    value: "C",
                    title: "Chủ",
                    quantity:
                      item?.value === "C"
                        ? options?.[0]?.quantity + 1
                        : options?.[0]?.quantity,
                  },
                  {
                    value: "H",
                    title: "Hòa",
                    quantity:
                      item?.value === "H"
                        ? options?.[1]?.quantity + 1
                        : options?.[1]?.quantity,
                  },
                  {
                    value: "K",
                    title: "Khách",
                    quantity:
                      item?.value === "K"
                        ? options?.[2]?.quantity + 1
                        : options?.[2]?.quantity,
                  },
                ]);
              }}
              className={`cursor-pointer w-full py-2 text-center font-semibold rounded-[99px] text-sm lg:text-base ${
                chosen === item?.value
                  ? "bg-[#FFEDD8] text-secondary border-2 border-[#FFAD01]"
                  : "bg-white"
              }`}
              key={item?.value}
            >
              {item?.title}
            </div>
          ))}
        </div>

        <ImageWithFallback
          style={{ width: "80px" }}
          className="hidden lg:inline"
          alt={match.awayName}
          src={match.awayIcon}
        />
      </div>

      <div className="mt-4 max-w-full overflow-hidden flex items-center">
        <div
          className="bg-secondary min-h-[15px] rounded-[99px]"
          style={{
            minWidth: `${
              (options?.[0]?.quantity * 100) /
              (options?.[0]?.quantity +
                options?.[1]?.quantity +
                options?.[2]?.quantity)
            }%`,
          }}
        ></div>
        <div
          className="px-2"
          style={{
            minWidth: `${
              (options?.[1]?.quantity * 100) /
              (options?.[0]?.quantity +
                options?.[1]?.quantity +
                options?.[2]?.quantity)
            }%`,
          }}
        >
          <div className="bg-primary min-h-[15px] rounded-[99px]"></div>
        </div>

        <div
          className="bg-[#316A95] min-h-[15px] rounded-[99px]"
          style={{
            minWidth: `${
              (options?.[2]?.quantity * 100) /
              (options?.[0]?.quantity +
                options?.[1]?.quantity +
                options?.[2]?.quantity)
            }%`,
          }}
        ></div>
      </div>

      <div className="flex items-center justify-between w-full mt-1">
        <div className="flex-1 text-center text-secondary font-semibold text-sm">
          {(
            (options?.[0]?.quantity * 100) /
            (options?.[0]?.quantity +
              options?.[1]?.quantity +
              options?.[2]?.quantity)
          )?.toFixed(2)}
          % <span className="text-gray9D">{`(${options?.[0]?.quantity})`}</span>
        </div>
        <div className="flex-1 text-center text-primary font-semibold text-sm">
          {(
            (options?.[1]?.quantity * 100) /
            (options?.[0]?.quantity +
              options?.[1]?.quantity +
              options?.[2]?.quantity)
          )?.toFixed(2)}
          % <span className="text-gray9D">{`(${options?.[1]?.quantity})`}</span>
        </div>
        <div className="flex-1 text-center text-[#316A95] font-semibold text-sm">
          {(
            (options?.[2]?.quantity * 100) /
            (options?.[0]?.quantity +
              options?.[1]?.quantity +
              options?.[2]?.quantity)
          )?.toFixed(2)}
          % <span className="text-gray9D">{`(${options?.[2]?.quantity})`}</span>
        </div>{" "}
      </div>
    </div>
  );
}

export default ForecastMatch;
