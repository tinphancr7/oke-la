import { IUser } from "@/interfaces";
import { Transition, Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import Avatar from "../avatar";
import { getUserForTip } from "@/apis/tip";

type Props = {
  userId: string;
};

const plans = [
  { title: "7 ngày", value: 1200 },
  { title: "30 ngày", value: 4500 },
];

const BuyTip = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [plan, setPlan] = useState(0);

  const [user, setUser] = useState<IUser>();

  const getUser = async () => {
    try {
      const res = await getUserForTip(userId);

      setUser(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleBuyClose = () => {
    setOpenBuy(false);
  };
  return (
    <>
      <div className="bg-neutral-100 px-4 py-4">
        <div className="w-full flex justify-between items-start">
          <div className="w-2/3">
            <h5 className="text-black text-lg font-bold">Mua TIPS</h5>
            <p className="text-neutral-400 text-xs font-normal">
              Bạn có thể xem tất cả bài tips của chuyên gia này
            </p>
          </div>
          <div>
            <button
              className="w-6 h-6 justify-center items-center flex"
              onClick={() => setOpen(true)}
            >
              <img
                src="/images/Question.svg"
                className="w-6 h-6 relative"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 justify-center items-center my-4">
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-amber-500 text-base font-bold">{user?.tip}</p>
            <p className="text-neutral-400 text-xs font-medium">Tips</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-amber-500 text-base font-bold">{user?.like}</p>
            <p className="text-neutral-400 text-xs font-medium">Avg Odds</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-amber-500 text-base font-bold">
              {user?.follower.length}
            </p>
            <p className="text-neutral-400 text-xs font-medium">Win rate</p>
          </div>
        </div>
        <button
          className="flex w-full rounded-lg border border-amber-500 justify-center items-center gap-2 text-amber-500 text-sm font-semibold py-4"
          onClick={() => setOpenBuy(true)}
        >
          Đặt mua
        </button>
      </div>
      <Transition appear show={open}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl ">
                  <div className="p-6">
                    <div className="pb-4 border-b-2">
                      <h5 className="text-black text-base font-bold">TIPS</h5>
                      <p className="text-neutral-400 text-sm font-normal">
                        Số lượng bài tips được đăng trong 7 ngày qua
                      </p>
                    </div>
                    <div className="pb-4 border-b-2 mt-4">
                      <h5 className="text-black text-base font-bold">
                        Avg Odds
                      </h5>
                      <p className="text-neutral-400 text-sm font-normal">
                        Tỷ lệ trung bình bài tips (hết trận) trong 7 ngày qua
                      </p>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-black text-base font-bold">
                        Win rate
                      </h5>
                      <p className="text-neutral-400 text-sm font-normal">
                        Tỷ lệ thắng của bài tips (hết trận) trong 7 ngày qua
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={openBuy}>
        <Dialog as="div" className="relative z-10" onClose={handleBuyClose}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl ">
                  <div className="p-6 flex flex-col justify-center items-center w-[280px]">
                    <h3 className="text-black text-lg font-bold">Mua TIPS</h3>
                    <div className="flex justify-start items-center mt-8 gap-4 w-full">
                      <Avatar src="" />
                      <div className="flex flex-col gap-2">
                        <p className="text-yellow-700 text-lg font-bold">
                          {user?.full_name}
                        </p>
                        <div className="flex gap-4">
                          <div className="flex gap-0.5">
                            <img
                              src="/images/Users.svg"
                              alt=""
                              className="w-4 h-4"
                            />
                            <p className="text-gray-400 text-[10px] font-medium leading-[15px]">
                              {user?.follower.length}
                            </p>
                          </div>
                          <div className="flex gap-0.5">
                            <img
                              src="/images/pen-icon.svg"
                              alt=""
                              className="w-4 h-4"
                            />
                            <p className="text-gray-400 text-[10px] font-medium leading-[15px]">
                              {user?.tip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col gap-2">
                      <div className="flex w-full justify-end">
                        <p className="text-black text-xs font-normal mr-0.5">
                          Số dư khả dụng:
                        </p>
                        <span className="text-yellow-700 text-sm font-bold">
                          0
                        </span>
                      </div>
                      {plans.map((item, index) => (
                        <div
                          className={`grid grid-cols-12 justify-between pr-4 bg-white rounded-md border items-center cursor-pointer ${
                            plan === index
                              ? "border-yellow-700"
                              : "border-neutral-200"
                          }`}
                          key={index}
                          onClick={() => setPlan(index)}
                        >
                          <div
                            className={`col-span-5 px-4 py-3 ${
                              plan === index
                                ? "bg-yellow-700"
                                : "bg-neutral-200"
                            }`}
                          >
                            <p
                              className={`text-sm font-semibold ${
                                plan === index ? "text-white" : "text-black"
                              }`}
                            >
                              {item.title}
                            </p>
                          </div>
                          <div className="col-span-7 flex justify-end items-center gap-2">
                            <p className="text-black text-sm font-semibold">
                              {item.value}
                            </p>
                            <img
                              src="/images/diamond.svg"
                              alt=""
                              className="w-[22px] h-4"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 w-full">
                      <button
                        className="flex w-full rounded-lg border border-amber-500 justify-center items-center gap-2 text-amber-500 text-sm font-semibold py-2"
                        onClick={() => setOpenBuy(true)}
                      >
                        Đặt mua
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BuyTip;
