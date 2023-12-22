import {getLineUpById} from "@/apis/match";
import ImageWithFallback from "@/components/imageWithFallback";
import {genShortPlayerName} from "@/utils";
import {useQuery} from "@tanstack/react-query";
import {GetServerSidePropsContext} from "next";
import Image from "next/image";
import React, {useCallback} from "react";

function LineUp({matchId}: any) {
	const {data} = useQuery({
		queryKey: ["lineUp", matchId],
		queryFn: () => getLineUpById(matchId),
		enabled: !!matchId,
	});
	const lineup = data?.data;

	const genDataByPosition = useCallback(
		(attr: "homeLineup" | "awayLineup") => {
			const listPosition = new Set(
				(lineup as any)?.[attr]?.map((item: any) => item?.position) || []
			);

			let result: any = {};

			listPosition?.forEach((item: any) => {
				result[item] = (lineup as any)?.[attr]?.filter(
					(e: any) => e?.position === item
				);
			});

			const temp = [];
			const formation = (lineup as any)?.[
				attr === "homeLineup" ? "homeFormation" : "awayFormation"
			];
			for (let i = 0; i < formation?.length; i++) {
				temp.push(formation?.[i]);
			}

			return {
				temp: temp?.toString()?.replaceAll(",", "-"),
				result,
				formation,
			};
		},
		[lineup]
	);

	return (
		<section>
			{/* <h4 className="text-secondary font-bold text-xl">Đội hình xuất phát</h4> */}
			<div className="flex items-center justify-between font-bold mt-4">
				<div>{genDataByPosition("homeLineup")?.temp}</div>
				<div>SƠ ĐỒ CHIẾN THUẬT</div>
				<div>{genDataByPosition("awayLineup")?.temp}</div>
			</div>

			<div className="p-8 bg-[#fff] mt-4 rounded-[4px] hidden lg:block">
				<div className="lineup-new-wrapper flex items-stretch">
					<div className="corner corner-1"></div>
					<div className="corner corner-2"></div>
					<div className="corner corner-3"></div>
					<div className="corner corner-4"></div>
					<div className="">
						<div className="goal-box-left goal-box-left-1"></div>
						<div className="goal-box-left goal-box-left-2"></div>
						<div className="goal-box-left goal-box-left-3"></div>
					</div>

					<div className="">
						<div className="goal-box-right goal-box-right-1"></div>
						<div className="goal-box-right goal-box-right-2"></div>
						<div className="goal-box-right goal-box-right-3"></div>
					</div>
					<div className="circle-center"></div>
					<div className="line-center"></div>
					<div className="circle-small-center"></div>

					<div className="absolute left-0 top-0 right-0 bottom-0 z-50 flex items-center">
						<div className="flex items-stretch justify-between w-[50%] min-h-full pr-4">
							{Object.values(
								genDataByPosition("homeLineup")?.result as any[]
							)?.map((item: any[], index: any) => (
								<ul
									className="flex flex-col justify-evenly min-h-full"
									key={index}
								>
									{item?.map((e, index) => (
										<li
											key={e?.playerId}
											className="flex flex-col items-center"
										>
											{lineup?.haveInfo ? (
												<div className="flex flex-col items-center">
													<ImageWithFallback
														src={e?.player?.photo || "/images/no-avatar.png"}
														className="w-[62px] h-[62px] rounded-full object-cover"
													/>

													<div className="font-semibold text-xs mt-1">
														{e?.number} {genShortPlayerName(e?.name)}
													</div>
												</div>
											) : (
												<>
													<div className="relative w-fit">
														<img
															src="/images/tshirt-home.png"
															className="w-[42px]"
														/>
														<div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-40%] text-sm font-semibold">
															{e?.number}
														</div>
													</div>
													<div className="font-semibold text-xs mt-1">
														{genShortPlayerName(e?.name)}
													</div>
												</>
											)}
										</li>
									))}
								</ul>
							))}
						</div>

						<div className="flex items-stretch flex-row-reverse justify-between w-[50%] min-h-full pl-4">
							{Object.values(
								genDataByPosition("awayLineup")?.result as any[]
							)?.map((item: any[], index: any) => (
								<ul
									className="flex flex-col justify-evenly min-h-full"
									key={index}
								>
									{item?.map((e, index) => (
										<li
											key={e?.playerId}
											className="flex flex-col items-center"
										>
											{lineup?.haveInfo ? (
												<div className="flex flex-col items-center">
													<ImageWithFallback
														src={e?.player?.photo || "/images/no-avatar.png"}
														className="w-[62px] h-[62px] rounded-full object-fill"
													/>

													<div className="font-semibold text-xs mt-1">
														{e?.number} {genShortPlayerName(e?.name)}
													</div>
												</div>
											) : (
												<>
													<div className="relative w-fit">
														<img
															src="/images/tshirt-home.png"
															className="w-[42px]"
														/>
														<div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-40%] text-sm font-semibold">
															{e?.number}
														</div>
													</div>
													<div className="font-semibold text-xs mt-1">
														{genShortPlayerName(e?.name)}
													</div>
												</>
											)}
										</li>
									))}
								</ul>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="p-4 bg-[#fff] mt-4 rounded-[4px] block lg:hidden">
				<div className="lineup-new-wrapper-mobile flex items-stretch">
					<div className="corner corner-1"></div>
					<div className="corner corner-2"></div>
					<div className="corner corner-3"></div>
					<div className="corner corner-4"></div>
					<div className="">
						<div className="goal-box-left goal-box-left-1"></div>
						<div className="goal-box-left goal-box-left-2"></div>
						<div className="goal-box-left goal-box-left-3"></div>
					</div>

					<div className="">
						<div className="goal-box-right goal-box-right-1"></div>
						<div className="goal-box-right goal-box-right-2"></div>
						<div className="goal-box-right goal-box-right-3"></div>
					</div>
					<div className="circle-center"></div>
					<div className="line-center"></div>
					<div className="circle-small-center"></div>

					<div className="absolute left-0 top-0 right-0 bottom-0 z-50 flex items-center flex-col">
						<div className="w-full h-[50%] flex items-center justify-between flex-col gap-0 pb-2">
							{Object.values(
								genDataByPosition("homeLineup")?.result as any[]
							)?.map((item: any[], index: any) => (
								<ul className="flex flex-row justify-evenly w-full" key={index}>
									{item?.map((e, index) => (
										<li
											key={e?.playerId}
											className="flex flex-col items-center flex-1"
										>
											<div className="relative w-fit">
												<img
													src="/images/tshirt-home.png"
													className="w-[24px]"
												/>
												<div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-40%] text-xs font-semibold text-white">
													{e?.number}
												</div>
											</div>
											<div className="font-semibold text-[10px] mt-0">
												{genShortPlayerName(e?.name)}
											</div>
										</li>
									))}
								</ul>
							))}
						</div>

						<div className="w-full h-[50%] flex items-center justify-between flex-col-reverse gap-0 pt-4">
							{Object.values(
								genDataByPosition("awayLineup")?.result as any[]
							)?.map((item: any[], index: any) => (
								<ul className="flex flex-row justify-evenly w-full" key={index}>
									{item?.map((e, index) => (
										<li
											key={e?.playerId}
											className="flex flex-col items-center flex-1"
										>
											<div className="relative w-fit">
												<img
													src="/images/tshirt-away.png"
													className="w-[24px]"
												/>
												<div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-40%] text-xs font-semibold text-white">
													{e?.number}
												</div>
											</div>
											<div className="font-semibold text-[10px] mt-0">
												{genShortPlayerName(e?.name)}
											</div>
										</li>
									))}
								</ul>
							))}
						</div>
					</div>
				</div>
			</div>

			{lineup?.homeLineup?.length > 0 && lineup?.awayLineup?.length > 0 && (
				<div className="mt-4">
					<div className="text-center font-semibold mb-4">ĐỘI HÌNH RA SÂN</div>
					{Array.from({
						length:
							lineup?.homeLineup?.length > lineup?.awayLineup?.length
								? lineup?.homeLineup?.length
								: lineup?.awayLineup?.length,
					})?.map((_, index: number) => (
						<div
							key={index}
							className={`flex items-center justify-between font-semibold text-xs lg:text-sm p-2 ${
								index % 2 === 0 ? "bg-white" : "bg-[#eee]"
							}`}
						>
							<div className="flex items-center">
								<div className="w-[30px]">
									{lineup?.homeLineup?.[index]?.number}
								</div>
								<div>
									{genShortPlayerName(lineup?.homeLineup?.[index]?.name)}
								</div>
							</div>

							<div className="flex items-center justify-end text-right">
								<div>
									{genShortPlayerName(lineup?.awayLineup?.[index]?.name)}
								</div>
								<div className="w-[30px]">
									{lineup?.awayLineup?.[index]?.number}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{lineup?.homeBackup?.length > 0 && lineup?.awayBackup?.length > 0 && (
				<div className="mt-4">
					<div className="text-center font-semibold mb-4">ĐỘI HÌNH DỰ BỊ</div>
					{Array.from({
						length:
							lineup?.homeBackup?.length > lineup?.awayBackup?.length
								? lineup?.homeBackup?.length
								: lineup?.awayBackup?.length,
					})?.map((_, index: number) => (
						<div
							key={index}
							className={`flex items-center justify-between font-semibold text-xs lg:text-sm p-2 ${
								index % 2 === 0 ? "bg-white" : "bg-[#eee]"
							}`}
						>
							<div className="flex items-center">
								<div className="w-[30px]">
									{lineup?.homeBackup?.[index]?.number}
								</div>
								<div>
									{genShortPlayerName(lineup?.homeBackup?.[index]?.name)}
								</div>
							</div>

							<div className="flex items-center justify-end text-right">
								<div>
									{genShortPlayerName(lineup?.awayBackup?.[index]?.name)}
								</div>
								<div className="w-[30px]">
									{lineup?.awayBackup?.[index]?.number}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}

export default LineUp;
