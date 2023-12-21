import { useCallback, useMemo } from "react";

const GoalLose = ({ analysis }: { analysis: any }) => {
  const spiltArray = (arrayAnalys: any) => {
    return arrayAnalys?.split(",");
  };
  let initialValue = 0;
  const caculateAllGoalHome = spiltArray(analysis?.homeShootTime?.[0])?.forEach(
    (item: any) => (initialValue += Number(item))
  );

  const caculateRatio = (number: number, total: number) => {
    return number ? `${Math.round((number / total) * 100).toFixed(2)}%` : "-";
  };
  return (
    <div>
      <table className="w-full table-animation">
        <thead>
          <tr>
            <td>Ghi bàn</td>
            <td>Giờ</td>
            <td>Ghi bàn</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[0],
                initialValue
              )}
            </td>
            <td>1 - 10</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[0],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[1],
                initialValue
              )}
            </td>
            <td>11 - 20</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[1],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[2],
                initialValue
              )}
            </td>
            <td>21 - 30</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[2],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[3],
                initialValue
              )}
            </td>
            <td>31 - 40</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[3],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[4],
                initialValue
              )}
            </td>
            <td>41 - 45+</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[4],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[5],
                initialValue
              )}
            </td>
            <td>46 - 50</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[5],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[6],
                initialValue
              )}
            </td>
            <td>51 - 60</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[6],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[7],
                initialValue
              )}
            </td>
            <td>61 - 70</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[7],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[8],
                initialValue
              )}
            </td>
            <td>71 - 80</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[8],
                initialValue
              )}
            </td>
          </tr>
          <tr>
            <td>
              {caculateRatio(
                spiltArray(analysis?.homeShootTime?.[0])?.[9],
                initialValue
              )}
            </td>
            <td>81 - 90+</td>
            <td>
              {caculateRatio(
                spiltArray(analysis?.awayShootTime?.[0])?.[9],
                initialValue
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GoalLose;
