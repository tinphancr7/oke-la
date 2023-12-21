const Refund = () => {
  return (
    <div className="col-span-12 lg:col-span-4  h-full order-1">
      <div className="bg-[#89919C] flex justify-between items-center px-4 text-md font-bold text-white rounded-t-[6px]">
        <div>Đổi thưởng</div>
        <div className="text-[13px] p-1 px-2 bg-[#15C071] rounded-t-[6px]">
          Miễn phí
        </div>
      </div>
      <div className="rounded-b-[6px]">
        <div className="py-3 bg-[#8E96A3]  px-4   min-h-[140px]">
          <div className="">
            <div className="font-bold text-md"></div>
            <div className="text-white text-[13px]">
              Bạn có thể đổi điểm Gold lợi nhuận trên website okchoi.com thành
              điểm cược tại nhà cái NEW88
            </div>
          </div>
        </div>
        <div className="bg-[#89919C] flex justify-between items-center px-3 py-1 text-md font-bold text-white rounded-b-[6px]">
          <div>
            <img width={50} src="/icons/new88.png" />
          </div>
          <div className="text-[12px] p-1 px-2 bg-primary rounded-[6px] cursor-pointer">
            Nhận ngay
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
