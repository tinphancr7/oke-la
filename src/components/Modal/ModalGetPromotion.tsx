import {formattedPrice} from "@/utils/common";
import Image from "next/image";
import React, {useContext, useMemo, useState} from "react";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";

import Confetti from "react-confetti";
import {receiveMoney, receivedPromotion} from "@/apis/user";
import {AuthContext} from "@/context/AuthContext";
import {toast} from "react-toastify";
import moment from "moment";

const prices = [10000, 20000, 50000, 100000, 200000];
const ModalGetPromotion = ({
	setShowModalAward,
	countTips,
	countTimeWatched,
}: {
	setShowModalAward: React.Dispatch<React.SetStateAction<boolean>>;
	countTips: boolean;
	countTimeWatched: boolean;
}) => {
	const [account88, setAccount88] = useState("");
	const [successAward, setSuccessAward] = useState(false);
	const {user} = useContext(AuthContext);

	const [run, setRun] = useState(true);
	const getRandomPrice = useMemo(() => {
		return prices[Math.floor(Math.random() * prices.length)];
	}, []);
	const {width, height} = useMemo(() => {
		return {width: window.innerWidth, height: window.innerHeight};
	}, []);

	const handleReceiveAward = async () => {
		const body = {
			money: getRandomPrice,
			type: "luckyMoney",
			date: moment().format("YYYY-MM-DD"),
			user: user?._id,
		};

		try {
			const data = await receivedPromotion(body);

			if (data.data.status === 1) {
				setSuccessAward(true);
				setAccount88("");
				toast.success("Nhận lì xì thành công");
			} else {
				toast.error("Nhận lì xì thất bại");
			}
		} catch (error: any) {
			console.log("error", error);
			toast.error(error?.response?.data?.message);
		}
	};
	return (
		<>
			<div
				className="relative z-10 overflow-hidden"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
							<div className="bg-white  ">
								<div className="flex items-center bg-[#AC650E] justify-between text-white p-2">
									<h4 className="text-sm font-semibold  uppercase">
										lì xì mỗi ngày
									</h4>
									<span
										className="cursor-pointer"
										onClick={() => {
											setShowModalAward(false);
											setSuccessAward(false);
										}}
									>
										<AiFillCloseCircle size={24} className="" />
									</span>
								</div>
							</div>
							<div className="bg-gradient-to-b from-[#cd4514] via-[#d96715] to-[#f1a617] p-4">
								<h2 className="uppercase text-center text-2xl font-semibold text-white ">
									xin chúc mừng! <br /> bạn đã nhận được
								</h2>
								<div className="flex items-center justify-center my-2 relative">
									<div className="w-[300px] h-[100px] relative ">
										<Image
											src="/images/bg-coins.png"
											className="object-cover"
											fill
											alt=""
										/>
									</div>
									<span className="absolute top-[50%] left-[50%] font-semibold text-2xl text-[#FEEDA0] -translate-x-[40%] -translate-y-[50%] z-10">
										{formattedPrice(getRandomPrice)}đ
									</span>
								</div>
								<div>
									<p className="text-white font-medium text-xs">
										Nhập tên tài khoản tại nhà cái NEW88 để nhận thưởng
									</p>
									<input
										type="text"
										placeholder="Tên tài khoản"
										className="bg-white text-sm w-full px-2 py-1.5 rounded-md my-2 focus:outline-none"
										onChange={(e) => setAccount88(e.target.value)}
									/>
								</div>
								<div className="border-dashed border rounded-lg p-2 my-2 flex flex-col gap-1">
									<span className="text-white font-semibold text-sm">
										Điều kiện nhận lì xì mỗi ngày
									</span>
									<p className="flex items-center  gap-1">
										{countTips ? (
											<AiFillCheckCircle className="text-green-500" />
										) : (
											<AiFillCloseCircle className="text-red-500" />
										)}
										<span className="text-sm text-white font-light">
											Cho ít nhất 1 kèo
										</span>
									</p>
									<p className="flex items-center  gap-1">
										{countTimeWatched ? (
											<AiFillCheckCircle className="text-green-500" />
										) : (
											<AiFillCloseCircle className="text-red-500" />
										)}
										<span className="text-sm text-white font-light">
											Thời gian xem trực tiếp trận đấu trên okchoi.com đạt 45
											phút
										</span>
									</p>
								</div>

								<div className="flex items-center justify-center ">
									{countTips && countTimeWatched && account88.length ? (
										<div
											className="w-[300px] h-[70px] relative cursor-pointer "
											onClick={handleReceiveAward}
										>
											<Image
												src="/images/btn3.png"
												className="object-cover"
												fill
												alt=""
											/>
										</div>
									) : (
										<div className="w-[300px] h-[70px] relative ">
											<Image
												src="/images/btn.png"
												className="object-cover"
												fill
												alt=""
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{successAward && (
				<div className={`${run ? "absolute inset-0 z-[99999]" : ""}`}>
					<Confetti
						width={width}
						height={height}
						recycle={false}
						numberOfPieces={3000}
						onConfettiComplete={() => setRun(false)}
						tweenDuration={7000}
					/>
				</div>
			)}
		</>
	);
};

export default ModalGetPromotion;
