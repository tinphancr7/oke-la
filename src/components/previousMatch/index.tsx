const PreviousMatch = ({ analysis }: { analysis: any }) => {
  const checkWinLose = (home: number, away: number) => {
    if (home > away) {
      return "W";
    } else if (home == away) {
      return "D";
    } else {
      return "L";
    }
  };
  const spiltArray = (arrayAnalys: any) => {
    return arrayAnalys?.split(",");
  };
  let goalHome = 0;
  const caculateAllGoalHome = analysis?.homeLastMatches
    ?.slice(1, 6)
    .map((x: any) => (goalHome += Number(spiltArray(x)?.[8])));

  let goalAway = 0;
  const caculateAllGoalAway = analysis?.awayLastMatches
    ?.slice(1, 6)
    .map((x: any) => (goalAway += Number(spiltArray(x)?.[8])));
  let cornerHome = 0;
  const caculateAllCornerHome = analysis?.homeLastMatches
    ?.slice(1, 6)
    .map((x: any) => (cornerHome += Number(spiltArray(x)?.[14])));

  let cornerAway = 0;
  const caculateAllCornerAway = analysis?.awayLastMatches
    ?.slice(1, 6)
    .map((x: any) => (cornerAway += Number(spiltArray(x)?.[14])));

  let redCardAway = 0;
  const caculateAllRedcardAway = analysis?.awayLastMatches
    ?.slice(1, 6)
    .map((x: any) => (redCardAway += Number(spiltArray(x)?.[12])));

  let redCardHome = 0;
  const caculateRedCardHome = analysis?.homeLastMatches
    ?.slice(1, 6)
    .map((x: any) => (redCardHome += Number(spiltArray(x)?.[12])));
  return (
    <div>
      <p className="text-center text-[18px] mt-4 font-bold">6 trận gần đây</p>
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex gap-1">
          {analysis?.homeLastMatches
            ?.slice(1, 6)
            ?.map((item: any, index: number) => {
              return (
                <span
                  key={index}
                  className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${
                    checkWinLose(
                      item?.split(",")?.[8],
                      item?.split(",")?.[9]
                    ).toLowerCase() === "w" && "bg-green02"
                  } ${
                    checkWinLose(
                      item?.split(",")?.[8],
                      item?.split(",")?.[9]
                    ).toLowerCase() === "l" && "bg-red-500"
                  } ${
                    checkWinLose(
                      item?.split(",")?.[8],
                      item?.split(",")?.[9]
                    ).toLowerCase() === "d" && "bg-[#9DA5AC]"
                  } `}
                >
                  {checkWinLose(item?.split(",")?.[8], item?.split(",")?.[9])}
                </span>
              );
            })}
        </div>
        <div className="flex  gap-1">
          {analysis?.awayLastMatches
            ?.slice(1, 6)
            ?.map((item: any, index: number) => {
              return (
                <span
                  key={index}
                  className={`w-5 h-5  text-white flex items-center justify-center rounded-full ${
                    checkWinLose(
                      item?.split(",")?.[8],
                      item?.split(",")?.[9]
                    ).toLowerCase() === "w" && "bg-green02"
                  } ${
                    checkWinLose(
                      item?.split(",")?.[8],
                      item?.split(",")?.[9]
                    ).toLowerCase() === "l" && "bg-red-500"
                  } ${
                    checkWinLose(
                      item?.split(",")?.[8],
                      item?.split(",")?.[9]
                    ).toLowerCase() === "d" && "bg-[#9DA5AC]"
                  } `}
                >
                  {checkWinLose(item?.split(",")?.[8], item?.split(",")?.[9])}
                </span>
              );
            })}
        </div>
      </div>
      <div className="mt-3 px-4 py-6">
        <div>
          <div className="flex justify-between">
            <div className="font-bold">{goalHome}</div>
            <div className="font-bold">Ghi bàn</div>
            <div className="font-bold">{goalAway}</div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="w-[50%] h-[10px] bg-slate-200 rounded-l-md relative overflow-hidden">
              <div
                className="absolute h-[10px] top-0 bg-secondary"
                style={{
                  width: `${(goalHome / (goalHome + goalAway)) * 100}%`,
                  right: 0,
                }}
              ></div>
            </div>
            <div className="w-[50%] h-[10px] bg-slate-200 rounded-r-md relative">
              <div
                className="absolute h-[10px] top-0 bg-secondary"
                style={{
                  width: `${(goalAway / (goalHome + goalAway)) * 100}%`,
                  left: 0,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <div className="font-bold">{cornerHome}</div>
            <div className="font-bold">Đá phạt góc</div>
            <div className="font-bold">{cornerAway}</div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="w-[50%] h-[10px] bg-slate-200 rounded-l-md relative overflow-hidden">
              <div
                className="absolute h-[10px] top-0 bg-secondary"
                style={{
                  width: `${(cornerHome / (cornerHome + cornerAway)) * 100}%`,
                  right: 0,
                }}
              ></div>
            </div>
            <div className="w-[50%] h-[10px] bg-slate-200 rounded-r-md relative">
              <div
                className="absolute h-[10px] top-0 bg-secondary"
                style={{
                  width: `${(cornerAway / (cornerHome + cornerAway)) * 100}%`,
                  left: 0,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <div className="font-bold">{redCardHome}</div>
            <div className="font-bold">Thẻ đỏ</div>
            <div className="font-bold">{redCardAway}</div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="w-[50%] h-[10px] bg-slate-200 rounded-l-md relative overflow-hidden">
              <div
                className="absolute h-[10px] top-0 bg-secondary"
                style={{
                  width: `${
                    (redCardHome / (redCardHome + redCardAway)) * 100
                  }%`,
                  right: 0,
                }}
              ></div>
            </div>
            <div className="w-[50%] h-[10px] bg-slate-200 rounded-r-md relative">
              <div
                className="absolute h-[10px] top-0 bg-secondary"
                style={{
                  width: `${
                    (redCardAway / (redCardHome + redCardAway)) * 100
                  }%`,
                  left: 0,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousMatch;
