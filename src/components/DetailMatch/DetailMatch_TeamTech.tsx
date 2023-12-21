import { getStatsTypeUse } from "@/helper";
import { useRouter } from "next/router";

function convertType({
  type,
  home,
  away,
}: {
  type: number;
  home: any;
  away: any;
}) {
  let result = "";
  switch (type) {
    case 3:
      result = "Sút bóng";
      break;
    case 4:
      result = "Sút cầu môn";
      break;
    case 6:
      result = "Phạt góc";
      break;
    case 11:
      result = "Thẻ vàng";
      break;
    case 14:
      result = "TL kiểm soát bóng";
      break;
    case 34:
      result = "Sút ngoài cầu môn";
      break;
    case 43:
      result = "Tấn công";
      break;
    case 44:
      result = "Tấn công nguy hiểm";
      break;
    case 45:
      result = "Phạt góc (HT)";
      break;
    case 46:
      result = "TL kiểm soát bóng(HT)";
      break;
  }
  if (result !== "")
    return { key: result, home, away, total: parseInt(home) + parseInt(away) };
}
export default function DetailMatch_TeamTech({ stats }: { stats: any }) {
  const router = useRouter();
  const matchId = router?.query?.pid;

  return (
    <>
      <div
        id="teamTechDiv_detail"
        className="content"
        style={{
          backgroundColor: "white",
          padding: "20px 6px",
          display: `${!stats ? "none" : "block"}`,
        }}
      >
        <h2 className="team-table-title">Thống kê kỹ thuật</h2>
        <div className="fx20">
          <ul className="stat">
            {stats.stats?.map((result: any, index: number) => {
              const item = convertType({
                type: result.type,
                home: result.home,
                away: result.away,
              });
              return (
                item &&
                getStatsTypeUse.includes(result.type) && (
                  <li key={index}>
                    <span className={`stat-c`}>{item?.home}</span>
                    <span className="stat-bar-wrapper homes">
                      <span
                        className="stat-bar fr"
                        style={{
                          width: `${
                            (parseFloat(item?.home.replace("%", "")) /
                              item?.total) *
                            100
                          }%`,
                        }}
                      ></span>
                    </span>
                    <span className="stat-title">{item?.key}</span>
                    <span className="stat-bar-wrapper aways">
                      <span
                        className="stat-bar fl"
                        style={{
                          width: `${
                            (parseFloat(item?.away.replace("%", "")) /
                              item?.total) *
                            100
                          }%`,
                        }}
                      ></span>
                    </span>
                    <span className={`stat-c`}>{item?.away}</span>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        {/* <iframe
          src={`https://matchgress.livesportstv.cc/?id=${matchId}`}
          width="100%"
          height="600"
        ></iframe> */}
      </div>
    </>
  );
}
