import {getMyTip} from "@/apis/tip";
import {getAllPromotions, getMe} from "@/apis/user";
import Breadcrumb from "@/components/Breadcrumb";
import ModalGetPromotion from "@/components/Modal/ModalGetPromotion";
import ModalPromotion from "@/components/Modal/ModalPromotion";
import {AuthContext} from "@/context/AuthContext";
import {formattedPrice} from "@/utils/common";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";

const data = [
	{
		id: 1,
		image: "/images/top-tipters.png",
		name: "tips",
	},
	{
		id: 2,
		image: "/images/li-xi-moi-ngay.png",
		name: "luckyMoney",
	},
	{
		id: 3,
		image: "/images/ho-tro-hoan-tien.png",
		name: "refund",
	},
	{
		id: 4,
		image: "/images/uu-dai-nap-lai.png",
		name: "offer",
	},
];

function PromotionPage() {
	const [tab, setTab] = useState(0);
	const [showModalPromotion, setShowModalPromotion] = useState(false);
	const [showModalAward, setShowModalAward] = useState(false);
	const [countTimeWatched, setCountTimeWatched] = useState(false); // 45 phút
	const [promotions, setPromotions] = useState<any[]>([]);

	const {user} = useContext(AuthContext);

	const [userTip, setUserTip] = useState<boolean>(false);

	const getUserInfo = async () => {
		try {
			const userData = await getMe(user?._id);

			userData &&
				userData.data?.result.watched.forEach((item: any) => {
					const time = moment.unix(item?.time).format("DD/MM/YYYY");
					const currentTime = moment().format("DD/MM/YYYY");
					if (time === currentTime && Number(item?.total / 60) >= 45) {
						setCountTimeWatched(true);
						return;
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	const getUserTips = async () => {
		try {
			const tips = await getMyTip();
			const tipData = tips.data?.result?.result || [];
			tipData.forEach((item: any) => {
				const time = moment(item?.createdAt).format("DD/MM/YYYY");
				const currentTime = moment().format("DD/MM/YYYY");
				if (time === currentTime) {
					setUserTip(true);
					return;
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	const getAllPromotionsData = async () => {
		try {
			const data = await getAllPromotions();
			console.log(data);
			setPromotions(data.data?.result || []);
		} catch (error) {}
	};
	useEffect(() => {
		getUserTips();
		getAllPromotionsData();
		getUserInfo();
	}, [user?._id]);

	const renderModal = (tab: number) => {
		switch (tab) {
			case 2:
				return (
					<ModalPromotion
						setShowModalPromotion={setShowModalPromotion}
						title="Lì xì mỗi ngày"
					>
						<>
							<div className="mb-4">
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Đối tượng áp dụng:
									</span>
									s
									<p className="text-sm">
										Áp dụng cho toàn bộ thành viên của Okchoi có tài khoản chơi
										tại nhà cái NEW88
									</p>
								</div>
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Quyền lợi:
									</span>
									<p className="text-sm leading-5">
										Cơ hội nhận ngay tiền thưởng mỗi ngày lên tới 888k tại nhà
										cái New88, sau khi nhận được khuyến mãi, tiền sẽ được chuyển
										thẳng vào tài khoản của khách hàng.{" "}
										<span className="text-red-500 font-semibold">
											(4 vòng cược)
										</span>
									</p>
								</div>
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Thể lệ chương trình:
									</span>
									<p className="text-sm leading-5">
										Mỗi thành viên tham gia sẽ đăng nhập vào trang chủ Okchoi và
										thực hiện các nhiệm vụ dưới đây:
									</p>
									<ul className="list-disc text-sm ml-4 ">
										<li>
											Hoàn thành ít nhất 1 lần cho kèo bằng tính năng “Cho Tips”
										</li>
										<li>
											Thời gian xem trực tiếp trận đấu trên Okchoi đạt 45 phút
										</li>
									</ul>
									<div className="flex  gap-1 my-4">
										<span className="font-semibold flex-shrink-0 text-[#AC650E] text-sm">
											Lưu ý:
										</span>
										<ul className="list-disc text-sm ml-4">
											<li>
												Mỗi thành viên chỉ có cơ hội nhận thưởng 1 lần/ngày
											</li>
											<li>Thời gian cập nhật nhiệm vụ sẽ vào 0h mỗi ngày</li>
										</ul>
									</div>
								</div>
								<p className="text-sm italic">
									Chương trình chỉ áp dụng cho thành viên đăng ký nhà cái NEW88
									thông qua Okchoi. Bạn có thể đăng ký bằng cách{" "}
									<Link
										target="_blank"
										href="https://bk16.short.gy/JYDO8N/"
										className="text-blue-500 underline"
									>
										Bấm vào đây.
									</Link>
								</p>
							</div>
							<div className=" absolute  left-[50%] -bottom-[22px] -translate-x-[50%] z-[9999]">
								<div
									className="w-[185px] h-[50px] relative cursor-pointer animate-bounce"
									onClick={() => {
										setShowModalAward(true);
										setShowModalPromotion(false);
									}}
								>
									<Image
										src="/images/btn2.png"
										className="object-cover"
										fill
										alt=""
									/>
								</div>
							</div>
						</>
					</ModalPromotion>
				);
			case 3:
				return (
					<ModalPromotion
						setShowModalPromotion={setShowModalPromotion}
						title="HỖ TRỢ HOÀN TIỀN"
					>
						<>
							<div className="mb-4">
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Đối tượng áp dụng:
									</span>

									<p className="text-sm">
										Áp dụng cho toàn bộ thành viên của Okchoi có tài khoản chơi
										tại nhà cái NEW88
									</p>
								</div>
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Quyền lợi:
									</span>
									<p className="text-sm leading-5">
										Nhận ngay hoàn tiền dựa vào đơn cược thể thao cao nhất mỗi
										ngày lên tới 188k tại nhà cái New88, sau khi nhận được
										khuyến mãi, tiền sẽ được chuyển thẳng vào tài khoản của
										khách hàng.
									</p>

									<div className="  flex items-center justify-center my-2">
										<div className=" grid grid-cols-12 gap-1 h-full w-[600px] border-2 border-[#AC650E] rounded-lg p-4">
											<div className="col-span-4">
												<div className="text-[#AC650E] font-semibold text-sm text-center">
													Số điểm cược
												</div>
												{[200, 500, 1000, 2000, 4000].map((item, i) => (
													<div
														key={i}
														className="text-center p-2 bg-[#F8E7D1] text-sm font-semibold mb-1 rounded-l-lg"
													>
														{item}+
													</div>
												))}
											</div>
											<div className="col-span-4">
												<div className="text-[#AC650E] font-semibold text-sm text-center">
													Thưởng
												</div>
												{[8000, 18000, 38000, 88000, 188000].map((item, i) => (
													<div
														key={i}
														className="text-center p-2 bg-[#F8E7D1] text-sm font-semibold mb-1 "
													>
														{formattedPrice(item)}
													</div>
												))}
											</div>
											<div className="col-span-4">
												<div className="text-[#AC650E] font-semibold text-sm text-center">
													Số vòng cược yêu cầu
												</div>
												<div className="flex items-center justify-center h-[calc(100%-28px)] bg-[#F8E7D1] text-sm font-semibold rounded-r-lg">
													6
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Thể lệ chương trình:
									</span>
									<p className="text-sm leading-7">
										Mỗi thành viên tham gia sẽ đăng nhập vào trang chủ Okchoi và
										chọn khuyến mãi hỗ trợ hoàn tiền:
									</p>
									<ul className="list-disc text-sm ml-4 ">
										<li className="">
											<div className="flex items-center justify-between">
												<span>
													Tải lên ảnh đơn cược thể thao cao nhất trong ngày tại
													nhà cái NEW88
												</span>
												<label
													htmlFor="file"
													className="bg-[#F8E7D1] py-1 px-6 rounded cursor-pointer inline-flex "
												>
													Tải ảnh lên
												</label>
											</div>
											<input type="file" id="file" hidden />
										</li>
										<li>
											Nhập tên tài khoản tại nhà cái NEW88 và chờ xác nhận
										</li>
									</ul>
									<div>
										<input
											type="text"
											className="p-2 rounded-md border border-[#AC650E] w-full my-2 focus:outline-none text-sm"
											placeholder="Nhập tên tài khoản"
										/>
									</div>
									<div className="flex  gap-1 my-4">
										<span className="font-semibold flex-shrink-0 text-[#AC650E] text-sm">
											Lưu ý:
										</span>
										<ul className="text-sm ">
											<li>
												+ Mỗi thành viên chỉ có cơ hội nhận thưởng 1 lần/ngày
											</li>
										</ul>
									</div>
								</div>
								<p className="text-sm italic">
									Chương trình chỉ áp dụng cho thành viên đăng ký nhà cái NEW88
									thông qua Okchoi. Bạn có thể đăng ký bằng cách{" "}
									<Link
										target="_blank"
										href="https://bk16.short.gy/JYDO8N/"
										className="text-blue-500 underline"
									>
										Bấm vào đây.
									</Link>
								</p>
							</div>
							<div className=" absolute  left-[50%] -bottom-[22px] -translate-x-[50%] z-[9999]">
								<div className="w-[250px] h-[50px] relative ">
									<Image
										src="/images/btn3.png"
										className="object-cover"
										fill
										alt=""
									/>
								</div>
							</div>
						</>
					</ModalPromotion>
				);
			case 4:
				return (
					<ModalPromotion
						setShowModalPromotion={setShowModalPromotion}
						title="ưu đãi nạp lại"
					>
						<>
							<div className="mb-6">
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Đối tượng áp dụng:
									</span>

									<p className="text-sm">
										Áp dụng cho toàn bộ thành viên của Okchoi có tài khoản chơi
										tại nhà cái NEW88
									</p>
								</div>
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Quyền lợi:
									</span>
									<p className="text-sm leading-5">
										Cơ hội nhận ngay tiền thưởng cho lần nạp 2 lên tới 550k tại
										nhà cái New88, sau khi nhận được khuyến mãi, tiền sẽ được
										chuyển thẳng vào tài khoản của khách hàng.
									</p>

									<div className="  flex items-center justify-center my-2">
										<div className=" grid grid-cols-12 gap-1 h-full w-[600px] border-2 border-[#AC650E] rounded-lg p-4">
											<div className="col-span-4">
												<div className="text-[#AC650E] font-semibold text-sm text-center">
													Gói hỗ trợ
												</div>
												{[20, 30, 40, 50, 60, 70].map((item, i) => (
													<div
														key={i}
														className="text-center p-2 bg-[#F8E7D1] text-sm font-semibold mb-1 rounded-l-lg"
													>
														{item}%
													</div>
												))}
											</div>
											<div className="col-span-4">
												<div className="text-[#AC650E] font-semibold text-sm text-center">
													Hỗ trợ tối đa
												</div>
												{[550000, 450000, 350000, 250000, 150000, 50000].map(
													(item, i) => (
														<div
															key={i}
															className="text-center p-2 bg-[#F8E7D1] text-sm font-semibold mb-1 "
														>
															{formattedPrice(item)}
														</div>
													)
												)}
											</div>
											<div className="col-span-4">
												<div className="text-[#AC650E] font-semibold text-sm text-center">
													Số vòng cược yêu cầu
												</div>
												{[4, 6, 8, 10, 12, 14].map((item, i) => (
													<div
														key={i}
														className="text-center p-2 bg-[#F8E7D1] text-sm font-semibold mb-1 "
													>
														{item}
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
								<div className="mb-4">
									<span className="text-black font-bold text-sm">
										Thể lệ chương trình:
									</span>
									<p className="text-sm leading-7">
										Mỗi thành viên tham gia sẽ đăng nhập vào trang chủ Okchoi và
										chọn khuyến mãi ưu đãi nạp lại:
									</p>
									<ul className="list-disc text-sm ml-4 ">
										<li className="">
											<div className="flex items-center justify-between">
												<span>
													Tải lên ảnh giao dịch nạp tiền lần 2 tại nhà cái NEW88
												</span>
												<label
													htmlFor="file"
													className="bg-[#F8E7D1] py-1 px-6 rounded cursor-pointer inline-flex "
												>
													Tải ảnh lên
												</label>
											</div>
											<input type="file" id="file" hidden />
										</li>
										<li>
											Nhập tên tài khoản tại nhà cái NEW88 và chờ xác nhận
										</li>
									</ul>
									<div>
										<input
											type="text"
											className="p-2 rounded-md border border-[#AC650E] w-full my-2 focus:outline-none text-sm"
											placeholder="Nhập tên tài khoản"
										/>
									</div>
									<div className="flex  gap-1 my-4">
										<span className="font-semibold flex-shrink-0 text-[#AC650E] text-sm">
											Lưu ý:
										</span>
										<ul className="text-sm ">
											<li>+ Mỗi thành viên chỉ có cơ hội nhận thưởng 1 lần</li>
										</ul>
									</div>
								</div>
								<p className="text-sm italic">
									Chương trình chỉ áp dụng cho thành viên đăng ký nhà cái NEW88
									thông qua Okchoi. Bạn có thể đăng ký bằng cách{" "}
									<Link
										target="_blank"
										href="https://bk16.short.gy/JYDO8N/"
										className="text-blue-500 underline"
									>
										Bấm vào đây.
									</Link>
								</p>
								<div className="flex items-center justify-between">
									<span>Chọn gói hỗ trợ:</span>
									<div className="flex items-center gap-2 mt-2">
										{[20, 30, 40, 50, 60, 70].map((item, i) => (
											<button
												key={i}
												className="bg-[#F8E7D1] py-1 px-6 rounded cursor-pointer inline-flex"
											>
												{item}%
											</button>
										))}
									</div>
								</div>
							</div>
							<div className=" absolute  left-[50%] -bottom-[22px] -translate-x-[50%] z-[9999]">
								<div className="w-[250px] h-[50px] relative ">
									<Image
										src="/images/btn3.png"
										className="object-cover"
										fill
										alt=""
									/>
								</div>
							</div>
						</>
					</ModalPromotion>
				);

			default:
				break;
		}
	};

	return (
		<>
			<div className="mt-4 container mx-auto md:px-4 xl:px-2">
				<Breadcrumb
					backLink="/"
					breadCrumb={[
						{title: "Trang chủ", url: "/"},
						{title: "Khuyến mãi", url: "/khuyen-mai"},
					]}
				/>

				<h1 className="mt-10 font-bold text-3xl text-center">
					Nhận thưởng cùng okchoi
				</h1>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6">
					{data?.map((item) => (
						<div
							key={item?.id}
							className="relative w-full pt-[100%] cursor-pointer"
							onClick={() => {
								setTab(item.id);
								setShowModalPromotion(true);
							}}
						>
							<Image className="object-cover" fill src={item?.image} alt="" />
						</div>
					))}
				</div>

				<div className="mt-8 w-full">
					<table className="w-full">
						<thead>
							<tr className="bg-secondary [&>th]:px-4 [&>th]:py-3 text-sm font-semibold text-white">
								<th className="text-center w-[80px]">STT</th>
								<th className="text-left">Thành viên</th>
								<th className="text-left">Khuyến mãi</th>
								<th className="text-center">Nội dung</th>
								<th className="text-right">Thời gian</th>
							</tr>
						</thead>

						<tbody>
							{promotions.length > 0 &&
								promotions.map((item, index) => (
									<tr
										key={index}
										className="[&>td]:px-4 [&>td]:py-3 border-b border-x text-sm"
									>
										<td className="font-bold text-center">{index + 1}</td>
										<td>
											<div className="flex gap-4 items-center ">
												<div className="w-12 h-12 relative">
													<Image
														src="/images/image23.png"
														className="object-cover rounded-full"
														fill
														alt=""
													/>
												</div>

												<span className="font-semibold">
													{item?.user?.username}
												</span>
											</div>
										</td>
										<td>{item?.type === "luckyMoney" && "Lì xì mỗi ngày"}</td>
										<td className="text-center text-sm">
											{formattedPrice(item?.money)} (đ)
										</td>
										<td className="text-right">
											{moment(item?.createdAt).fromNow()}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{showModalPromotion && renderModal(tab)}
			{showModalAward && (
				<ModalGetPromotion
					countTimeWatched={countTimeWatched}
					countTips={userTip}
					setShowModalAward={setShowModalAward}
				/>
			)}
		</>
	);
}

export default PromotionPage;
