import React from "react";

type Props = {
  rank?: number;
};

function RankUser({ rank = 1 }: Props) {
  const data = {
    1: {
      title: "Nghiệp dư",
      image: "/images/nghiep-du.svg",
      color: "#FFF3EE",
    },
    2: {
      title: "Bán chuyên",
      image: "/images/ban-chuyen.svg",
      color: "#E7EBFF",
    },
    3: {
      title: "Chuyên nghiệp",
      image: "/images/chuyen-nghiep.svg",
      color: "#FFF7EC",
    },
    4: {
      title: "Thế giới",
      image: "/images/ban-chuyen.svg",
      color: "#D3E6FF",
    },
    5: {
      title: "Tinh anh",
      image: "/images/tinh-anh.svg",
      color: "#E6DAFF",
    },
    6: {
      title: "Huyền thoại",
      image: "/images/huyen-thoai.svg",
      color: "#FFF1D1",
    },
    7: {
      title: "Thách đấu",
      image: "/images/thach-dau.svg",
      color: "#FFEBFF",
    },
    8: {
      title: "Siêu sao",
      image: "/images/sieu-sao.svg",
      color: "#FFD9BE",
    },
  };

  return (
    <div
      className="py-0.5 px-2 flex items-center gap-x-1 rounded-2xl w-fit"
      style={{ backgroundColor: data?.[rank as 1 | 2]?.color }}
    >
      <img src={data?.[rank as 1 | 2]?.image} alt="" />

      <span style={{ fontSize: "0.7rem" }}>
        {data?.[rank as 1 | 2]?.title}
      </span>
    </div>
  );
}

export default RankUser;
