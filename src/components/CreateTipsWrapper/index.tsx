import scheduleApi from "@/apis/schedule.api";
import LeaguePicker from "./LeaguePicker";
import {useContext, useEffect, useState, useSyncExternalStore} from "react";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {createTip} from "@/apis/tip";
import {AuthContext} from "@/context/AuthContext";
import BundledEditor from "../Editor";
import {convertToOdd1} from "@/utils";

const choosen = [
	"initialHome",
	"initialHandicap",
	"initialAway",
	"initialOver",
	"initialHandicap",
	"initialUnder",
];

const CreateTipsWrapper = ({
	listMatchLeague,
	onCreate,
}: {
	listMatchLeague: any;
	onCreate: any;
}) => {
	const {user} = useContext(AuthContext);
	const [match, setMatch] = useState<any>();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [odd, setOdd] = useState<any>();
	const router = useRouter();
	const {query} = router;

	const [options, setOptions] = useState<number>();

	const ButtonOdds = (
		className: String,
		id: number,
		text: String,
		disable = false
	) => {
		return (
			<div
				className={`col-span-1 w-full flex justify-center rounded-md border border-zinc-100 h-[40px] items-center cursor-pointer ${
					className ? className : ""
				} ${
					id === options
						? "text-yellow-700 text-sm font-normal bg-amber-100 rounded-md border border-yellow-700"
						: ""
				}`}
				onClick={() => !disable && handleChosen(id)}
			>
				{text}
			</div>
		);
	};
	const handleChosen = (id: number) => {
		setOptions(id);

		if (id <= 2) {
			setOdd({
				initialHome: match?.handicap.initialHome,
				initialHandicap: match?.handicap.initialHandicap,
				initialAway: match?.handicap.initialAway,
				choosen: choosen[id],
				type: 0,
			});
		} else {
			setOdd({
				initialOver: match?.overUnder?.initialOver,
				initialUnder: match?.overUnder.initialUnder,
				initialHandicap: match?.overUnder.initialHandicap,
				choosen: choosen[id],
				type: 1,
			});
		}
	};
	const handleSubmit = async () => {
		try {
			if (!user) {
				toast.error("Bạn phải đăng nhập để thực hiện tính năng này");
			} else {
				if (!match) {
					toast.error("Vui lòng chọn trận đấu");
				} else {
					const data = {
						title,
						content,
						group: query?.id,
						matchId: match.matchId,
						odd,
					};

					const res = await createTip(data);

					if (res.data.status === 1) {
						toast.success("Gửi bài tip thành công");
						router.push(`/tips/${res.data?.result.slug}`);
					} else {
						toast.error("Gửi bài tip thất bại");
					}
				}
			}
		} catch (error) {
			console.log(error);

			toast.error("Gửi bài tip thất bại");
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			const item = document.getElementById("create-tips-option");

			const e = document.getElementById("create-tips-matches");
			if (e) e.style.maxHeight = `${item?.offsetHeight}px`;
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, []);
	console.log("match", match);
	return (
		<div className="p-4 bg-neutral-100 w-full">
			<div className="grid xl:grid-cols-3 md:gap-x-5 h-fit">
				<div className="col-span-1">
					<LeaguePicker
						setMatch={setMatch}
						listMatchLeague={listMatchLeague}
						match={match}
					/>
				</div>
				<div className="col-span-2 w-full">
					{/* <LeaguePicker /> */}
					<div
						className="w-full flex-col justify-center items-center gap-6 inline-flex"
						id="create-tips-option"
					>
						<div className="flex-col justify-start items-start gap-4 flex w-full">
							<div className="justify-start items-center gap-1 inline-flex">
								<div className="px-2 py-1 bg-yellow-700 rounded-[21px] flex-col justify-center items-center gap-2.5 inline-flex">
									<div className="text-white text-xs font-semibold">2</div>
								</div>
								<div className="text-black text-base font-semibold">
									Xác nhận lựa chọn
								</div>
							</div>
							{match ? (
								<div className="w-full p-4 bg-white rounded-lg border border-zinc-100 flex-col justify-center items-start gap-4">
									<div className="self-stretch justify-between items-center gap-4 inline-flex">
										<div className="text-black text-m font-bold">
											{match?.homeName} VS {match?.awayName}
										</div>
										<div className="w-6 h-6 relative" />
									</div>
									<div className="grid grid-cols-3 gap-2 text-sm mt-4">
										{ButtonOdds("", 0, `Chủ ${match?.handicap?.initialHome}`)}

										{ButtonOdds(
											"bg-neutral-200",
											1,
											`HDP ${convertToOdd1(match?.handicap?.initialHandicap)}`,
											true
										)}

										{ButtonOdds("", 2, `Khách ${match?.handicap?.initialAway}`)}

										{ButtonOdds("", 3, `Tài ${match?.overUnder?.initialOver}`)}

										{ButtonOdds(
											"bg-neutral-200",
											4,
											`T/X ${match?.overUnder?.initialHandicap}`,
											true
										)}
										{ButtonOdds("", 5, `Xỉu ${match?.overUnder?.initialUnder}`)}
									</div>
								</div>
							) : (
								<div className="w-full px-3 py-4 bg-white rounded-lg border border-zinc-100 justify-start items-center gap-2.5 inline-flex">
									<div className="text-gray-400 text-sm font-semibold">
										Vui lòng chọn một trận đấu
									</div>
								</div>
							)}
						</div>
						<div className="flex-col justify-start items-start gap-4 flex w-full">
							<div className="justify-start items-center gap-1 inline-flex w-full">
								<div className="px-2 py-1 bg-yellow-700 rounded-[21px] flex-col justify-center items-center gap-2.5 inline-flex ">
									<div className="text-white text-xs font-semibold">3</div>
								</div>
								<div className="text-black text-base font-semibold">
									Nội dung
								</div>
							</div>
							<div className="flex-col justify-start items-start gap-2 flex w-full">
								<input
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Vui lòng nhập tiêu đề"
									className="text-gray-400 text-sm w-full px-3 py-4 bg-white rounded-lg border border-zinc-100 justify-start items-center gap-2.5 inline-flex focus:outline-none"
								></input>
								<div className="w-full">
									<BundledEditor
										onEditorChange={(e) => setContent(e)}
										initialValue={`<p>Vui lòng nhập nội dung</p>`}
										init={{
											height: 300,
											menubar: false,
											plugins: [
												"advlist",
												"anchor",
												"autolink",
												"charmap",
												"code",
												"fullscreen",
												"help",
												"image",
												"insertdatetime",
												"link",
												"lists",
												"media",
												"preview",
												"searchreplace",
												"table",
												"visualblocks",
												"accordion",
											],
											toolbar:
												"undo redo |link image accordion | styles | bold italic underline strikethrough | align | bullist numlist",
											content_style:
												"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
											language: "vi_Vn",
										}}
										// className=" w-full h-[300px] px-3 py-4 bg-white rounded-lg border border-zinc-100 justify-start items-start gap-2.5 inline-flex max-h-[300px] focus:outline-none"
									/>
								</div>
							</div>
						</div>
						<div className="self-stretch  flex-col justify-start items-start gap-2 flex w-full">
							<div className="justify-start items-center gap-1 inline-flex">
								<div className="px-2 py-1 bg-yellow-700 rounded-[21px] flex-col justify-center items-center gap-2.5 inline-flex">
									<div className="text-white text-xs font-semibold">4</div>
								</div>
								<div className="text-black text-base font-semibold">
									Đặc quyền đọc
								</div>
							</div>
							<div className="px-4 py-2 bg-amber-100 rounded-md border border-yellow-700 justify-center items-center gap-2.5 inline-flex">
								<div className="text-yellow-700 text-sm font-normal">
									Miễn phí
								</div>
							</div>
						</div>

						<button
							onClick={handleSubmit}
							className="px-20 py-3 bg-yellow-700 rounded-md text-white text-sm font-normal"
						>
							Gửi bài
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTipsWrapper;
