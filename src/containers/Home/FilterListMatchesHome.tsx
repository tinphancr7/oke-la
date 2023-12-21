import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import CloseIcon from "@/components/icons/ClostIcon";
import { topLeague } from "@/constant";
import React from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  listChosenLeague: string[];
  listLeague: {
    leagueName: string;
    total: number;
    _id: string;
  }[];
  onChangeChosenListLeague: (league: string, status: boolean) => void;
  onFilterByLeague: () => void;
  handleCheckAll: (e: any) => void;
};

function FilterListMatchesHome({
  listLeague,
  onClose,
  show,
  listChosenLeague,
  onChangeChosenListLeague,
  onFilterByLeague,
  handleCheckAll,
}: Props) {
  return (
    <div
      className={`absolute w-[360px] top-[110px] md:top-[200px] md:w-[600px] h-[600px] z-50 bg-white shadow ${
        show ? "" : "hidden"
      }`}
      style={{ left: "50%", translate: "-50%" }}
    >
      <div className="bg-secondary h-[40px] text-md font-semibold text-white text-center relative flex items-center justify-center">
        Chọn giải đấu
        <ButtonOnlyIcon
          onClick={onClose}
          wrapperClassName="absolute right-[10px]"
        >
          <CloseIcon size={24} color="white" />
        </ButtonOnlyIcon>
      </div>

      <div className="max-h-[510px] overflow-y-auto grid grid-cols-2 p-4">
        <p>
          <input
            checked={listLeague?.length == listChosenLeague?.length}
            onChange={handleCheckAll}
            type="checkbox"
          />
          <span className="text-black ml-2 text-[14px] font-bold">
            Chọn tất cả
          </span>
        </p>
        {listLeague?.map((item) => (
          <div
            key={item?._id}
            className={`col-span-1 flex items-start gap-x-2 text-xs md:text-sm mt-1 font-semibold`}
          >
            <input
              checked={Boolean(
                listChosenLeague?.find((id) => id === item?._id)
              )}
              onChange={(e) =>
                onChangeChosenListLeague(item?._id, e.target?.checked)
              }
              type="checkbox"
              className="mt-1"
            />
            <span
              className={`text-[${
                topLeague?.find((e) => e?.leagueId === item?._id)
                  ? "red"
                  : "black"
              }]`}
            >
              {item?.leagueName} [{item?.total}]
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white h-[50px] flex items-center justify-end gap-4 px-8 text-sm font-semibold">
        <button onClick={onClose} className="bg-[#eee] px-4 py-1 rounded-md">
          Thoát
        </button>
        <button
          onClick={onFilterByLeague}
          className="bg-secondary text-white px-4 py-1 rounded-md"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}

export default FilterListMatchesHome;
