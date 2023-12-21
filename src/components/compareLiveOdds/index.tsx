import Image from "next/image";

const CompareLiveOdds = () => {
  return (
    <div className="">
      <p className="text-2xl text-center mt-6 font-bold">
        So sánh kèo trực tuyến
      </p>
      <div className="compare-odds-table">
        <table>
          <thead>
            <tr>
              <td colSpan={2} rowSpan={2}>
                Công ty
              </td>
              <td colSpan={3}>TỶ LỆ CHÂU Á</td>
              <td colSpan={3}>TỶ LỆ TÀI XỈU</td>
              <td colSpan={3}>1 X 2</td>
              <td rowSpan={2}>Xem thêm</td>
              <td rowSpan={2}>Thay đổi</td>
            </tr>
            <tr>
              <td>Chủ</td>
              <td>HDP</td>
              <td>Khách</td>
              <td>Tài</td>
              <td>Kèo đấu</td>
              <td>Xỉu</td>
              <td>Chủ</td>
              <td>Hòa</td>
              <td>Khách</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sbobet</td>
              <td>
                <p>Sớm</p>
                <p>Live</p>
                <p>
                  <span className="text-[red]">Run</span>
                </p>
              </td>
              <td>0.82</td>
              <td>0.86</td>
              <td>-</td>
              <td>0.82</td>
              <td>0.86</td>
              <td>-</td>
              <td>0.82</td>
              <td>0.86</td>
              <td>-</td>
              <td>
                <div className="icon-odd-tablie w-10 h-10 mx-auto flex justify-center rounded-md p-2 bg-orange-100">
                  <Image
                    src={"/icons/MagnifyingGlass.svg"}
                    width={20}
                    height={20}
                    alt="okchoi"
                  />
                </div>
              </td>
              <td>
                <div className="icon-odd-tablie w-10 h-10 mx-auto flex justify-center rounded-md p-2 bg-orange-100">
                  <Image
                    src={"/icons/ChartLine.svg"}
                    width={20}
                    height={20}
                    alt="okchoi"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareLiveOdds;
