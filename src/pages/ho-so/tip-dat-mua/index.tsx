import Button from "@/components/button/Button";
import ProfileLayout from "@/layouts/ProfileLayout";
import React from "react";

const OrderTip = () => {
  return (
    <div className="col-span-8">
      <h5 className="text-lg font-bold text-black pb-6">Tips đặt mua</h5>
      <div className="w-full flex items-center gap-6 pb-6 md:flex-row flex-col">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="countries"
              className="hidden md:block text-sm font-medium text-grayBB "
            >
              Thời gian mua
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 h-10 md:p-2 text-xs rounded-lg "
              placeholder="Thời gian mua"
            >
              <option selected>Hôm nay</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="countries"
              className="hidden md:block text-sm font-medium text-grayBB"
            >
              Loại
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 h-10 md:p-2 text-xs rounded-lg "
            >
              <option selected>7 ngày</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 h-10 md:p-2 text-xs rounded-lg "
            >
              <option selected>Đã thanh toán</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>

        <Button className="text-sm text-white bg-secondary px-4 py-2 w-full" >
          Tìm kiếm
        </Button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 zinc-100:text-gray-400 overflow-auto">
          <thead className="text-xs text-[#939FAA] bg-[#EEEEEE]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Chuyên gia
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian bắt đầu
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian kết thúc
              </th>
              <th scope="col" className="px-6 py-3">
                Chu kỳ
              </th>
              <th scope="col" className="px-6 py-3">
                Giá
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b zinc-100:bg-zinc-100 zinc-100:border-gray-700">
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
OrderTip.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;
export default OrderTip;
