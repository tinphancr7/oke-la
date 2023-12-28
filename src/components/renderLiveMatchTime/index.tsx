import {IMatch} from "@/interfaces";
import {generateMatchTime} from "@/utils";
import {useState, useEffect} from "react";

const LiveMatchTime = ({match}: {match: IMatch}) => {
	const [refetch, setRefetch] = useState(false);

	useEffect(() => {
		const changeTimeInterval = setInterval(() => {
			setRefetch(!refetch);
		}, 30000);

		return () => {
			clearInterval(changeTimeInterval);
		};
	}, []);
	return (
		<div className="text-[#E62F2B] text-xs lg:text-sm font-semibold">
			{generateMatchTime(match.matchTime, match.status, match.halfStartTime)}
			<span className="blink-minute text-[16px]">{`'`}</span>
		</div>
	);
};

export default LiveMatchTime;
