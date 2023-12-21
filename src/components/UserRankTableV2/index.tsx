import {useRef, useState} from "react";
import {BsQuestionCircleFill} from "react-icons/bs";
import {FaInfoCircle, FaUser} from "react-icons/fa";

const UserRankTableV2 = () => {
	const [option, setOption] = useState<"ratio" | "list">("list");
	const buttonRef = useRef<HTMLDivElement>(null);
	const [optionDate, setOptionDate] = useState<
		"date" | "week" | "month" | "year"
	>("date");

	const handleChangeOption = (option: "ratio" | "list") => {
		setOption(option);
		if (option == "ratio") {
			if (buttonRef.current) {
				buttonRef.current.style.transform = "translate(100%, 0px)";
			}
		} else {
			if (buttonRef.current) {
				buttonRef.current.style.transform = "translate(0px, 0px)";
			}
		}
	};

	const handleChangeOptionDate = (
		optionDate: "date" | "week" | "month" | "year"
	) => {
		setOptionDate(optionDate);
	};
	return (
		<div className="mt-2 border w-full bg-white">
			<div className="bg-secondary p-2 px-4 rounded-t-md flex items-center justify-between">
				<p className="text-white uppercase font-bold">Bảng xếp hạng</p>
				<p className="flex gap-1 text-white">
					<BsQuestionCircleFill size={20} /> <FaInfoCircle size={21} />
				</p>
			</div>
			<div className="py-2 px-4 ">
				<div className="relative bg-white border p-1 flex rounded-2xl h- h-[35px]">
					<div
						ref={buttonRef}
						className="transition sliding-button absolute bg-light-red w-[50%] h-[70%] rounded-2xl z-1"
					></div>
					<div className="flex rounded-2xl absolute w-full">
						<p
							className={`text-center flex-1 text-[14px] cursor-pointer ${
								option == "list" ? "text-white" : "text-black"
							}`}
							onClick={() => handleChangeOption("list")}
						>
							Lợi nhuận
						</p>
						<p
							className={`text-center flex-1 text-[14px] cursor-pointer ${
								option == "ratio" ? "text-white" : "text-black"
							}`}
							onClick={() => handleChangeOption("ratio")}
						>
							Tỉ lệ thắng
						</p>
					</div>
				</div>
				<div className="flex justify-center gap-4 p-4 py-2">
					<div
						className={`flex-1 text-[13px] text-center border  cursor-pointer rounded-md p-[2px] ${
							optionDate == "date" ? "bg-light-red text-white" : "bg-white"
						}`}
						onClick={() => handleChangeOptionDate("date")}
					>
						Ngày
					</div>
					<div
						className={`flex-1 text-[13px] text-center border  cursor-pointer rounded-md p-[2px] ${
							optionDate == "week" ? "bg-light-red text-white" : "bg-white"
						}`}
						onClick={() => handleChangeOptionDate("week")}
					>
						Tuần
					</div>
					<div
						className={`flex-1 text-[13px] text-center border  cursor-pointer rounded-md p-[2px] ${
							optionDate == "month" ? "bg-light-red text-white" : "bg-white"
						}`}
						onClick={() => handleChangeOptionDate("month")}
					>
						Tháng
					</div>
				</div>
				<div className="user-top-rank justify-center flex items-center gap-2 mt-4 mb-2 relative">
					<div className="flex-1">
						<div className="h-full relative flex-1  flex justify-center mt-[35px]">
							<div className="bg-[url('/images/User.png')] w-[50px] h-[50px] bg-center rounded-full">
								<img
									src="/images/top-2.png"
									className="w-[110px] absolute top-[-26px] left-[3px]"
								/>
							</div>
						</div>
						<div className="flex items-center flex-col justify-center mt-4">
							<span className="text-[12px] text-center border bg-white py-[2px] px-2">
								User 123 Vip
							</span>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
							<p className="text-center text-light-red font-bold mt-1 text-[18px]">
								98%
							</p>
						</div>
					</div>
					<div className="flex-1">
						<div className="h-full relative flex-1  flex justify-center">
							<div className="bg-[url('/images/User.png')] w-[50px] h-[50px] bg-center rounded-full">
								<img
									src="/images/top-1.png"
									className="w-[110px] absolute top-[-26px] left-[3px]"
								/>
							</div>
						</div>
						<div className="flex items-center flex-col justify-center mt-4">
							<span className="text-[12px] text-center border bg-white py-[2px] px-2">
								User 123 Vip
							</span>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
							<p className="text-center text-light-red font-bold mt-1  text-[18px]">
								100%
							</p>
						</div>
					</div>
					<div className="flex-1">
						<div className="h-full relative flex-1  flex justify-center mt-[45px]">
							<div className="bg-[url('/images/User.png')] w-[50px] h-[50px] bg-center rounded-full">
								<img
									src="/images/top-3.png"
									className="w-[110px] absolute top-[-26px] left-[3px]"
								/>
							</div>
						</div>
						<div className="flex items-center flex-col justify-center mt-4">
							<span className="text-[12px] text-center border bg-white py-[2px] px-2">
								User 123 Vip
							</span>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
							<p className="text-center text-light-red font-bold mt-1  text-[18px]">
								90%
							</p>
						</div>
					</div>
				</div>
				<div className="py-2 px-4">
					<div className="flex gap-2 items-center border-b py-2">
						<p className="hexagon-1 w-[30px] h-[30px] flex items-center justify-center">
							4
						</p>
						<div className="flex-1">
							<p className="font-bold text-[14px]">User 123 vip</p>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
						</div>
						<p className="text-light-red font-semibold ">96%</p>
					</div>
					<div className="flex gap-2  items-center   border-b py-2">
						<p className="hexagon-2 w-[30px] h-[30px] flex items-center justify-center">
							5
						</p>
						<div className="flex-1">
							<p className="font-bold text-[14px]">User 123 vip</p>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
						</div>
						<p className="text-light-red font-semibold ">96%</p>
					</div>
					<div className="flex gap-2  items-center   border-b py-2">
						<p className="hexagon-3 w-[30px] h-[30px] flex items-center justify-center">
							6
						</p>
						<div className="flex-1">
							<p className="font-bold text-[14px]">User 123 vip</p>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
						</div>
						<p className="text-light-red font-semibold ">96%</p>
					</div>
					<div className="flex gap-2  items-center  border-b py-2">
						<p className=" w-[30px] h-[30px] flex font-bold items-center justify-center">
							7
						</p>
						<div className="flex-1">
							<p className="font-bold text-[14px]">User 123 vip</p>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
						</div>
						<p className="text-light-red font-semibold ">96%</p>
					</div>
					<div className="flex gap-2 items-center  border-b py-2">
						<p className="font-bold w-[30px] h-[30px] flex items-center justify-center">
							8
						</p>
						<div className="flex-1">
							<p className="font-bold text-[14px]">User 123 vip</p>
							<span className="flex mt-1 gap-1 text-[12px] items-center">
								<FaUser /> 1234
							</span>
						</div>
						<p className="text-light-red font-semibold ">96%</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserRankTableV2;
