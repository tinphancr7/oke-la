import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import { IGroup } from "@/interfaces";
import { getPaggingGroup } from "@/apis/tip";

const DifferentGroup = ({ groupId }: { groupId: string }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);

  const getGroup = async () => {
    try {
      const res = await getPaggingGroup(10, 1, groupId);
      setGroups(res.data?.result.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroup();
  }, [groupId]);

  return (
    <div className="w-full my-[20px] px-4 py-4 bg-neutral-100 flex-col justify-start items-start gap-2 inline-flex">
      <div className="self-stretch justify-between items-center gap-4 inline-flex">
        <div className="text-black text-lg font-bold">Nhóm khác</div>
      </div>
      {groups?.map((group) => (
        <GroupCard group={group} key={group._id} />
      ))}
    </div>
  );
};

export default DifferentGroup;
