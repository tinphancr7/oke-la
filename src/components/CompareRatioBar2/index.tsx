const CompareRatioBar2 = ({
  home,
  away,
  title,
  isDisplayRatio = true,
}: {
  home?: number;
  away?: number;
  title: string;
  isDisplayRatio?: boolean;
}) => {
  return (
    <div className="flex justify-center items-center w-[90%] lg:w-[60%] mx-auto">
      <div className="left-bar-1 flex item-center w-[35%] lg:w-[40%] justify-end gap-2">
        <p className="text-secondary text-sm lg:text-md">
          {isDisplayRatio ? home?.toFixed(2) : ""}
        </p>
        <div
          className="w-90% bg-secondary rounded-l-[8px]"
          style={{
            width: `${(Number(home) / (Number(home) + Number(away))) * 100}%`,
          }}
        ></div>
      </div>
      <div
        className="bar-title text-center p-2 w-[30%] lg:w-[20%] text-sm lg:text-md"
        style={{
          border: "1px solid #E4E4E4",
          fontWeight: isDisplayRatio ? 400 : "bold",
        }}
      >
        {title}
      </div>
      <div className="left-bar-2 flex item-center w-[35%] lg:w-[40%] justify-start gap-2 ">
        <div
          className="bg-cyan-700 rounded-r-[8px]"
          style={{
            width: `${(Number(away) / (Number(home) + Number(away))) * 100}%`,
          }}
        ></div>
        <p className="text-cyan-700 text-sm lg:text-md">
          {isDisplayRatio ? away?.toFixed(2) : ""}
        </p>
      </div>
    </div>
  );
};

export default CompareRatioBar2;
