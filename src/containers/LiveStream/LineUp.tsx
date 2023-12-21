import {getLineUpById} from "@/apis/match";
import ImageWithFallback from "@/components/imageWithFallback";
import {LOGO_DEFAULT} from "@/constant";
import {IHotMatch, ILineup, ILineupItem} from "@/interfaces";
import {genShortPlayerName} from "@/utils";
import {GetServerSidePropsContext} from "next";
import Image from "next/image";
import React, {useCallback} from "react";

const PlayerItem = ({item, isAway = false}: {item: any; isAway?: boolean}) => {
	return (
		<div className="flex flex-col items-center min-w-[100px]">
			<div
				className={`w-[42px] h-[42px] rounded-full ${
					isAway ? "bg-secondary" : "bg-primary"
				} flex items-center justify-center font-semibold text-white border-2 border-white`}
			>
				{item?.number}
			</div>
			<div className="text-white text-sm mt-1 font-semibold">
				{genShortPlayerName(item?.name)}
			</div>
		</div>
	);
};

type Props = {
	match: IHotMatch;
	lineup: any;
};

function LineUp({match, lineup}: Props) {
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
	console.log("dsd", genDataByPosition("homeLineup")?.result);
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

			{/* <div className="mt-4 lineup-wrapper block md:flex items-center md:px-[2rem] lg:px-[7rem]">
        <div className="flex-1 h-1/2 md:h-full">
          <div className="flex justify-between flex-col md:flex-row pt-16 md:pt-0 md:pr-8 lg:pr-12 h-full">
            {Object.values(genDataByPosition("homeLineup"))?.map(
              (item: any, index) => (
                <div
                  key={index}
                  className="flex flex-row md:flex-col justify-evenly h-full"
                >
                  {item?.map((e: any) => (
                    <PlayerItem key={item?.playerId} item={e} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex-1 h-1/2 md:h-full">
          <div className="flex flex-col-reverse md:flex-row-reverse justify-between pt-8 md:pt-0 md:pl-8 lg:pl-12 h-full">
            {Object.values(genDataByPosition("awayLineup"))?.map(
              (item: any, index) => (
                <div
                  key={index}
                  className="flex flex-row md:flex-col justify-evenly h-full"
                >
                  {item?.map((e: any) => (
                    <PlayerItem isAway key={item?.playerId} item={e} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <h4 className="text-secondary font-bold text-xl mt-8">Đội hình dự bị</h4>
      <div className="mt-4 md:flex gap-x-5">
        <div className="flex-1">
          <table className="w-full rounded-t-2xl">
            <thead>
              <tr className="bg-light border-light border">
                <td className="pl-4 py-2 flex items-center gap-x-2">
                  <Image
                    src={match.homeIcon || LOGO_DEFAULT}
                    alt="logo-home"
                    width={36}
                    height={36}
                  />
                  <div className="font-bold text-md">{lineup?.homeName}</div>
                </td>
                <td className="pr-4 py-2 text-right">
                  <div className="font-bold text-sm">-</div>
                  <div className="text-xs">Huấn luyện viên</div>
                </td>
              </tr>
            </thead>
            <tbody className="border">
              {lineup?.data?.[0]?.homeBackup?.map((item: any) => (
                <tr key={item?.playerId} className="border-t">
                  <td className="pl-4 py-3 flex items-center gap-x-2">
                    <div className="font-bold text-md">{item?.number}</div>
                    <div className="font-semibold text-md">{item?.name}</div>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1">
          <table className="w-full rounded-t-2xl">
            <thead>
              <tr className="bg-light border-light border">
                <td className="pl-4 py-2 flex items-center gap-x-2">
                  <Image
                    src={match.awayIcon || LOGO_DEFAULT}
                    alt="logo-home"
                    width={36}
                    height={36}
                  />
                  <div className="font-bold text-md">{lineup?.awayName}</div>
                </td>
                <td className="pr-4 py-2 text-right">
                  <div className="font-bold text-sm">-</div>
                  <div className="text-xs">Huấn luyện viên</div>
                </td>
              </tr>
            </thead>
            <tbody className="border">
              {lineup?.data?.[0]?.awayBackup?.map((item: any) => (
                <tr key={item?.playerId} className="border-t">
                  <td className="pl-4 py-3 flex items-center gap-x-2">
                    <div className="font-bold text-md">{item?.number}</div>
                    <div className="font-semibold text-md">{item?.name}</div>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
		</section>
	);
}

export default LineUp;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	try {
		const matchId = ctx.query.matchId;

		const [lineUpRes] = await Promise.all([
			getLineUpById((matchId as string) || ""),
		]);

		return {
			props: {},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
}
