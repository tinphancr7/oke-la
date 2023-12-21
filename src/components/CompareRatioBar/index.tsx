const CompareRatioBar = ({
  home,
  away,
  title,
}: {
  home: number;
  away: number;
  title: string;
}) => {
  return (
    <div className="py-2 mt-4 text-sm lg:text-md">
      <div className="bar-header px-3 flex">
        <p className="w-[40%] text-start">
          [{home}]{" "}
          {home && away ? ((home / (home + away)) * 100).toFixed(2) : 0}%
        </p>
        <p className="w-[20%] text-center">{title}</p>
        <p className="w-[40%] text-end">
          {home && away ? ((away / (home + away)) * 100).toFixed(2) : 0}% [
          {away}]
        </p>
      </div>
      <div className="bar-compare flex px-3 py-1 gap-2">
        <div className="bar-item rounded-l-md bg-slate-100 h-[10px] w-[50%] relative">
          <div
            className="bar-item-ratio bg-secondary absolute h-full right-0 rounded-l-[8px]"
            style={{ width: `${((home / (home + away)) * 100).toFixed(2)}%` }}
          ></div>
        </div>
        <div className="bar-item rounded-r-md  bg-slate-100 h-[10px] w-[50%] relative">
          <div
            className="bar-item-ratio bg-cyan-700 absolute h-full rounded-r-[8px]"
            style={{ width: `${((away / (home + away)) * 100).toFixed(2)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CompareRatioBar;
