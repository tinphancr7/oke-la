import Breadcrumb from "@/components/Breadcrumb";
import RankHomeItem from "@/containers/Home/RankHomeItem";
import TipHomeItem from "@/containers/Home/TipHomeItem";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {getPaggingGroup, getPagingTips, joinGroup} from "@/apis/tip";
import {IGroup, ITip, IUser} from "@/interfaces";
import Link from "next/link";
import {getHotMatches} from "@/apis/match";
import ImageWithFallback from "@/components/imageWithFallback";
import moment from "moment";
import {Dialog, Transition} from "@headlessui/react";
import Avatar from "@/components/avatar";
import {AuthContext} from "@/context/AuthContext";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {getSeoByLink} from "@/apis/seo";
import Head from "next/head";
import parse from "html-react-parser";
import {getRankTable} from "@/apis/user";
import Image from "next/image";
import NewestTipItem from "@/containers/Member/NewestTipItem";
import NewestTipItem1 from "@/containers/Member/NewestTipItem1";
import Pagination from "@/components/pagination/Pagination";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

type Props = {
	tips: ITip[];
	hotMatches: any[];
	tags: string[];
	rank: any[];
};
const tabs = [
	{
		id: 1,
		title: "HOT",
	},
	{
		id: 2,
		title: "Trận đấu",
	},
	{
		id: 3,
		title: "Theo dõi",
	},
];
const rankTabs = [
	{
		id: 1,
		title: "Thành viên",
	},
	{
		id: 2,
		title: "Chuyên gia",
	},
	{
		id: 3,
		title: "Nhóm",
	},
];
const Tips = ({hotMatches, tags, rank}: Props) => {
	const {user} = useContext(AuthContext);
	const [pageIndex, setPageIndex] = useState(1);

	const router = useRouter();

	const [tab, setTab] = useState(1);
	const [rankTab, setRankTab] = useState(1);
	const [open, setOpen] = useState(false);
	const [openRules, setOpenRules] = useState(false);

	const [groups, setGroups] = useState<IGroup[]>([]);

	const handleClose = () => {
		setOpen(false);
	};
	const handleCloseRules = () => {
		setOpenRules(false);
	};
	const getGroup = async () => {
		try {
			const res = await getPaggingGroup(10, 1);
			setGroups(res.data?.result.result);
		} catch (error) {
			console.log(error);
		}
	};

	const {data} = useQuery({
		queryKey: ["tips", pageIndex],
		queryFn: () => getPagingTips(pageIndex, 10),
		placeholderData: keepPreviousData,
	});

	const tips = data?.data?.result?.result || [];
	const totalPage = data?.data?.result?.totalPage;
	useEffect(() => {
		getGroup();
	}, []);

	const handleJoinGroup = async (groupId: string) => {
		try {
			if (!user) {
				toast.error("Bạn cần đăng nhập để thực hiện tính năng này");
			} else {
				const res = await joinGroup(groupId);
				if (res.data.status === 1) {
					toast.success("Tham gia nhóm thành công");
					getGroup();
				} else {
					toast.error("Tham gia nhóm thất bại");
				}
			}
		} catch (error) {
			toast.error("Tham gia nhóm thất bại");
		}
	};

	const handleCreate = (groupId: string) => {
		router.push(`/tips/dang-bai/${groupId}`);
	};

	return (
		<>
			<Head>
				{tags?.map((tag, index) => (
					<React.Fragment key={index}>{parse(tag)}</React.Fragment>
				))}
			</Head>
			<div className="match-list-detail mt-4 xl:container mx-auto md:px-4 xl:px-2">
				<div className="match-list-detail-header px-4">
					<Breadcrumb
						backLink="/"
						breadCrumb={[
							{title: "Trang chủ", url: "/truc-tiep"},
							{title: "TIPS Bóng đá", url: "/truc-tiep"},
						]}
					/>
				</div>
				<div className="mt-8 md:flex">
					<ul className="md:w-1/2 flex md:justify-start md:items-start gap-8 border-b w-full justify-around">
						{tabs?.map((item) => (
							<li
								key={item.id}
								className={`text-sm h-full font-semibold pb-2 border-b-2 transition-all cursor-pointer ${
									item.id === tab
										? "text-amber-500 border-amber-500 "
										: "border-transparent"
								}`}
								onClick={() => setTab(item.id)}
							>
								{item.title}
							</li>
						))}
					</ul>
					<div className="w-full md:flex md:justify-end gap-4 mt-4 px-4 md:mt-0 grid grid-flow-row grid-cols-3">
						<button
							onClick={() => setOpenRules(true)}
							className="col-span-1 w-[99px] h-10 p-2 bg-neutral-100 rounded-lg justify-center items-center gap-2.5 inline-flex"
						>
							<div className="w-6 h-6 justify-center items-center flex">
								<Image
									src="/images/Question.svg"
									className="object-cover"
									alt=""
									width={24}
									height={24}
								/>
							</div>
							<span className="text-center text-black text-sm font-semibold">
								Nội quy
							</span>
						</button>
						<button
							onClick={() => setOpen(true)}
							className="col-span-2 h-10 p-2 bg-orange-500 rounded-lg justify-center items-center gap-2.5 inline-flex"
						>
							<div className="w-6 h-6 justify-center items-center flex">
								<Image src="/images/Pen.svg" alt="" width={24} height={24} />
							</div>
							<div className="text-center text-white text-sm font-semibold">
								Đăng bài TIPS
							</div>
						</button>
					</div>
				</div>
				<div className="grid md:grid-cols-4 gap-x-5 mt-4 px-0 md:px-4">
					<div className="col-span-4 md:col-span-3 h-fit  px-4 py-4">
						<div className="grid grid-cols-12 gap-x-5">
							{tips?.map((tip, index) => (
								<div className="col-span-12 md:col-span-6 " key={index}>
									<NewestTipItem1 item={tip} />
								</div>
							))}
						</div>
						<div className="w-full pb-4 ">
							<Pagination totalPage={totalPage} setPageIndex={setPageIndex} />
						</div>
					</div>
					<div className="col-span-4 md:col-span-1 md:pt-0 pt-4 w-full">
						<div className="bg-neutral-100 px-4 py-4">
							<div className="flex justify-between">
								<h5 className="text-black text-lg font-bold">Trận Đấu Hot</h5>
								<Link
									href={"#"}
									className="text-center text-yellow-700 text-sm font-semibold"
								>
									Xem thêm
								</Link>
							</div>
							<div className="pb-4 px-4">
								{hotMatches?.map((match) => (
									<div
										key={match?._id}
										className="border-b pb-4 last:border-b-0 last:pb-0 mt-4"
									>
										<div className="w-full flex justify-center">
											<p className="text-center text-neutral-400 text-base font-semibold">
												{match?.leagueName}
											</p>
										</div>
										<div className="grid grid-cols-3 mt-2">
											<div className="flex justify-center items-center flex-col">
												<ImageWithFallback
													src={match?.homeIcon}
													className="w-14 h-14 rounded-full"
												/>
												<p className="text-center text-black text-xs font-semibold">
													{match?.homeName}
												</p>
											</div>
											<div className="flex justify-center items-center flex-col">
												<div className="px-4 py-1 flex  justify-start items-center gap-2.5">
													<p className="text-black text-xs font-semibold">
														{moment(match?.matchTime).format("HH:mm A")}
													</p>
												</div>
												<div className="px-4 py-1 bg-amber-500 flex rounded justify-start items-center gap-2.5">
													<p className="text-white text-xs font-semibold">
														1 Tips
													</p>
												</div>
											</div>
											<div className="flex justify-center items-center flex-col">
												<ImageWithFallback
													src={match?.awayIcon}
													className="w-14 h-14 rounded-full"
												/>
												<p className="text-center text-black text-xs font-semibold">
													{match?.awayName}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="bg-neutral-100 px-4 py-4 mt-8">
							<div>
								<h5 className="text-black text-lg font-bold">Bảng xếp hạng</h5>
							</div>
							<div className="mt-4">
								<ul
									className="w-full flex md:justify-center justify-around items-start gap-8"
									style={{borderBottomWidth: "1px"}}
								>
									{rankTabs?.map((item) => (
										<li
											key={item.id}
											className={`text-sm font-semibold pb-2 border-b-2 transition-all cursor-pointer ${
												item.id === rankTab
													? "text-amber-500 border-amber-500 text-base font-semibold leading-normal"
													: "border-transparent text-center text-gray-400 text-base font-normal leading-normal"
											}`}
											onClick={() => setRankTab(item.id)}
										>
											{item.title}
										</li>
									))}
								</ul>
							</div>
							<div className="mt-4">
								{rank?.map((item, index) => (
									<RankHomeItem
										user={item}
										index={index + 1}
										key={item?._id}
										border={false}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
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
								<Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl ">
									<div className="p-4 lg:p-6">
										<div className=" pb-5 border-b-2 flex flex-col items-center gap-5">
											<h5 className="text-black text-base font-bold">
												Chọn nhóm để đăng bài
											</h5>
											<p className="text-neutral-400 text-sm font-normal">
												Bạn cần tham gia một nhóm trước khi đăng bài
											</p>
										</div>
										{groups?.map((group) => (
											<div
												key={group._id}
												className="flex justify-between items-center p-2 lg:p-4 gap-4 lg:gap-10"
											>
												<div className="flex justify-start items-center gap-2 lg:gap-4">
													<Avatar src={group.groupAvatar} />
													<div className="flex flex-col gap-2">
														<p className="text-yellow-700 text-sm md:text-lg font-bold">
															{group.groupName}
														</p>
														<div className="flex gap-4">
															<div className="flex gap-0.5">
																<Image
																	src="/images/Users.svg"
																	alt=""
																	width={16}
																	height={16}
																/>
																<p className="text-gray-400 text-[10px] font-medium leading-[15px]">
																	{group.member.length}
																</p>
															</div>
															<div className="flex gap-0.5">
																<Image
																	src="/images/pen-icon.svg"
																	alt=""
																	width={16}
																	height={16}
																/>
																<p className="text-gray-400 text-[10px] font-medium leading-[15px]">
																	{group.tip}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="flex justify-start items-center">
													<p className="text-black text-xs md:text-sm font-normal leading-[21px]">
														{group.groupDesc}
													</p>
												</div>

												<div className="rounded-lg border border-amber-500 justify-start items-center gap-2 flex ">
													{group.member.includes(user?._id) ? (
														<button
															onClick={() => handleCreate(group._id)}
															className="px-3 py-3 bg-amber-500 rounded-lg text-white text-sm font-semibold w-full"
														>
															Gửi bài
														</button>
													) : (
														<button
															onClick={() => handleJoinGroup(group._id)}
															className="px-1 py-1 lg:px-3 lg:py-3 text-amber-500 text-xs lg:text-sm font-semibold w-full"
														>
															Tham gia
														</button>
													)}
												</div>
											</div>
										))}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<Transition appear show={openRules}>
				<Dialog as="div" className="relative z-10" onClose={handleCloseRules}>
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
								<Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl ">
									<div className="p-6">
										<div className=" pb-5 border-b-2 flex flex-col items-center gap-5">
											<h5 className="text-black text-base font-bold">
												Nội quy Cộng đồng Ok Chơi
											</h5>
										</div>
										<div>
											<h5 className="text-amber-500 text-base font-bold text-center my-2">
												Chào mừng đến với cộng đồng Ok Chơi !
											</h5>
											<p>
												1. Đăng ký thành viên Ok Chơi có thể tham gia tương tác
												của cộng đồng;
											</p>
											<p>
												2. Thành viên đăng ít nhất 14 bài /tuần và có tỷ lệ
												thắng trên 60% sẽ có cơ hội cơ hội lớn để trở thành
												chuyên gia Ok Chơi;
											</p>
											<p>
												3. Chuyên gia có thể đăng bài kim cương để kiếm tiền,
												kim cương sẽ được cộng vào phần tiền thưởng của tài
												khoản chuyên gia sau khi trận đấu kết thúc (thu nhập
												được phân chia như sau: chuyên gia chia 60%, Admin chia
												40%);
											</p>
											<p>
												4. Chuyên gia có thể đăng tối đa 5 bài kim cương mỗi
												ngày.
											</p>
											<p>
												<span lang="EN-US">&nbsp;</span>
											</p>
											<p className="bg-amber-600 w-fit">
												5. Nếu vi phạm các yêu cầu sau đây, Admin sẽ xóa tư cách
												chuyên gia:
											</p>
											<p>
												(1) Bài viết chứa nội dung vi phạm yêu cầu của cộng
												đồng;
											</p>
											<p>
												(2) Bài viết chứa nhiều icon emoji(biểu tượng cảm xúc)
												vô nghĩa;
											</p>
											<p>(3) Tỷ lệ thắng sụt giảm liên tục;</p>
											<p>
												(4) Không hoạt động và không đăng bài trong một thời
												gian dài;
											</p>
											<p>
												(5) Cấm copy nội dung bài viết từ từ website khác hay
												các chuyên gia trong Cộng đồng.
											</p>
											<p>
												(6) Các hành vi khác không tuân theo sự quản lý của
												Admin;
											</p>
											<p>&nbsp;</p>
											<p>
												6. Thành viên có thể mở khóa bài kim cương của chuyên
												gia theo hai cách:
											</p>
											<p>
												-Mua từng bài: 68 kim cương/bài (trận chưa đá); 5 kim
												cương/bài(đã hết trận);
											</p>
											<p>-Đặt mua theo tuần: 1200 kim cương/tuần</p>
											<p>-Đặt mua theo tháng: 4500 kim cương/30 ngày</p>
											<p>
												7. Nếu trận đấu bị hoãn hoặc bị hủy do trường hợp bất
												khả kháng, kim cương đã trả cho trận đấu này sẽ được
												hoàn lại tài khoản của người mua.
											</p>
											<p>&nbsp;</p>
											<p>
												<span className="bg-amber-600 w-fit">
													8. Nội dung được đăng trong cộng đồng không được vi
													phạm luật pháp, không được thảo luận những nội dung
													nhạy cảm như:
												</span>
											</p>
											<p>
												-Liên quan đến chính trị, bạo lực, khiêu dâm, ma túy;
											</p>
											<p>-Nội dung mang tính lăng mạ, đe dọa người khác;</p>
											<p>
												-Quảng cáo dưới mọi hình thức (bao gồm nhưng không giới
												hạn chứa liên kết/hình ảnh web ngoài)
											</p>
											<p>
												-Cung cấp thông tin cá nhân, mạng xã hội qua mọi hình
												thức
											</p>
											<p>&nbsp;</p>
											<p>
												9. Tất cả thành viên phải chịu trách nhiệm về nội dung
												bài viết của mình, trường hợp vi phạm sẽ bị Admin xử lý
												tùy theo mức độ, tình huống, và luật pháp (nếu có) mà
												không cần thông báo trước.
											</p>
											<p>&nbsp;</p>
											<p>
												10. Admin Ok Chơi có quyền giải thích cuối cùng của nội
												quy cộng đồng. Email liên hệ:
												<a
													href="mailto:okchoi@gmail.com"
													className="text-amber-500"
												>
													{" "}
													okchoi@gmail.com
												</a>
											</p>
										</div>
										<div className="border-t-2 pt-2 mt-4 text-right">
											<button
												onClick={() => setOpenRules(false)}
												className="bg-light px-8 py-2 text-sm font-semibold rounded-lg"
											>
												Thoát
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

export default Tips;

export async function getServerSideProps() {
	try {
		const [hotMatches, seo, rank] = await Promise.all([
			getHotMatches(1, 5),
			getSeoByLink("/tips"),
			getRankTable(),
		]);
		return {
			props: {
				hotMatches: hotMatches.data?.result,
				tags: seo?.data?.result?.tags || [],
				rank: rank?.data?.result?.data,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
}
