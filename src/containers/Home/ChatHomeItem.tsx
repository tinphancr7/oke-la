import Avatar from "@/components/avatar";
import RankUser from "@/components/rank";
import { IMessage } from "@/interfaces";
import React from "react";

type Props = {
  message: IMessage;
};

function ChatHomeItem({ message }: Props) {
  return (
    <div className="flex mt-2 gap-x-2">
      <div className="flex flex-col">
        <Avatar src={message?.user?.avatar} size="2.5rem" />
        {/* <div className="bg-secondary px-1 py-0.5 text-white mt-1 rounded-lg text-center text-center text-xs font-semi">
          Lv.{message?.user?.level}
        </div> */}
      </div>
      <div className="leading-snug flex-1">
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-sm">{message?.user?.full_name}</div>
          <RankUser rank={message?.user?.level} />
        </div>
        <span className="text-sm">{message?.content}</span>
      </div>
    </div>
  );
}

export default ChatHomeItem;
