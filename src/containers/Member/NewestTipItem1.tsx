import {getMatchById} from "@/apis/match";
import {LOGO_DEFAULT} from "@/constant";
import {AuthContext} from "@/context/AuthContext";
import {IMatch, ITip} from "@/interfaces";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
import {AiOutlineHeart} from "react-icons/ai";
import {BiMessage} from "react-icons/bi";
import {useInView} from "react-intersection-observer";
import {toast} from "react-toastify";

type Props = {
	item: ITip;
};

function NewestTipItem1({item}: Props) {
	const {user} = useContext(AuthContext);
	const router = useRouter();

	const [match, setMatch] = useState<IMatch>();
	const {ref, inView} = useInView({
		triggerOnce: true,
	});
	const handleClickBtn = (event: any) => {
		if (user) {
			router.push(`/tips/${item?.slug}`);
		} else {
			toast.error("Bạn cần đăng nhập để xem tips");
		}
	};

	const getMatch = async () => {
		try {
			const result = await getMatchById(item?.matchId, "1");
			setMatch(result?.data?.match?.[0] || {});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (inView) getMatch();
	}, [inView, item?.matchId]);

	const genWinLose = () => {
		if (item?.odd?.choosen === "initialOver")
			return (match?.homeScore || 0) + Number(match?.awayScore || 0) >=
				Number(item?.odd?.initialHandicap)
				? "Thắng"
				: "Thua";

		if (item?.odd?.choosen === "initialUnder")
			return (match?.homeScore || 0) + Number(match?.awayScore || 0) <
				Number(item?.odd?.initialHandicap)
				? "Thắng"
				: "Thua";

		if (item?.odd?.choosen === "initialHome")
			return (match?.homeScore || 0) + Number(item?.odd?.initialHandicap) * -1 >
				(match?.awayScore || 0)
				? "Thắng"
				: "Thua";

		if (item?.odd?.choosen === "initialAway")
			return (match?.awayScore || 0) + Number(item?.odd?.initialHandicap) >
				(match?.awayScore || 0)
				? "Thắng"
				: "Thua";

		return null;
	};

	const genOddHDP = (odd: any) => {
		let title = "";
		let oddTitle: any = "";

		if (odd?.type === 0) {
			title = "Kèo Châu Á";
			if (odd?.choosen?.includes("Home")) {
				oddTitle =
					// @ts-ignore
					(match?.homeName as string) +
					" (" +
					(Number(odd?.initialHandicap) > 0
						? `-${Number(odd?.initialHandicap)}`
						: `+${Number(odd?.initialHandicap * -1)}`) +
					")";
			} else {
				oddTitle =
					// @ts-ignore
					(match?.awayName as string) +
					" (" +
					(Number(odd?.initialHandicap) < 0
						? `${Number(odd?.initialHandicap)}`
						: `+${Number(odd?.initialHandicap)}`) +
					")";
			}
		} else {
			title = "Kèo tài xỉu";
			if (odd?.choosen?.includes("Over")) {
				oddTitle = "Tài" + ` (${odd?.initialHandicap})`;
			} else {
				oddTitle = "Xỉu" + ` (${odd?.initialHandicap})`;
			}
		}
		return {title, oddTitle};
	};

	return (
		<div
			ref={ref}
			className="border-b h-[400px] flex flex-col justify-between  rounded-lg p-4 mb-5 tips-item relative"
		>
			<div className="flex items-center gap-2 pt-4">
				<div className="w-10 h-10 relative flex-shrink-0">
					<Image src={LOGO_DEFAULT} fill className="object-cover" alt="" />
				</div>
				<div>
					<div className="text-sm font-semibold text-[#2C3882]">
						{item?.user?.username}
					</div>
					<div className="text-xs text-[#888]">
						{moment(item?.createdAt).format("DD/MM/YYYY HH:mm")}
					</div>
				</div>
			</div>
			<div className="bg-[url('/tips-tag.svg')] text-white text-center bg-no-repeat bg-center bg-cover text-sm py-1  absolute w-[300px] top-0 left-[50%] translate-x-[-50%] truncate">
				{match?.leagueName}
			</div>
			<div className="flex items-center justify-end gap-x-2 t text-sm mt-2">
				<div className="flex items-center gap-x-1">
					<BiMessage />
					<span>{(item?.comment as number) || 0}</span>
				</div>

				<div className="flex items-center gap-x-1">
					<AiOutlineHeart className="text-secondary" />
					<span>{item?.like || 0}</span>
				</div>
			</div>
			<div className="text-right">
				{match?.status === -1 && genWinLose() && (
					<div
						className={`px-2 py-[3px] text-xs font-semibold text-white ${
							genWinLose() === "Thắng" ? "bg-[#44f272]" : "bg-[#E62F2B]"
						} inline rounded-[4px]`}
					>
						{genWinLose()}
					</div>
				)}
			</div>

			<div className="flex justify-center items-center w-full gap-4 mt-4 px-4">
				<div className=" w-[40%] ">
					<div className="flex items-center justify-end gap-2">
						<div className="font-bold text-sm  ">
							{match?.homeName || "---"}
						</div>
						<div className=" relative w-8 h-8 ">
							<Image
								src={match?.homeIcon || LOGO_DEFAULT}
								alt={"logo"}
								className="object-cover"
								fill
							/>
						</div>
					</div>
				</div>

				<div className="text-sm text-[#888] w-[20%] flex items-center justify-center flex-col font-semibold ">
					<img src="/icons/versus-icon.png" />

					{match?.status === -1 ? (
						<div className="text-center px-4 py-1 bg-secondary text-white rounded-lg mt-2">
							{match?.homeScore} - {match?.awayScore}
						</div>
					) : (
						<div className="text-center  px-4 py-1 bg-secondary text-white rounded-lg mt-2">
							{moment(Number(match?.matchTime) * 1000).format("HH:mm")}
						</div>
					)}

					<div className="text-center mt-2 text-[#2C3882]">
						{moment(Number(match?.matchTime) * 1000).format("DD/MM/YYYY")}
					</div>
				</div>

				<div className=" w-[40%]">
					<div className="flex items-center gap-2 ">
						<div className="w-8 h-8 relative ">
							<Image
								src={match?.awayIcon || LOGO_DEFAULT}
								alt="logo"
								className="object-cover"
								fill
							/>
						</div>
						<div className="font-bold flex-1  text-start text-sm">
							{match?.awayName || "---"}
						</div>
					</div>
				</div>
			</div>
			<div className="mt-8 flex gap-1 text-[14px]">
				<p className="font-bold whitespace-nowrap">Nhận định: </p>
				<p
					className="truncate"
					dangerouslySetInnerHTML={{__html: `${item.content}`}}
				></p>
				<button
					onClick={handleClickBtn}
					className="text-[#2C3882] whitespace-nowrap pl-2"
				>
					[Xem tiếp]
				</button>
			</div>

			<div className="flex mt-4 items-center justify-between">
				<div>
					<div className="flex items-center gap-x-2 mt-2">
						<div className="font-bold text-[14px]">
							{genOddHDP(item?.odd)?.title}:
						</div>
						<div className="border bg-red-600 text-white rounded-[4px] text-xs px-2 py-1 font-semibold">
							{genOddHDP(item?.odd)?.oddTitle}
						</div>
						<button
							onClick={handleClickBtn}
							className="border border-secondary text-secondary rounded-[4px] text-xs px-2 py-1 font-semibold"
						>
							XEM TIPS
						</button>
						<Link href={`/truc-tiep/${item?.matchId}`}>
							<button className="border border-secondary text-secondary rounded-[4px] text-xs px-2 py-1 font-semibold">
								TRẬN ĐẤU
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewestTipItem1;
